import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHome,
  faArrowRight,
  faSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../i18n";
import "./Nonogram.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "feedback" | "questionnaire" | "done";
type CellKnown = 0 | 1 | 2; // 0=unknown, 1=filled, 2=empty
type UserCell = "empty" | "filled" | "marked";
type Mode = "fill" | "mark";

interface PuzzleDef {
  solution: boolean[][];
  rowClues: number[][];
  colClues: number[][];
  rows: number;
  cols: number;
  filledCount: number;
}

interface PuzzleResult {
  item: string;
  type: string;
  puzzle_number: number;
  grid_size: string;
  total_filled: number;
  cells_filled: number;
  cells_marked: number;
  errors: number;
  accuracy: number;
  solved: boolean;
  planning_time_ms: number;
  execution_time_ms: number;
  duration: number;
  level: number;
}

interface Props {
  data: any;
}

// ── Nonogram Solver ────────────────────────────────────
// Enumerates all valid line arrangements consistent with clues and known cells,
// then determines cells that are the same across all valid arrangements.

function enumerateValid(
  length: number,
  clues: number[],
  known: CellKnown[]
): number[][] {
  if (clues.length === 1 && clues[0] === 0) {
    for (let i = 0; i < length; i++) {
      if (known[i] === 1) return [];
    }
    return [Array(length).fill(0)];
  }

  const results: number[][] = [];

  function place(clueIdx: number, pos: number, line: number[]) {
    if (clueIdx === clues.length) {
      for (let i = pos; i < length; i++) {
        if (known[i] === 1) return;
      }
      const out = line.slice();
      for (let i = pos; i < length; i++) out[i] = 0;
      results.push(out);
      return;
    }

    const blockLen = clues[clueIdx];
    let remainingLen = 0;
    for (let k = clueIdx + 1; k < clues.length; k++) remainingLen += clues[k] + 1;
    const maxPos = length - blockLen - remainingLen;

    for (let p = pos; p <= maxPos; p++) {
      // Gap [pos, p): no known-filled allowed
      let gapOk = true;
      for (let i = pos; i < p; i++) {
        if (known[i] === 1) { gapOk = false; break; }
      }
      if (!gapOk) break;

      // Block [p, p+blockLen): no known-empty allowed
      let blockOk = true;
      for (let i = p; i < p + blockLen; i++) {
        if (known[i] === 2) { blockOk = false; break; }
      }
      if (!blockOk) continue;

      // Separator at p+blockLen: must not be known-filled
      const sep = p + blockLen;
      if (sep < length && known[sep] === 1) continue;

      const next = line.slice();
      for (let i = pos; i < p; i++) next[i] = 0;
      for (let i = p; i < p + blockLen; i++) next[i] = 1;
      if (sep < length) next[sep] = 0;

      place(clueIdx + 1, sep + 1, next);
    }
  }

  place(0, 0, Array(length).fill(0));
  return results;
}

function solveLine(length: number, clues: number[], known: CellKnown[]): CellKnown[] {
  const valid = enumerateValid(length, clues, known);
  if (valid.length === 0) return known.slice();

  const result = known.slice();
  for (let i = 0; i < length; i++) {
    if (result[i] !== 0) continue;
    const allFilled = valid.every((v) => v[i] === 1);
    const allEmpty = valid.every((v) => v[i] === 0);
    if (allFilled) result[i] = 1;
    else if (allEmpty) result[i] = 2;
  }
  return result;
}

function solveNonogram(
  rows: number,
  cols: number,
  rowClues: number[][],
  colClues: number[][]
): CellKnown[][] {
  const grid: CellKnown[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0) as CellKnown[]
  );

  let changed = true;
  let iterations = 0;
  while (changed && iterations < 100) {
    changed = false;
    iterations++;

    for (let r = 0; r < rows; r++) {
      const solved = solveLine(cols, rowClues[r], grid[r]);
      for (let c = 0; c < cols; c++) {
        if (solved[c] !== grid[r][c]) {
          grid[r][c] = solved[c];
          changed = true;
        }
      }
    }

    for (let c = 0; c < cols; c++) {
      const col = grid.map((row) => row[c]);
      const solved = solveLine(rows, colClues[c], col);
      for (let r = 0; r < rows; r++) {
        if (solved[r] !== grid[r][c]) {
          grid[r][c] = solved[r];
          changed = true;
        }
      }
    }
  }

  return grid;
}

