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
import "./MentalRotation.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "feedback" | "questionnaire" | "done";
type Coord = [number, number];

interface TrialDef {
  shape: Coord[];       // base shape cells (centered)
  rotation: number;     // degrees applied to right shape
  mirrored: boolean;    // whether right shape is mirror-flipped
  correctAnswer: "same" | "different";
}

interface TrialResult {
  item: string;
  type: string;
  trial_number: number;
  rotation_deg: number;
  is_mirrored: boolean;
  correct_answer: string;
  response: string;
  correct: boolean;
  rt_ms: number;
  duration: number;
}

interface Props {
  data: any;
}

// ── Polyomino Generation ───────────────────────────────
// Grow a random connected shape by adding adjacent cells
function generatePolyomino(size: number): Coord[] {
  const cells: Set<string> = new Set();
  const cellList: Coord[] = [];

  const start: Coord = [0, 0];
  cells.add("0,0");
  cellList.push(start);

  const dirs: Coord[] = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  while (cellList.length < size) {
    // Pick a random existing cell and grow from it
    const base = cellList[Math.floor(Math.random() * cellList.length)];
    const shuffled = dirs.slice().sort(() => Math.random() - 0.5);
    let added = false;
    for (const [dr, dc] of shuffled) {
      const nr = base[0] + dr;
      const nc = base[1] + dc;
      const key = `${nr},${nc}`;
      if (!cells.has(key)) {
        cells.add(key);
        cellList.push([nr, nc]);
        added = true;
        break;
      }
    }
    if (!added) continue; // all neighbors filled, try another cell
  }

  return cellList;
}

// Normalize: translate so min row/col is 0, sort for comparison
function normalize(cells: Coord[]): Coord[] {
  const minR = Math.min(...cells.map((c) => c[0]));
  const minC = Math.min(...cells.map((c) => c[1]));
  return cells
    .map(([r, c]) => [r - minR, c - minC] as Coord)
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
}

function cellsKey(cells: Coord[]): string {
  return normalize(cells).map(([r, c]) => `${r},${c}`).join("|");
}

// Rotate 90° clockwise: (r,c) → (c, -r)
function rotate90(cells: Coord[]): Coord[] {
  return cells.map(([r, c]) => [c, -r] as Coord);
}

// Mirror horizontally: (r,c) → (r, -c)
function mirror(cells: Coord[]): Coord[] {
  return cells.map(([r, c]) => [r, -c] as Coord);
}

// Check if shape is asymmetric (no rotation matches its mirror)
function isAsymmetric(cells: Coord[]): boolean {
  const mirrored = mirror(cells);
  let rotated = mirrored;
  for (let i = 0; i < 4; i++) {
    if (cellsKey(rotated) === cellsKey(cells)) return false;
    rotated = rotate90(rotated);
  }
  return true;
}

// Generate an asymmetric polyomino
function generateAsymmetricShape(size: number): Coord[] {
  let attempts = 0;
  while (attempts < 500) {
    attempts++;
    const shape = generatePolyomino(size);
    if (isAsymmetric(shape)) return normalize(shape);
  }
  // Fallback: return an L-shape which is always asymmetric
  const fallback: Coord[] = [[0, 0], [1, 0], [2, 0], [2, 1]];
  while (fallback.length < size) {
    fallback.push([fallback.length - 1, 1]);
  }
  return normalize(fallback.slice(0, size));
}

// ── Difficulty Config ──────────────────────────────────
interface DifficultyConfig {
  blockCount: number;
  rotations: number[];  // degrees
  trialsPerCondition: number; // per rotation × per same/diff
}

const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: {
    blockCount: 5,
    rotations: [0, 90, 180, 270],
    trialsPerCondition: 2,  // 4 rotations × 2 (same/diff) × 2 = 16 trials
  },
  medium: {
    blockCount: 6,
    rotations: [0, 45, 90, 135, 180, 225, 270, 315],
    trialsPerCondition: 1,  // 8 rotations × 2 × 1 = 16 trials
  },
  hard: {
    blockCount: 7,
    rotations: [0, 45, 90, 135, 180, 225, 270, 315],
    trialsPerCondition: 2,  // 8 rotations × 2 × 2 = 32 trials
  },
};

// ── Trial Generation ───────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateTrials(config: DifficultyConfig): TrialDef[] {
  const trials: TrialDef[] = [];

  for (const rot of config.rotations) {
    for (let rep = 0; rep < config.trialsPerCondition; rep++) {
      // "Same" trial — rotated only
      trials.push({
        shape: generateAsymmetricShape(config.blockCount),
        rotation: rot,
        mirrored: false,
        correctAnswer: "same",
      });
      // "Different" trial — mirrored + rotated
      trials.push({
        shape: generateAsymmetricShape(config.blockCount),
        rotation: rot,
        mirrored: true,
        correctAnswer: "different",
      });
    }
  }

  return shuffle(trials);
}

