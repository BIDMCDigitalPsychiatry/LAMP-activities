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
import "./MemoryMatch.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "feedback" | "questionnaire" | "done";

interface CardDef {
  id: number;
  symbol: string;
  pairId: number;
}

interface RoundResult {
  item: string;
  type: string;
  round_number: number;
  grid_size: string;
  total_pairs: number;
  pairs_found: number;
  moves: number;
  errors: number;
  perfect: boolean;
  planning_time_ms: number;
  execution_time_ms: number;
  duration: number;
}

interface Props {
  data: any;
}

// ── Symbols ────────────────────────────────────────────
// Visually distinct emoji that render well across platforms
const SYMBOL_POOL = [
  "🍎", "🌟", "🎈", "🐶", "🌺", "🎵", "🦋", "🍕",
  "⚽", "🌈", "🎯", "🐱", "🍒", "🔔", "🌙", "🎨",
  "🐸", "🍩", "🚀", "💎", "🎪", "🐠", "🍄", "🎸",
  "🦄", "🌻", "🎭", "🐧", "🍓", "🔑",
];

// ── Grid Layouts ───────────────────────────────────────
interface DifficultyConfig {
  pairs: number;
  cols: number;
  rows: number;
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy:   { pairs: 6,  cols: 3, rows: 4 },
  medium: { pairs: 10, cols: 4, rows: 5 },
  hard:   { pairs: 15, cols: 5, rows: 6 },
};

