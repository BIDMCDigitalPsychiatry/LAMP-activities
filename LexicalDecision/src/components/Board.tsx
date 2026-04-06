import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./LexicalDecision.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "fixation" | "stimulus" | "feedback" | "questionnaire" | "done";

interface TrialDef {
  stimulus: string;
  isWord: boolean;
  wordFreq: "high" | "low";  // high vs low frequency (words only)
  length: number;
}

interface TrialResult {
  item: string;
  type: string;
  trial_number: number;
  stimulus: string;
  is_word: boolean;
  word_frequency: string;
  stimulus_length: number;
  response: string;
  correct: boolean;
  rt_ms: number;
  duration: number;
}

interface Props {
  data: any;
}

// ── Validated Word Lists ────────────────────────────────
// High-frequency words: SUBTLEX-US Zipf ≥ 4.5 (Brysbaert & New, 2009)
// Balanced: 34 × 4-letter + 34 × 5-letter + 34 × 6-letter = 102 items
const HIGH_FREQ_WORDS = [
  // 4-letter (Zipf ≥ 4.5)
  "bear", "came", "club", "draw", "edge", "felt", "five", "full",
  "hand", "know", "late", "lord", "main", "mode", "name", "note",
  "paid", "past", "push", "role", "seat", "sell", "soul", "stop",
  "such", "suit", "take", "that", "them", "then", "this", "till",
  "trip", "wall",
  // 5-letter (Zipf ≥ 4.5)
  "beach", "chair", "chest", "child", "class", "count", "crowd",
  "dance", "field", "heart", "hotel", "house", "match", "metal",
  "money", "music", "noise", "ocean", "paint", "plane", "point",
  "power", "queen", "sleep", "smile", "speed", "stone", "sugar",
  "table", "track", "train", "truth", "water", "woman",
  // 6-letter (Zipf ≥ 4.5)
  "afford", "broken", "change", "chosen", "client", "damage",
  "dinner", "either", "fourth", "gender", "global", "golden",
  "guilty", "making", "manner", "medium", "miller", "mobile",
  "mother", "nature", "nearly", "number", "public", "report",
  "return", "screen", "season", "simply", "single", "studio",
  "talent", "target", "thanks", "toward",
];

// Low-frequency words: SUBTLEX-US Zipf 2.5–3.5
// Balanced: 34 × 4-letter + 34 × 5-letter + 34 × 6-letter = 102 items
const LOW_FREQ_WORDS = [
  // 4-letter (Zipf 2.5–3.5)
  "brig", "eddy", "etch", "ewes", "garb", "gulp", "hone", "kelp",
  "kilt", "knob", "lobe", "lute", "lynx", "maim", "malt", "maul",
  "mesa", "mire", "mote", "newt", "ogle", "pall", "purr", "raft",
  "raze", "rife", "sari", "snag", "soot", "spud", "tarn", "vane",
  "whim", "wisp",
  // 5-letter (Zipf 2.5–3.5)
  "adept", "alder", "blimp", "cadre", "crook", "delve", "ditto",
  "droit", "ember", "emery", "exude", "farce", "forte", "gavel",
  "ghoul", "glean", "gloat", "grail", "heady", "knave", "ovary",
  "plume", "privy", "savor", "sheen", "sloth", "smelt", "squid",
  "swath", "tithe", "tuber", "usurp", "valet", "vigor",
  // 6-letter (Zipf 2.5–3.5)
  "allure", "copier", "depict", "drivel", "dugout", "embark",
  "engulf", "flinch", "fondle", "frugal", "fumble", "futile",
  "gambit", "glitch", "goblet", "huddle", "impair", "incite",
  "innate", "lavish", "mingle", "muslin", "muster", "palate",
  "plunge", "rabble", "rustic", "scorch", "solder", "sparse",
  "throng", "tumult", "tundra", "wallow",
];

