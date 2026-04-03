import React, { useState, useRef, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./DelayDiscounting.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "questionnaire" | "done";

interface TrialRecord {
  item: string;
  type: string;
  delay_days: number;
  delay_index: number;
  trial_in_delay: number;
  immediate_amount: number;
  delayed_amount: number;
  chose_immediate: boolean;
  duration: number;
  level: number;
}

interface Props {
  data: any;
}

// ── Helpers ────────────────────────────────────────────
const DELAY_LABELS: Record<number, string> = {
  1: "DELAY_1",
  7: "DELAY_7",
  30: "DELAY_30",
  90: "DELAY_90",
  365: "DELAY_365",
};

function getDelayLabel(days: number): string {
  const key = DELAY_LABELS[days];
  if (key) return i18n.t(key);
  return i18n.t("DELAY_OTHER", { days });
}

function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) return `$${amount}`;
  return `$${amount.toFixed(2)}`;
}

/** Compute AUC using trapezoidal rule on normalized coordinates */
function computeAUC(
  delays: number[],
  indifferences: number[],
  delayedAmount: number
): number {
  if (delays.length === 0) return 1;
  const maxD = Math.max(...delays);

  // Build points: (0, 1) then each (D/maxD, V/A)
  const xs = [0, ...delays.map((d) => d / maxD)];
  const ys = [1, ...indifferences.map((v) => v / delayedAmount)];

  let auc = 0;
  for (let i = 1; i < xs.length; i++) {
    auc += (xs[i] - xs[i - 1]) * (ys[i] + ys[i - 1]) * 0.5;
  }
  return Math.max(0, Math.min(1, auc));
}

/** Fit hyperbolic k: V = A / (1 + kD), solve for k per delay, return median */
function fitHyperbolicK(
  delays: number[],
  indifferences: number[],
  delayedAmount: number
): { k: number; k_values: Record<string, number> } {
  const kValues: Record<string, number> = {};
  const ks: number[] = [];

  for (let i = 0; i < delays.length; i++) {
    const V = indifferences[i];
    const D = delays[i];
    if (V > 0 && D > 0) {
      const k = (delayedAmount / V - 1) / D;
      kValues[String(D)] = Math.round(k * 100000) / 100000;
      ks.push(k);
    }
  }

  // Median k
  ks.sort((a, b) => a - b);
  const median =
    ks.length === 0
      ? 0
      : ks.length % 2 === 1
      ? ks[Math.floor(ks.length / 2)]
      : (ks[Math.floor(ks.length / 2) - 1] + ks[Math.floor(ks.length / 2)]) /
        2;

  return { k: Math.round(median * 100000) / 100000, k_values: kValues };
}

