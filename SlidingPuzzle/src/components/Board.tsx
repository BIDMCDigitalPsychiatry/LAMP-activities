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
import "./SlidingPuzzle.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "solved" | "questionnaire" | "done";

interface PuzzleDef {
  size: number;
  tiles: number[];      // flat array, 0 = empty
  optimalMoves: number;  // IDA* computed minimum moves
}

interface TrialResult {
  item: string;
  type: string;
  puzzle_number: number;
  grid_size: number;
  moves: number;
  optimal_moves: number;
  move_efficiency: number;  // optimal / actual (1.0 = perfect, lower = worse)
  solved: boolean;
  rt_ms: number;
  duration: number;
}

interface Props {
  data: any;
}

// ── Difficulty Config ──────────────────────────────────
interface DifficultyConfig {
  gridSize: number;
  numPuzzles: number;
  scrambleMoves: number;  // random moves from solved to generate puzzle
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: { gridSize: 3, numPuzzles: 5, scrambleMoves: 30 },
  medium: { gridSize: 4, numPuzzles: 3, scrambleMoves: 60 },
  hard: { gridSize: 5, numPuzzles: 3, scrambleMoves: 100 },
};

// ── Puzzle Generation ──────────────────────────────────

// Generate solved state: [1, 2, 3, ..., n*n-1, 0]
function solvedState(size: number): number[] {
  const tiles: number[] = [];
  for (let i = 1; i < size * size; i++) tiles.push(i);
  tiles.push(0);
  return tiles;
}

// Find index of empty tile (0)
function findEmpty(tiles: number[]): number {
  return tiles.indexOf(0);
}

// Get neighbors of a position in the grid
function getNeighbors(pos: number, size: number): number[] {
  const row = Math.floor(pos / size);
  const col = pos % size;
  const neighbors: number[] = [];
  if (row > 0) neighbors.push(pos - size);
  if (row < size - 1) neighbors.push(pos + size);
  if (col > 0) neighbors.push(pos - 1);
  if (col < size - 1) neighbors.push(pos + 1);
  return neighbors;
}

// Scramble by making random moves from solved state (guarantees solvability)
function scramble(size: number, numMoves: number): number[] {
  const tiles = solvedState(size);
  let emptyIdx = tiles.length - 1;
  let lastMove = -1; // avoid immediately undoing the last move

  for (let i = 0; i < numMoves; i++) {
    const neighbors = getNeighbors(emptyIdx, size).filter((n) => n !== lastMove);
    const pick = neighbors[Math.floor(Math.random() * neighbors.length)];
    lastMove = emptyIdx;
    tiles[emptyIdx] = tiles[pick];
    tiles[pick] = 0;
    emptyIdx = pick;
  }

  // Make sure it's not already solved
  const solved = solvedState(size);
  if (tiles.every((t, i) => t === solved[i])) {
    return scramble(size, numMoves); // retry
  }

  return tiles;
}

// ── IDA* Solver ────────────────────────────────────────

// Manhattan distance heuristic
function manhattanDistance(tiles: number[], size: number): number {
  let dist = 0;
  for (let i = 0; i < tiles.length; i++) {
    const val = tiles[i];
    if (val === 0) continue;
    const goalRow = Math.floor((val - 1) / size);
    const goalCol = (val - 1) % size;
    const curRow = Math.floor(i / size);
    const curCol = i % size;
    dist += Math.abs(goalRow - curRow) + Math.abs(goalCol - curCol);
  }
  return dist;
}