// ── SVG Shape Renderer ─────────────────────────────────
function ShapeSVG({
  cells,
  rotation,
  mirrored,
  size,
}: {
  cells: Coord[];
  rotation: number;
  mirrored: boolean;
  size: number;
}) {
  const norm = normalize(cells);
  const maxR = Math.max(...norm.map((c) => c[0]));
  const maxC = Math.max(...norm.map((c) => c[1]));
  const gridW = maxC + 1;
  const gridH = maxR + 1;

  const cellPx = 20;
  const gap = 2;
  const svgW = gridW * (cellPx + gap) - gap;
  const svgH = gridH * (cellPx + gap) - gap;

  // Add padding for rotation
  const maxDim = Math.max(svgW, svgH) * 1.5;

  const mirrorTransform = mirrored ? "scale(-1, 1)" : "";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-maxDim / 2} ${-maxDim / 2} ${maxDim} ${maxDim}`}
    >
      <g
        transform={`rotate(${rotation}) ${mirrorTransform} translate(${-svgW / 2}, ${-svgH / 2})`}
      >
        {norm.map(([r, c], i) => (
          <rect
            key={i}
            x={c * (cellPx + gap)}
            y={r * (cellPx + gap)}
            width={cellPx}
            height={cellPx}
            rx={3}
            ry={3}
            fill="#359FFE"
          />
        ))}
      </g>
    </svg>
  );
}

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const difficulty: string = settings.difficulty ?? "medium";
  const timeLimitMs =
    Math.max(5, Math.min(60, settings.time_limit_per_trial_s ?? 15)) * 1000;

  const language =
    data.activity?.spec === "lamp.mental_rotation"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  const diffConfig = DIFFICULTY_CONFIGS[difficulty] ?? DIFFICULTY_CONFIGS.medium;

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [trialIdx, setTrialIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [trialFeedback, setTrialFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  // ── Refs ─────────────────────────────────────────────
  const trialStartRef = useRef(0);
  const resultsRef = useRef<TrialResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Generate all trials ──────────────────────────────
  const trials = useMemo(
    () => generateTrials(diffConfig),
    [difficulty] // diffConfig derived from difficulty
  );

  // ── Start a trial ────────────────────────────────────
  const startTrial = useCallback(
    (idx: number) => {
      if (idx >= trials.length) {
        setPhase("questionnaire");
        return;
      }
      setTrialIdx(idx);
      setElapsed(0);
      setTrialFeedback(null);
      setButtonsDisabled(false);
      trialStartRef.current = Date.now();
      setPhase("playing");
    },
    [trials]
  );

  // ── Timer ────────────────────────────────────────────
  useEffect(() => {
    if (phase === "playing" && !buttonsDisabled) {
      timerRef.current = setInterval(() => {
        const el = Date.now() - trialStartRef.current;
        setElapsed(el);
        if (el >= timeLimitMs) {
          if (timerRef.current) clearInterval(timerRef.current);
          // Timeout — record as incorrect, no response
          const trial = trials[trialIdx];
          resultsRef.current.push({
            item: `trial_${trialIdx + 1}`,
            type: "timeout",
            trial_number: trialIdx + 1,
            rotation_deg: trial.rotation,
            is_mirrored: trial.mirrored,
            correct_answer: trial.correctAnswer,
            response: "none",
            correct: false,
            rt_ms: timeLimitMs,
            duration: timeLimitMs,
          });
          setTrialFeedback("incorrect");
          setButtonsDisabled(true);
          setTimeout(() => startTrial(trialIdx + 1), 800);
        }
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, trialIdx, timeLimitMs, trials, buttonsDisabled, startTrial]);

  // ── Handle response ──────────────────────────────────
  const handleResponse = useCallback(
    (response: "same" | "different") => {
      if (phase !== "playing" || buttonsDisabled) return;
      if (timerRef.current) clearInterval(timerRef.current);

      const now = Date.now();
      const rt = now - trialStartRef.current;
      const trial = trials[trialIdx];
      const correct = response === trial.correctAnswer;

      resultsRef.current.push({
        item: `trial_${trialIdx + 1}`,
        type: "response",
        trial_number: trialIdx + 1,
        rotation_deg: trial.rotation,
        is_mirrored: trial.mirrored,
        correct_answer: trial.correctAnswer,
        response,
        correct,
        rt_ms: rt,
        duration: rt,
      });

      setTrialFeedback(correct ? "correct" : "incorrect");
      setButtonsDisabled(true);
      setTimeout(() => startTrial(trialIdx + 1), 600);
    },
    [phase, buttonsDisabled, trials, trialIdx, startTrial]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const responded = results.filter((r) => r.type === "response");
      const correct = responded.filter((r) => r.correct);
      const correctRTs = correct.map((r) => r.rt_ms);
      const meanRT =
        correctRTs.length > 0
          ? Math.round(correctRTs.reduce((a, b) => a + b, 0) / correctRTs.length)
          : 0;

      // RT by rotation angle (the key mental rotation metric)
      const rtByAngle: Record<number, number[]> = {};
      correct.forEach((r) => {
        if (!rtByAngle[r.rotation_deg]) rtByAngle[r.rotation_deg] = [];
        rtByAngle[r.rotation_deg].push(r.rt_ms);
      });
      const meanRTByAngle: Record<string, number> = {};
      Object.entries(rtByAngle).forEach(([angle, rts]) => {
        meanRTByAngle[`rt_${angle}deg`] = Math.round(
          rts.reduce((a, b) => a + b, 0) / rts.length
        );
      });

      // Same/Different accuracy
      const sameTrials = responded.filter((r) => r.correct_answer === "same");
      const diffTrials = responded.filter((r) => r.correct_answer === "different");
      const sameCorrect = sameTrials.filter((r) => r.correct).length;
      const diffCorrect = diffTrials.filter((r) => r.correct).length;

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          trial_number: 0,
          rotation_deg: 0,
          is_mirrored: false,
          correct_answer: "",
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
          score: Math.round(
            (correct.length / Math.max(1, responded.length)) * 100
          ),
          correct_answers: correct.length,
          total_questions: results.length,

          difficulty,
          time_limit_per_trial_s: timeLimitMs / 1000,

          trials_total: results.length,
          trials_responded: responded.length,
          trials_correct: correct.length,
          trials_timed_out: results.filter((r) => r.type === "timeout").length,
          accuracy: responded.length > 0
            ? Math.round((correct.length / responded.length) * 1000) / 1000
            : 0,
          same_accuracy: sameTrials.length > 0
            ? Math.round((sameCorrect / sameTrials.length) * 1000) / 1000
            : 0,
          different_accuracy: diffTrials.length > 0
            ? Math.round((diffCorrect / diffTrials.length) * 1000) / 1000
            : 0,
          mean_rt_correct_ms: meanRT,
          ...meanRTByAngle,

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(JSON.stringify(payload), "*");
    },
    [difficulty, timeLimitMs]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startTrial(0);
  }, [startTrial]);

  // ── Render ───────────────────────────────────────────
  const remaining = Math.max(0, timeLimitMs - elapsed);
  const remainingSec = Math.ceil(remaining / 1000);
  const isWarning = remaining < 5000;

  const currentTrial = trials[trialIdx];

  // Dynamic shape card sizing
  const availW = window.innerWidth;
  const shapeCardSize = Math.min(180, Math.floor((availW - 60) / 2));

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
        {i18n.t("MENTAL_ROTATION")}
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
      {phase === "playing" && currentTrial && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("TRIAL_COUNT", {
              current: trialIdx + 1,
              total: trials.length,
            })}
          </span>
          <span className={`timer-badge${isWarning ? " warning" : ""}`}>
            {remainingSec}s
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

      {/* Playing */}
      {phase === "playing" && currentTrial && (
        <div className="mr-area">
          {/* Two shapes side by side */}
          <div className="mr-shapes">
            <div
              className="mr-shape-card"
              style={{ width: shapeCardSize, height: shapeCardSize }}
            >
              <ShapeSVG
                cells={currentTrial.shape}
                rotation={0}
                mirrored={false}
                size={shapeCardSize - 24}
              />
            </div>
            <div
              className="mr-shape-card"
              style={{ width: shapeCardSize, height: shapeCardSize }}
            >
              <ShapeSVG
                cells={currentTrial.shape}
                rotation={currentTrial.rotation}
                mirrored={currentTrial.mirrored}
                size={shapeCardSize - 24}
              />
            </div>
          </div>

          {/* Trial feedback */}
          <div
            className={`mr-trial-feedback${
              trialFeedback ? ` ${trialFeedback}` : ""
            }`}
          >
            {trialFeedback === "correct" && i18n.t("CORRECT")}
            {trialFeedback === "incorrect" && i18n.t("INCORRECT")}
          </div>

          {/* Response buttons */}
          <div className="mr-buttons">
            <button
              className="mr-btn mr-btn-same"
              disabled={buttonsDisabled}
              onClick={() => handleResponse("same")}
            >
              {i18n.t("SAME")}
            </button>
            <button
              className="mr-btn mr-btn-diff"
              disabled={buttonsDisabled}
              onClick={() => handleResponse("different")}
            >
              {i18n.t("DIFFERENT")}
            </button>
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="mr-area">
          <div className="mr-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="mr-area">
          <div className="mr-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
