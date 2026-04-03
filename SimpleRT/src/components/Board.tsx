import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faRedo } from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./SimpleRT.css";

type Phase =
  | "instructions"
  | "simple_waiting"     // ISI — blank screen, waiting for stimulus
  | "simple_stimulus"    // stimulus visible, awaiting tap
  | "simple_feedback"    // brief feedback after tap (or too-early)
  | "choice_transition"  // overlay: "Now the circle will appear left or right"
  | "choice_waiting"
  | "choice_stimulus"
  | "choice_feedback"
  | "gameOver"
  | "questionnaire"
  | "done";

interface TrialResult {
  phase: "simple" | "choice";
  trial: number;            // 1-indexed within phase
  rt: number;               // reaction time ms (–1 if anticipation)
  correct: boolean;         // true for simple hits, true/false for choice
  anticipation: boolean;    // tapped before stimulus
  stimulus_side?: "left" | "right" | "center";
  response_side?: "left" | "right" | "center" | null;
  isi: number;              // actual ISI used (ms)
}

interface Props {
  data: any;
}

function randomISI(min: number, max: number): number {
  return Math.round(min + Math.random() * (max - min));
}

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function stdDev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
  const variance = arr.reduce((s, v) => s + (v - mean) ** 2, 0) / (arr.length - 1);
  return Math.round(Math.sqrt(variance));
}

