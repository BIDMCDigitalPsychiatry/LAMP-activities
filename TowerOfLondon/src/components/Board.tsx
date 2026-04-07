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
import "./TowerOfLondon.css";

// ── Types ──────────────────────────────────────────────
type BallColor = "R" | "G" | "B";
type PegState = BallColor[];
type BoardState = [PegState, PegState, PegState];
type Phase = "instruction" | "playing" | "feedback" | "questionnaire" | "done";

interface Problem {
  start: BoardState;
  goal: BoardState;
  minMoves: number;
}

interface ProblemResult {
  item: string;
  type: string;
  problem_number: number;
  minimum_moves: number;
  actual_moves: number;
  excess_moves: number;
  solved: boolean;
  planning_time_ms: number;
  execution_time_ms: number;
  duration: number;
  move_sequence: string[];
  level: number;
}

interface Props {
  data: any;
}

// ── Constants ──────────────────────────────────────────
const PEG_CAPS: [number, number, number] = [3, 2, 1];
const BALL_COLORS: Record<BallColor, string> = { R: "red", G: "green", B: "blue" };

// ── BFS Solver ─────────────────────────────────────────
function encodeState(state: BoardState): string {
  return state.map((p) => p.join("")).join("|");
}

function cloneState(state: BoardState): BoardState {
  return [state[0].slice(), state[1].slice(), state[2].slice()] as BoardState;
}

function getMinMoves(start: BoardState, goal: BoardState): number {
  const goalKey = encodeState(goal);
  const startKey = encodeState(start);
  if (startKey === goalKey) return 0;

  const visited = new Set<string>([startKey]);
  const queue: [BoardState, number][] = [[start, 0]];

  while (queue.length > 0) {
    const [state, moves] = queue.shift()!;
    for (let from = 0; from < 3; from++) {
      if (state[from].length === 0) continue;
      for (let to = 0; to < 3; to++) {
        if (from === to) continue;
        if (state[to].length >= PEG_CAPS[to]) continue;
        const ns = cloneState(state);
        const ball = ns[from].pop()!;
        ns[to].push(ball);
        const key = encodeState(ns);
        if (key === goalKey) return moves + 1;
        if (!visited.has(key)) {
          visited.add(key);
          queue.push([ns, moves + 1]);
        }
      }
    }
  }
  return -1;
}

// ── Problem Pool ───────────────────────────────────────
// Each problem has a distinct start and goal. BFS computes minimum moves at init.
// Varied starting positions prevent memorization and increase planning demands.
type ProblemDef = { start: BoardState; goal: BoardState };

