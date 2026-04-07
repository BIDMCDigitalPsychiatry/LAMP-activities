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
import "./WaterSort.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "feedback" | "questionnaire" | "done";
type Tube = number[]; // array of color indices, bottom [0] to top [len-1]
type PuzzleState = Tube[];

interface Puzzle {
  start: PuzzleState;
  minMoves: number;
  numColors: number;
}

interface PuzzleResult {
  item: string;
  type: string;
  puzzle_number: number;
  num_colors: number;
  minimum_pours: number;
  actual_pours: number;
  excess_pours: number;
  solved: boolean;
  planning_time_ms: number;
  execution_time_ms: number;
  duration: number;
  pour_sequence: string[];
  level: number;
}

interface Props {
  data: any;
}

// ── Constants ──────────────────────────────────────────
const TUBE_CAPACITY = 4;

const COLOR_PALETTE = [
  { name: "red",    css: "#E53935" },
  { name: "green",  css: "#43A047" },
  { name: "blue",   css: "#359FFE" },
  { name: "yellow", css: "#FDD835" },
  { name: "purple", css: "#8E24AA" },
  { name: "orange", css: "#FB8C00" },
  { name: "pink",   css: "#EC407A" },
  { name: "teal",   css: "#00897B" },
];

// ── Utility ────────────────────────────────────────────
function clonePuzzle(state: PuzzleState): PuzzleState {
  return state.map((t) => t.slice());
}

// ── BFS Solver ─────────────────────────────────────────
// Encodes state canonically (tubes sorted) to reduce state space via symmetry.
function encodeState(state: PuzzleState): string {
  return state
    .map((t) => t.join(","))
    .sort()
    .join("|");
}

function isSolved(state: PuzzleState): boolean {
  return state.every(
    (t) => t.length === 0 || (t.length === TUBE_CAPACITY && t.every((c) => c === t[0]))
  );
}

// Count how many consecutive same-color blocks are on top of a tube
function topGroupSize(tube: Tube): number {
  if (tube.length === 0) return 0;
  const topColor = tube[tube.length - 1];
  let count = 0;
  for (let i = tube.length - 1; i >= 0; i--) {
    if (tube[i] === topColor) count++;
    else break;
  }
  return count;
}

// Get all valid pours from a state. A pour moves the top contiguous same-color
// group (or as many as fit) from source to dest.
function getValidPours(state: PuzzleState): [number, number][] {
  const pours: [number, number][] = [];
  for (let from = 0; from < state.length; from++) {
    if (state[from].length === 0) continue;
    const fromTop = state[from][state[from].length - 1];
    const groupSize = topGroupSize(state[from]);

    // Skip if source tube is already a complete single-color tube
    if (state[from].length === TUBE_CAPACITY && groupSize === TUBE_CAPACITY) continue;

    for (let to = 0; to < state.length; to++) {
      if (from === to) continue;
      if (state[to].length >= TUBE_CAPACITY) continue;

      if (state[to].length === 0) {
        // Don't pour entire tube into empty (pointless if tube is single-color)
        if (groupSize === state[from].length) continue;
        pours.push([from, to]);
      } else if (state[to][state[to].length - 1] === fromTop) {
        pours.push([from, to]);
      }
    }
  }
  return pours;
}

// Apply a pour: move as many matching top blocks as fit
function applyPour(state: PuzzleState, from: number, to: number): PuzzleState {
  const ns = clonePuzzle(state);
  const topColor = ns[from][ns[from].length - 1];
  const group = topGroupSize(ns[from]);
  const space = TUBE_CAPACITY - ns[to].length;
  const count = Math.min(group, space);
  for (let i = 0; i < count; i++) {
    ns[to].push(ns[from].pop()!);
  }
  return ns;
}

function bfsSolve(start: PuzzleState, maxDepth: number = 30): number {
  if (isSolved(start)) return 0;

  const startKey = encodeState(start);
  const visited = new Set<string>([startKey]);
  let frontier: PuzzleState[] = [start];
  let depth = 0;

  while (frontier.length > 0 && depth < maxDepth) {
    depth++;
    const nextFrontier: PuzzleState[] = [];
    for (const state of frontier) {
      for (const [from, to] of getValidPours(state)) {
        const ns = applyPour(state, from, to);
        if (isSolved(ns)) return depth;
        const key = encodeState(ns);
        if (!visited.has(key)) {
          visited.add(key);
          nextFrontier.push(ns);
        }
      }
    }
    frontier = nextFrontier;
  }
  return -1;
}