// ── Puzzle Generation ──────────────────────────────────
function computeClues(line: boolean[]): number[] {
  const clues: number[] = [];
  let run = 0;
  for (const cell of line) {
    if (cell) {
      run++;
    } else {
      if (run > 0) clues.push(run);
      run = 0;
    }
  }
  if (run > 0) clues.push(run);
  return clues.length > 0 ? clues : [0];
}

function generatePuzzle(rows: number, cols: number, fillRate: number): PuzzleDef | null {
  // Random binary grid
  const solution: boolean[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < fillRate)
  );

  // Ensure at least one filled cell per row and column (avoid trivial [0] clues everywhere)
  for (let r = 0; r < rows; r++) {
    if (!solution[r].some(Boolean)) {
      solution[r][Math.floor(Math.random() * cols)] = true;
    }
  }
  for (let c = 0; c < cols; c++) {
    if (!solution.some((row) => row[c])) {
      solution[Math.floor(Math.random() * rows)][c] = true;
    }
  }

  const rowClues = solution.map((row) => computeClues(row));
  const colClues = Array.from({ length: cols }, (_, c) =>
    computeClues(solution.map((row) => row[c]))
  );

  // Verify solvable by line logic alone
  const solved = solveNonogram(rows, cols, rowClues, colClues);
  const fullyDetermined = solved.every((row) => row.every((c) => c !== 0));
  if (!fullyDetermined) return null;

  // Verify solution matches
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if ((solved[r][c] === 1) !== solution[r][c]) return null;
    }
  }

  const filledCount = solution.reduce(
    (s, row) => s + row.filter(Boolean).length,
    0
  );

  return { solution, rowClues, colClues, rows, cols, filledCount };
}

function generatePuzzleSet(count: number, rows: number, cols: number): PuzzleDef[] {
  const puzzles: PuzzleDef[] = [];
  let attempts = 0;
  const maxAttempts = count * 200;
  const fillRate = rows <= 5 ? 0.6 : rows <= 7 ? 0.55 : 0.5;

  while (puzzles.length < count && attempts < maxAttempts) {
    attempts++;
    const puzzle = generatePuzzle(rows, cols, fillRate);
    if (puzzle) puzzles.push(puzzle);
  }

  return puzzles;
}

