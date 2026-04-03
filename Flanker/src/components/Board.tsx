import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faRedo } from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./Flanker.css";

type Phase =
  | "instructions"
  | "fixation"
  | "stimulus"
  | "feedback"
  | "gameOver"
  | "questionnaire"
  | "done";

type Direction = "left" | "right";
type Condition = "congruent" | "incongruent" | "neutral";

interface FlankerTrial {
  target: Direction;
  condition: Condition;
  display: string; // the 5-character arrow string shown to participant
}

interface TrialResult {
  trial: number;
  target: Direction;
  response: Direction;
  condition: Condition;
  display: string;
  correct: boolean;
  rt: number;
}

interface Props {
  data: any;
}

// Arrow characters
const LEFT_ARROW = "\u2190";   // ←
const RIGHT_ARROW = "\u2192";  // →
const DASH = "\u2014";         // —

function buildDisplay(target: Direction, condition: Condition): string {
  const targetChar = target === "left" ? LEFT_ARROW : RIGHT_ARROW;

  if (condition === "congruent") {
    // All arrows same direction: ←←←←← or →→→→→
    return Array(5).fill(targetChar).join("");
  } else if (condition === "incongruent") {
    // Flankers opposite to target: →→←→→ or ←←→←←
    const flankerChar = target === "left" ? RIGHT_ARROW : LEFT_ARROW;
    return flankerChar + flankerChar + targetChar + flankerChar + flankerChar;
  } else {
    // Neutral: dashes flanking center arrow: ——←—— or ——→——
    return DASH + DASH + targetChar + DASH + DASH;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateTrials(
  trialsPerCondition: number,
  conditions: Condition[]
): FlankerTrial[] {
  const trials: FlankerTrial[] = [];

  for (const condition of conditions) {
    for (let i = 0; i < trialsPerCondition; i++) {
      // Alternate left/right targets evenly
      const target: Direction = i % 2 === 0 ? "left" : "right";
      const display = buildDisplay(target, condition);
      trials.push({ target, condition, display });
    }
  }

  return shuffle(trials);
}

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);
}

function stdDev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const m = arr.reduce((s, v) => s + v, 0) / arr.length;
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1);
  return Math.round(Math.sqrt(variance));
}

