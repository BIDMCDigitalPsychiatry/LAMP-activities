import React, { useEffect, useRef } from "react";

// Win palette: grey $0 → increasingly vivid green by magnitude
export const WIN_COLORS = [
  "#B0B8C4", // $0   — neutral grey
  "#81C995", // $50  — light green
  "#4CAF50", // $100 — medium green
  "#2E7D32", // $250 — deep green
  "#C0C6CF", // $0   — lighter grey
  "#A0D9A8", // $50  — lighter green
  "#66BB6A", // $100 — lighter medium green
  "#388E3C", // $250 — lighter deep green
];

// Lose palette: grey $0 → increasingly vivid red by magnitude
export const LOSE_COLORS = [
  "#B0B8C4", // $0   — neutral grey
  "#EF9A9A", // $50  — light red
  "#EF5350", // $100 — medium red
  "#C62828", // $250 — deep red
  "#C0C6CF", // $0   — lighter grey
  "#E57373", // $50  — lighter red
  "#F44336", // $100 — lighter medium red
  "#D32F2F", // $250 — lighter deep red
];

interface WheelCanvasProps {
  segments: string[];
  segColors?: string[];
  winningSegment: string | null;
  onFinished: () => void;
  spin: boolean;
  canvasId: string;
  size?: number;
}

export default function WheelCanvas({
  segments,
  segColors,
  winningSegment,
  onFinished,
  spin,
  canvasId,
  size = 160,
}: WheelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const isSpinningRef = useRef(false);
  const currentSegRef = useRef("");
  const hasPassedTargetRef = useRef(false);
  const colors = segColors || WIN_COLORS;

  const canvasSize = size * 2 + 40;
  const centerX = canvasSize / 2;
  const centerY = canvasSize / 2;

  const MAX_SPEED = 0.25; // radians per frame
  const ACCEL_FRAMES = 20;
  // We'll decelerate using friction once we've passed the target

  useEffect(() => {
    drawWheel(angleRef.current);
  }, [segments]); // eslint-disable-line

  useEffect(() => {
    if (spin && !isSpinningRef.current) {
      isSpinningRef.current = true;
      hasPassedTargetRef.current = false;
      speedRef.current = 0;
      frameCountRef.current = 0;
      animRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [spin]); // eslint-disable-line

  const frameCountRef = useRef(0);

  const getCurrentSegment = (): string => {
    const change = angleRef.current + Math.PI / 2;
    let idx = segments.length - Math.floor((change / (Math.PI * 2)) * segments.length) - 1;
    if (idx < 0) idx += segments.length;
    return segments[idx];
  };

  const tick = (_now: number) => {
    frameCountRef.current++;
    const frame = frameCountRef.current;

    if (frame <= ACCEL_FRAMES) {
      // Phase 1: Accelerate smoothly
      const t = frame / ACCEL_FRAMES;
      speedRef.current = MAX_SPEED * easeInQuad(t);
    } else if (!hasPassedTargetRef.current) {
      // Phase 2: Full speed until we pass the target at least once
      speedRef.current = MAX_SPEED;
      // Wait at least 2 full rotations worth of frames before looking for target
      if (frame > ACCEL_FRAMES + 60) {
        const seg = getCurrentSegment();
        if (winningSegment && seg === winningSegment) {
          hasPassedTargetRef.current = true;
        }
      }
    } else {
      // Phase 3: Gradual deceleration (friction)
      speedRef.current *= 0.975;
      if (speedRef.current < 0.001) {
        speedRef.current = 0;
      }
    }

    angleRef.current += speedRef.current;
    while (angleRef.current >= Math.PI * 2) {
      angleRef.current -= Math.PI * 2;
    }

    currentSegRef.current = getCurrentSegment();
    drawWheel(angleRef.current);

    // Stop when nearly still and on the target
    if (hasPassedTargetRef.current && speedRef.current < 0.002) {
      isSpinningRef.current = false;
      onFinished();
    } else {
      animRef.current = requestAnimationFrame(tick);
    }
  };

  const easeInQuad = (t: number) => t * t;

  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    const len = segments.length;
    const PI2 = Math.PI * 2;
    let lastAngle = angle;

    // Draw segments
    for (let i = 0; i < len; i++) {
      const segAngle = PI2 * ((i + 1) / len) + angle;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, size, lastAngle, segAngle, false);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.stroke();

      // Segment text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((lastAngle + segAngle) / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textVal = "$" + segments[i];
      ctx.fillText(textVal, size * 0.65, 0);
      ctx.restore();

      lastAngle = segAngle;
    }

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#e0e0e0";
    ctx.stroke();

    // Outer ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    // Needle (top)
    ctx.fillStyle = "#1a1a2e";
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY - size - 6);
    ctx.lineTo(centerX + 10, centerY - size - 6);
    ctx.lineTo(centerX, centerY - size + 12);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <div className="wheel-wrapper">
      <canvas
        ref={canvasRef}
        id={canvasId}
        width={canvasSize}
        height={canvasSize}
      />
    </div>
  );
}
