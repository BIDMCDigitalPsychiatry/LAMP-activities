import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faRedo } from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./Stroop.css";

type Phase =
  | "instructions"
  | "fixation"    // brief fixation cross between trials
  | "stimulus"    // word displayed, awaiting response
  | "feedback"    // brief correct/incorrect flash
  | "gameOver"
  | "questionnaire"
  | "done";

type ColorName = "red" | "blue" | "green" | "yellow";
type Condition = "congruent" | "incongruent" | "neutral";

interface StroopTrial {
  word: string;         // the text displayed
  ink_color: ColorName; // the color the text is rendered in
  condition: Condition;
}

interface TrialResult {
  trial: number;
  word: string;
  ink_color: ColorName;
  response: ColorName;
  condition: Condition;
  correct: boolean;
  rt: number;
}

interface Props {
  data: any;
}

const COLORS: ColorName[] = ["red", "blue", "green", "yellow"];

const COLOR_HEX: Record<ColorName, string> = {
  red: "#E53935",
  blue: "#1E88E5",
  green: "#43A047",
  yellow: "#FDD835",
};

// Neutral words — common nouns matched for length, no color association
const NEUTRAL_WORDS = ["DESK", "LAMP", "FORK", "BIRD", "SHOE", "TREE", "DOOR", "FISH"];

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
): StroopTrial[] {
  const trials: StroopTrial[] = [];

  for (const condition of conditions) {
    for (let i = 0; i < trialsPerCondition; i++) {
      const inkColor = COLORS[i % COLORS.length];

      let word: string;
      if (condition === "congruent") {
        // Word matches ink
        word = inkColor.toUpperCase();
      } else if (condition === "incongruent") {
        // Word is a different color name
        const otherColors = COLORS.filter(c => c !== inkColor);
        word = otherColors[i % otherColors.length].toUpperCase();
      } else {
        // Neutral non-color word
        word = NEUTRAL_WORDS[i % NEUTRAL_WORDS.length];
      }

      trials.push({ word, ink_color: inkColor, condition });
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

  // Parse conditions
  const conditionSetting = settings.conditions ?? "congruent,incongruent,neutral";
  const conditions: Condition[] = (typeof conditionSetting === "string"
    ? conditionSetting.split(",").map((s: string) => s.trim())
    : conditionSetting
  ).filter((c: string) => ["congruent", "incongruent", "neutral"].includes(c)) as Condition[];
  if (conditions.length === 0) conditions.push("congruent", "incongruent", "neutral");

  const language = data.configuration?.language ?? "en-US";
  const showForward = data.forward ?? false;
  const noBack = data.noBack ?? false;

  const [phase, setPhase] = useState<Phase>("instructions");
  const [trialIndex, setTrialIndex] = useState(0);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);

  const trialsRef = useRef<StroopTrial[]>(generateTrials(trialsPerCondition, conditions));
  const resultsRef = useRef<TrialResult[]>([]);
  const routesRef = useRef<any[]>([]);
  const startTimeRef = useRef(Date.now());
  const stimulusTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalTrials = trialsRef.current.length;
  const currentTrial = trialsRef.current[trialIndex] as StroopTrial | undefined;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Color name in current language ────────────────────
  const colorLabel = useCallback((color: ColorName): string => {
    return i18n.t(color.toUpperCase());
  }, []);

  // ── Start a trial (show fixation, then stimulus) ──────
  const showTrial = useCallback((index: number) => {
    setTrialIndex(index);
    setPhase("fixation");
    timerRef.current = setTimeout(() => {
      stimulusTimeRef.current = performance.now();
      setPhase("stimulus");
    }, fixationMs);
  }, [fixationMs]);

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

  // ── Handle color button tap ───────────────────────────
  const handleResponse = useCallback((response: ColorName) => {
    if (phase !== "stimulus" || !currentTrial) return;

    const rt = Math.round(performance.now() - stimulusTimeRef.current);
    const correct = response === currentTrial.ink_color;

    const result: TrialResult = {
      trial: trialIndex + 1,
      word: currentTrial.word,
      ink_color: currentTrial.ink_color,
      response,
      condition: currentTrial.condition,
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
      word: currentTrial.word,
      ink_color: currentTrial.ink_color,
      response,
      condition: currentTrial.condition,
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

    const stroopEffect = incongruent.mean_rt > 0 && congruent.mean_rt > 0
      ? incongruent.mean_rt - congruent.mean_rt : 0;

    const allCorrect = all.filter(r => r.correct);
    const totalCorrect = allCorrect.length;
    const score = all.length > 0 ? Math.round(totalCorrect / all.length * 100) : 0;

    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        // Stroop metrics
        stroop_effect: stroopEffect,
        congruent,
        incongruent,
        neutral,
        overall_mean_rt: mean(allCorrect.map(r => r.rt)),
        overall_accuracy: score,
        total_trials: all.length,
        total_correct: totalCorrect,
        total_errors: all.length - totalCorrect,
        // Settings echo
        trials_per_condition: trialsPerCondition,
        conditions: conditions.join(","),
        fixation_ms: fixationMs,
        // Legacy fields
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
  }, [trialsPerCondition, conditions, fixationMs]);

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
    routesRef.current.push({ type: "manual_exit", value: true });
    sendResult(true, true);
  };

  const handleForward = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
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
        {i18n.t("STROOP")}
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
        <div className="stroop-area">
          {/* Word display zone */}
          <div className="stroop-word-zone">
            {phase === "fixation" && (
              <div className="stroop-fixation">+</div>
            )}
            {phase === "stimulus" && currentTrial && (
              <div
                className="stroop-word"
                style={{ color: COLOR_HEX[currentTrial.ink_color] }}
              >
                {currentTrial.word}
              </div>
            )}
            {phase === "feedback" && (
              <div className={`stroop-feedback ${feedbackCorrect ? "correct" : "incorrect"}`}>
                {feedbackCorrect ? "✓" : "✗"}
              </div>
            )}
          </div>

          {/* Color buttons */}
          <div className="stroop-buttons">
            {COLORS.map(color => (
              <button
                key={color}
                className="stroop-btn"
                style={{ backgroundColor: COLOR_HEX[color] }}
                onClick={() => handleResponse(color)}
                disabled={phase !== "stimulus"}
              >
                {colorLabel(color)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Game Over ──────────────────────────────────── */}
      {phase === "gameOver" && (
        <div className="stroop-area">
          <div className="stroop-overlay-text">{i18n.t("GAME_OVER")}</div>
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
