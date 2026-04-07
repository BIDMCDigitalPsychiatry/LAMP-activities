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
import { TARGET_WORDS, ALL_VALID } from "../words";
import "./LetterLogic.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "roundEnd" | "questionnaire" | "done";
type LetterStatus = "correct" | "present" | "absent" | "empty";

interface RoundResult {
  item: string;
  type: string;
  round_number: number;
  target_word: string;
  solved: boolean;
  guesses_used: number;
  max_guesses: number;
  guesses: string[];
  rt_ms: number;
  duration: number;
}

interface Props {
  data: any;
}

// ── Difficulty Config ──────────────────────────────────
interface DifficultyConfig {
  numRounds: number;
  maxGuesses: number;
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: { numRounds: 3, maxGuesses: 8 },
  medium: { numRounds: 5, maxGuesses: 6 },
  hard: { numRounds: 7, maxGuesses: 5 },
};

const WORD_LENGTH = 5;

// ── Keyboard layout ────────────────────────────────────
const KB_ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["ENTER", "z", "x", "c", "v", "b", "n", "m", "DELETE"],
];

// ── Evaluation logic ───────────────────────────────────
function evaluateGuess(guess: string, target: string): LetterStatus[] {
  const result: LetterStatus[] = Array(WORD_LENGTH).fill("absent");
  const targetArr = target.split("");
  const used = Array(WORD_LENGTH).fill(false);

  // First pass: mark correct (green)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === targetArr[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  // Second pass: mark present (yellow)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!used[j] && guess[i] === targetArr[j]) {
        result[i] = "present";
        used[j] = true;
        break;
      }
    }
  }

  return result;
}