const PROBLEM_POOL: ProblemDef[] = [
  // ── From standard start [RGB, _, _] ──
  { start: [["R","G","B"],[],[]], goal: [["R","G"],["B"],[]] },
  { start: [["R","G","B"],[],[]], goal: [["R","G"],[],["B"]] },
  { start: [["R","G","B"],[],[]], goal: [["R"],["G"],["B"]] },
  { start: [["R","G","B"],[],[]], goal: [["R"],["B","G"],[]] },
  { start: [["R","G","B"],[],[]], goal: [[],["R","G"],["B"]] },
  { start: [["R","G","B"],[],[]], goal: [["B"],["R","G"],[]] },
  { start: [["R","G","B"],[],[]], goal: [["G"],["R"],["B"]] },
  { start: [["R","G","B"],[],[]], goal: [["B","R"],["G"],[]] },
  { start: [["R","G","B"],[],[]], goal: [["G","R"],["B"],[]] },
  { start: [["R","G","B"],[],[]], goal: [["B","G"],["R"],[]] },
  { start: [["R","G","B"],[],[]], goal: [["G","B"],["R"],[]] },
  { start: [["R","G","B"],[],[]], goal: [[],["B","R"],["G"]] },

  // ── From split start [R, BG, _] ──
  { start: [["R"],["B","G"],[]], goal: [["R","G","B"],[],[]] },
  { start: [["R"],["B","G"],[]], goal: [["G"],["B"],["R"]] },
  { start: [["R"],["B","G"],[]], goal: [["B","R"],["G"],[]] },
  { start: [["R"],["B","G"],[]], goal: [[],["R","G"],["B"]] },
  { start: [["R"],["B","G"],[]], goal: [["G","B"],["R"],[]] },
  { start: [["R"],["B","G"],[]], goal: [["G","R"],[],["B"]] },

  // ── From split start [RG, B, _] ──
  { start: [["R","G"],["B"],[]], goal: [["R"],["G"],["B"]] },
  { start: [["R","G"],["B"],[]], goal: [["B","G"],["R"],[]] },
  { start: [["R","G"],["B"],[]], goal: [[],["R","B"],["G"]] },
  { start: [["R","G"],["B"],[]], goal: [["B","R"],["G"],[]] },

  // ── From scattered start [R, G, B] ──
  { start: [["R"],["G"],["B"]], goal: [["R","G","B"],[],[]] },
  { start: [["R"],["G"],["B"]], goal: [["B","R"],["G"],[]] },
  { start: [["R"],["G"],["B"]], goal: [["G","R"],["B"],[]] },
  { start: [["R"],["G"],["B"]], goal: [[],["R","B"],["G"]] },
  { start: [["R"],["G"],["B"]], goal: [["G","B"],["R"],[]] },

  // ── From right-heavy start [_, RG, B] ──
  { start: [[],["R","G"],["B"]], goal: [["R","G","B"],[],[]] },
  { start: [[],["R","G"],["B"]], goal: [["B","G"],["R"],[]] },
  { start: [[],["R","G"],["B"]], goal: [["G"],["B"],["R"]] },
  { start: [[],["R","G"],["B"]], goal: [["R","B"],["G"],[]] },

  // ── From mid-heavy start [B, RG, _] ──
  { start: [["B"],["R","G"],[]], goal: [["R","G","B"],[],[]] },
  { start: [["B"],["R","G"],[]], goal: [["G"],["R"],["B"]] },
  { start: [["B"],["R","G"],[]], goal: [["R","B"],["G"],[]] },
  { start: [["B"],["R","G"],[]], goal: [["G","R"],[],["B"]] },
];

// Difficulty ranges: which minimum-move counts to include
const DIFFICULTY_RANGES: Record<string, [number, number]> = {
  easy:   [1, 3],
  medium: [2, 5],
  hard:   [4, 7],
};

function generateProblems(maxProblems: number, difficulty: string): Problem[] {
  const [minRange, maxRange] = DIFFICULTY_RANGES[difficulty] ?? DIFFICULTY_RANGES.medium;

  const allProblems = PROBLEM_POOL.map((def) => ({
    start: cloneState(def.start),
    goal: cloneState(def.goal),
    minMoves: getMinMoves(def.start, def.goal),
  }))
    .filter((p) => p.minMoves >= minRange && p.minMoves <= maxRange)
    .sort((a, b) => a.minMoves - b.minMoves);

  return allProblems.slice(0, maxProblems);
}