// ── Puzzle Generation ──────────────────────────────────
// Scramble by moving individual blocks (not groups) for better mixing,
// then verify solvability and min-moves via BFS on the group-pour rules.
function generatePuzzle(
  numColors: number,
  numEmpty: number,
  minMovesRange: [number, number],
  attempts: number = 300
): Puzzle | null {
  const totalTubes = numColors + numEmpty;

  for (let attempt = 0; attempt < attempts; attempt++) {
    // Build a flat array of all blocks, then shuffle (Fisher-Yates)
    const blocks: number[] = [];
    for (let c = 0; c < numColors; c++) {
      for (let j = 0; j < TUBE_CAPACITY; j++) {
        blocks.push(c);
      }
    }
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }

    // Distribute blocks across the color tubes (not the empties)
    const state: PuzzleState = [];
    for (let t = 0; t < numColors; t++) {
      state.push(blocks.slice(t * TUBE_CAPACITY, (t + 1) * TUBE_CAPACITY));
    }
    for (let e = 0; e < numEmpty; e++) {
      state.push([]);
    }

    // Skip if already solved
    if (isSolved(state)) continue;

    // BFS to find minimum pours (with group-pour rules)
    const minMoves = bfsSolve(state, minMovesRange[1] + 5);
    if (minMoves >= minMovesRange[0] && minMoves <= minMovesRange[1]) {
      return { start: state, minMoves, numColors };
    }
  }
  return null;
}

function generatePuzzleSet(
  count: number,
  numColors: number,
  numEmpty: number,
  minMovesRange: [number, number]
): Puzzle[] {
  const puzzles: Puzzle[] = [];
  const maxAttempts = count * 3;
  let totalAttempts = 0;

  while (puzzles.length < count && totalAttempts < maxAttempts) {
    totalAttempts++;
    const puzzle = generatePuzzle(numColors, numEmpty, minMovesRange, 300);
    if (puzzle) {
      // Deduplicate by checking if a puzzle with same canonical state already exists
      const key = encodeState(puzzle.start);
      if (!puzzles.some((p) => encodeState(p.start) === key)) {
        puzzles.push(puzzle);
      }
    }
  }

  // Sort by difficulty
  return puzzles.sort((a, b) => a.minMoves - b.minMoves);
}

// ── Difficulty Config ──────────────────────────────────
interface DifficultyConfig {
  numColors: number;
  numEmpty: number;
  minMovesRange: [number, number];
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy:   { numColors: 3, numEmpty: 2, minMovesRange: [3, 12] },
  medium: { numColors: 4, numEmpty: 2, minMovesRange: [4, 20] },
  hard:   { numColors: 5, numEmpty: 2, minMovesRange: [5, 30] },
};

