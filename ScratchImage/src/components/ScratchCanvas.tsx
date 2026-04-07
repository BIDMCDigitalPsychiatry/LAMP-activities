import React, { useRef, useEffect, useCallback, useState } from "react";
import { Background } from "./backgrounds";

export interface ScratchPoint {
  x: number;  // normalized 0–1
  y: number;  // normalized 0–1
  t: number;  // ms since card start
}

interface Props {
  background: Background;
  threshold: number;
  pathIntervalMs: number;
  onThresholdReached: () => void;
  onProgress: (pct: number) => void;
  onPathUpdate: (path: ScratchPoint[]) => void;
}

/**
 * Two-layer scratch card:
 *
 * 1. A background <img> element renders the SVG scene (always visible)
 * 2. A <canvas> on top holds only the grey cover layer
 * 3. Touch/mouse strokes erase the cover using destination-out,
 *    revealing the <img> underneath
 *
 * This avoids the single-canvas problem where destination-out erases
 * both the background and cover together.
 */
const ScratchCanvas: React.FC<Props> = ({
  background,
  threshold,
  pathIntervalMs,
  onThresholdReached,
  onProgress,
  onPathUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const thresholdReachedRef = useRef(false);
  const [bgDataUri, setBgDataUri] = useState("");
  const [ready, setReady] = useState(false);

  // Scratch path recording
  const scratchPathRef = useRef<ScratchPoint[]>([]);
  const lastPathSampleRef = useRef(0);
  const cardStartTimeRef = useRef(Date.now());
  const canvasSizeRef = useRef({ w: 1, h: 1 });

  const BRUSH_SIZE = 50;
  const CHECK_INTERVAL = 600;
  const lastCheckRef = useRef(0);

  // Build data URI for background image
  useEffect(() => {
    const svgStr = background.svg.replace(/\n\s*/g, " ").replace(/>\s+</g, "><");
    setBgDataUri("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr));
  }, [background]);

  const getPosition = useCallback(
    (e: MouseEvent | TouchEvent): { x: number; y: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e && e.touches.length > 0) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      const me = e as MouseEvent;
      return {
        x: me.clientX - rect.left,
        y: me.clientY - rect.top,
      };
    },
    []
  );

  const checkCoverage = useCallback(() => {
    const mask = maskRef.current;
    if (!mask) return;
    const ctx = mask.getContext("2d");
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, mask.width, mask.height).data;
    let scratched = 0;
    for (let i = 3; i < data.length; i += 16) {
      if (data[i] > 0) scratched++;
    }
    const total = data.length / 16;
    const pct = Math.min(100, Math.round((scratched / total) * 100));
    onProgress(pct);
    if (pct >= threshold && !thresholdReachedRef.current) {
      thresholdReachedRef.current = true;
      onThresholdReached();
    }
  }, [threshold, onThresholdReached, onProgress]);

  const stampBrush = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      maskCtx: CanvasRenderingContext2D,
      x: number,
      y: number
    ) => {
      ctx.beginPath();
      ctx.arc(x, y, BRUSH_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      maskCtx.beginPath();
      maskCtx.arc(x, y, BRUSH_SIZE / 2, 0, Math.PI * 2);
      maskCtx.fill();
    },
    []
  );

  const recordPoint = useCallback(
    (pos: { x: number; y: number }, now: number) => {
      if (now - lastPathSampleRef.current < pathIntervalMs) return;
      lastPathSampleRef.current = now;
      const { w, h } = canvasSizeRef.current;
      scratchPathRef.current.push({
        x: Math.round((pos.x / w) * 1000) / 1000,
        y: Math.round((pos.y / h) * 1000) / 1000,
        t: now - cardStartTimeRef.current,
      });
    },
    [pathIntervalMs]
  );

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const canvas = canvasRef.current;
      const mask = maskRef.current;
      if (!canvas || !mask) return;
      const ctx = canvas.getContext("2d");
      const maskCtx = mask.getContext("2d");
      if (!ctx || !maskCtx) return;

      ctx.globalCompositeOperation = "destination-out";
      maskCtx.globalCompositeOperation = "source-over";
      maskCtx.fillStyle = "#fff";

      const pos = getPosition(e);
      const last = lastPointRef.current;

      if (last) {
        const dist = Math.sqrt(
          Math.pow(pos.x - last.x, 2) + Math.pow(pos.y - last.y, 2)
        );
        const angle = Math.atan2(pos.y - last.y, pos.x - last.x);
        const step = BRUSH_SIZE / 4;
        for (let d = 0; d < dist; d += step) {
          const sx = last.x + Math.cos(angle) * d;
          const sy = last.y + Math.sin(angle) * d;
          stampBrush(ctx, maskCtx, sx, sy);
        }
      }
      stampBrush(ctx, maskCtx, pos.x, pos.y);
      lastPointRef.current = pos;

      const now = Date.now();
      recordPoint(pos, now);
      if (now - lastCheckRef.current > CHECK_INTERVAL) {
        lastCheckRef.current = now;
        checkCoverage();
      }
    },
    [getPosition, stampBrush, checkCoverage, recordPoint]
  );

  const handleStart = useCallback(
    (e: MouseEvent | TouchEvent) => {
      isDrawingRef.current = true;
      const pos = getPosition(e);
      lastPointRef.current = pos;
      recordPoint(pos, Date.now());
    },
    [getPosition, recordPoint]
  );

  const handleEnd = useCallback(() => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPointRef.current = null;
      checkCoverage();
      onPathUpdate(scratchPathRef.current);
    }
  }, [checkCoverage, onPathUpdate]);

  // When the pointer leaves the canvas, don't end the stroke —
  // just clear lastPoint so we don't draw a line across the gap.
  const handleLeave = useCallback(() => {
    lastPointRef.current = null;
  }, []);

  // When the pointer re-enters while button is still held, resume.
  const handleEnter = useCallback(
    (e: MouseEvent) => {
      if (isDrawingRef.current && e.buttons === 0) {
        // Mouse was released outside — end the stroke
        isDrawingRef.current = false;
        lastPointRef.current = null;
        checkCoverage();
      } else if (isDrawingRef.current) {
        // Still held — pick up the new position
        lastPointRef.current = getPosition(e);
      }
    },
    [getPosition, checkCoverage]
  );

  // Initialize canvas with cover layer only
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !bgDataUri) return;

    // Wait a frame for layout to settle
    const raf = requestAnimationFrame(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      // Draw only the cover layer on canvas
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "#9E9EA3");
      grad.addColorStop(0.3, "#B8B8BD");
      grad.addColorStop(0.7, "#A8A8AD");
      grad.addColorStop(1, "#9E9EA3");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Subtle texture lines
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 0.5;
      for (let y = 0; y < h; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Hint text
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fontSize = Math.max(16, Math.min(26, w / 16));
      ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
      ctx.fillText("Scratch here!", w / 2, h / 2);

      // Set compositing for scratch erasing
      ctx.globalCompositeOperation = "destination-out";

      // Create mask canvas for coverage tracking
      const mask = document.createElement("canvas");
      mask.width = w;
      mask.height = h;
      maskRef.current = mask;

      canvasSizeRef.current = { w, h };
      scratchPathRef.current = [];
      lastPathSampleRef.current = 0;
      cardStartTimeRef.current = Date.now();
      thresholdReachedRef.current = false;
      lastCheckRef.current = 0;
      setReady(true);
    });

    return () => {
      cancelAnimationFrame(raf);
      setReady(false);
    };
  }, [bgDataUri]);

  // Attach event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;

    const opts: AddEventListenerOptions = { passive: false };
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("mouseenter", handleEnter as EventListener);
    canvas.addEventListener("touchstart", handleStart, opts);
    canvas.addEventListener("touchmove", handleMove, opts);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleEnd);

    // Catch mouse release outside the canvas
    const handleWindowUp = () => handleEnd();
    window.addEventListener("mouseup", handleWindowUp);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("mouseenter", handleEnter as EventListener);
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
      window.removeEventListener("mouseup", handleWindowUp);
    };
  }, [ready, handleStart, handleMove, handleEnd, handleLeave, handleEnter]);

  return (
    <div ref={containerRef} className="scratch-container">
      {/* Background image — always visible, sits behind canvas */}
      {bgDataUri && (
        <img
          src={bgDataUri}
          alt=""
          className="scratch-bg"
        />
      )}
      {/* Canvas holds only the grey cover — scratching erases it to reveal img */}
      <canvas ref={canvasRef} className="scratch-canvas" />
    </div>
  );
};

export default ScratchCanvas;
