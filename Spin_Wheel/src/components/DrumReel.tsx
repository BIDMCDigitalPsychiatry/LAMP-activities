import React, { useEffect, useRef, useState } from "react";

const CELL_HEIGHT = 52;
const VISIBLE_CELLS = 3; // show 3 rows in the window
const VIEWPORT_HEIGHT = CELL_HEIGHT * VISIBLE_CELLS;

// Center-highlight colors by variant
const WIN_VALUE_COLORS: Record<string, string> = {
  "0": "#B0B8C4",
  "50": "#81C995",
  "100": "#4CAF50",
  "250": "#2E7D32",
};

const LOSE_VALUE_COLORS: Record<string, string> = {
  "0": "#B0B8C4",
  "50": "#EF9A9A",
  "100": "#EF5350",
  "250": "#C62828",
};

interface DrumReelProps {
  segments: string[];
  winningSegment: string | null;
  onFinished: () => void;
  spin: boolean;
  reelId: string;
  variant?: "win" | "lose";
}

export default function DrumReel({
  segments,
  winningSegment,
  onFinished,
  spin,
  reelId,
  variant = "win",
}: DrumReelProps) {
  const valueColors = variant === "lose" ? LOSE_VALUE_COLORS : WIN_VALUE_COLORS;

  // Build the strip: repeat segments enough for several full cycles
  const REPEATS = 8;
  const strip: string[] = [];
  for (let r = 0; r < REPEATS; r++) {
    for (let s = 0; s < segments.length; s++) {
      strip.push(segments[s]);
    }
  }
  const totalCells = strip.length;

  const [offset, setOffset] = useState(0);
  const speedRef = useRef(0);
  const animRef = useRef(0);
  const isSpinningRef = useRef(false);
  const frameRef = useRef(0);
  const offsetRef = useRef(0);
  // Phase: 0=accel, 1=fullSpeed, 2=decel
  const phaseRef = useRef(0);
  const targetOffsetRef = useRef(0);

  // Find target index in the latter portion of the strip
  const findTargetIndex = (target: string): number => {
    const startSearch = Math.floor(totalCells * 0.6);
    for (let i = startSearch; i < totalCells; i++) {
      if (strip[i] === target) return i;
    }
    return strip.lastIndexOf(target);
  };

  useEffect(() => {
    if (spin && !isSpinningRef.current) {
      isSpinningRef.current = true;
      phaseRef.current = 0;
      frameRef.current = 0;
      speedRef.current = 0;
      offsetRef.current = 0;
      targetOffsetRef.current = 0;
      animRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [spin]); // eslint-disable-line

  const tick = () => {
    frameRef.current++;
    const frame = frameRef.current;
    const FULL_SPEED = 18;
    const ACCEL_FRAMES = 15;

    if (phaseRef.current === 0) {
      // Phase 0: accelerate
      speedRef.current = (frame / ACCEL_FRAMES) * FULL_SPEED;
      if (frame >= ACCEL_FRAMES) {
        phaseRef.current = 1;
      }
    } else if (phaseRef.current === 1) {
      // Phase 1: full speed — wait for enough travel, then calculate braking
      speedRef.current = FULL_SPEED;

      if (frame > 60 && winningSegment) {
        const targetIdx = findTargetIndex(winningSegment);
        // Target offset centers the winning cell in the middle row
        const targetOff = targetIdx * CELL_HEIGHT - CELL_HEIGHT;

        // Calculate how far we'll travel during deceleration with friction 0.94
        // Total decel distance = speed * friction / (1 - friction) = 18 * 0.94 / 0.06 = 282px
        // Start braking when we're that distance away from target
        const friction = 0.94;
        const decelDist = speedRef.current * friction / (1 - friction);

        if (offsetRef.current >= targetOff - decelDist) {
          phaseRef.current = 2;
          targetOffsetRef.current = targetOff;
        }
      }
    } else {
      // Phase 2: decelerate with friction, then lerp to exact target
      speedRef.current *= 0.94;

      // When speed is low, switch to smooth lerp toward exact target
      if (speedRef.current < 1.5) {
        const diff = targetOffsetRef.current - offsetRef.current;
        if (Math.abs(diff) < 0.5) {
          // Snap to exact target
          offsetRef.current = targetOffsetRef.current;
          setOffset(targetOffsetRef.current);
          isSpinningRef.current = false;
          onFinished();
          return;
        }
        // Ease toward target
        offsetRef.current += diff * 0.15;
        setOffset(offsetRef.current);
        animRef.current = requestAnimationFrame(tick);
        return;
      }
    }

    offsetRef.current += speedRef.current;
    setOffset(offsetRef.current);
    animRef.current = requestAnimationFrame(tick);
  };

  // Which cell index is currently centered
  const centerIdx = Math.round((offset + CELL_HEIGHT) / CELL_HEIGHT);

  return (
    <div className="drum-reel" id={reelId}>
      <div
        className="drum-viewport"
        style={{ height: VIEWPORT_HEIGHT }}
      >
        <div
          className="drum-strip"
          style={{ transform: `translateY(${-offset}px)` }}
        >
          {strip.map((val: string, i: number) => {
            const isCentered = i === centerIdx;
            const color = valueColors[val] || "#B0B8C4";
            return (
              <div
                key={i}
                className={`drum-cell ${isCentered ? "drum-cell-active" : ""}`}
                style={{
                  height: CELL_HEIGHT,
                  ...(isCentered ? { background: color, color: "#fff" } : {}),
                }}
              >
                ${val}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
