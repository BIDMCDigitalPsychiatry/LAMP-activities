import React, { useEffect, useState, useRef, useCallback } from "react";
import i18n from "../i18n";
import "./SpinWheel.css";

import Header from "./Header";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import WheelCanvas, { WIN_COLORS, LOSE_COLORS } from "./WheelCanvas";
import DrumReel from "./DrumReel";

// ─── Utilities ──────────────────────────────────────────────────────────────

/** Fisher-Yates shuffle (unbiased) */
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Convert settings object to weighted probability array.
 * Returns [[value, probability], ...] pairs.
 */
function buildProbArray(
  data: { sum: number; probability: number } | undefined,
  zeroProbability: number | undefined
): Array<[string, number]> {
  const result: Array<[string, number]> = [];
  if (data && data.probability !== 0) {
    result.push([data.sum.toString(), data.probability / 100]);
  }
  if (zeroProbability && zeroProbability !== 0) {
    result.push(["0", zeroProbability / 100]);
  }
  // If only one entry and probabilities don't sum to 1, fill remaining with other segments
  if (result.length === 0) {
    // fallback: equal probability across all wheel values
    result.push(["0", 0.25], ["50", 0.25], ["100", 0.25], ["250", 0.25]);
  }
  return result;
}

/** Pick a random value from a weighted probability array */
function pickWeighted(array: Array<[string, number]>): string {
  const filled: string[] = [];
  for (const [value, prob] of array) {
    const count = Math.round(prob * 100);
    for (let i = 0; i < count; i++) {
      filled.push(value);
    }
  }
  if (filled.length === 0) return "0";
  return filled[Math.floor(Math.random() * filled.length)];
}

// ─── Wheel segments (visual — all possible values) ──────────────────────────
const WHEEL_SEGMENTS = ["0", "50", "100", "250", "0", "50", "100", "250"];

// ─── Phase state machine ────────────────────────────────────────────────────
type Phase = "instructions" | "playing" | "spinning" | "result" | "gameOver" | "questionnaire" | "done";

// ─── Default settings ───────────────────────────────────────────────────────
const DEFAULT_SETTINGS = {
  spins_per_game: 20,
  balance: 2000,
  high_risk: [{
    win: { probability: 50, sum: 100 },
    loose: { probability: 50, sum: 250 },
    zero: { probability: 50, sum: 0 },
  }],
  low_risk: [{
    win: { probability: 50, sum: 50 },
    loose: { probability: 50, sum: 50 },
    zero: { probability: 50, sum: 0 },
  }],
};