// ── Peg Display Component ──────────────────────────────
function PegDisplay({
  pegs,
  isGoal,
  selectedPeg,
  onPegClick,
}: {
  pegs: BoardState;
  isGoal: boolean;
  selectedPeg: number | null;
  onPegClick?: (pegIdx: number) => void;
}) {
  return (
    <div className={`tol-board ${isGoal ? "goal" : "player"}`}>
      <div className="tol-base" />
      {pegs.map((peg, pegIdx) => (
        <div
          key={pegIdx}
          className={`tol-peg${!isGoal ? " interactive" : ""}`}
          onClick={!isGoal && onPegClick ? () => onPegClick(pegIdx) : undefined}
        >
          <div className={`tol-rod cap${PEG_CAPS[pegIdx]}`} />
          {peg.map((ball, ballIdx) => {
            const isTop = ballIdx === peg.length - 1;
            const isSelected = !isGoal && selectedPeg === pegIdx && isTop;
            return (
              <div
                key={ballIdx}
                className={`tol-ball ${BALL_COLORS[ball]}${
                  isSelected ? " selected" : ""
                }${isTop && !isGoal ? " top-ball" : ""}`}
              >
                {ball}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── Board ──────────────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const maxProblems = Math.max(1, Math.min(20, settings.max_problems ?? 12));
  const timeLimitMs =
    Math.max(10, Math.min(300, settings.time_limit_per_problem_s ?? 60)) * 1000;
  const difficulty: string = settings.difficulty ?? "medium";

  const language =
    data.activity?.spec === "lamp.tower_of_london"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const problems = useMemo(
    () => generateProblems(maxProblems, difficulty),
    [maxProblems, difficulty]
  );

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [problemIdx, setProblemIdx] = useState(0);
  const [pegs, setPegs] = useState<BoardState>([[], [], []]);
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [moveSequence, setMoveSequence] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [feedbackType, setFeedbackType] = useState<"solved" | "timeout">("solved");

  // ── Refs ─────────────────────────────────────────────
  const problemStartRef = useRef(0);
  const firstMoveRef = useRef(0);
  const resultsRef = useRef<ProblemResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackMovesRef = useRef(0);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Start a problem ──────────────────────────────────
  const startProblem = useCallback(
    (idx: number) => {
      if (idx >= problems.length) {
        setPhase("questionnaire");
        return;
      }
      const prob = problems[idx];
      setPegs(cloneState(prob.start));
      setSelectedPeg(null);
      setMoves(0);
      setMoveSequence([]);
      setElapsed(0);
      setProblemIdx(idx);
      problemStartRef.current = Date.now();
      firstMoveRef.current = 0;
      setPhase("playing");
    },
    [problems]
  );

  // ── Timer ────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const el = now - problemStartRef.current;
        setElapsed(el);
        if (el >= timeLimitMs) {
          // Timeout
          if (timerRef.current) clearInterval(timerRef.current);
          const prob = problems[problemIdx];
          const planTime = firstMoveRef.current > 0
            ? firstMoveRef.current - problemStartRef.current
            : timeLimitMs;
          const execTime = firstMoveRef.current > 0
            ? now - firstMoveRef.current
            : 0;

          resultsRef.current.push({
            item: `problem_${problemIdx + 1}`,
            type: "timeout",
            problem_number: problemIdx + 1,
            minimum_moves: prob.minMoves,
            actual_moves: moves,
            excess_moves: Math.max(0, moves - prob.minMoves),
            solved: false,
            planning_time_ms: planTime,
            execution_time_ms: execTime,
            duration: timeLimitMs,
            move_sequence: moveSequence,
            level: prob.minMoves,
          });

          feedbackMovesRef.current = moves;
          setFeedbackType("timeout");
          setPhase("feedback");
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, problemIdx, timeLimitMs, problems, moves, moveSequence]);

  // ── Feedback auto-advance ────────────────────────────
  useEffect(() => {
    if (phase === "feedback") {
      const delay = feedbackType === "solved" ? 1200 : 1500;
      const t = setTimeout(() => startProblem(problemIdx + 1), delay);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, feedbackType, problemIdx, startProblem]);

  // ── Check solution ───────────────────────────────────
  const checkSolution = useCallback(
    (currentPegs: BoardState) => {
      const prob = problems[problemIdx];
      if (encodeState(currentPegs) === encodeState(prob.goal)) {
        if (timerRef.current) clearInterval(timerRef.current);
        const now = Date.now();
        const totalTime = now - problemStartRef.current;
        const planTime = firstMoveRef.current > 0
          ? firstMoveRef.current - problemStartRef.current
          : totalTime;
        const execTime = firstMoveRef.current > 0
          ? now - firstMoveRef.current
          : 0;

        resultsRef.current.push({
          item: `problem_${problemIdx + 1}`,
          type: "solved",
          problem_number: problemIdx + 1,
          minimum_moves: prob.minMoves,
          actual_moves: moves + 1, // current move just happened
          excess_moves: Math.max(0, moves + 1 - prob.minMoves),
          solved: true,
          planning_time_ms: planTime,
          execution_time_ms: execTime,
          duration: totalTime,
          move_sequence: [...moveSequence],
          level: prob.minMoves,
        });

        feedbackMovesRef.current = moves + 1;
        setFeedbackType("solved");
        setPhase("feedback");
      }
    },
    [problems, problemIdx, moves, moveSequence]
  );

  // ── Handle peg click ────────────────────────────────
  const handlePegClick = useCallback(
    (pegIdx: number) => {
      if (phase !== "playing") return;

      if (selectedPeg === null) {
        // Select top ball of this peg
        if (pegs[pegIdx].length > 0) {
          setSelectedPeg(pegIdx);
        }
      } else if (selectedPeg === pegIdx) {
        // Deselect
        setSelectedPeg(null);
      } else {
        // Try to move
        if (pegs[pegIdx].length >= PEG_CAPS[pegIdx]) {
          // Peg full — deselect
          setSelectedPeg(null);
          return;
        }
        // Execute move
        const newPegs = cloneState(pegs);
        const ball = newPegs[selectedPeg].pop()!;
        newPegs[pegIdx].push(ball);

        if (firstMoveRef.current === 0) {
          firstMoveRef.current = Date.now();
        }

        const moveStr = `${selectedPeg}→${pegIdx}`;
        const newMoveSeq = [...moveSequence, moveStr];

        setPegs(newPegs);
        setSelectedPeg(null);
        setMoves((m) => m + 1);
        setMoveSequence(newMoveSeq);

        // Check after state update via direct comparison
        checkSolution(newPegs);
      }
    },
    [phase, selectedPeg, pegs, moveSequence, checkSolution]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const solved = results.filter((r) => r.solved);
      const solvedMinMoves = solved.filter(
        (r) => r.actual_moves === r.minimum_moves
      );

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

      const totalExcess = solved.reduce((s, r) => s + r.excess_moves, 0);

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          problem_number: 0,
          minimum_moves: 0,
          actual_moves: 0,
          excess_moves: 0,
          solved: false,
          planning_time_ms: 0,
          execution_time_ms: 0,
          duration: 0,
          move_sequence: [],
          level: 0,
        },
      ];

      const payload = {
        timestamp: new Date().getTime(),
        duration: results.reduce((s, r) => s + r.duration, 0),
        static_data: {
          // Legacy compat
          score: Math.round(
            (solvedMinMoves.length / Math.max(1, results.length)) * 100
          ),
          correct_answers: solvedMinMoves.length,
          total_questions: results.length,

          // Settings
          max_problems: maxProblems,
          time_limit_per_problem_s: timeLimitMs / 1000,
          difficulty,

          // Core metrics
          problems_attempted: results.length,
          problems_solved: solved.length,
          problems_solved_in_minimum: solvedMinMoves.length,
          total_excess_moves: totalExcess,
          mean_excess_moves:
            solved.length > 0
              ? Math.round((totalExcess / solved.length) * 100) / 100
              : 0,
          mean_planning_time_ms: meanPlanTime,
          mean_execution_time_ms: meanExecTime,
          problems_timed_out: results.filter((r) => r.type === "timeout")
            .length,

          // Questionnaire
          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(JSON.stringify(payload), "*");
    },
    [maxProblems, timeLimitMs]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startProblem(0);
  }, [startProblem]);

  // ── Render ───────────────────────────────────────────
  const currentProblem = problems[problemIdx];
  const remaining = Math.max(0, timeLimitMs - elapsed);
  const remainingSec = Math.ceil(remaining / 1000);
  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const isWarning = remaining < 10000;

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
        {i18n.t("TOWER_OF_LONDON")}
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
      {(phase === "playing" || phase === "feedback") && currentProblem && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("PROBLEM_COUNT", {
              current: problemIdx + 1,
              total: problems.length,
            })}
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
      {(phase === "playing" || phase === "feedback") && currentProblem && (
        <div className="tol-area">
          {/* Goal */}
          <div className="tol-goal-section">
            <div className="tol-section-label">{i18n.t("GOAL")}</div>
            <PegDisplay
              pegs={currentProblem.goal}
              isGoal={true}
              selectedPeg={null}
            />
          </div>

          {/* Player */}
          <div className="tol-player-section">
            <PegDisplay
              pegs={pegs}
              isGoal={false}
              selectedPeg={phase === "playing" ? selectedPeg : null}
              onPegClick={phase === "playing" ? handlePegClick : undefined}
            />

            {/* Move counter */}
            <div
              className={`tol-move-counter${
                moves > currentProblem.minMoves ? " excess" : ""
              }`}
            >
              {i18n.t("MOVES", {
                current: moves,
                min: currentProblem.minMoves,
              })}
            </div>

            {/* Feedback overlay */}
            {phase === "feedback" && (
              <div className="tol-feedback">
                <div className="tol-feedback-card">
                  <div className={`tol-feedback-text ${feedbackType}`}>
                    {feedbackType === "solved"
                      ? i18n.t("SOLVED")
                      : i18n.t("TIMEOUT")}
                  </div>
                  <div className="tol-feedback-moves">
                    {i18n.t("MOVES", {
                      current: feedbackMovesRef.current,
                      min: currentProblem.minMoves,
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="tol-area">
          <div className="tol-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="tol-area">
          <div className="tol-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