// ── Tube Display Component ─────────────────────────────
function TubeDisplay({
  tube,
  tubeIdx,
  selected,
  onClick,
}: {
  tube: Tube;
  tubeIdx: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`ws-tube-wrapper${selected ? " selected" : ""}`}
      onClick={onClick}
    >
      <div className="ws-tube-body">
        {/* Render slots bottom to top */}
        {Array.from({ length: TUBE_CAPACITY }).map((_, slotIdx) => {
          const colorIdx = tube[slotIdx];
          const hasBlock = slotIdx < tube.length;
          return (
            <div
              key={slotIdx}
              className={`ws-slot${hasBlock ? " filled" : ""}`}
              style={
                hasBlock
                  ? { background: COLOR_PALETTE[colorIdx].css }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Board ──────────────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const maxPuzzles = Math.max(1, Math.min(20, settings.max_puzzles ?? 8));
  const timeLimitMs =
    Math.max(10, Math.min(300, settings.time_limit_per_puzzle_s ?? 90)) * 1000;
  const difficulty: string = settings.difficulty ?? "medium";

  const language =
    data.activity?.spec === "lamp.water_sort"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  const puzzles = useMemo(
    () =>
      generatePuzzleSet(
        maxPuzzles,
        diffConfig.numColors,
        diffConfig.numEmpty,
        diffConfig.minMovesRange
      ),
    [maxPuzzles, difficulty] // diffConfig is derived from difficulty
  );

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [tubes, setTubes] = useState<PuzzleState>([]);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);
  const [pours, setPours] = useState(0);
  const [pourSequence, setPourSequence] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [feedbackType, setFeedbackType] = useState<"solved" | "timeout">("solved");

  // ── Refs ─────────────────────────────────────────────
  const puzzleStartRef = useRef(0);
  const firstPourRef = useRef(0);
  const resultsRef = useRef<PuzzleResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackPoursRef = useRef(0);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Start a puzzle ───────────────────────────────────
  const startPuzzle = useCallback(
    (idx: number) => {
      if (idx >= puzzles.length) {
        setPhase("questionnaire");
        return;
      }
      const puzzle = puzzles[idx];
      setTubes(clonePuzzle(puzzle.start));
      setSelectedTube(null);
      setPours(0);
      setPourSequence([]);
      setElapsed(0);
      setPuzzleIdx(idx);
      puzzleStartRef.current = Date.now();
      firstPourRef.current = 0;
      setPhase("playing");
    },
    [puzzles]
  );

  // ── Timer ────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const el = now - puzzleStartRef.current;
        setElapsed(el);
        if (el >= timeLimitMs) {
          if (timerRef.current) clearInterval(timerRef.current);
          const puzzle = puzzles[puzzleIdx];
          const planTime = firstPourRef.current > 0
            ? firstPourRef.current - puzzleStartRef.current
            : timeLimitMs;
          const execTime = firstPourRef.current > 0
            ? now - firstPourRef.current
            : 0;

          resultsRef.current.push({
            item: `puzzle_${puzzleIdx + 1}`,
            type: "timeout",
            puzzle_number: puzzleIdx + 1,
            num_colors: puzzle.numColors,
            minimum_pours: puzzle.minMoves,
            actual_pours: pours,
            excess_pours: Math.max(0, pours - puzzle.minMoves),
            solved: false,
            planning_time_ms: planTime,
            execution_time_ms: execTime,
            duration: timeLimitMs,
            pour_sequence: pourSequence,
            level: puzzle.numColors,
          });

          feedbackPoursRef.current = pours;
          setFeedbackType("timeout");
          setPhase("feedback");
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, puzzleIdx, timeLimitMs, puzzles, pours, pourSequence]);

  // ── Feedback auto-advance ────────────────────────────
  useEffect(() => {
    if (phase === "feedback") {
      const delay = feedbackType === "solved" ? 1200 : 1500;
      const t = setTimeout(() => startPuzzle(puzzleIdx + 1), delay);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, feedbackType, puzzleIdx, startPuzzle]);

  // ── Check solution ───────────────────────────────────
  const checkSolution = useCallback(
    (currentTubes: PuzzleState, currentPours: number, currentSeq: string[]) => {
      if (isSolved(currentTubes)) {
        if (timerRef.current) clearInterval(timerRef.current);
        const now = Date.now();
        const totalTime = now - puzzleStartRef.current;
        const planTime = firstPourRef.current > 0
          ? firstPourRef.current - puzzleStartRef.current
          : totalTime;
        const execTime = firstPourRef.current > 0
          ? now - firstPourRef.current
          : 0;
        const puzzle = puzzles[puzzleIdx];

        resultsRef.current.push({
          item: `puzzle_${puzzleIdx + 1}`,
          type: "solved",
          puzzle_number: puzzleIdx + 1,
          num_colors: puzzle.numColors,
          minimum_pours: puzzle.minMoves,
          actual_pours: currentPours,
          excess_pours: Math.max(0, currentPours - puzzle.minMoves),
          solved: true,
          planning_time_ms: planTime,
          execution_time_ms: execTime,
          duration: totalTime,
          pour_sequence: currentSeq,
          level: puzzle.numColors,
        });

        feedbackPoursRef.current = currentPours;
        setFeedbackType("solved");
        setPhase("feedback");
      }
    },
    [puzzles, puzzleIdx]
  );

  // ── Handle tube click ────────────────────────────────
  const handleTubeClick = useCallback(
    (tubeIdx: number) => {
      if (phase !== "playing") return;

      if (selectedTube === null) {
        // Select: only if tube has blocks
        if (tubes[tubeIdx].length > 0) {
          // Don't select a completed tube
          const t = tubes[tubeIdx];
          if (t.length === TUBE_CAPACITY && t.every((c) => c === t[0])) return;
          setSelectedTube(tubeIdx);
        }
      } else if (selectedTube === tubeIdx) {
        // Deselect
        setSelectedTube(null);
      } else {
        // Try to pour
        const src = tubes[selectedTube];
        const dst = tubes[tubeIdx];
        const srcTop = src[src.length - 1];

        // Validate: dest must be empty or top matches, and not full
        if (dst.length < TUBE_CAPACITY && (dst.length === 0 || dst[dst.length - 1] === srcTop)) {
          // Execute pour
          const newTubes = clonePuzzle(tubes);
          const topColor = newTubes[selectedTube][newTubes[selectedTube].length - 1];
          const group = topGroupSize(newTubes[selectedTube]);
          const space = TUBE_CAPACITY - newTubes[tubeIdx].length;
          const count = Math.min(group, space);
          for (let i = 0; i < count; i++) {
            newTubes[tubeIdx].push(newTubes[selectedTube].pop()!);
          }

          if (firstPourRef.current === 0) {
            firstPourRef.current = Date.now();
          }

          const pourStr = `${selectedTube}→${tubeIdx}`;
          const newSeq = [...pourSequence, pourStr];
          const newPourCount = pours + 1;

          setTubes(newTubes);
          setSelectedTube(null);
          setPours(newPourCount);
          setPourSequence(newSeq);

          checkSolution(newTubes, newPourCount, newSeq);
        } else {
          // Invalid pour — deselect
          setSelectedTube(null);
        }
      }
    },
    [phase, selectedTube, tubes, pourSequence, pours, checkSolution]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const solved = results.filter((r) => r.solved);
      const solvedMinPours = solved.filter(
        (r) => r.actual_pours === r.minimum_pours
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

      const totalExcess = solved.reduce((s, r) => s + r.excess_pours, 0);

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          puzzle_number: 0,
          num_colors: 0,
          minimum_pours: 0,
          actual_pours: 0,
          excess_pours: 0,
          solved: false,
          planning_time_ms: 0,
          execution_time_ms: 0,
          duration: 0,
          pour_sequence: [],
          level: 0,
        },
      ];

      const payload = {
        timestamp: new Date().getTime(),
        duration: results.reduce((s, r) => s + r.duration, 0),
        static_data: {
          // Legacy compat
          score: Math.round(
            (solvedMinPours.length / Math.max(1, results.length)) * 100
          ),
          correct_answers: solvedMinPours.length,
          total_questions: results.length,

          // Settings
          max_puzzles: maxPuzzles,
          time_limit_per_puzzle_s: timeLimitMs / 1000,
          difficulty,

          // Core metrics
          puzzles_attempted: results.length,
          puzzles_solved: solved.length,
          puzzles_solved_in_minimum: solvedMinPours.length,
          total_excess_pours: totalExcess,
          mean_excess_pours:
            solved.length > 0
              ? Math.round((totalExcess / solved.length) * 100) / 100
              : 0,
          mean_planning_time_ms: meanPlanTime,
          mean_execution_time_ms: meanExecTime,
          puzzles_timed_out: results.filter((r) => r.type === "timeout").length,

          // Questionnaire
          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(payload, "*");
    },
    [maxPuzzles, timeLimitMs, difficulty]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startPuzzle(0);
  }, [startPuzzle]);

  // ── Render ───────────────────────────────────────────
  const currentPuzzle = puzzles[puzzleIdx];
  const remaining = Math.max(0, timeLimitMs - elapsed);
  const remainingSec = Math.ceil(remaining / 1000);
  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const isWarning = remaining < 10000;

  // Arrange tubes in rows for wider layouts
  const tubeCount = tubes.length;
  const topRow = tubes.slice(0, Math.ceil(tubeCount / 2));
  const bottomRow = tubes.slice(Math.ceil(tubeCount / 2));
  const topRowOffset = 0;
  const bottomRowOffset = Math.ceil(tubeCount / 2);

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
        {i18n.t("WATER_SORT")}
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
      {(phase === "playing" || phase === "feedback") && currentPuzzle && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("PUZZLE_COUNT", {
              current: puzzleIdx + 1,
              total: puzzles.length,
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
      {(phase === "playing" || phase === "feedback") && currentPuzzle && (
        <div className="ws-area">
          <div className="ws-tubes-container">
            <div className="ws-tubes-row">
              {topRow.map((tube, i) => (
                <TubeDisplay
                  key={topRowOffset + i}
                  tube={tube}
                  tubeIdx={topRowOffset + i}
                  selected={phase === "playing" && selectedTube === topRowOffset + i}
                  onClick={() => phase === "playing" && handleTubeClick(topRowOffset + i)}
                />
              ))}
            </div>
            {bottomRow.length > 0 && (
              <div className="ws-tubes-row">
                {bottomRow.map((tube, i) => (
                  <TubeDisplay
                    key={bottomRowOffset + i}
                    tube={tube}
                    tubeIdx={bottomRowOffset + i}
                    selected={phase === "playing" && selectedTube === bottomRowOffset + i}
                    onClick={() => phase === "playing" && handleTubeClick(bottomRowOffset + i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pour counter */}
          <div
            className={`ws-pour-counter${
              pours > currentPuzzle.minMoves ? " excess" : ""
            }`}
          >
            {i18n.t("POURS", {
              current: pours,
              min: currentPuzzle.minMoves,
            })}
          </div>

          {/* Feedback overlay */}
          {phase === "feedback" && (
            <div className="ws-feedback">
              <div className="ws-feedback-card">
                <div className={`ws-feedback-text ${feedbackType}`}>
                  {feedbackType === "solved"
                    ? i18n.t("SOLVED")
                    : i18n.t("TIMEOUT")}
                </div>
                <div className="ws-feedback-pours">
                  {i18n.t("POURS", {
                    current: feedbackPoursRef.current,
                    min: currentPuzzle.minMoves,
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="ws-area">
          <div className="ws-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="ws-area">
          <div className="ws-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