export default function Board({ ...props }: any) {
  // ─── Config ────────────────────────────────────────────────────────────
  const [language, setLanguage] = useState("en-US");
  const [forward] = useState(props?.data?.forward ?? false);
  const settings = props.data?.activity?.settings ?? props.data?.settings ?? DEFAULT_SETTINGS;

  // ─── Phase ─────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instructions");

  // ─── Game state ────────────────────────────────────────────────────────
  const startingBalance = settings.balance ?? 2000;
  const totalSpinsAllowed = settings.spins_per_game ?? 20;
  const [balance, setBalance] = useState(startingBalance);
  const [spinsRemaining, setSpinsRemaining] = useState(totalSpinsAllowed);
  const [spinIndex, setSpinIndex] = useState(0);
  const [selectedButton, setSelectedButton] = useState(0);

  // Per-spin outcomes
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [lossAmount, setLossAmount] = useState<number | null>(null);
  const [netChange, setNetChange] = useState<number | null>(null);

  // Wheel spin triggers
  const [spinWin, setSpinWin] = useState(false);
  const [spinLoss, setSpinLoss] = useState(false);
  const [winTarget, setWinTarget] = useState<string | null>(null);
  const [lossTarget, setLossTarget] = useState<string | null>(null);
  const wheelsFinished = useRef(0);

  // Pending outcome (applied after wheels stop)
  const pendingRef = useRef<{
    winVal: number; lossVal: number; net: number; newBalance: number;
    newSpinIndex: number; newSpinsRemaining: number;
    riskLevel: string; rt: number; buttonIdx: number;
  } | null>(null);

  // Detect mobile for wheel vs drum rendering
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Button-to-risk mapping (shuffled at start)
  const [buttonRiskMap, setButtonRiskMap] = useState<string[]>([]);

  // ─── Timing / routes ──────────────────────────────────────────────────
  const startTimeRef = useRef(0);
  const lastActionTimeRef = useRef(0);
  const routesRef = useRef<any[]>([]);

  // ─── Scoring accumulators ─────────────────────────────────────────────
  const highRiskCountRef = useRef(0);
  const lowRiskCountRef = useRef(0);
  const totalRTRef = useRef(0);

  // ─── Probability arrays (derived from settings) ───────────────────────
  const highRiskWin = buildProbArray(settings.high_risk?.[0]?.win, settings.high_risk?.[0]?.zero?.probability);
  const highRiskLoss = buildProbArray(settings.high_risk?.[0]?.loose, settings.high_risk?.[0]?.zero?.probability);
  const lowRiskWin = buildProbArray(settings.low_risk?.[0]?.win, settings.low_risk?.[0]?.zero?.probability);
  const lowRiskLoss = buildProbArray(settings.low_risk?.[0]?.loose, settings.low_risk?.[0]?.zero?.probability);

  // ─── Language init ────────────────────────────────────────────────────
  useEffect(() => {
    const lang = props.data?.configuration?.language ?? "en-US";
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [props.data]);

  // ─── Shuffle button risk assignments on mount ─────────────────────────
  useEffect(() => {
    setButtonRiskMap(shuffleArray(["high", "high", "low", "low"]));
  }, []);

  // ─── Handle instruction close ─────────────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startTimeRef.current = Date.now();
    lastActionTimeRef.current = Date.now();
    setPhase("playing");
  }, []);

  // ─── Handle button choice ─────────────────────────────────────────────
  const handleChoice = useCallback((buttonIdx: number) => {
    if (phase !== "playing" || spinsRemaining <= 0) return;

    const now = Date.now();
    const rt = now - lastActionTimeRef.current;
    lastActionTimeRef.current = now;

    const riskLevel = buttonRiskMap[buttonIdx];
    setSelectedButton(buttonIdx + 1);

    // Determine outcomes
    let win: string, loss: string;
    if (riskLevel === "high") {
      win = pickWeighted(highRiskWin);
      loss = pickWeighted(highRiskLoss);
    } else {
      win = pickWeighted(lowRiskWin);
      loss = pickWeighted(lowRiskLoss);
    }

    const winVal = parseInt(win, 10);
    const lossVal = parseInt(loss, 10);
    const net = winVal - lossVal;

    // Store pending outcome — applied when wheels stop
    pendingRef.current = {
      winVal, lossVal, net,
      newBalance: balance + net,
      newSpinIndex: spinIndex + 1,
      newSpinsRemaining: spinsRemaining - 1,
      riskLevel, rt, buttonIdx,
    };

    // Clear previous results while spinning
    setWinAmount(null);
    setLossAmount(null);
    setNetChange(null);

    // Trigger wheel spins
    setWinTarget(win);
    setLossTarget(loss);
    wheelsFinished.current = 0;
    setSpinWin(true);
    setSpinLoss(true);
    setPhase("spinning");
  }, [phase, spinsRemaining, balance, spinIndex, buttonRiskMap, highRiskWin, highRiskLoss, lowRiskWin, lowRiskLoss]);

  // ─── Wheel finished callback ──────────────────────────────────────────
  const handleWheelFinished = useCallback(() => {
    wheelsFinished.current++;
    if (wheelsFinished.current >= 2) {
      setSpinWin(false);
      setSpinLoss(false);

      // Apply pending outcome now that wheels have stopped
      const p = pendingRef.current;
      if (p) {
        setWinAmount(p.winVal);
        setLossAmount(p.lossVal);
        setNetChange(p.net);
        setBalance(p.newBalance);
        setSpinIndex(p.newSpinIndex);
        setSpinsRemaining(p.newSpinsRemaining);

        // Accumulate scoring
        if (p.riskLevel === "high") {
          highRiskCountRef.current++;
        } else {
          lowRiskCountRef.current++;
        }
        totalRTRef.current += p.rt;

        // Record route entry
        routesRef.current.push({
          item: p.newSpinIndex,
          duration: p.rt,
          level: p.buttonIdx + 1,
          risk_level: p.riskLevel,
          win_amount: p.winVal,
          loss_amount: p.lossVal,
          net_change: p.net,
          balance_after: p.newBalance,
          type: p.net >= 0,
          value: null,
        });

        pendingRef.current = null;
      }

      setPhase("result");

      // Auto-advance after showing result
      setTimeout(() => {
        if (p && p.newSpinsRemaining <= 0) {
          setPhase("gameOver");
        } else {
          setPhase("playing");
          setSelectedButton(0);
        }
      }, 1500);
    }
  }, []);

  // ─── Game over → questionnaire after brief display ────────────────────
  useEffect(() => {
    if (phase === "gameOver") {
      const timer = setTimeout(() => {
        setPhase("questionnaire");
      }, 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [phase]);

  // ─── Send result ──────────────────────────────────────────────────────
  const sendResult = useCallback((isNav: boolean, isBack: boolean, questionnaireData?: any) => {
    const boxes = [...routesRef.current];
    boxes.push({ type: "manual_exit", value: isNav });

    const totalSpinsDone = highRiskCountRef.current + lowRiskCountRef.current;
    const riskRate = totalSpinsDone > 0 ? +(highRiskCountRef.current / totalSpinsDone).toFixed(3) : 0;
    const meanRT = totalSpinsDone > 0 ? Math.round(totalRTRef.current / totalSpinsDone) : 0;

    parent.postMessage(
      JSON.stringify({
        duration: Date.now() - startTimeRef.current,
        static_data: {
          // ── Standard scores ──
          final_balance: balance,
          starting_balance: startingBalance,
          net_earnings: balance - startingBalance,
          total_spins: totalSpinsDone,
          total_high_risk_choices: highRiskCountRef.current,
          total_low_risk_choices: lowRiskCountRef.current,
          risk_taking_rate: riskRate,
          mean_reaction_time: meanRT,
          // ── Legacy fields (dashboard compatibility) ──
          correct_answers: totalSpinsDone,
          total_questions: totalSpinsAllowed,
          wrong_answers: 0,
          score: Math.max(0, Math.round(((balance - startingBalance) / startingBalance) * 100 + 50)),
          point: balance >= startingBalance ? 2 : 1,
          ...(questionnaireData && { questionnaire: questionnaireData }),
        },
        temporal_slices: boxes,
        timestamp: Date.now(),
        ...(forward && { forward: !isBack }),
        ...(!isNav && { done: true }),
        ...(isBack && { clickBack: true }),
      }),
      "*"
    );
  }, [balance, startingBalance, totalSpinsAllowed, forward]);

  // ─── Questionnaire callback ───────────────────────────────────────────
  const handleQuestionnaireResponse = useCallback((response: any) => {
    setPhase("done");
    sendResult(false, false, response);
  }, [sendResult]);

  // ─── Navigation callbacks ─────────────────────────────────────────────
  const handleBack = useCallback(() => {
    sendResult(true, true);
  }, [sendResult]);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleForward = useCallback(() => {
    sendResult(true, false);
  }, [sendResult]);

  // ─── Format balance display ───────────────────────────────────────────
  const formatMoney = (amount: number) => {
    if (amount < 0) return "-$" + Math.abs(amount);
    return "$" + amount;
  };

  // ─── Render ───────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#f8f9fb" }}>
      {/* Instruction Modal */}
      {phase === "instructions" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={i18n.t("INSTRUCTIONS")}
          language={language}
        />
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <Questionnaire
          show={true}
          language={language}
          setResponse={handleQuestionnaireResponse}
        />
      )}

      {/* Main game UI */}
      {phase !== "instructions" && phase !== "done" && (
        <div className="game-shell">
          <Header
            onBack={handleBack}
            onRefresh={handleRefresh}
            onForward={forward ? handleForward : undefined}
            showForward={forward}
          />

          <div className="game-container">
            {/* Balance */}
            <div className="balance-card">
              <div className="balance-label">{i18n.t("TOTAL_BALANCE")}</div>
              <div className={`balance-amount ${balance < 0 ? "negative" : ""}`}>
                {formatMoney(balance)}
              </div>
            </div>

            {/* Spins remaining */}
            <div className="spins-badge">
              {i18n.t("TOTAL_SPINS")}: <strong>{spinsRemaining}</strong> / {totalSpinsAllowed}
            </div>

            {/* Game Over display */}
            {phase === "gameOver" && (
              <div className="game-over-card">
                <div className="game-over-title">{i18n.t("GAME_OVER")}</div>
                <div className="game-over-subtitle">{i18n.t("FINAL_BALANCE")}</div>
                <div className={`game-over-balance ${balance >= startingBalance ? "positive" : "negative"}`}>
                  {formatMoney(balance)}
                </div>
                <div className="game-over-subtitle">
                  {balance >= startingBalance
                    ? i18n.t("NET_GAIN", { amount: formatMoney(balance - startingBalance) })
                    : i18n.t("NET_LOSS", { amount: formatMoney(startingBalance - balance) })}
                </div>
              </div>
            )}

            {/* Wheels + buttons (hide during game over) */}
            {phase !== "gameOver" && phase !== "questionnaire" && (
              <>
                {/* Wheels (desktop) or Drum reels (mobile) */}
                <div className={isMobile ? "drums-area" : "wheels-area"}>
                  <div className={isMobile ? "drum-column" : "wheel-column"}>
                    <div className="wheel-label win">{i18n.t("YOU_WON")}</div>
                    {isMobile ? (
                      <DrumReel
                        segments={WHEEL_SEGMENTS}
                        winningSegment={winTarget}
                        onFinished={handleWheelFinished}
                        spin={spinWin}
                        reelId="drum-win"
                        variant="win"
                      />
                    ) : (
                      <WheelCanvas
                        segments={WHEEL_SEGMENTS}
                        segColors={WIN_COLORS}
                        winningSegment={winTarget}
                        onFinished={handleWheelFinished}
                        spin={spinWin}
                        canvasId="wheel-win"
                      />
                    )}
                    <div className="wheel-result win-result">
                      {phase === "result" && winAmount !== null ? "+" + formatMoney(winAmount) : "\u00A0"}
                    </div>
                  </div>
                  <div className={isMobile ? "drum-column" : "wheel-column"}>
                    <div className="wheel-label lose">{i18n.t("YOU_LOSE")}</div>
                    {isMobile ? (
                      <DrumReel
                        segments={WHEEL_SEGMENTS}
                        winningSegment={lossTarget}
                        onFinished={handleWheelFinished}
                        spin={spinLoss}
                        reelId="drum-loss"
                        variant="lose"
                      />
                    ) : (
                      <WheelCanvas
                        segments={WHEEL_SEGMENTS}
                        segColors={LOSE_COLORS}
                        winningSegment={lossTarget}
                        onFinished={handleWheelFinished}
                        spin={spinLoss}
                        canvasId="wheel-loss"
                      />
                    )}
                    <div className="wheel-result loss-result">
                      {phase === "result" && lossAmount !== null ? "-" + formatMoney(lossAmount) : "\u00A0"}
                    </div>
                  </div>
                </div>

                {/* Net change */}
                <div className={`net-change ${netChange !== null ? (netChange > 0 ? "positive" : netChange < 0 ? "negative" : "zero") : ""}`}>
                  {phase === "result" && netChange !== null
                    ? (netChange >= 0 ? "+" : "") + formatMoney(netChange)
                    : "\u00A0"}
                </div>

                {/* Choice buttons */}
                <div className="choice-buttons">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      className={`choice-btn ${selectedButton === idx + 1 ? "selected" : ""}`}
                      disabled={phase !== "playing"}
                      onClick={() => handleChoice(idx)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