// ── Shuffle ────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const difficulty: string = settings.difficulty ?? "medium";

  const language =
    data.activity?.spec === "lamp.letter_logic"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [roundIdx, setRoundIdx] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<LetterStatus[][]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [roundSolved, setRoundSolved] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState<Record<string, LetterStatus>>({});

  // ── Refs ─────────────────────────────────────────────
  const roundStartRef = useRef(0);
  const resultsRef = useRef<RoundResult[]>([]);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Generate target words for all rounds ─────────────
  const targetWords = useMemo(
    () => shuffle(TARGET_WORDS).slice(0, diffConfig.numRounds),
    [difficulty]
  );

  // ── Toast helper ─────────────────────────────────────
  const showToast = useCallback((msg: string, ms = 1500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), ms);
  }, []);

  // ── Start a round ────────────────────────────────────
  const startRound = useCallback(
    (idx: number) => {
      if (idx >= targetWords.length) {
        setPhase("questionnaire");
        return;
      }
      setRoundIdx(idx);
      setGuesses([]);
      setEvaluations([]);
      setCurrentGuess("");
      setRoundSolved(false);
      setKeyboardStatus({});
      setToast(null);
      roundStartRef.current = Date.now();
      setPhase("playing");
    },
    [targetWords]
  );

  // ── Update keyboard status after a guess ─────────────
  const updateKeyboard = useCallback(
    (guess: string, eval_: LetterStatus[], prev: Record<string, LetterStatus>) => {
      const next = { ...prev };
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const status = eval_[i];
        const existing = next[letter];
        // Priority: correct > present > absent
        if (
          !existing ||
          status === "correct" ||
          (status === "present" && existing !== "correct")
        ) {
          next[letter] = status;
        }
      }
      return next;
    },
    []
  );

  // ── Submit guess ─────────────────────────────────────
  const submitGuess = useCallback(() => {
    if (phase !== "playing") return;

    if (currentGuess.length < WORD_LENGTH) {
      showToast(i18n.t("NOT_ENOUGH_LETTERS"));
      return;
    }

    if (!ALL_VALID.has(currentGuess)) {
      showToast(i18n.t("NOT_IN_WORD_LIST"));
      return;
    }

    const target = targetWords[roundIdx];
    const eval_ = evaluateGuess(currentGuess, target);
    const newGuesses = [...guesses, currentGuess];
    const newEvals = [...evaluations, eval_];
    const newKb = updateKeyboard(currentGuess, eval_, keyboardStatus);

    setGuesses(newGuesses);
    setEvaluations(newEvals);
    setCurrentGuess("");
    setKeyboardStatus(newKb);

    const solved = currentGuess === target;
    const outOfGuesses = newGuesses.length >= diffConfig.maxGuesses;

    if (solved || outOfGuesses) {
      const rt = Date.now() - roundStartRef.current;

      resultsRef.current.push({
        item: `round_${roundIdx + 1}`,
        type: solved ? "solved" : "failed",
        round_number: roundIdx + 1,
        target_word: target,
        solved,
        guesses_used: newGuesses.length,
        max_guesses: diffConfig.maxGuesses,
        guesses: newGuesses,
        rt_ms: rt,
        duration: rt,
      });

      setRoundSolved(solved);
      setPhase("roundEnd");

      if (!solved) {
        showToast(i18n.t("CORRECT_WORD", { word: target.toUpperCase() }), 3000);
      }

      // Advance after delay
      setTimeout(() => startRound(roundIdx + 1), solved ? 2000 : 3000);
    }
  }, [
    phase, currentGuess, targetWords, roundIdx, guesses, evaluations,
    keyboardStatus, diffConfig, showToast, startRound, updateKeyboard,
  ]);

  // ── Key press handler ────────────────────────────────
  const handleKey = useCallback(
    (key: string) => {
      if (phase !== "playing") return;

      if (key === "ENTER") {
        submitGuess();
        return;
      }

      if (key === "DELETE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key.length === 1 && /^[a-z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [phase, currentGuess, submitGuess]
  );

  // ── Physical keyboard support ────────────────────────
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Enter") {
        e.preventDefault();
        handleKey("ENTER");
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handleKey("DELETE");
      } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key.toLowerCase());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const solved = results.filter((r) => r.solved);
      const failed = results.filter((r) => !r.solved);

      const meanGuesses =
        solved.length > 0
          ? Math.round(
              (solved.reduce((s, r) => s + r.guesses_used, 0) / solved.length) * 100
            ) / 100
          : 0;

      const meanSolveTime =
        solved.length > 0
          ? Math.round(solved.reduce((s, r) => s + r.rt_ms, 0) / solved.length)
          : 0;

      // Guess efficiency: (max_guesses - guesses_used + 1) / max_guesses for solved rounds
      const efficiencies = solved.map(
        (r) => (r.max_guesses - r.guesses_used + 1) / r.max_guesses
      );
      const meanEfficiency =
        efficiencies.length > 0
          ? Math.round(
              (efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length) * 1000
            ) / 1000
          : 0;

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          round_number: 0,
          target_word: "",
          solved: false,
          guesses_used: 0,
          max_guesses: 0,
          guesses: [],
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
            (solved.length / Math.max(1, results.length)) * 100
          ),
          correct_answers: solved.length,
          total_questions: results.length,

          // Settings
          difficulty,
          max_guesses: diffConfig.maxGuesses,

          // Game metrics
          rounds_total: results.length,
          rounds_solved: solved.length,
          rounds_failed: failed.length,
          mean_guesses_to_solve: meanGuesses,
          mean_solve_time_ms: meanSolveTime,
          mean_guess_efficiency: meanEfficiency,

          // Distribution: how many rounds solved in 1, 2, 3... guesses
          guess_distribution: Array.from(
            { length: diffConfig.maxGuesses },
            (_, i) => solved.filter((r) => r.guesses_used === i + 1).length
          ),

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(JSON.stringify(payload), "*");
    },
    [difficulty, diffConfig]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startRound(0);
  }, [startRound]);

  // ── Render helpers ───────────────────────────────────
  const renderGrid = () => {
    const rows = [];
    for (let r = 0; r < diffConfig.maxGuesses; r++) {
      const cells = [];
      for (let c = 0; c < WORD_LENGTH; c++) {
        let letter = "";
        let status: LetterStatus = "empty";
        let extraClass = "";

        if (r < guesses.length) {
          // Submitted guess
          letter = guesses[r][c];
          status = evaluations[r][c];
        } else if (r === guesses.length) {
          // Current input row
          letter = currentGuess[c] || "";
          if (letter) extraClass = " filled";
        }

        cells.push(
          <div
            key={c}
            className={`ll-cell ${status}${extraClass}`}
          >
            {letter}
          </div>
        );
      }
      rows.push(
        <div key={r} className="ll-row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  const renderKeyboard = () => {
    return KB_ROWS.map((row, rowIdx) => (
      <div key={rowIdx} className="ll-kb-row">
        {row.map((key) => {
          const isWide = key === "ENTER" || key === "DELETE";
          const status = keyboardStatus[key] || "";
          const label =
            key === "ENTER"
              ? i18n.t("ENTER")
              : key === "DELETE"
              ? "⌫"
              : key;
          return (
            <button
              key={key}
              className={`ll-key${isWide ? " wide" : ""} ${status}`}
              onClick={() => handleKey(key)}
            >
              {label}
            </button>
          );
        })}
      </div>
    ));
  };

  // ── Render ───────────────────────────────────────────
  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        <span
          className="back-link"
          onClick={() => parent.postMessage(JSON.stringify({ timestamp: new Date().getTime(), clickBack: true }), "*")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        {i18n.t("LETTER_LOGIC")}
        <span className="home-link-forward">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
        <span
          className="home-link"
          onClick={() => parent.postMessage(JSON.stringify({ timestamp: new Date().getTime(), clickBack: true }), "*")}
        >
          <FontAwesomeIcon icon={faHome} />
        </span>
      </div>

      {/* Status bar */}
      {(phase === "playing" || phase === "roundEnd") && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("ROUND_COUNT", {
              current: roundIdx + 1,
              total: targetWords.length,
            })}
          </span>
          <span className="level-badge">
            {i18n.t("GUESS_COUNT", {
              current: guesses.length + (phase === "playing" ? 1 : 0),
              max: diffConfig.maxGuesses,
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

      {/* Playing / Round End */}
      {(phase === "playing" || phase === "roundEnd") && (
        <div className="ll-area" style={{ position: "relative" }}>
          {/* Toast */}
          {toast && <div className="ll-toast">{toast}</div>}

          {/* Result message */}
          {phase === "roundEnd" && (
            <div className={`ll-result ${roundSolved ? "success" : "fail"}`}>
              {roundSolved
                ? i18n.t("SOLVED_MSG", { count: guesses.length })
                : i18n.t("CORRECT_WORD", {
                    word: targetWords[roundIdx].toUpperCase(),
                  })}
            </div>
          )}

          {/* Grid */}
          <div className="ll-grid">{renderGrid()}</div>

          {/* Keyboard */}
          <div className="ll-keyboard">{renderKeyboard()}</div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="ll-area">
          <div className="ll-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="ll-area">
          <div className="ll-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