// ── Board ──────────────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const delayedAmount = Math.max(1, settings.delayed_amount ?? 100);
  const trialsPerDelay = Math.max(1, Math.min(20, settings.trials_per_delay ?? 6));

  // Parse delays
  const delaysSetting = settings.delays ?? [1, 7, 30, 90, 365];
  const delays: number[] = (
    Array.isArray(delaysSetting)
      ? delaysSetting
      : typeof delaysSetting === "string"
      ? delaysSetting.split(",").map(Number)
      : [1, 7, 30, 90, 365]
  )
    .filter((n: number) => n > 0)
    .sort((a: number, b: number) => a - b);

  const language =
    data.activity?.spec === "lamp.delay_discounting"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const totalTrials = delays.length * trialsPerDelay;

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [delayIdx, setDelayIdx] = useState(0);
  const [trialInDelay, setTrialInDelay] = useState(0);
  const [immediateAmount, setImmediateAmount] = useState(delayedAmount / 2);
  const [adjustmentStep, setAdjustmentStep] = useState(delayedAmount / 4);
  const [selected, setSelected] = useState<"immediate" | "delayed" | null>(null);
  const [locked, setLocked] = useState(false);

  // ── Refs ─────────────────────────────────────────────
  const trialStartRef = useRef(Date.now());
  const routesRef = useRef<TrialRecord[]>([]);
  const indifferencesRef = useRef<number[]>([]);
  const currentAmountRef = useRef(delayedAmount / 2);
  const currentStepRef = useRef(delayedAmount / 4);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Start trial timer ────────────────────────────────
  useEffect(() => {
    if (phase === "playing" && !locked) {
      trialStartRef.current = Date.now();
    }
  }, [phase, delayIdx, trialInDelay, locked]);

  // ── Overall trial counter ────────────────────────────
  const overallTrial = delayIdx * trialsPerDelay + trialInDelay + 1;

  // ── Handle choice ────────────────────────────────────
  const handleChoice = useCallback(
    (choseImmediate: boolean) => {
      if (locked || phase !== "playing") return;
      setLocked(true);
      setSelected(choseImmediate ? "immediate" : "delayed");

      const rt = Date.now() - trialStartRef.current;
      const currentDelay = delays[delayIdx];
      const amt = currentAmountRef.current;
      const step = currentStepRef.current;

      // Record trial
      routesRef.current.push({
        item: choseImmediate
          ? `$${amt.toFixed(2)} now`
          : `$${delayedAmount} in ${currentDelay}d`,
        type: choseImmediate ? "chose_immediate" : "chose_delayed",
        delay_days: currentDelay,
        delay_index: delayIdx,
        trial_in_delay: trialInDelay,
        immediate_amount: Math.round(amt * 100) / 100,
        delayed_amount: delayedAmount,
        chose_immediate: choseImmediate,
        duration: rt,
        level: delayIdx + 1,
      });

      // Adjust amount for next trial
      let nextAmt: number;
      if (choseImmediate) {
        nextAmt = amt - step;
      } else {
        nextAmt = amt + step;
      }
      // Clamp to [0, delayedAmount]
      nextAmt = Math.max(0, Math.min(delayedAmount, nextAmt));
      const nextStep = step / 2;

      currentAmountRef.current = nextAmt;
      currentStepRef.current = nextStep;

      // Advance after brief highlight
      setTimeout(() => {
        const nextTrialInDelay = trialInDelay + 1;

        if (nextTrialInDelay >= trialsPerDelay) {
          // End of this delay block — record indifference point
          indifferencesRef.current.push(
            Math.round(nextAmt * 100) / 100
          );

          const nextDelayIdx = delayIdx + 1;
          if (nextDelayIdx >= delays.length) {
            // All delays done
            setPhase("questionnaire");
          } else {
            // Move to next delay
            const newStart = delayedAmount / 2;
            const newStep = delayedAmount / 4;
            currentAmountRef.current = newStart;
            currentStepRef.current = newStep;
            setImmediateAmount(newStart);
            setAdjustmentStep(newStep);
            setDelayIdx(nextDelayIdx);
            setTrialInDelay(0);
          }
        } else {
          setImmediateAmount(nextAmt);
          setAdjustmentStep(nextStep);
          setTrialInDelay(nextTrialInDelay);
        }

        setSelected(null);
        setLocked(false);
      }, 400);
    },
    [locked, phase, delayIdx, trialInDelay, delays, delayedAmount, trialsPerDelay]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const routes = routesRef.current;
      const indifferences = indifferencesRef.current;

      // Build indifference_points map
      const indifferencePoints: Record<string, number> = {};
      delays.forEach((d, i) => {
        if (i < indifferences.length) {
          indifferencePoints[String(d)] = indifferences[i];
        }
      });

      // Compute metrics
      const auc = computeAUC(delays, indifferences, delayedAmount);
      const { k, k_values } = fitHyperbolicK(
        delays,
        indifferences,
        delayedAmount
      );

      // RT stats
      const rts = routes.map((r) => r.duration);
      const meanRT =
        rts.length > 0
          ? Math.round(rts.reduce((a, b) => a + b, 0) / rts.length)
          : 0;
      const sortedRTs = [...rts].sort((a, b) => a - b);
      const medianRT =
        sortedRTs.length > 0
          ? sortedRTs.length % 2 === 1
            ? sortedRTs[Math.floor(sortedRTs.length / 2)]
            : Math.round(
                (sortedRTs[Math.floor(sortedRTs.length / 2) - 1] +
                  sortedRTs[Math.floor(sortedRTs.length / 2)]) /
                  2
              )
          : 0;

      const nImmediate = routes.filter((r) => r.chose_immediate).length;
      const proportionImmediate =
        routes.length > 0
          ? Math.round((nImmediate / routes.length) * 1000) / 1000
          : 0;

      // Add exit entry
      const finalRoutes = [
        ...routes,
        {
          item: "exit",
          type: "exit",
          delay_days: 0,
          delay_index: -1,
          trial_in_delay: -1,
          immediate_amount: 0,
          delayed_amount: delayedAmount,
          chose_immediate: false,
          duration: 0,
          level: 0,
        },
      ];

      const payload = {
        timestamp: new Date().getTime(),
        duration: finalRoutes.reduce((s, r) => s + r.duration, 0),
        static_data: {
          // Legacy compat
          score: Math.round(auc * 100),
          correct_answers: routes.length,
          total_questions: totalTrials,

          // Settings
          delayed_amount: delayedAmount,
          delays,
          trials_per_delay: trialsPerDelay,

          // Core metrics
          indifference_points: indifferencePoints,
          auc: Math.round(auc * 10000) / 10000,
          hyperbolic_k: k,
          k_values,

          // RT
          mean_rt_ms: meanRT,
          median_rt_ms: medianRT,

          // Choice behavior
          proportion_immediate: proportionImmediate,

          // Questionnaire
          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(payload, "*");
    },
    [delays, delayedAmount, trialsPerDelay, totalTrials]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    setPhase("playing");
    trialStartRef.current = Date.now();
  }, []);

  // ── Render ───────────────────────────────────────────
  const currentDelay = delays[delayIdx] ?? delays[0];

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        <span
          className="back-link"
          onClick={() => parent.postMessage({ abort: true }, "*")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        {i18n.t("DELAY_DISCOUNTING")}
        <span className="home-link-forward">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
        <span
          className="home-link"
          onClick={() => parent.postMessage({ abort: true }, "*")}
        >
          <FontAwesomeIcon icon={faHome} />
        </span>
      </div>

      {/* Status bar */}
      {phase === "playing" && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("TRIAL_COUNT", {
              current: overallTrial,
              total: totalTrials,
            })}
          </span>
          <span className="level-badge delay-highlight">
            {getDelayLabel(currentDelay)}
          </span>
        </div>
      )}

      {/* Instruction */}
      {phase === "instruction" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={i18n.t("INSTRUCTIONS")}
          language={language}
        />
      )}

      {/* Playing */}
      {phase === "playing" && (
        <div className="dd-area">
          <div className="dd-choice-container">
            {/* Immediate option */}
            <div
              className={`dd-choice-card${
                selected === "immediate" ? " selected-immediate" : ""
              }`}
              onClick={() => handleChoice(true)}
            >
              <div className="dd-amount">
                {formatAmount(Math.round(currentAmountRef.current * 100) / 100)}
              </div>
              <div className="dd-delay-label">{i18n.t("NOW")}</div>
            </div>

            {/* Delayed option */}
            <div
              className={`dd-choice-card${
                selected === "delayed" ? " selected-delayed" : ""
              }`}
              onClick={() => handleChoice(false)}
            >
              <div className="dd-amount">{formatAmount(delayedAmount)}</div>
              <div className="dd-delay-label">
                {getDelayLabel(currentDelay)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="dd-area">
          <div className="dd-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="dd-area">
          <div className="dd-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