// ── Shuffle ────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Generate a round ───────────────────────────────────
function generateRound(config: DifficultyConfig): CardDef[] {
  const symbols = shuffle(SYMBOL_POOL).slice(0, config.pairs);
  const cards: CardDef[] = [];
  symbols.forEach((sym, i) => {
    cards.push({ id: i * 2,     symbol: sym, pairId: i });
    cards.push({ id: i * 2 + 1, symbol: sym, pairId: i });
  });
  return shuffle(cards);
}

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const maxRounds = Math.max(1, Math.min(20, settings.max_rounds ?? 4));
  const timeLimitMs =
    Math.max(10, Math.min(600, settings.time_limit_per_round_s ?? 120)) * 1000;
  const difficulty: string = settings.difficulty ?? "medium";

  const language =
    data.activity?.spec === "lamp.memory_match"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [roundIdx, setRoundIdx] = useState(0);
  const [cards, setCards] = useState<CardDef[]>([]);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [errors, setErrors] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedbackType, setFeedbackType] = useState<"solved" | "timeout">("solved");
  const [matchFlash, setMatchFlash] = useState<Set<number>>(new Set());

  // ── Refs ─────────────────────────────────────────────
  const roundStartRef = useRef(0);
  const firstActionRef = useRef(0);
  const resultsRef = useRef<RoundResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lockRef = useRef(false); // prevent clicks during mismatch reveal
  const totalRounds = useRef(maxRounds);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Pre-generate all rounds ──────────────────────────
  const rounds = useMemo(
    () => Array.from({ length: maxRounds }, () => generateRound(diffConfig)),
    [maxRounds, difficulty] // diffConfig derived from difficulty
  );

  // ── Start a round ────────────────────────────────────
  const startRound = useCallback(
    (idx: number) => {
      if (idx >= rounds.length) {
        setPhase("questionnaire");
        return;
      }
      setCards(rounds[idx]);
      setFlipped(new Set());
      setMatched(new Set());
      setSelected([]);
      setMoves(0);
      setErrors(0);
      setElapsed(0);
      setMatchFlash(new Set());
      setRoundIdx(idx);
      roundStartRef.current = Date.now();
      firstActionRef.current = 0;
      lockRef.current = false;
      setPhase("playing");
    },
    [rounds]
  );

  // ── Timer ────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const el = now - roundStartRef.current;
        setElapsed(el);
        if (el >= timeLimitMs) {
          if (timerRef.current) clearInterval(timerRef.current);

          const pairsFound = matched.size / 2;
          const planTime = firstActionRef.current > 0
            ? firstActionRef.current - roundStartRef.current
            : timeLimitMs;
          const execTime = firstActionRef.current > 0
            ? now - firstActionRef.current
            : 0;

          resultsRef.current.push({
            item: `round_${roundIdx + 1}`,
            type: "timeout",
            round_number: roundIdx + 1,
            grid_size: `${diffConfig.cols}x${diffConfig.rows}`,
            total_pairs: diffConfig.pairs,
            pairs_found: pairsFound,
            moves,
            errors,
            perfect: false,
            planning_time_ms: planTime,
            execution_time_ms: execTime,
            duration: timeLimitMs,
          });

          setFeedbackType("timeout");
          setPhase("feedback");
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, roundIdx, timeLimitMs, diffConfig, matched, moves, errors]);

  // ── Feedback auto-advance ────────────────────────────
  useEffect(() => {
    if (phase === "feedback") {
      const delay = feedbackType === "solved" ? 1200 : 1500;
      const t = setTimeout(() => startRound(roundIdx + 1), delay);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, feedbackType, roundIdx, startRound]);

  // ── Handle card click ────────────────────────────────
  const handleCardClick = useCallback(
    (cardId: number) => {
      if (phase !== "playing" || lockRef.current) return;
      if (flipped.has(cardId) || matched.has(cardId)) return;

      if (firstActionRef.current === 0) {
        firstActionRef.current = Date.now();
      }

      const newFlipped = new Set(flipped);
      newFlipped.add(cardId);
      setFlipped(newFlipped);

      const newSelected = [...selected, cardId];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        const newMoves = moves + 1;
        setMoves(newMoves);

        const card1 = cards.find((c) => c.id === newSelected[0])!;
        const card2 = cards.find((c) => c.id === newSelected[1])!;

        if (card1.pairId === card2.pairId) {
          // Match found
          const newMatched = new Set(matched);
          newMatched.add(card1.id);
          newMatched.add(card2.id);
          setMatched(newMatched);
          setSelected([]);

          // Flash animation
          setMatchFlash(new Set([card1.id, card2.id]));
          setTimeout(() => setMatchFlash(new Set()), 400);

          // Check if round complete
          if (newMatched.size === cards.length) {
            if (timerRef.current) clearInterval(timerRef.current);
            const now = Date.now();
            const totalTime = now - roundStartRef.current;
            const planTime = firstActionRef.current > 0
              ? firstActionRef.current - roundStartRef.current
              : totalTime;
            const execTime = firstActionRef.current > 0
              ? now - firstActionRef.current
              : 0;

            resultsRef.current.push({
              item: `round_${roundIdx + 1}`,
              type: "solved",
              round_number: roundIdx + 1,
              grid_size: `${diffConfig.cols}x${diffConfig.rows}`,
              total_pairs: diffConfig.pairs,
              pairs_found: diffConfig.pairs,
              moves: newMoves,
              errors,
              perfect: errors === 0,
              planning_time_ms: planTime,
              execution_time_ms: execTime,
              duration: totalTime,
            });

            setFeedbackType("solved");
            setPhase("feedback");
          }
        } else {
          // Mismatch — show both for a moment, then flip back
          setErrors((e) => e + 1);
          lockRef.current = true;
          setTimeout(() => {
            const resetFlipped = new Set(flipped);
            resetFlipped.delete(card1.id);
            resetFlipped.delete(card2.id);
            setFlipped(resetFlipped);
            setSelected([]);
            lockRef.current = false;
          }, 700);
        }
      }
    },
    [phase, cards, flipped, matched, selected, moves, errors, roundIdx, diffConfig]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const solved = results.filter((r) => r.type === "solved");
      const perfect = solved.filter((r) => r.perfect);

      const planTimes = results
        .filter((r) => r.planning_time_ms > 0)
        .map((r) => r.planning_time_ms);
      const meanPlanTime =
        planTimes.length > 0
          ? Math.round(planTimes.reduce((a, b) => a + b, 0) / planTimes.length)
          : 0;

      const execTimes = solved
        .filter((r) => r.execution_time_ms > 0)
        .map((r) => r.execution_time_ms);
      const meanExecTime =
        execTimes.length > 0
          ? Math.round(execTimes.reduce((a, b) => a + b, 0) / execTimes.length)
          : 0;

      const totalErrors = results.reduce((s, r) => s + r.errors, 0);
      const totalMoves = results.reduce((s, r) => s + r.moves, 0);

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          round_number: 0,
          grid_size: "",
          total_pairs: 0,
          pairs_found: 0,
          moves: 0,
          errors: 0,
          perfect: false,
          planning_time_ms: 0,
          execution_time_ms: 0,
          duration: 0,
        },
      ];

      const payload = {
        timestamp: new Date().getTime(),
        duration: results.reduce((s, r) => s + r.duration, 0),
        static_data: {
          score: Math.round(
            (perfect.length / Math.max(1, results.length)) * 100
          ),
          correct_answers: perfect.length,
          total_questions: results.length,

          max_rounds: totalRounds.current,
          time_limit_per_round_s: timeLimitMs / 1000,
          difficulty,

          rounds_attempted: results.length,
          rounds_solved: solved.length,
          rounds_perfect: perfect.length,
          total_moves: totalMoves,
          total_errors: totalErrors,
          mean_errors:
            results.length > 0
              ? Math.round((totalErrors / results.length) * 100) / 100
              : 0,
          mean_moves:
            results.length > 0
              ? Math.round((totalMoves / results.length) * 100) / 100
              : 0,
          mean_planning_time_ms: meanPlanTime,
          mean_execution_time_ms: meanExecTime,
          rounds_timed_out: results.filter((r) => r.type === "timeout").length,

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(payload, "*");
    },
    [timeLimitMs, difficulty]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startRound(0);
  }, [startRound]);

  // ── Render ───────────────────────────────────────────
  const remaining = Math.max(0, timeLimitMs - elapsed);
  const remainingSec = Math.ceil(remaining / 1000);
  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const isWarning = remaining < 15000;

  const pairsFound = matched.size / 2;

  // Dynamic card sizing
  const { cols, rows, pairs } = diffConfig;
  const gridGap = 8;
  const availW = window.innerWidth - 12;
  const availH = window.innerHeight - 140; // header + status + padding
  const maxCardW = Math.floor((availW - (cols - 1) * gridGap) / cols);
  const maxCardH = Math.floor((availH - (rows - 1) * gridGap) / rows);
  const idealCard = pairs <= 6 ? 100 : pairs <= 10 ? 82 : 68;
  const cardSize = Math.max(44, Math.min(idealCard, maxCardW, maxCardH));

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
        {i18n.t("MEMORY_MATCH")}
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
      {(phase === "playing" || phase === "feedback") && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("ROUND_COUNT", {
              current: roundIdx + 1,
              total: rounds.length,
            })}
          </span>
          <span className="level-badge">
            {i18n.t("MATCHES", { found: pairsFound, total: pairs })}
          </span>
          <span className="level-badge">
            {i18n.t("MOVES", { count: moves })}
          </span>
          <span className={`timer-badge${isWarning ? " warning" : ""}`}>
            {timeStr}
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

      {/* Playing / Feedback */}
      {(phase === "playing" || phase === "feedback") && (
        <div className="mm-area">
          <div
            className="mm-grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${cardSize}px)`,
              gridTemplateRows: `repeat(${rows}, ${cardSize}px)`,
            }}
          >
            {cards.map((card) => {
              const isFlipped = flipped.has(card.id) || matched.has(card.id);
              const isMatched = matched.has(card.id);
              const isFlashing = matchFlash.has(card.id);
              return (
                <div
                  key={card.id}
                  className={`mm-card${isFlipped ? " flipped" : ""}${
                    isMatched ? " matched" : ""
                  }${isFlashing ? " match-flash" : ""}`}
                  style={{ width: cardSize, height: cardSize }}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="mm-card-face mm-card-back" />
                  <div className="mm-card-face mm-card-front">
                    {card.symbol}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback overlay */}
          {phase === "feedback" && (
            <div className="mm-feedback">
              <div className="mm-feedback-card">
                <div className={`mm-feedback-text ${feedbackType}`}>
                  {feedbackType === "solved"
                    ? i18n.t("MATCHED")
                    : i18n.t("TIMEOUT")}
                </div>
                <div className="mm-feedback-detail">
                  {i18n.t("MOVES", { count: moves })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="mm-area">
          <div className="mm-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="mm-area">
          <div className="mm-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
