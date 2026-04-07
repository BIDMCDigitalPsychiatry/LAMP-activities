import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faRedo } from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./NBack.css";

type Phase =
  | "instructions"
  | "stimulus"    // letter displayed
  | "isi"         // inter-stimulus interval (blank)
  | "transition"  // between levels — user taps Ready
  | "gameOver"
  | "questionnaire"
  | "done";

// Consonants only — avoids vowel sequences that form words
const LETTERS = "BCDFGHJKLMNPQRSTVWXYZ".split("");

interface TrialDef {
  letter: string;
  isTarget: boolean;
  nLevel: number;
}

interface TrialResult {
  trial: number;
  letter: string;
  isTarget: boolean;
  responded: boolean;
  outcome: "hit" | "miss" | "false_alarm" | "correct_rejection";
  rt: number | null;
  nLevel: number;
}

interface Props {
  data: any;
}

function generateSequence(
  trialsPerLevel: number,
  nLevel: number,
  targetProportion: number
): TrialDef[] {
  const sequence: TrialDef[] = [];

  for (let i = 0; i < trialsPerLevel; i++) {
    if (i < nLevel) {
      sequence.push({
        letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
        isTarget: false,
        nLevel,
      });
    } else {
      const shouldBeTarget = Math.random() < targetProportion;
      if (shouldBeTarget) {
        sequence.push({
          letter: sequence[i - nLevel].letter,
          isTarget: true,
          nLevel,
        });
      } else {
        const nBackLetter = sequence[i - nLevel].letter;
        const options = LETTERS.filter(l => l !== nBackLetter);
        sequence.push({
          letter: options[Math.floor(Math.random() * options.length)],
          isTarget: false,
          nLevel,
        });
      }
    }
  }

  return sequence;
}

function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);
}

function median(arr: number[]): number {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function stdDev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const m = arr.reduce((s, v) => s + v, 0) / arr.length;
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / (arr.length - 1);
  return Math.round(Math.sqrt(variance));
}

// Inverse normal CDF approximation (Abramowitz & Stegun 26.2.23)
function zScore(p: number): number {
  if (p <= 0) return -3.5;
  if (p >= 1) return 3.5;
  const a1 = -3.969683028665376e+01;
  const a2 =  2.209460984245205e+02;
  const a3 = -2.759285104469687e+02;
  const a4 =  1.383577518672690e+02;
  const a5 = -3.066479806614716e+01;
  const a6 =  2.506628277459239e+00;
  const b1 = -5.447609879822406e+01;
  const b2 =  1.615858368580409e+02;
  const b3 = -1.556989798598866e+02;
  const b4 =  6.680131188771972e+01;
  const b5 = -1.328068155288572e+01;
  const c1 = -7.784894002430293e-03;
  const c2 = -3.223964580411365e-01;
  const c3 = -2.400758277161838e+00;
  const c4 = -2.549732539343734e+00;
  const c5 =  4.374664141464968e+00;
  const c6 =  2.938163982698783e+00;
  const d1 =  7.784695709041462e-03;
  const d2 =  3.224671290700398e-01;
  const d3 =  2.445134137142996e+00;
  const d4 =  3.754408661907416e+00;
  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number, r: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c1*q+c2)*q+c3)*q+c4)*q+c5)*q+c6) / ((((d1*q+d2)*q+d3)*q+d4)*q+1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (((((a1*r+a2)*r+a3)*r+a4)*r+a5)*r+a6)*q / (((((b1*r+b2)*r+b3)*r+b4)*r+b5)*r+1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1*q+c2)*q+c3)*q+c4)*q+c5)*q+c6) / ((((d1*q+d2)*q+d3)*q+d4)*q+1);
  }
}

function computeLevelStats(results: TrialResult[]) {
  const hits = results.filter(r => r.outcome === "hit").length;
  const misses = results.filter(r => r.outcome === "miss").length;
  const falseAlarms = results.filter(r => r.outcome === "false_alarm").length;
  const correctRejections = results.filter(r => r.outcome === "correct_rejection").length;

  const targets = hits + misses;
  const nonTargets = falseAlarms + correctRejections;

  const hitRate = targets > 0 ? (hits + 0.5) / (targets + 1) : 0.5;
  const falseAlarmRate = nonTargets > 0 ? (falseAlarms + 0.5) / (nonTargets + 1) : 0.5;
  const dPrime = Math.round((zScore(hitRate) - zScore(falseAlarmRate)) * 100) / 100;
  const criterion = Math.round((-0.5 * (zScore(hitRate) + zScore(falseAlarmRate))) * 100) / 100;

  const hitRTs = results.filter(r => r.outcome === "hit" && r.rt !== null).map(r => r.rt as number);

  return {
    d_prime: dPrime,
    criterion,
    hit_rate: Math.round(hitRate * 1000) / 1000,
    false_alarm_rate: Math.round(falseAlarmRate * 1000) / 1000,
    hits,
    misses,
    false_alarms: falseAlarms,
    correct_rejections: correctRejections,
    hit_rt_mean: mean(hitRTs),
    hit_rt_median: median(hitRTs),
    hit_rt_sd: stdDev(hitRTs),
    total: results.length,
  };
}