// Linear conflict: additional heuristic on top of Manhattan
function linearConflict(tiles: number[], size: number): number {
  let conflicts = 0;

  // Row conflicts
  for (let row = 0; row < size; row++) {
    for (let i = 0; i < size; i++) {
      const pos1 = row * size + i;
      const val1 = tiles[pos1];
      if (val1 === 0) continue;
      const goalRow1 = Math.floor((val1 - 1) / size);
      if (goalRow1 !== row) continue;

      for (let j = i + 1; j < size; j++) {
        const pos2 = row * size + j;
        const val2 = tiles[pos2];
        if (val2 === 0) continue;
        const goalRow2 = Math.floor((val2 - 1) / size);
        if (goalRow2 !== row) continue;

        // Both in their goal row but in wrong relative order
        const goalCol1 = (val1 - 1) % size;
        const goalCol2 = (val2 - 1) % size;
        if (goalCol1 > goalCol2) conflicts++;
      }
    }
  }

  // Column conflicts
  for (let col = 0; col < size; col++) {
    for (let i = 0; i < size; i++) {
      const pos1 = i * size + col;
      const val1 = tiles[pos1];
      if (val1 === 0) continue;
      const goalCol1 = (val1 - 1) % size;
      if (goalCol1 !== col) continue;

      for (let j = i + 1; j < size; j++) {
        const pos2 = j * size + col;
        const val2 = tiles[pos2];
        if (val2 === 0) continue;
        const goalCol2 = (val2 - 1) % size;
        if (goalCol2 !== col) continue;

        const goalRow1 = Math.floor((val1 - 1) / size);
        const goalRow2 = Math.floor((val2 - 1) / size);
        if (goalRow1 > goalRow2) conflicts++;
      }
    }
  }

  return conflicts * 2;
}

function heuristic(tiles: number[], size: number): number {
  return manhattanDistance(tiles, size) + linearConflict(tiles, size);
}

// IDA* search — returns optimal move count, or -1 if over budget
function idaStar(initialTiles: number[], size: number, maxNodes: number): number {
  const goal = solvedState(size);
  const goalStr = goal.join(",");

  if (initialTiles.join(",") === goalStr) return 0;

  let bound = heuristic(initialTiles, size);
  let nodesSearched = 0;

  function search(tiles: number[], g: number, bound: number, lastEmpty: number): number {
    const f = g + heuristic(tiles, size);
    if (f > bound) return f;
    if (tiles.join(",") === goalStr) return -g; // negative = found at depth g

    nodesSearched++;
    if (nodesSearched > maxNodes) return Infinity; // budget exceeded

    let minBound = Infinity;
    const emptyIdx = findEmpty(tiles);
    const neighbors = getNeighbors(emptyIdx, size);

    for (const n of neighbors) {
      if (n === lastEmpty) continue; // don't undo last move

      // Swap
      const next = tiles.slice();
      next[emptyIdx] = next[n];
      next[n] = 0;

      const result = search(next, g + 1, bound, emptyIdx);
      if (result < 0) return result; // found
      if (result < minBound) minBound = result;
    }

    return minBound;
  }

  while (bound < 200) { // safety cap
    nodesSearched = 0;
    const result = search(initialTiles, 0, bound, -1);
    if (result < 0) return -result;
    if (result === Infinity) return -1; // budget exceeded
    bound = result;
  }

  return -1;
}

// Compute optimal moves — uses IDA* for 3×3 and 4×4, skips for 5×5
function computeOptimal(tiles: number[], size: number): number {
  if (size <= 3) {
    return idaStar(tiles, size, 500000);
  } else if (size === 4) {
    const result = idaStar(tiles, size, 2000000);
    return result >= 0 ? result : -1;
  }
  // 5×5: too expensive, return -1 (unknown)
  return -1;
}

// ── Generate Puzzles ───────────────────────────────────
function generatePuzzles(config: DifficultyConfig): PuzzleDef[] {
  const puzzles: PuzzleDef[] = [];
  for (let i = 0; i < config.numPuzzles; i++) {
    const tiles = scramble(config.gridSize, config.scrambleMoves);
    const optimalMoves = computeOptimal(tiles, config.gridSize);
    puzzles.push({
      size: config.gridSize,
      tiles,
      optimalMoves: optimalMoves >= 0 ? optimalMoves : -1,
    });
  }
  return puzzles;
}