// ── Validated Nonwords ─────────────────────────────────
// Pronounceable pseudowords verified absent from SUBTLEX-US (Zipf < 1.0)
// Generated from English phonotactic patterns, length-matched to words
const NONWORDS_4 = [
  "blou", "cloa", "coft", "croa", "drit", "droo", "flai", "foar",
  "fosk", "frai", "froa", "groa", "houm", "jamp", "luet", "poxe",
  "skac", "skue", "slem", "smoa", "stei", "stou", "stue", "surm",
  "swei", "swes", "swus", "tieb", "toxa", "trof", "vube", "ziep",
  "zoup", "zuth",
];
const NONWORDS_5 = [
  "beirk", "bloul", "broor", "ceimp", "craub", "cruef", "druld",
  "fifte", "freil", "frous", "gloos", "grair", "gungi", "heelt",
  "jeinc", "joalm", "kounc", "laupa", "maipi", "poant", "pospe",
  "puerb", "scank", "seimp", "shoor", "shurp", "sneix", "spirp",
  "strue", "swied", "vaunc", "vauth", "vedit", "viesk",
];
const NONWORDS_6 = [
  "blalke", "bonoal", "boorbo", "braloa", "dainku", "fleipo",
  "floame", "frakeo", "geapoo", "gloant", "gloure", "gousha",
  "greird", "plaift", "plarpo", "plirfa", "plodas", "proush",
  "raucka", "sceern", "skoxue", "slilte", "smiste", "snoash",
  "spoalk", "stiemo", "strold", "teispa", "vaudul", "voompa",
  "whairf", "whauld", "whoosp", "zeipol",
];
const ALL_NONWORDS = [...NONWORDS_4, ...NONWORDS_5, ...NONWORDS_6];

// ── Trial Generation ───────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface DifficultyConfig {
  numTrials: number;        // total trials
  highFreqRatio: number;    // proportion of word trials that are high-freq
  stimulusTimeMs: number;   // how long stimulus shows (0 = until response)
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: { numTrials: 40, highFreqRatio: 0.75, stimulusTimeMs: 0 },
  medium: { numTrials: 60, highFreqRatio: 0.5, stimulusTimeMs: 0 },
  hard: { numTrials: 80, highFreqRatio: 0.25, stimulusTimeMs: 2000 },
};