const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const trialsPerCondition = Math.max(1, Math.min(50, settings.trials_per_condition ?? 20));
  const fixationMs = Math.max(200, Math.min(2000, settings.fixation_ms ?? 500));
  const feedbackMs = Math.max(200, Math.min(2000, settings.feedback_ms ?? 500));
  const stimulusDurationMs = Math.max(500, Math.min(5000, settings.stimulus_duration_ms ?? 1500));

  // Parse conditions
  const conditionSetting = settings.conditions ?? "congruent,incongruent,neutral";
  const conditions: Condition[] = (typeof conditionSetting === "string"
    ? conditionSetting.split(",").map((s: string) => s.trim())
    : Array.isArray(conditionSetting) ? conditionSetting : ["congruent", "incongruent", "neutral"]
  ).filter((c: string) => ["congruent", "incongruent", "neutral"].includes(c)) as Condition[];
  if (conditions.length === 0) conditions.push("congruent", "incongruent", "neutral");

  const language = data.configuration?.language ?? "en-US";
  const showForward = data.forward ?? false;
  const noBack = data.noBack ?? false;

  const [phase, setPhase] = useState<Phase>("instructions");
  const [trialIndex, setTrialIndex] = useState(0);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);

  const trialsRef = useRef<FlankerTrial[]>(generateTrials(trialsPerCondition, conditions));
  const resultsRef = useRef<TrialResult[]>([]);
  const routesRef = useRef<any[]>([]);
  const startTimeRef = useRef(Date.now());
  const stimulusTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalTrials = trialsRef.current.length;
  const currentTrial = trialsRef.current[trialIndex] as FlankerTrial | undefined;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    };
  }, []);

  // ── Start a trial (show fixation, then stimulus) ──────
  const showTrial = useCallback((index: number) => {
    setTrialIndex(index);
    setPhase("fixation");
    timerRef.current = setTimeout(() => {
      stimulusTimeRef.current = performance.now();
      setPhase("stimulus");
      // Auto-advance if no response within stimulus duration
      timeoutTimerRef.current = setTimeout(() => {
        // Record a missed trial
        const trial = trialsRef.current[index];
        if (trial) {
          const result: TrialResult = {
            trial: index + 1,
            target: trial.target,
            response: trial.target === "left" ? "right" : "left", // wrong by default
            condition: trial.condition,
            display: trial.display,
            correct: false,
            rt: stimulusDurationMs,
          };
          resultsRef.current.push(result);
          routesRef.current.push({
            duration: stimulusDurationMs,
            item: resultsRef.current.length,
            level: 1,
            type: false,
            value: null,
            target: trial.target,
            response: "timeout",
            condition: trial.condition,
            display: trial.display,
          });
        }
        setFeedbackCorrect(false);
        setPhase("feedback");
        timerRef.current = setTimeout(() => {
          const next = index + 1;
          if (next >= totalTrials) {
            setPhase("gameOver");
            timerRef.current = setTimeout(() => setPhase("questionnaire"), 1500);
          } else {
            showTrial(next);
          }
        }, feedbackMs);
      }, stimulusDurationMs);
    }, fixationMs);
  }, [fixationMs, feedbackMs, stimulusDurationMs, totalTrials]);

  // ── Advance to next trial or end game ─────────────────
  const advanceTrial = useCallback(() => {
    const next = trialIndex + 1;
    if (next >= totalTrials) {
      setPhase("gameOver");
      timerRef.current = setTimeout(() => setPhase("questionnaire"), 1500);
    } else {
      showTrial(next);
    }
  }, [trialIndex, totalTrials, showTrial]);

  // ── Handle direction button tap ───────────────────────
  const handleResponse = useCallback((response: Direction) => {
    if (phase !== "stimulus" || !currentTrial) return;

    // Cancel the stimulus timeout since participant responded
    if (timeoutTimerRef.current) {
      clearTimeout(timeoutTimerRef.current);
      timeoutTimerRef.current = null;
    }

    const rt = Math.round(performance.now() - stimulusTimeRef.current);
    const correct = response === currentTrial.target;

    const result: TrialResult = {
      trial: trialIndex + 1,
      target: currentTrial.target,
      response,
      condition: currentTrial.condition,
      display: currentTrial.display,
      correct,
      rt,
    };
    resultsRef.current.push(result);
    routesRef.current.push({
      duration: rt,
      item: resultsRef.current.length,
      level: 1,
      type: correct,
      value: null,
      target: currentTrial.target,
      response,
      condition: currentTrial.condition,
      display: currentTrial.display,
    });

    setFeedbackCorrect(correct);
    setPhase("feedback");
    timerRef.current = setTimeout(() => advanceTrial(), feedbackMs);
  }, [phase, currentTrial, trialIndex, advanceTrial, feedbackMs]);

  // ── Compute static_data ───────────────────────────────
  const computePayload = useCallback((qData?: any) => {
    const duration = Date.now() - startTimeRef.current;
    const all = resultsRef.current;

    const byCondition = (cond: Condition) => {
      const trials = all.filter(r => r.condition === cond);
      const correct = trials.filter(r => r.correct);
      const correctRTs = correct.map(r => r.rt);
      return {
        count: trials.length,
        correct_count: correct.length,
        error_count: trials.length - correct.length,
        mean_rt: mean(correctRTs),
        median_rt: median(correctRTs),
        sd_rt: stdDev(correctRTs),
      };
    };

    const congruent = byCondition("congruent");
    const incongruent = byCondition("incongruent");
    const neutral = byCondition("neutral");

    const flankerEffect = incongruent.mean_rt > 0 && congruent.mean_rt > 0
      ? incongruent.mean_rt - congruent.mean_rt : 0;

    const allCorrect = all.filter(r => r.correct);
    const totalCorrect = allCorrect.length;
    const score = all.length > 0 ? Math.round(totalCorrect / all.length * 100) : 0;

    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        flanker_effect: flankerEffect,
        congruent,
        incongruent,
        neutral,
        overall_mean_rt: mean(allCorrect.map(r => r.rt)),
        overall_accuracy: score,
        total_trials: all.length,
        total_correct: totalCorrect,
        total_errors: all.length - totalCorrect,
        trials_per_condition: trialsPerCondition,
        conditions: conditions.join(","),
        fixation_ms: fixationMs,
        stimulus_duration_ms: stimulusDurationMs,
        correct_answers: totalCorrect,
        wrong_answers: all.length - totalCorrect,
        total_questions: all.length,
        score,
        point: score >= 80 ? 2 : 1,
        ...(qData && { questionnaire: qData }),
      },
      temporal_slices: routesRef.current,
    };
    return payload;
  }, [trialsPerCondition, conditions, fixationMs, stimulusDurationMs]);

  // ── Send results ──────────────────────────────────────
  const sendResult = useCallback((isNav: boolean, isBack: boolean, qData?: any) => {
    const payload = computePayload(qData);
    if (showForward) payload.forward = !isBack;
    if (isNav && isBack) payload.clickBack = true;
    if (!isNav) payload.done = true;
    parent.postMessage(JSON.stringify(payload), "*");
  }, [computePayload, showForward]);

  // ── Navigation ────────────────────────────────────────
  const handleBack = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    routesRef.current.push({ type: "manual_exit", value: true });
    sendResult(true, true);
  };

  const handleForward = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (timeoutTimerRef.current) clearTimeout(timeoutTimerRef.current);
    routesRef.current.push({ type: "manual_exit", value: true });
    sendResult(true, false);
  };

  const handleInstructionClose = () => {
    startTimeRef.current = Date.now();
    showTrial(0);
  };

  const handleQuestionnaireSubmit = (response: any) => {
    setPhase("done");
    routesRef.current.push({ type: "manual_exit", value: false });
    sendResult(false, false, response);
  };

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <nav className="back-link" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </nav>
        )}
        {i18n.t("FLANKER")}
        {showForward && (
          <nav className="home-link-forward" onClick={handleForward}>
            <FontAwesomeIcon icon={faArrowRight} />
          </nav>
        )}
        <nav className="home-link" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faRedo} />
        </nav>
      </div>

      {/* Status Bar */}
      {(phase === "fixation" || phase === "stimulus" || phase === "feedback") && (
        <div className="status-bar">
          <div className="level-badge">
            {i18n.t("TRIAL_COUNT", {
              current: Math.min(trialIndex + 1, totalTrials),
              total: totalTrials,
            })}
          </div>
        </div>
      )}

      {/* Instruction Modal */}
      {phase === "instructions" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={i18n.t("INSTRUCTIONS_TEXT")}
          language={language}
        />
      )}

      {/* ── Game Area ──────────────────────────────────── */}
      {(phase === "fixation" || phase === "stimulus" || phase === "feedback") && (
        <div className="flanker-area">
          {/* Arrow display zone */}
          <div className="flanker-display-zone">
            {phase === "fixation" && (
              <div className="flanker-fixation">+</div>
            )}
            {phase === "stimulus" && currentTrial && (
              <div className="flanker-arrows">
                {currentTrial.display}
              </div>
            )}
            {phase === "feedback" && (
              <div className={`flanker-feedback ${feedbackCorrect ? "correct" : "incorrect"}`}>
                {feedbackCorrect ? "\u2713" : "\u2717"}
              </div>
            )}
          </div>

          {/* Direction buttons */}
          <div className="flanker-buttons">
            <button
              className="flanker-btn flanker-btn-left"
              onClick={() => handleResponse("left")}
              disabled={phase !== "stimulus"}
            >
              <span className="flanker-btn-arrow">{LEFT_ARROW}</span>
              <span className="flanker-btn-label">{i18n.t("LEFT")}</span>
            </button>
            <button
              className="flanker-btn flanker-btn-right"
              onClick={() => handleResponse("right")}
              disabled={phase !== "stimulus"}
            >
              <span className="flanker-btn-arrow">{RIGHT_ARROW}</span>
              <span className="flanker-btn-label">{i18n.t("RIGHT")}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Game Over ──────────────────────────────────── */}
      {phase === "gameOver" && (
        <div className="flanker-area">
          <div className="flanker-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <Questionnaire
          show={true}
          language={language}
          setResponse={handleQuestionnaireSubmit}
        />
      )}
    </div>
  );
};

export default Board;