// ── Check if solved ────────────────────────────────────
function isSolved(tiles: number[], size: number): boolean {
  const goal = solvedState(size);
  return tiles.every((t, i) => t === goal[i]);
}

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const difficulty: string = settings.difficulty ?? "medium";
  const timeLimitMs =
    settings.time_limit_per_puzzle_s && settings.time_limit_per_puzzle_s > 0
      ? Math.max(30, Math.min(600, settings.time_limit_per_puzzle_s)) * 1000
      : 0; // 0 = untimed

  const language =
    data.activity?.spec === "lamp.sliding_puzzle"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [tiles, setTiles] = useState<number[]>([]);
  const [moveCount, setMoveCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  // ── Refs ─────────────────────────────────────────────
  const trialStartRef = useRef(0);
  const resultsRef = useRef<TrialResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Generate all puzzles ─────────────────────────────
  const puzzles = useMemo(
    () => generatePuzzles(diffConfig),
    [difficulty]
  );

  // ── Start a puzzle ───────────────────────────────────
  const startPuzzle = useCallback(
    (idx: number) => {
      if (idx >= puzzles.length) {
        setPhase("questionnaire");
        return;
      }
      setPuzzleIdx(idx);
      setTiles(puzzles[idx].tiles.slice());
      setMoveCount(0);
      setElapsed(0);
      trialStartRef.current = Date.now();
      setPhase("playing");
    },
    [puzzles]
  );

  // ── Timer ────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing") {
      timerRef.current = setInterval(() => {
        const el = Date.now() - trialStartRef.current;
        setElapsed(el);
        if (timeLimitMs > 0 && el >= timeLimitMs) {
          if (timerRef.current) clearInterval(timerRef.current);
          // Time out — record unsolved
          const puzzle = puzzles[puzzleIdx];
          resultsRef.current.push({
            item: `puzzle_${puzzleIdx + 1}`,
            type: "timeout",
            puzzle_number: puzzleIdx + 1,
            grid_size: puzzle.size,
            moves: moveCount,
            optimal_moves: puzzle.optimalMoves,
            move_efficiency: 0,
            solved: false,
            rt_ms: timeLimitMs,
            duration: timeLimitMs,
          });
          setTimeout(() => startPuzzle(puzzleIdx + 1), 800);
        }
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, puzzleIdx, timeLimitMs, puzzles, moveCount, startPuzzle]);

  // ── Handle tile click ────────────────────────────────
  const handleTileClick = useCallback(
    (clickedIdx: number) => {
      if (phase !== "playing") return;

      const size = puzzles[puzzleIdx].size;
      const emptyIdx = findEmpty(tiles);
      const neighbors = getNeighbors(emptyIdx, size);

      if (!neighbors.includes(clickedIdx)) return; // not adjacent

      // Swap
      const newTiles = tiles.slice();
      newTiles[emptyIdx] = newTiles[clickedIdx];
      newTiles[clickedIdx] = 0;
      const newMoveCount = moveCount + 1;

      setTiles(newTiles);
      setMoveCount(newMoveCount);

      // Check if solved
      if (isSolved(newTiles, size)) {
        if (timerRef.current) clearInterval(timerRef.current);
        const rt = Date.now() - trialStartRef.current;
        const puzzle = puzzles[puzzleIdx];
        const efficiency =
          puzzle.optimalMoves > 0
            ? Math.round((puzzle.optimalMoves / newMoveCount) * 1000) / 1000
            : -1;

        resultsRef.current.push({
          item: `puzzle_${puzzleIdx + 1}`,
          type: "solved",
          puzzle_number: puzzleIdx + 1,
          grid_size: puzzle.size,
          moves: newMoveCount,
          optimal_moves: puzzle.optimalMoves,
          move_efficiency: efficiency,
          solved: true,
          rt_ms: rt,
          duration: rt,
        });

        setPhase("solved");
        setTimeout(() => startPuzzle(puzzleIdx + 1), 1500);
      }
    },
    [phase, tiles, moveCount, puzzles, puzzleIdx, startPuzzle]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const solved = results.filter((r) => r.solved);
      const efficiencies = solved
        .map((r) => r.move_efficiency)
        .filter((e) => e > 0);

      const meanEfficiency =
        efficiencies.length > 0
          ? Math.round(
              (efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length) * 1000
            ) / 1000
          : 0;

      const totalMoves = results.reduce((s, r) => s + r.moves, 0);
      const meanSolveTime =
        solved.length > 0
          ? Math.round(
              solved.reduce((s, r) => s + r.rt_ms, 0) / solved.length
            )
          : 0;

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          puzzle_number: 0,
          grid_size: 0,
          moves: 0,
          optimal_moves: 0,
          move_efficiency: 0,
          solved: false,
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
          grid_size: diffConfig.gridSize,
          time_limit_per_puzzle_s: timeLimitMs > 0 ? timeLimitMs / 1000 : null,

          // Puzzle-specific metrics
          puzzles_total: results.length,
          puzzles_solved: solved.length,
          puzzles_timed_out: results.filter((r) => r.type === "timeout").length,
          total_moves: totalMoves,
          mean_move_efficiency: meanEfficiency,
          mean_solve_time_ms: meanSolveTime,

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(JSON.stringify(payload), "*");
    },
    [difficulty, diffConfig, timeLimitMs]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startPuzzle(0);
  }, [startPuzzle]);

  // ── Render ───────────────────────────────────────────
  const remaining = timeLimitMs > 0 ? Math.max(0, timeLimitMs - elapsed) : 0;
  const remainingSec = Math.ceil(remaining / 1000);
  const isWarning = timeLimitMs > 0 && remaining < 10000;

  const currentPuzzle = puzzles[puzzleIdx];

  // Dynamic grid sizing
  const availW = window.innerWidth;
  const availH = window.innerHeight - 140; // header + status bar + padding
  const gridPx = currentPuzzle
    ? Math.min(
        Math.floor(availW - 32),
        Math.floor(availH - 40),
        400
      )
    : 300;
  const cellSize = currentPuzzle ? gridPx / currentPuzzle.size : 75;
  const gap = 3;
  const tileSize = cellSize - gap * 2;
  const fontSize = currentPuzzle
    ? currentPuzzle.size <= 3
      ? 28
      : currentPuzzle.size === 4
      ? 22
      : 18
    : 22;

  const elapsedSec = Math.floor(elapsed / 1000);
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedSecRem = elapsedSec % 60;
  const elapsedStr = `${elapsedMin}:${elapsedSecRem.toString().padStart(2, "0")}`;

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
        {i18n.t("SLIDING_PUZZLE")}
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
      {(phase === "playing" || phase === "solved") && currentPuzzle && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("PUZZLE_COUNT", {
              current: puzzleIdx + 1,
              total: puzzles.length,
            })}
          </span>
          <span className="level-badge">
            {i18n.t("MOVES", { count: moveCount })}
          </span>
          <span className={`timer-badge${isWarning ? " warning" : ""}`}>
            {timeLimitMs > 0 ? `${remainingSec}s` : elapsedStr}
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

      {/* Playing / Solved */}
      {(phase === "playing" || phase === "solved") && currentPuzzle && (
        <div className="sp-area">
          <div
            className="sp-grid"
            style={{ width: gridPx, height: gridPx }}
          >
            {tiles.map((val, idx) => {
              if (val === 0) return null;
              const row = Math.floor(idx / currentPuzzle.size);
              const col = idx % currentPuzzle.size;
              return (
                <div
                  key={val}
                  className={`sp-tile${phase === "solved" ? " solved" : ""}`}
                  style={{
                    width: tileSize,
                    height: tileSize,
                    left: col * cellSize + gap,
                    top: row * cellSize + gap,
                    fontSize,
                  }}
                  onClick={() => handleTileClick(idx)}
                >
                  {val}
                </div>
              );
            })}

            {/* Solved overlay */}
            {phase === "solved" && (
              <div className="sp-solved-overlay">
                <div className="sp-solved-text">{i18n.t("SOLVED")}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="sp-area">
          <div className="sp-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="sp-area">
          <div className="sp-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