// ── Difficulty Config ──────────────────────────────────
interface DifficultyConfig {
  rows: number;
  cols: number;
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: { rows: 5, cols: 5 },
  medium: { rows: 7, cols: 7 },
  hard: { rows: 10, cols: 10 },
};

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const maxPuzzles = Math.max(1, Math.min(20, settings.max_puzzles ?? 6));
  const timeLimitMs =
    Math.max(10, Math.min(600, settings.time_limit_per_puzzle_s ?? 120)) * 1000;
  const difficulty: string = settings.difficulty ?? "medium";

  const language =
    data.activity?.spec === "lamp.nonogram"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  const puzzles = useMemo(
    () => generatePuzzleSet(maxPuzzles, diffConfig.rows, diffConfig.cols),
    [maxPuzzles, difficulty] // diffConfig derived from difficulty
  );

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [userGrid, setUserGrid] = useState<UserCell[][]>([]);
  const [mode, setMode] = useState<Mode>("fill");
  const [errors, setErrors] = useState(0);
  const [cellsFilled, setCellsFilled] = useState(0);
  const [cellsMarked, setCellsMarked] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedbackType, setFeedbackType] = useState<"solved" | "timeout">("solved");
  const [flashCell, setFlashCell] = useState<string | null>(null);

  // ── Refs ─────────────────────────────────────────────
  const puzzleStartRef = useRef(0);
  const firstActionRef = useRef(0);
  const resultsRef = useRef<PuzzleResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const feedbackErrorsRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragVisitedRef = useRef<Set<string>>(new Set());

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
      setUserGrid(
        Array.from({ length: puzzle.rows }, () =>
          Array(puzzle.cols).fill("empty") as UserCell[]
        )
      );
      setMode("fill");
      setErrors(0);
      setCellsFilled(0);
      setCellsMarked(0);
      setElapsed(0);
      setPuzzleIdx(idx);
      setFlashCell(null);
      puzzleStartRef.current = Date.now();
      firstActionRef.current = 0;
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
          const planTime = firstActionRef.current > 0
            ? firstActionRef.current - puzzleStartRef.current
            : timeLimitMs;
          const execTime = firstActionRef.current > 0
            ? now - firstActionRef.current
            : 0;

          resultsRef.current.push({
            item: `puzzle_${puzzleIdx + 1}`,
            type: "timeout",
            puzzle_number: puzzleIdx + 1,
            grid_size: `${puzzle.rows}x${puzzle.cols}`,
            total_filled: puzzle.filledCount,
            cells_filled: cellsFilled,
            cells_marked: cellsMarked,
            errors,
            accuracy: puzzle.filledCount > 0 ? Math.round((cellsFilled / puzzle.filledCount) * 100) / 100 : 0,
            solved: false,
            planning_time_ms: planTime,
            execution_time_ms: execTime,
            duration: timeLimitMs,
            level: puzzle.rows,
          });

          feedbackErrorsRef.current = errors;
          setFeedbackType("timeout");
          setPhase("feedback");
        }
      }, 200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, puzzleIdx, timeLimitMs, puzzles, errors, cellsFilled, cellsMarked]);

  // ── Feedback auto-advance ────────────────────────────
  useEffect(() => {
    if (phase === "feedback") {
      const delay = feedbackType === "solved" ? 1200 : 1500;
      const t = setTimeout(() => startPuzzle(puzzleIdx + 1), delay);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [phase, feedbackType, puzzleIdx, startPuzzle]);

  // ── Auto-X: mark remaining empties when a row/col is fully filled ──
  const autoMarkCompleted = useCallback(
    (grid: UserCell[][], puzzle: PuzzleDef): { grid: UserCell[][]; marked: number } => {
      const g = grid.map((row) => row.slice());
      let newMarks = 0;

      // Check rows
      for (let r = 0; r < puzzle.rows; r++) {
        const filledNeeded = puzzle.solution[r].filter(Boolean).length;
        const filledHave = g[r].filter((c) => c === "filled").length;
        if (filledHave === filledNeeded) {
          for (let c = 0; c < puzzle.cols; c++) {
            if (g[r][c] === "empty") {
              g[r][c] = "marked";
              newMarks++;
            }
          }
        }
      }

      // Check columns
      for (let c = 0; c < puzzle.cols; c++) {
        const filledNeeded = puzzle.solution.filter((row) => row[c]).length;
        const filledHave = g.filter((row) => row[c] === "filled").length;
        if (filledHave === filledNeeded) {
          for (let r = 0; r < puzzle.rows; r++) {
            if (g[r][c] === "empty") {
              g[r][c] = "marked";
              newMarks++;
            }
          }
        }
      }

      return { grid: g, marked: newMarks };
    },
    []
  );

  // ── Apply action to a single cell ─────────────────────
  const applyCell = useCallback(
    (r: number, c: number) => {
      if (phase !== "playing") return;
      const puzzle = puzzles[puzzleIdx];
      const cell = userGrid[r][c];

      if (firstActionRef.current === 0) {
        firstActionRef.current = Date.now();
      }

      if (mode === "fill") {
        if (cell === "filled") return;
        if (puzzle.solution[r][c]) {
          // Correct fill
          const newGrid = userGrid.map((row) => row.slice());
          newGrid[r][c] = "filled";
          const newFilled = cellsFilled + 1;

          // Auto-mark completed rows/columns
          const { grid: autoGrid, marked: autoMarked } = autoMarkCompleted(newGrid, puzzle);
          setUserGrid(autoGrid);
          setCellsFilled(newFilled);
          if (autoMarked > 0) setCellsMarked((m) => m + autoMarked);

          // Check if solved
          if (newFilled === puzzle.filledCount) {
            if (timerRef.current) clearInterval(timerRef.current);
            const now = Date.now();
            const totalTime = now - puzzleStartRef.current;
            const planTime = firstActionRef.current > 0
              ? firstActionRef.current - puzzleStartRef.current
              : totalTime;
            const execTime = firstActionRef.current > 0
              ? now - firstActionRef.current
              : 0;

            resultsRef.current.push({
              item: `puzzle_${puzzleIdx + 1}`,
              type: "solved",
              puzzle_number: puzzleIdx + 1,
              grid_size: `${puzzle.rows}x${puzzle.cols}`,
              total_filled: puzzle.filledCount,
              cells_filled: newFilled,
              cells_marked: cellsMarked,
              errors,
              accuracy: 1,
              solved: true,
              planning_time_ms: planTime,
              execution_time_ms: execTime,
              duration: totalTime,
              level: puzzle.rows,
            });

            feedbackErrorsRef.current = errors;
            setFeedbackType("solved");
            setPhase("feedback");
          }
        } else {
          // Wrong fill — flash red
          setErrors((e) => e + 1);
          setFlashCell(`${r},${c}`);
          setTimeout(() => setFlashCell(null), 400);
        }
      } else {
        // Mark mode: toggle X
        const newGrid = userGrid.map((row) => row.slice());
        if (cell === "empty") {
          newGrid[r][c] = "marked";
          setCellsMarked((m) => m + 1);
        } else if (cell === "marked") {
          newGrid[r][c] = "empty";
          setCellsMarked((m) => m - 1);
        }
        setUserGrid(newGrid);
      }
    },
    [phase, mode, puzzles, puzzleIdx, userGrid, cellsFilled, cellsMarked, errors, autoMarkCompleted]
  );

  // ── Drag handlers ─────────────────────────────────────
  const handlePointerDown = useCallback(
    (r: number, c: number) => {
      isDraggingRef.current = true;
      dragVisitedRef.current = new Set([`${r},${c}`]);
      applyCell(r, c);
    },
    [applyCell]
  );

  const handlePointerEnter = useCallback(
    (r: number, c: number) => {
      if (!isDraggingRef.current) return;
      const key = `${r},${c}`;
      if (dragVisitedRef.current.has(key)) return;
      dragVisitedRef.current.add(key);
      applyCell(r, c);
    },
    [applyCell]
  );

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    dragVisitedRef.current.clear();
  }, []);

  // ── Global pointer-up to end drag if pointer leaves grid ──
  useEffect(() => {
    const up = () => {
      isDraggingRef.current = false;
      dragVisitedRef.current.clear();
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const solved = results.filter((r) => r.solved);
      const perfect = solved.filter((r) => r.errors === 0);

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

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          puzzle_number: 0,
          grid_size: "",
          total_filled: 0,
          cells_filled: 0,
          cells_marked: 0,
          errors: 0,
          accuracy: 0,
          solved: false,
          planning_time_ms: 0,
          execution_time_ms: 0,
          duration: 0,
          level: 0,
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

          max_puzzles: maxPuzzles,
          time_limit_per_puzzle_s: timeLimitMs / 1000,
          difficulty,

          puzzles_attempted: results.length,
          puzzles_solved: solved.length,
          puzzles_solved_perfectly: perfect.length,
          total_errors: totalErrors,
          mean_errors:
            results.length > 0
              ? Math.round((totalErrors / results.length) * 100) / 100
              : 0,
          mean_planning_time_ms: meanPlanTime,
          mean_execution_time_ms: meanExecTime,
          puzzles_timed_out: results.filter((r) => r.type === "timeout").length,

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(JSON.stringify(payload), "*");
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
  const isWarning = remaining < 15000;

  // Cell size based on grid dimensions and available screen space
  const gridRows = currentPuzzle?.rows ?? 5;
  const gridCols = currentPuzzle?.cols ?? 5;

  const maxRowClueLen = currentPuzzle
    ? Math.max(...currentPuzzle.rowClues.map((c) => c.length))
    : 1;
  const maxColClueLen = currentPuzzle
    ? Math.max(...currentPuzzle.colClues.map((c) => c.length))
    : 1;

  const idealCell = gridRows <= 5 ? 50 : gridRows <= 7 ? 40 : 32;
  const rowClueWidth = maxRowClueLen * 18 + 20;
  const colClueHeight = maxColClueLen * 18 + 16;
  // Fit within viewport: horizontal padding (8) + row clue area + grid border (5)
  const maxFromWidth = Math.floor((window.innerWidth - 16 - rowClueWidth) / gridCols);
  // Fit within viewport: header(52) + status(44) + colClues + toolbar(76) + gaps/padding(48)
  const maxFromHeight = Math.floor((window.innerHeight - 220 - colClueHeight) / gridRows);
  const cellSize = Math.max(20, Math.min(idealCell, maxFromWidth, maxFromHeight));

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
        {i18n.t("NONOGRAM")}
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
      {(phase === "playing" || phase === "feedback") && currentPuzzle && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("PUZZLE_COUNT", {
              current: puzzleIdx + 1,
              total: puzzles.length,
            })}
          </span>
          <span className="level-badge">
            {i18n.t("ERRORS", { count: errors })}
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
        <div className="ng-area">
         <div className="ng-puzzle-wrap" style={{ marginLeft: -rowClueWidth / 2 }}>
          <div
            className="ng-puzzle"
            style={{
              gridTemplateColumns: `${rowClueWidth}px repeat(${gridCols}, ${cellSize}px)`,
              gridTemplateRows: `${colClueHeight}px repeat(${gridRows}, ${cellSize}px)`,
            }}
          >
            {/* Corner */}
            <div className="ng-corner" />

            {/* Column clues */}
            {currentPuzzle.colClues.map((clues, c) => (
              <div key={`cc-${c}`} className="ng-col-clue">
                <div className="clue-badge">
                  {clues.map((n, i) => (
                    <span key={i} className="clue-num">{n}</span>
                  ))}
                </div>
              </div>
            ))}

            {/* Rows: row clue + cells in a thick-bordered grid */}
            {Array.from({ length: gridRows }).map((_, r) => (
              <React.Fragment key={`row-${r}`}>
                <div className="ng-row-clue">
                  <div className="clue-badge">
                    {currentPuzzle.rowClues[r].map((n, i) => (
                      <span key={i} className="clue-num">{n}</span>
                    ))}
                  </div>
                </div>
                {Array.from({ length: gridCols }).map((_, c) => {
                  const cell = userGrid[r]?.[c] ?? "empty";
                  const isFlash = flashCell === `${r},${c}`;
                  // Only show 5-cell grouping lines on grids 10×10+
                  const useGrouping = gridCols >= 10;
                  const groupRight = useGrouping && (c + 1) % 5 === 0 && c < gridCols - 1;
                  const groupBottom = useGrouping && (r + 1) % 5 === 0 && r < gridRows - 1;
                  // Thick outer border via grid wrapper, so first row/col and last row/col
                  // get thicker borders on the outside edges
                  const borderStyle: React.CSSProperties = {};
                  if (r === 0) borderStyle.borderTop = '2.5px solid #2c3e50';
                  if (c === 0) borderStyle.borderLeft = '2.5px solid #2c3e50';
                  if (r === gridRows - 1) borderStyle.borderBottom = '2.5px solid #2c3e50';
                  if (c === gridCols - 1) borderStyle.borderRight = '2.5px solid #2c3e50';
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`ng-cell ${cell}${isFlash ? " flash-error" : ""}${
                        groupRight ? " group-right" : ""
                      }${groupBottom ? " group-bottom" : ""}`}
                      style={borderStyle}
                      onPointerDown={(e) => { e.preventDefault(); handlePointerDown(r, c); }}
                      onPointerEnter={() => handlePointerEnter(r, c)}
                      onPointerUp={handlePointerUp}
                    >
                      {cell === "marked" && <span className="ng-x">×</span>}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Toolbar — circular icon buttons, centered under grid cells */}
          {phase === "playing" && (
            <div className="ng-toolbar" style={{ marginLeft: rowClueWidth }}>
              <button
                className={`ng-tool-btn${mode === "mark" ? " active" : ""}`}
                onClick={() => setMode("mark")}
                aria-label="Mark"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button
                className={`ng-tool-btn${mode === "fill" ? " active" : ""}`}
                onClick={() => setMode("fill")}
                aria-label="Fill"
              >
                <FontAwesomeIcon icon={faSquare} />
              </button>
            </div>
          )}

          {/* Feedback overlay */}
          {phase === "feedback" && (
            <div className="ng-feedback">
              <div className="ng-feedback-card">
                <div className={`ng-feedback-text ${feedbackType}`}>
                  {feedbackType === "solved"
                    ? i18n.t("SOLVED")
                    : i18n.t("TIMEOUT")}
                </div>
                <div className="ng-feedback-detail">
                  {i18n.t("ERRORS", { count: feedbackErrorsRef.current })}
                </div>
              </div>
            </div>
          )}
         </div>{/* end ng-puzzle-wrap */}
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="ng-area">
          <div className="ng-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="ng-area">
          <div className="ng-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