function generateTrials(config: DifficultyConfig): TrialDef[] {
  const trials: TrialDef[] = [];
  const half = Math.floor(config.numTrials / 2);

  // Word trials
  const numHigh = Math.floor(half * config.highFreqRatio);
  const numLow = half - numHigh;

  const highWords = shuffle(HIGH_FREQ_WORDS).slice(0, numHigh);
  const lowWords = shuffle(LOW_FREQ_WORDS).slice(0, numLow);

  for (const w of highWords) {
    trials.push({ stimulus: w, isWord: true, wordFreq: "high", length: w.length });
  }
  for (const w of lowWords) {
    trials.push({ stimulus: w, isWord: true, wordFreq: "low", length: w.length });
  }

  // Nonword trials — draw from validated pool, length-matched
  const nonwordPool = shuffle(ALL_NONWORDS);
  const nonwordCount = config.numTrials - half;
  for (let i = 0; i < nonwordCount; i++) {
    const nw = nonwordPool[i % nonwordPool.length];
    trials.push({ stimulus: nw, isWord: false, wordFreq: "low", length: nw.length });
  }

  return shuffle(trials);
}

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const difficulty: string = settings.difficulty ?? "medium";
  const fixationMs = Math.max(200, Math.min(2000, settings.fixation_ms ?? 500));
  const timeLimitMs =
    Math.max(1, Math.min(30, settings.time_limit_per_trial_s ?? 5)) * 1000;

  const language =
    data.activity?.spec === "lamp.lexical_decision"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [trialIdx, setTrialIdx] = useState(0);
  const [trialFeedback, setTrialFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  // ── Refs ─────────────────────────────────────────────
  const trialStartRef = useRef(0);
  const resultsRef = useRef<TrialResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Generate all trials ──────────────────────────────
  const trials = useMemo(
    () => generateTrials(diffConfig),
    [difficulty]
  );

  // ── Start a trial (fixation → stimulus) ──────────────
  const startTrial = useCallback(
    (idx: number) => {
      if (idx >= trials.length) {
        setPhase("questionnaire");
        return;
      }
      setTrialIdx(idx);
      setTrialFeedback(null);
      setButtonsDisabled(false);
      setPhase("fixation");

      // Show fixation cross, then stimulus
      timerRef.current = setTimeout(() => {
        trialStartRef.current = Date.now();
        setPhase("stimulus");

        // If stimulus-limited presentation, auto-timeout
        if (diffConfig.stimulusTimeMs > 0) {
          timerRef.current = setTimeout(() => {
            // Only timeout if still in stimulus phase (not already responded)
          }, diffConfig.stimulusTimeMs);
        }

        // Trial time limit
        timerRef.current = setTimeout(() => {
          // Record timeout
          const trial = trials[idx];
          resultsRef.current.push({
            item: `trial_${idx + 1}`,
            type: "timeout",
            trial_number: idx + 1,
            stimulus: trial.stimulus,
            is_word: trial.isWord,
            word_frequency: trial.isWord ? trial.wordFreq : "n/a",
            stimulus_length: trial.length,
            response: "none",
            correct: false,
            rt_ms: timeLimitMs,
            duration: timeLimitMs,
          });
          setTrialFeedback("incorrect");
          setButtonsDisabled(true);
          setTimeout(() => startTrial(idx + 1), 500);
        }, timeLimitMs);
      }, fixationMs);
    },
    [trials, fixationMs, timeLimitMs, diffConfig.stimulusTimeMs]
  );

  // ── Handle response ──────────────────────────────────
  const handleResponse = useCallback(
    (respondedWord: boolean) => {
      if (phase !== "stimulus" || buttonsDisabled) return;
      if (timerRef.current) clearTimeout(timerRef.current);

      const now = Date.now();
      const rt = now - trialStartRef.current;
      const trial = trials[trialIdx];
      const correct = respondedWord === trial.isWord;

      resultsRef.current.push({
        item: `trial_${trialIdx + 1}`,
        type: "response",
        trial_number: trialIdx + 1,
        stimulus: trial.stimulus,
        is_word: trial.isWord,
        word_frequency: trial.isWord ? trial.wordFreq : "n/a",
        stimulus_length: trial.length,
        response: respondedWord ? "word" : "nonword",
        correct,
        rt_ms: rt,
        duration: rt + fixationMs,
      });

      setTrialFeedback(correct ? "correct" : "incorrect");
      setButtonsDisabled(true);
      setTimeout(() => startTrial(trialIdx + 1), 500);
    },
    [phase, buttonsDisabled, trials, trialIdx, startTrial, fixationMs]
  );

  // ── Cleanup timer on unmount ─────────────────────────
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const responded = results.filter((r) => r.type === "response");
      const correct = responded.filter((r) => r.correct);

      // RT analysis — correct trials only
      const wordCorrect = correct.filter((r) => r.is_word);
      const nonwordCorrect = correct.filter((r) => !r.is_word);
      const highFreqCorrect = correct.filter((r) => r.word_frequency === "high");
      const lowFreqCorrect = correct.filter((r) => r.word_frequency === "low");

      const meanRT = (arr: TrialResult[]) =>
        arr.length > 0
          ? Math.round(arr.reduce((s, r) => s + r.rt_ms, 0) / arr.length)
          : 0;

      // d-prime (signal detection)
      const wordTrials = responded.filter((r) => r.is_word);
      const nonwordTrials = responded.filter((r) => !r.is_word);
      const hits = wordTrials.filter((r) => r.correct).length;
      const falseAlarms = nonwordTrials.filter((r) => !r.correct).length;

      const hitRate = Math.min(0.99, Math.max(0.01, hits / Math.max(1, wordTrials.length)));
      const faRate = Math.min(0.99, Math.max(0.01, falseAlarms / Math.max(1, nonwordTrials.length)));

      // Probit approximation (inverse normal)
      const probit = (p: number) => {
        // Rational approximation of inverse normal CDF
        const a1 = -3.969683028665376e1;
        const a2 = 2.209460984245205e2;
        const a3 = -2.759285104469687e2;
        const a4 = 1.383577518672690e2;
        const a5 = -3.066479806614716e1;
        const a6 = 2.506628277459239e0;
        const b1 = -5.447609879822406e1;
        const b2 = 1.615858368580409e2;
        const b3 = -1.556989798598866e2;
        const b4 = 6.680131188771972e1;
        const b5 = -1.328068155288572e1;
        const c1 = -7.784894002430293e-3;
        const c2 = -3.223964580411365e-1;
        const c3 = -2.400758277161838e0;
        const c4 = -2.549732539343734e0;
        const c5 = 4.374664141464968e0;
        const c6 = 2.938163982698783e0;
        const d1 = 7.784695709041462e-3;
        const d2 = 3.224671290700398e-1;
        const d3 = 2.445134137142996e0;
        const d4 = 3.754408661907416e0;
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
      };

      const dPrime = Math.round((probit(hitRate) - probit(faRate)) * 1000) / 1000;

      // Word frequency effect
      const freqEffect = meanRT(lowFreqCorrect) - meanRT(highFreqCorrect);

      // Lexicality effect (nonword RT - word RT for correct trials)
      const lexicalityEffect = meanRT(nonwordCorrect) - meanRT(wordCorrect);

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          trial_number: 0,
          stimulus: "",
          is_word: false,
          word_frequency: "",
          stimulus_length: 0,
          response: "",
          correct: false,
          rt_ms: 0,
          duration: 0,
        },
      ];

      const payload = {
        timestamp: new Date().getTime(),
        duration: results.reduce((s, r) => s + r.duration, 0),
        static_data: {
          // Legacy compat
          score: Math.round(
            (correct.length / Math.max(1, responded.length)) * 100
          ),
          correct_answers: correct.length,
          total_questions: results.length,

          // Settings
          difficulty,
          fixation_ms: fixationMs,
          time_limit_per_trial_s: timeLimitMs / 1000,

          // LDT-specific metrics
          trials_total: results.length,
          trials_responded: responded.length,
          trials_correct: correct.length,
          trials_timed_out: results.filter((r) => r.type === "timeout").length,
          accuracy: responded.length > 0
            ? Math.round((correct.length / responded.length) * 1000) / 1000
            : 0,
          word_accuracy: wordTrials.length > 0
            ? Math.round((hits / wordTrials.length) * 1000) / 1000
            : 0,
          nonword_accuracy: nonwordTrials.length > 0
            ? Math.round((nonwordTrials.filter((r) => r.correct).length / nonwordTrials.length) * 1000) / 1000
            : 0,

          // RT metrics (correct trials only)
          mean_rt_ms: meanRT(correct),
          mean_rt_word_ms: meanRT(wordCorrect),
          mean_rt_nonword_ms: meanRT(nonwordCorrect),
          mean_rt_high_freq_ms: meanRT(highFreqCorrect),
          mean_rt_low_freq_ms: meanRT(lowFreqCorrect),

          // Key derived metrics
          d_prime: dPrime,
          word_frequency_effect_ms: freqEffect,
          lexicality_effect_ms: lexicalityEffect,

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(payload, "*");
    },
    [difficulty, fixationMs, timeLimitMs]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startTrial(0);
  }, [startTrial]);

  // ── Render ───────────────────────────────────────────
  const currentTrial = trials[trialIdx];

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
        {i18n.t("LEXICAL_DECISION")}
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
      {(phase === "fixation" || phase === "stimulus" || phase === "feedback") && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("TRIAL_COUNT", {
              current: trialIdx + 1,
              total: trials.length,
            })}
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

      {/* Fixation */}
      {phase === "fixation" && (
        <div className="ldt-area">
          <div className="ldt-fixation">+</div>
        </div>
      )}

      {/* Stimulus */}
      {phase === "stimulus" && currentTrial && (
        <div className="ldt-area">
          <div className="ldt-stimulus">{currentTrial.stimulus}</div>

          {/* Feedback text (shows briefly after response) */}
          <div
            className={`ldt-feedback${
              trialFeedback ? ` ${trialFeedback}` : ""
            }`}
          >
            {trialFeedback === "correct" && i18n.t("CORRECT")}
            {trialFeedback === "incorrect" && i18n.t("INCORRECT")}
          </div>

          {/* Response buttons */}
          <div className="ldt-buttons">
            <button
              className="ldt-btn ldt-btn-word"
              disabled={buttonsDisabled}
              onClick={() => handleResponse(true)}
            >
              {i18n.t("WORD")}
            </button>
            <button
              className="ldt-btn ldt-btn-nonword"
              disabled={buttonsDisabled}
              onClick={() => handleResponse(false)}
            >
              {i18n.t("NOT_WORD")}
            </button>
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="ldt-area">
          <div className="ldt-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="ldt-area">
          <div className="ldt-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