const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const trialsPerLevel = Math.max(10, Math.min(100, settings.trials_per_level ?? settings.trials ?? 20));
  const stimulusDurationMs = Math.max(200, Math.min(2000, settings.stimulus_duration_ms ?? 1500));
  const isiMs = Math.max(500, Math.min(5000, settings.isi_ms ?? 2000));
  const targetProportion = Math.max(0.1, Math.min(0.5, settings.target_proportion ?? 0.3));

  // Parse levels — default [1, 2]
  const levelsSetting = settings.levels ?? [1, 2];
  const levels: number[] = (Array.isArray(levelsSetting)
    ? levelsSetting
    : typeof levelsSetting === "string"
      ? levelsSetting.split(",").map((s: string) => parseInt(s.trim(), 10))
      : [1, 2]
  ).filter((n: number) => n >= 1 && n <= 3).sort((a: number, b: number) => a - b);
  if (levels.length === 0) levels.push(1, 2);

  const language = data.configuration?.language ?? "en-US";
  const showForward = data.forward ?? false;
  const noBack = data.noBack ?? false;

  const [phase, setPhase] = useState<Phase>("instructions");
  const [levelIndex, setLevelIndex] = useState(0);
  const [trialIndex, setTrialIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState("");
  const [responded, setResponded] = useState(false);
  const [feedbackFlash, setFeedbackFlash] = useState<"" | "hit" | "false_alarm">("");
  const trialLetterRef = useRef("");

  const currentNLevel = levels[levelIndex] ?? 1;

  // Generate sequences for all levels upfront
  const allSequencesRef = useRef<TrialDef[][]>(
    levels.map(n => generateSequence(trialsPerLevel, n, targetProportion))
  );
  const resultsRef = useRef<TrialResult[]>([]);
  const routesRef = useRef<any[]>([]);
  const startTimeRef = useRef(Date.now());
  const stimulusTimeRef = useRef(0);
  const responseRtRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSequence = allSequencesRef.current[levelIndex] ?? [];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Record result for current trial ────────────────────
  const finishTrial = useCallback((seqIndex: number, lvlIdx: number, didRespond: boolean, rt: number | null) => {
    const seq = allSequencesRef.current[lvlIdx];
    if (!seq) return;
    const trial = seq[seqIndex];
    if (!trial) return;

    let outcome: TrialResult["outcome"];
    if (trial.isTarget && didRespond) outcome = "hit";
    else if (trial.isTarget && !didRespond) outcome = "miss";
    else if (!trial.isTarget && didRespond) outcome = "false_alarm";
    else outcome = "correct_rejection";

    const result: TrialResult = {
      trial: seqIndex + 1,
      letter: trial.letter,
      isTarget: trial.isTarget,
      responded: didRespond,
      outcome,
      rt,
      nLevel: trial.nLevel,
    };
    resultsRef.current.push(result);
    routesRef.current.push({
      duration: rt ?? 0,
      item: resultsRef.current.length,
      level: trial.nLevel,
      type: outcome === "hit" || outcome === "correct_rejection",
      value: null,
      letter: trial.letter,
      is_target: trial.isTarget,
      responded: didRespond,
      outcome,
    });
  }, []);

  // ── Show a trial within the current level ──────────────
  const showTrial = useCallback((seqIndex: number, lvlIdx: number) => {
    const seq = allSequencesRef.current[lvlIdx];
    if (!seq) return;
    const trial = seq[seqIndex];
    if (!trial) return;

    setTrialIndex(seqIndex);
    setCurrentLetter(trial.letter);
    trialLetterRef.current = trial.letter;
    setResponded(false);
    setFeedbackFlash("");
    responseRtRef.current = null;
    stimulusTimeRef.current = performance.now();
    setPhase("stimulus");

    timerRef.current = setTimeout(() => {
      setPhase("isi");
      setCurrentLetter("");

      timerRef.current = setTimeout(() => {
        finishTrial(seqIndex, lvlIdx, responseRtRef.current !== null, responseRtRef.current);

        const next = seqIndex + 1;
        if (next >= seq.length) {
          // Level complete — transition or end
          const nextLvl = lvlIdx + 1;
          if (nextLvl < levels.length) {
            setLevelIndex(nextLvl);
            setPhase("transition");
          } else {
            setPhase("gameOver");
            timerRef.current = setTimeout(() => setPhase("questionnaire"), 1500);
          }
        } else {
          showTrial(next, lvlIdx);
        }
      }, isiMs);
    }, stimulusDurationMs);
  }, [stimulusDurationMs, isiMs, levels.length, finishTrial]);

  // ── Handle Match button tap ────────────────────────────
  const handleMatch = useCallback(() => {
    if ((phase !== "stimulus" && phase !== "isi") || responded) return;

    const rt = Math.round(performance.now() - stimulusTimeRef.current);
    responseRtRef.current = rt;
    setResponded(true);

    const seq = allSequencesRef.current[levelIndex];
    const trial = seq ? seq[trialIndex] : null;
    if (trial) {
      setFeedbackFlash(trial.isTarget ? "hit" : "false_alarm");
    }
  }, [phase, responded, trialIndex, levelIndex]);

  // ── Handle transition Ready button ─────────────────────
  const handleTransitionReady = () => {
    showTrial(0, levelIndex);
  };

  // ── Compute payload ────────────────────────────────────
  const computePayload = useCallback((qData?: any) => {
    const duration = Date.now() - startTimeRef.current;
    const all = resultsRef.current;

    // Per-level breakdowns
    const perLevel: Record<string, any> = {};
    for (const n of levels) {
      const lvlResults = all.filter(r => r.nLevel === n);
      if (lvlResults.length > 0) {
        perLevel[`level_${n}_back`] = computeLevelStats(lvlResults);
      }
    }

    // Overall stats
    const overall = computeLevelStats(all);
    const totalCorrect = overall.hits + overall.correct_rejections;
    const score = all.length > 0 ? Math.round(totalCorrect / all.length * 100) : 0;

    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        levels: levels.join(","),
        ...perLevel,
        overall_d_prime: overall.d_prime,
        overall_criterion: overall.criterion,
        overall_hit_rate: overall.hit_rate,
        overall_false_alarm_rate: overall.false_alarm_rate,
        overall_hit_rt_mean: overall.hit_rt_mean,
        total_trials: all.length,
        total_correct: totalCorrect,
        total_errors: all.length - totalCorrect,
        // Settings echo
        trials_per_level: trialsPerLevel,
        stimulus_duration_ms: stimulusDurationMs,
        isi_ms: isiMs,
        target_proportion: targetProportion,
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
  }, [levels, trialsPerLevel, stimulusDurationMs, isiMs, targetProportion]);

  // ── Send results ───────────────────────────────────────
  const sendResult = useCallback((isNav: boolean, isBack: boolean, qData?: any) => {
    const payload = computePayload(qData);
    if (showForward) payload.forward = !isBack;
    if (isNav && isBack) payload.clickBack = true;
    if (!isNav) payload.done = true;
    parent.postMessage(JSON.stringify(payload), "*");
  }, [computePayload, showForward]);

  // ── Navigation ─────────────────────────────────────────
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
    showTrial(0, 0);
  };

  const handleQuestionnaireSubmit = (response: any) => {
    setPhase("done");
    routesRef.current.push({ type: "manual_exit", value: false });
    sendResult(false, false, response);
  };

  // Pick instruction text based on first level
  const firstLevel = levels[0] ?? 1;
  const instructionKey = firstLevel === 1 ? "INSTRUCTIONS_1BACK"
    : firstLevel === 2 ? "INSTRUCTIONS_2BACK" : "INSTRUCTIONS_3BACK";

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <nav className="back-link" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </nav>
        )}
        {i18n.t("NBACK")}
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
      {(phase === "stimulus" || phase === "isi") && (
        <div className="status-bar">
          <div className="level-badge level-highlight">
            {i18n.t("LEVEL", { n: currentNLevel })}
          </div>
          <div className="level-badge">
            {i18n.t("TRIAL_COUNT", {
              current: Math.min(trialIndex + 1, currentSequence.length),
              total: currentSequence.length,
            })}
          </div>
        </div>
      )}

      {/* Instruction Modal */}
      {phase === "instructions" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={i18n.t(instructionKey)}
          language={language}
        />
      )}

      {/* ── Transition between levels ──────────────────── */}
      {phase === "transition" && (
        <div className="nback-area">
          <div className="nback-transition-card">
            <div className="nback-transition-level">
              {i18n.t("LEVEL", { n: currentNLevel })}
            </div>
            <div className="nback-transition-text">
              {i18n.t("TRANSITION_TEXT", { n: currentNLevel })}
            </div>
            <button className="nback-transition-btn" onClick={handleTransitionReady}>
              {i18n.t("READY")}
            </button>
          </div>
        </div>
      )}

      {/* ── Game Area ──────────────────────────────────── */}
      {(phase === "stimulus" || phase === "isi") && (
        <div className="nback-area">
          {/* Letter display */}
          <div className="nback-display-zone">
            {phase === "stimulus" && (
              <div className={`nback-letter ${feedbackFlash}`}>
                {currentLetter}
              </div>
            )}
            {phase === "isi" && feedbackFlash && (
              <div className={`nback-letter ${feedbackFlash}`}>
                {trialLetterRef.current}
              </div>
            )}
          </div>

          {/* Match button */}
          <div className="nback-buttons">
            <button
              className={`nback-btn-match ${feedbackFlash === "hit" ? "hit" : ""} ${feedbackFlash === "false_alarm" ? "false-alarm" : ""} ${responded && !feedbackFlash ? "pressed" : ""}`}
              onClick={handleMatch}
              disabled={responded}
            >
              {i18n.t("MATCH")}
            </button>
          </div>
        </div>
      )}

      {/* ── Game Over ──────────────────────────────────── */}
      {phase === "gameOver" && (
        <div className="nback-area">
          <div className="nback-overlay-text">{i18n.t("GAME_OVER")}</div>
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
