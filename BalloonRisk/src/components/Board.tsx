import React, { useState, useRef, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faRedo } from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import BalloonSVG from "./BalloonSVG";
import i18n from "../i18n";
import "./BalloonRisk.css";

type Phase = "instructions" | "playing" | "burst" | "gameOver" | "questionnaire" | "done";

interface BalloonResult {
  pumps: number;
  collected: boolean;
  earnings: number;
  breakpoint: number;
}

interface Props {
  data: any;
}

// ── Gaussian helpers ────────────────────────────────────────
function gaussianRandom(mean: number, std: number): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return num * std + mean;
}

function generateBreakpoints(count: number, mean: number, std: number): number[] {
  const points: number[] = [];
  for (let i = 0; i < count; i++) {
    let n = 0;
    while (n < 1 || n >= 128) {
      n = gaussianRandom(mean, std);
    }
    points.push(Math.round(n));
  }
  return points;
}

const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const balloonCount = settings.balloon_count ?? 15;
  const breakpointMean = settings.breakpoint_mean ?? 64;
  const breakpointStd = settings.breakpoint_std ?? 37;
  const language = data.configuration?.language ?? "en-US";
  const showForward = data.forward ?? false;
  const noBack = data.noBack ?? false;

  const [phase, setPhase] = useState<Phase>("instructions");
  const [balloonIndex, setBalloonIndex] = useState(0);
  const [pumps, setPumps] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [results, setResults] = useState<BalloonResult[]>([]);
  const [isPumping, setIsPumping] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);

  const breakpointsRef = useRef(generateBreakpoints(balloonCount, breakpointMean, breakpointStd));
  const routesRef = useRef<any[]>([]);
  const startTimeRef = useRef(Date.now());
  const lastPumpTimeRef = useRef(Date.now());

  const balloonWidth = Math.min(100 + pumps * 2, 280);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Send results ────────────────────────────────────────
  const sendResult = useCallback((isNav: boolean, isBack: boolean, qData?: any) => {
    const duration = Date.now() - startTimeRef.current;
    const allResults = results;

    // Compute BART-standard metrics from results
    const collected = allResults.filter(r => r.collected);
    const popped = allResults.filter(r => !r.collected);
    const totalPumpsAll = allResults.reduce((s, r) => s + r.pumps, 0);
    const avgPumps = allResults.length > 0 ? Math.round(totalPumpsAll / allResults.length * 10) / 10 : 0;
    const avgPumpsCollected = collected.length > 0
      ? Math.round(collected.reduce((s, r) => s + r.pumps, 0) / collected.length * 10) / 10 : 0;
    const earnings = collected.reduce((s, r) => s + r.earnings, 0);
    const popRate = allResults.length > 0 ? Math.round(popped.length / allResults.length * 100) : 0;

    // Legacy fields
    const score = balloonCount > 0 ? Math.round(collected.length / balloonCount * 100) : 0;

    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        total_earnings: earnings,
        total_pumps: totalPumpsAll,
        balloons_collected: collected.length,
        balloons_popped: popped.length,
        total_balloons: allResults.length,
        avg_pumps: avgPumps,
        avg_pumps_collected: avgPumpsCollected,
        pop_rate: popRate,
        balloon_count: balloonCount,
        breakpoint_mean: breakpointMean,
        breakpoint_std: breakpointStd,
        breakpoints: breakpointsRef.current,
        balloon_results: allResults,
        // Legacy fields
        correct_answers: collected.length,
        total_questions: allResults.length,
        wrong_answers: popped.length,
        score,
        point: score >= 50 ? 2 : 1,
        ...(qData && { questionnaire: qData }),
      },
      temporal_slices: routesRef.current,
      ...(showForward && { forward: !isBack }),
      ...(isNav && isBack && { clickBack: true }),
      ...(!isNav && { done: true }),
    };
    parent.postMessage(JSON.stringify(payload), "*");
  }, [results, balloonCount, breakpointMean, breakpointStd, showForward]);

  // ── Pump ────────────────────────────────────────────────
  const pumpBalloon = () => {
    if (phase !== "playing" || isCollecting) return;
    setIsPumping(true);
    setTimeout(() => setIsPumping(false), 300);
    const now = Date.now();
    const duration = now - lastPumpTimeRef.current;
    lastPumpTimeRef.current = now;
    const newPumps = pumps + 1;
    const curBp = breakpointsRef.current[balloonIndex];

    if (newPumps >= curBp) {
      // Burst
      routesRef.current.push({
        duration,
        item: balloonIndex + 1,
        level: balloonIndex + 1,
        type: false,
        value: 0,
        pumps: newPumps,
        event: "burst",
      });
      const result: BalloonResult = { pumps: newPumps, collected: false, earnings: 0, breakpoint: curBp };
      setResults(prev => [...prev, result]);
      setPumps(0);
      setPhase("burst");

      setTimeout(() => {
        const nextIndex = balloonIndex + 1;
        if (nextIndex >= balloonCount) {
          setPhase("gameOver");
          setTimeout(() => setPhase("questionnaire"), 1500);
        } else {
          setBalloonIndex(nextIndex);
          lastPumpTimeRef.current = Date.now();
          setPhase("playing");
        }
      }, 1500);
    } else {
      // Successful pump
      routesRef.current.push({
        duration,
        item: balloonIndex + 1,
        level: balloonIndex + 1,
        type: true,
        value: newPumps,
        pumps: newPumps,
        event: "pump",
      });
      setPumps(newPumps);
    }
  };

  // ── Collect ─────────────────────────────────────────────
  const collectPoints = () => {
    if (phase !== "playing" || pumps === 0 || isCollecting) return;
    const now = Date.now();
    const duration = now - lastPumpTimeRef.current;

    routesRef.current.push({
      duration,
      item: balloonIndex + 1,
      level: balloonIndex + 1,
      type: true,
      value: pumps,
      pumps,
      event: "collect",
    });

    // Capture values before animation resets them
    const collectedPumps = pumps;
    const collectedBp = breakpointsRef.current[balloonIndex];

    // Start float-up animation
    setIsCollecting(true);

    // After animation completes, update state
    setTimeout(() => {
      const result: BalloonResult = { pumps: collectedPumps, collected: true, earnings: collectedPumps, breakpoint: collectedBp };
      setResults(prev => [...prev, result]);
      setTotalEarnings(prev => prev + collectedPumps);
      setPumps(0);
      setIsCollecting(false);

      const nextIndex = balloonIndex + 1;
      if (nextIndex >= balloonCount) {
        setPhase("gameOver");
        setTimeout(() => setPhase("questionnaire"), 1500);
      } else {
        setBalloonIndex(nextIndex);
        lastPumpTimeRef.current = Date.now();
      }
    }, 900);
  };

  // ── Navigation ──────────────────────────────────────────
  const handleBack = () => {
    routesRef.current.push({ type: "manual_exit", value: true });
    sendResult(true, true);
  };

  const handleForward = () => {
    routesRef.current.push({ type: "manual_exit", value: false });
    sendResult(true, false);
  };

  const handleInstructionClose = () => {
    startTimeRef.current = Date.now();
    lastPumpTimeRef.current = Date.now();
    setPhase("playing");
  };

  const handleQuestionnaireSubmit = (response: any) => {
    setPhase("done");
    // Need to compute final results including current state
    const allResults = results;
    const collected = allResults.filter(r => r.collected);
    const popped = allResults.filter(r => !r.collected);
    const totalPumpsAll = allResults.reduce((s, r) => s + r.pumps, 0);
    const avgPumps = allResults.length > 0 ? Math.round(totalPumpsAll / allResults.length * 10) / 10 : 0;
    const avgPumpsCollected = collected.length > 0
      ? Math.round(collected.reduce((s, r) => s + r.pumps, 0) / collected.length * 10) / 10 : 0;
    const earnings = collected.reduce((s, r) => s + r.earnings, 0);
    const popRate = allResults.length > 0 ? Math.round(popped.length / allResults.length * 100) : 0;
    const score = balloonCount > 0 ? Math.round(collected.length / balloonCount * 100) : 0;

    const duration = Date.now() - startTimeRef.current;
    const payload: any = {
      duration,
      timestamp: Date.now(),
      static_data: {
        total_earnings: earnings,
        total_pumps: totalPumpsAll,
        balloons_collected: collected.length,
        balloons_popped: popped.length,
        total_balloons: allResults.length,
        avg_pumps: avgPumps,
        avg_pumps_collected: avgPumpsCollected,
        pop_rate: popRate,
        balloon_count: balloonCount,
        breakpoint_mean: breakpointMean,
        breakpoint_std: breakpointStd,
        breakpoints: breakpointsRef.current,
        balloon_results: allResults,
        correct_answers: collected.length,
        total_questions: allResults.length,
        wrong_answers: popped.length,
        score,
        point: score >= 50 ? 2 : 1,
        questionnaire: response,
      },
      temporal_slices: routesRef.current,
      ...(showForward && { forward: false }),
      done: true,
    };
    parent.postMessage(JSON.stringify(payload), "*");
  };

  const isGameActive = phase === "playing";
  const isBurst = phase === "burst";
  const isGameOver = phase === "gameOver";

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <nav className="back-link" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </nav>
        )}
        {i18n.t("BALLOON_RISK")}
        {showForward && (
          <nav className="home-link-forward" onClick={handleForward}>
            <FontAwesomeIcon icon={faArrowRight} />
          </nav>
        )}
        <nav className="home-link" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faRedo} />
        </nav>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="level-badge">
          {i18n.t("BALLOON_NUMBER", {
            current: Math.min(balloonIndex + 1, balloonCount),
            total: balloonCount,
          })}
        </div>
        <div className="level-badge">
          {i18n.t("TOTAL_POINTS")}: {totalEarnings}
        </div>
      </div>

      {/* Instruction Modal */}
      {phase === "instructions" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={i18n.t("INSTRUCTIONS_TEXT")}
          language={language}
        />
      )}

      {/* Game Area */}
      <div className="game-container">
        <div className="balloon-area">
          {/* Game Over overlay */}
          {isGameOver && (
            <div className="balloon-overlay">
              <span className="balloon-overlay-text">
                {i18n.t("GAME_OVER")}
              </span>
            </div>
          )}

          {/* Pop animation on burst */}
          {isBurst && (
            <div className="pop-effect">
              <div className="pop-ring" />
              <div className="pop-particle p1" />
              <div className="pop-particle p2" />
              <div className="pop-particle p3" />
              <div className="pop-particle p4" />
              <div className="pop-particle p5" />
              <div className="pop-particle p6" />
              <div className="pop-particle p7" />
              <div className="pop-particle p8" />
            </div>
          )}

          {/* Balloon + string (float up together on collect) */}
          <div className={`balloon-with-string${isCollecting ? " balloon-floating" : ""}${isBurst ? " balloon-popping" : ""}`}>
            <div className="balloon-visual">
              <BalloonSVG width={balloonWidth} burst={isGameOver} />
            </div>
            {!isGameOver && (
              <svg className="balloon-string" width="20" height="60" viewBox="0 0 20 60">
                <path
                  d="M10 0 Q5 15 10 30 Q15 45 10 60"
                  stroke="#aaa" strokeWidth="1.5" fill="none"
                />
              </svg>
            )}
          </div>

          {/* Current pumps indicator */}
          <div className="current-pumps">
            <span className="current-pumps-value">{pumps}</span>
            <span className="current-pumps-label">{i18n.t("CURRENT_POINTS")}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="action-buttons">
          <div className="pump-wrapper">
            <svg
              className={`pump-handle${isPumping ? " pump-pressed" : ""}`}
              viewBox="0 0 60 50" width="60" height="50"
            >
              {/* Rod */}
              <rect x="26" y="16" width="8" height="34" rx="2" fill="#888" />
              {/* Handle grip */}
              <rect x="10" y="2" width="40" height="16" rx="6" fill="#359FFE" stroke="#2180d4" strokeWidth="1.5" />
            </svg>
            <button
              className="btn-pump"
              onClick={pumpBalloon}
              disabled={!isGameActive || isCollecting}
            >
              {i18n.t("PUMP_UP_BALLOON")}
            </button>
          </div>
          <button
            className="btn-collect"
            onClick={collectPoints}
            disabled={!isGameActive || pumps === 0 || isCollecting}
          >
            {i18n.t("COLLECT_POINTS")}
          </button>
        </div>
      </div>

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <Questionnaire
          show={true}
          language={language}
          setResponse={handleQuestionnaireSubmit}
        />
      )}
    </div>
  );
};

export default Board;