const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const simpleTrials = Math.max(1, Math.min(100, settings.simple_trials ?? 20));
  const choiceTrials = Math.max(0, Math.min(100, settings.choice_trials ?? 20));
  const minISI = Math.max(500, settings.min_isi_ms ?? 1000);
  const maxISI = Math.max(minISI + 500, settings.max_isi_ms ?? 4000);
  const language = data.configuration?.language ?? "en-US";
  const showForward = data.forward ?? false;
  const noBack = data.noBack ?? false;

  const [phase, setPhase] = useState<Phase>("instructions");
  const [trialNum, setTrialNum] = useState(0); // 0-indexed within current phase
  const [stimulusSide, setStimulusSide] = useState<"left" | "right" | "center">("center");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");

  const resultsRef = useRef<TrialResult[]>([]);
  const routesRef = useRef<any[]>([]);
  const startTimeRef = useRef(Date.now());
  const stimulusTimeRef = useRef(0);
  const currentISIRef = useRef(0);
  const isiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const respondedRef = useRef(false);
  const currentPhaseRef = useRef<"simple" | "choice">("simple");
  const trialCountInPhaseRef = useRef(0);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (isiTimerRef.current) clearTimeout(isiTimerRef.current);
    };
  }, []);

  // ── Start a trial (show blank, schedule stimulus) ──────
  const startTrial = useCallback((phaseType: "simple" | "choice") => {
    respondedRef.current = false;
    const isi = randomISI(minISI, maxISI);
    currentISIRef.current = isi;
    currentPhaseRef.current = phaseType;

    if (phaseType === "simple") {
      setPhase("simple_waiting");
      setStimulusSide("center");
    } else {
      setPhase("choice_waiting");
      const side = Math.random() < 0.5 ? "left" : "right";
      setStimulusSide(side);
    }

    isiTimerRef.current = setTimeout(() => {
      stimulusTimeRef.current = performance.now();
      if (phaseType === "simple") {
        setPhase("simple_stimulus");
      } else {
        setPhase("choice_stimulus");
      }
    }, isi);
  }, [minISI, maxISI]);

  // ── Record a trial result ─────────────────────────────
  const recordTrial = useCallback((result: TrialResult) => {
    resultsRef.current.push(result);
    routesRef.current.push({
      duration: result.rt,
      item: resultsRef.current.length,
      level: result.phase === "simple" ? 1 : 2,
      type: result.correct && !result.anticipation,
      value: null,
      phase: result.phase,
      trial: result.trial,
      stimulus_side: result.stimulus_side,
      response_side: result.response_side,
      anticipation: result.anticipation,
      isi: result.isi,
    });
  }, []);

  // ── Advance to next trial or phase ────────────────────
  const advanceTrial = useCallback(() => {
    const phaseType = currentPhaseRef.current;
    const nextTrial = trialCountInPhaseRef.current + 1;
    const maxTrials = phaseType === "simple" ? simpleTrials : choiceTrials;

    if (nextTrial >= maxTrials) {
      // Phase complete
      if (phaseType === "simple" && choiceTrials > 0) {
        // Transition to choice phase
        setPhase("choice_transition");
      } else {
        // Game over
        setPhase("gameOver");
        setTimeout(() => setPhase("questionnaire"), 1500);
      }
    } else {
      trialCountInPhaseRef.current = nextTrial;
      setTrialNum(nextTrial);
      startTrial(phaseType);
    }
  }, [simpleTrials, choiceTrials, startTrial]);

  // ── Handle tap during waiting (anticipation error) ────
  const handleWaitingTap = useCallback(() => {
    if (respondedRef.current) return;
    respondedRef.current = true;

    // Cancel the pending stimulus
    if (isiTimerRef.current) {
      clearTimeout(isiTimerRef.current);
      isiTimerRef.current = null;
    }

    const phaseType = currentPhaseRef.current;
    const result: TrialResult = {
      phase: phaseType,
      trial: trialCountInPhaseRef.current + 1,
      rt: -1,
      correct: false,
      anticipation: true,
      stimulus_side: phaseType === "simple" ? "center" : stimulusSide,
      response_side: null,
      isi: currentISIRef.current,
    };
    recordTrial(result);

    setFeedbackText(i18n.t("TOO_EARLY"));
    setFeedbackColor("#e74c3c");
    setPhase(phaseType === "simple" ? "simple_feedback" : "choice_feedback");

    setTimeout(() => advanceTrial(), 1000);
  }, [stimulusSide, recordTrial, advanceTrial]);

  // ── Handle tap on stimulus (simple RT) ────────────────
  const handleSimpleTap = useCallback(() => {
    if (respondedRef.current) return;
    respondedRef.current = true;

    const rt = Math.round(performance.now() - stimulusTimeRef.current);
    const isAnticipation = rt < 100;

    const result: TrialResult = {
      phase: "simple",
      trial: trialCountInPhaseRef.current + 1,
      rt: isAnticipation ? -1 : rt,
      correct: !isAnticipation,
      anticipation: isAnticipation,
      stimulus_side: "center",
      response_side: "center",
      isi: currentISIRef.current,
    };
    recordTrial(result);

    if (isAnticipation) {
      setFeedbackText(i18n.t("TOO_EARLY"));
      setFeedbackColor("#e74c3c");
    } else {
      setFeedbackText(`${rt} ms`);
      setFeedbackColor("#27AE60");
    }
    setPhase("simple_feedback");

    setTimeout(() => advanceTrial(), 800);
  }, [recordTrial, advanceTrial]);

  // ── Handle tap on choice side ─────────────────────────
  const handleChoiceTap = useCallback((side: "left" | "right") => {
    if (respondedRef.current) return;
    respondedRef.current = true;

    const rt = Math.round(performance.now() - stimulusTimeRef.current);
    const isAnticipation = rt < 100;
    const isCorrect = !isAnticipation && side === stimulusSide;

    const result: TrialResult = {
      phase: "choice",
      trial: trialCountInPhaseRef.current + 1,
      rt: isAnticipation ? -1 : rt,
      correct: isCorrect,
      anticipation: isAnticipation,
      stimulus_side: stimulusSide,
      response_side: side,
      isi: currentISIRef.current,
    };
    recordTrial(result);

    if (isAnticipation) {
      setFeedbackText(i18n.t("TOO_EARLY"));
      setFeedbackColor("#e74c3c");
    } else if (!isCorrect) {
      setFeedbackText(`${rt} ms`);
      setFeedbackColor("#e74c3c");
    } else {
      setFeedbackText(`${rt} ms`);
      setFeedbackColor("#27AE60");
    }
    setPhase("choice_feedback");

    setTimeout(() => advanceTrial(), 800);
  }, [stimulusSide, recordTrial, advanceTrial]);

  // ── Send results ──────────────────────────────────────
  const sendResult = useCallback((isNav: boolean, isBack: boolean, qData?: any) => {
    const duration = Date.now() - startTimeRef.current;
    const all = resultsRef.current;

    const simpleResults = all.filter(r => r.phase === "simple" && !r.anticipation);
    const choiceResults = all.filter(r => r.phase === "choice" && !r.anticipation);
    const simpleCorrect = simpleResults.filter(r => r.correct);
    const choiceCorrect = choiceResults.filter(r => r.correct);

    const simpleRTs = simpleCorrect.map(r => r.rt);
    const choiceRTs = choiceCorrect.map(r => r.rt);
    const allCorrectRTs = [...simpleRTs, ...choiceRTs];

    const anticipations = all.filter(r => r.anticipation);
    const choiceErrors = choiceResults.filter(r => !r.correct); // wrong side

    const meanSimple = simpleRTs.length > 0 ? Math.round(simpleRTs.reduce((s, v) => s + v, 0) / simpleRTs.length) : 0;
    const meanChoice = choiceRTs.length > 0 ? Math.round(choiceRTs.reduce((s, v) => s + v, 0) / choiceRTs.length) : 0;
    const meanAll = allCorrectRTs.length > 0 ? Math.round(allCorrectRTs.reduce((s, v) => s + v, 0) / allCorrectRTs.length) : 0;

    // Legacy fields
    const totalCorrect = simpleCorrect.length + choiceCorrect.length;
    const totalTrials = all.length;
    const score = totalTrials > 0 ? Math.round(totalCorrect / totalTrials * 100) : 0;

    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        // RT metrics
        simple_mean_rt: meanSimple,
        simple_median_rt: median(simpleRTs),
        simple_sd_rt: stdDev(simpleRTs),
        simple_correct_count: simpleCorrect.length,
        simple_trial_count: all.filter(r => r.phase === "simple").length,
        choice_mean_rt: meanChoice,
        choice_median_rt: median(choiceRTs),
        choice_sd_rt: stdDev(choiceRTs),
        choice_correct_count: choiceCorrect.length,
        choice_error_count: choiceErrors.length,
        choice_trial_count: all.filter(r => r.phase === "choice").length,
        anticipation_count: anticipations.length,
        overall_mean_rt: meanAll,
        // Settings echo
        simple_trials: simpleTrials,
        choice_trials: choiceTrials,
        min_isi_ms: minISI,
        max_isi_ms: maxISI,
        // Legacy fields
        correct_answers: totalCorrect,
        wrong_answers: anticipations.length + choiceErrors.length,
        total_questions: totalTrials,
        score,
        point: score >= 80 ? 2 : 1,
        ...(qData && { questionnaire: qData }),
      },
      temporal_slices: routesRef.current,
      ...(showForward && { forward: !isBack }),
      ...(isNav && isBack && { clickBack: true }),
      ...(!isNav && { done: true }),
    };
    parent.postMessage(JSON.stringify(payload), "*");
  }, [simpleTrials, choiceTrials, minISI, maxISI, showForward]);

  // ── Navigation ────────────────────────────────────────
  const handleBack = () => {
    if (isiTimerRef.current) clearTimeout(isiTimerRef.current);
    routesRef.current.push({ type: "manual_exit", value: true });
    sendResult(true, true);
  };

  const handleForward = () => {
    if (isiTimerRef.current) clearTimeout(isiTimerRef.current);
    routesRef.current.push({ type: "manual_exit", value: true });
    sendResult(true, false);
  };

  const handleInstructionClose = () => {
    startTimeRef.current = Date.now();
    trialCountInPhaseRef.current = 0;
    setTrialNum(0);
    startTrial("simple");
  };

  const handleChoiceTransitionReady = () => {
    trialCountInPhaseRef.current = 0;
    setTrialNum(0);
    startTrial("choice");
  };

  const handleQuestionnaireSubmit = (response: any) => {
    setPhase("done");
    routesRef.current.push({ type: "manual_exit", value: false });

    // Recompute and send
    const duration = Date.now() - startTimeRef.current;
    const all = resultsRef.current;
    const simpleResults = all.filter(r => r.phase === "simple" && !r.anticipation);
    const choiceResults = all.filter(r => r.phase === "choice" && !r.anticipation);
    const simpleCorrect = simpleResults.filter(r => r.correct);
    const choiceCorrect = choiceResults.filter(r => r.correct);
    const simpleRTs = simpleCorrect.map(r => r.rt);
    const choiceRTs = choiceCorrect.map(r => r.rt);
    const allCorrectRTs = [...simpleRTs, ...choiceRTs];
    const anticipations = all.filter(r => r.anticipation);
    const choiceErrors = choiceResults.filter(r => !r.correct);
    const meanSimple = simpleRTs.length > 0 ? Math.round(simpleRTs.reduce((s, v) => s + v, 0) / simpleRTs.length) : 0;
    const meanChoice = choiceRTs.length > 0 ? Math.round(choiceRTs.reduce((s, v) => s + v, 0) / choiceRTs.length) : 0;
    const meanAll = allCorrectRTs.length > 0 ? Math.round(allCorrectRTs.reduce((s, v) => s + v, 0) / allCorrectRTs.length) : 0;
    const totalCorrect = simpleCorrect.length + choiceCorrect.length;
    const totalTrials = all.length;
    const score = totalTrials > 0 ? Math.round(totalCorrect / totalTrials * 100) : 0;

    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        simple_mean_rt: meanSimple,
        simple_median_rt: median(simpleRTs),
        simple_sd_rt: stdDev(simpleRTs),
        simple_correct_count: simpleCorrect.length,
        simple_trial_count: all.filter(r => r.phase === "simple").length,
        choice_mean_rt: meanChoice,
        choice_median_rt: median(choiceRTs),
        choice_sd_rt: stdDev(choiceRTs),
        choice_correct_count: choiceCorrect.length,
        choice_error_count: choiceErrors.length,
        choice_trial_count: all.filter(r => r.phase === "choice").length,
        anticipation_count: anticipations.length,
        overall_mean_rt: meanAll,
        simple_trials: simpleTrials,
        choice_trials: choiceTrials,
        min_isi_ms: minISI,
        max_isi_ms: maxISI,
        correct_answers: totalCorrect,
        wrong_answers: anticipations.length + choiceErrors.length,
        total_questions: totalTrials,
        score,
        point: score >= 80 ? 2 : 1,
        questionnaire: response,
      },
      temporal_slices: routesRef.current,
      done: true,
    };
    parent.postMessage(JSON.stringify(payload), "*");
  };

  // ── Determine what to show ────────────────────────────
  const isWaiting = phase === "simple_waiting" || phase === "choice_waiting";
  const isStimulus = phase === "simple_stimulus" || phase === "choice_stimulus";
  const isFeedback = phase === "simple_feedback" || phase === "choice_feedback";
  const isSimplePhase = phase.startsWith("simple");
  const isChoicePhase = phase.startsWith("choice") && phase !== "choice_transition";
  const currentMax = isSimplePhase ? simpleTrials : choiceTrials;
  const phaseName = isSimplePhase ? i18n.t("SIMPLE_PHASE") : i18n.t("CHOICE_PHASE");

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <nav className="back-link" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </nav>
        )}
        {i18n.t("SIMPLE_RT")}
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
      {(isSimplePhase || isChoicePhase) && (
        <div className="status-bar">
          <div className="level-badge">{phaseName}</div>
          <div className="level-badge">
            {i18n.t("TRIAL_COUNT", {
              current: Math.min(trialNum + 1, currentMax),
              total: currentMax,
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

      {/* ── Simple RT Area ──────────────────────────────── */}
      {isSimplePhase && (
        <div
          className="rt-area"
          onClick={isWaiting ? handleWaitingTap : undefined}
        >
          {isWaiting && (
            <div className="rt-prompt rt-wait">{i18n.t("WAIT")}</div>
          )}
          {isStimulus && (
            <div className="rt-stimulus-container" onClick={handleSimpleTap}>
              <div className="rt-circle rt-circle-center" />
            </div>
          )}
          {isFeedback && (
            <div className="rt-feedback" style={{ color: feedbackColor }}>
              {feedbackText}
            </div>
          )}
        </div>
      )}

      {/* ── Choice Transition ──────────────────────────── */}
      {phase === "choice_transition" && (
        <div className="rt-area">
          <div className="rt-transition-card">
            <p className="rt-transition-text">
              {i18n.t("CHOICE_INSTRUCTIONS")}
            </p>
            <button className="rt-btn-ready" onClick={handleChoiceTransitionReady}>
              {i18n.t("Ready")}
            </button>
          </div>
        </div>
      )}

      {/* ── Choice RT Area ─────────────────────────────── */}
      {isChoicePhase && (
        <div
          className="rt-area"
          onClick={isWaiting ? handleWaitingTap : undefined}
        >
          {isWaiting && (
            <div className="rt-prompt rt-wait">{i18n.t("WAIT")}</div>
          )}
          {isStimulus && (
            <div className="rt-choice-container">
              <div
                className={`rt-choice-half rt-choice-left${stimulusSide === "left" ? " rt-choice-active" : ""}`}
                onClick={() => handleChoiceTap("left")}
              >
                {stimulusSide === "left" && <div className="rt-circle" />}
                <span className="rt-choice-label">{i18n.t("TAP_LEFT")}</span>
              </div>
              <div className="rt-choice-divider" />
              <div
                className={`rt-choice-half rt-choice-right${stimulusSide === "right" ? " rt-choice-active" : ""}`}
                onClick={() => handleChoiceTap("right")}
              >
                {stimulusSide === "right" && <div className="rt-circle" />}
                <span className="rt-choice-label">{i18n.t("TAP_RIGHT")}</span>
              </div>
            </div>
          )}
          {isFeedback && (
            <div className="rt-feedback" style={{ color: feedbackColor }}>
              {feedbackText}
            </div>
          )}
        </div>
      )}

      {/* ── Game Over ──────────────────────────────────── */}
      {phase === "gameOver" && (
        <div className="rt-area">
          <div className="rt-overlay-text">{i18n.t("GAME_OVER")}</div>
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
