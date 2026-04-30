import React, { useEffect, useState, useRef, useCallback } from "react";
import i18n from "../i18n";
import "./DigitSpan.css";

import Header from "./Header";
import { InstructionModal } from "./InstructionModal";
import LevelBadge from "./LevelBadge";
import NumberGrid from "./NumberGrid";
import ModeTransitionOverlay from "./ModeTransitionOverlay";
import { Questionnaire } from "./Questionnaire";
import { playSequence } from "./AudioSequencePlayer";

// ─── Utilities (preserved) ───────────────────────────────────────────────────

export function getRandomNumbers(dcount: number, min: number, max: number) {
  const randomArray: Array<number> = [];
  for (let i = min; i <= dcount; i++) {
    randomArray[i - 1] = randomNumber(max, 0, randomArray);
  }
  return randomArray;
}

function randomNumber(max: number, min: number, randomArray: Array<number>): number {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomArray.indexOf(num) >= 0 || num === 0
    ? randomNumber(max, min, randomArray)
    : num;
}

// ─── Phase state machine ─────────────────────────────────────────────────────
// instructions -> listening -> answering -> evaluating -> (listening | modeTransition | questionnaire)
type Phase =
  | "instructions"
  | "listening"
  | "answering"
  | "evaluating"
  | "modeTransition"
  | "questionnaire"
  | "done";

const ANSWER_TIMEOUT_MS = 30_000;

export default function Board({ ...props }) {
  // ─── Config ──────────────────────────────────────────────────────────
  const [language, setLanguage] = useState("en-US");
  const [forward] = useState(props?.data?.forward ?? true);
  const settings = props?.data?.activity?.settings ?? props?.data?.settings ?? {};
  const allowDelete = settings.allow_delete !== undefined ? settings.allow_delete : true;

  // ─── Phase ───────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instructions");

  // ─── Game state ──────────────────────────────────────────────────────
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentDigit, setCurrentDigit] = useState(0); // digit being played (0 = none)
  const [sequenceLength, setSequenceLength] = useState(3);
  const [questionSequence, setQuestionSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(0);
  const [mode, setMode] = useState(0); // 0 = forward, 1 = backward
  const [errorCount, setErrorCount] = useState(0);
  const [successTaps, setSuccessTaps] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0); // count of total expected digits across all rounds
  const [questions, setQuestions] = useState<string[]>([]);
  // ─── Standard scoring state ─────────────────────────────────────────
  const [forwardTrialsCorrect, setForwardTrialsCorrect] = useState(0);
  const [backwardTrialsCorrect, setBackwardTrialsCorrect] = useState(0);
  const [forwardSpan, setForwardSpan] = useState(0);
  const [backwardSpan, setBackwardSpan] = useState(0);
  // ─── Timing / routes ────────────────────────────────────────────────
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [lastClickTime, setLastClickTime] = useState(new Date().getTime());
  const routesRef = useRef<any[]>([]);

  // ─── Refs for latest state in callbacks ──────────────────────────────
  const modeRef = useRef(mode);
  const levelRef = useRef(level);
  const errorCountRef = useRef(errorCount);
  const sequenceLengthRef = useRef(sequenceLength);
  const successTapsRef = useRef(successTaps);
  const totalQuestionsRef = useRef(totalQuestions);
  const questionsRef = useRef(questions);
  const questionSequenceRef = useRef(questionSequence);
  const answersRef = useRef(answers);
  const startTimeRef = useRef(startTime);
  const forwardTrialsCorrectRef = useRef(forwardTrialsCorrect);
  const backwardTrialsCorrectRef = useRef(backwardTrialsCorrect);
  const forwardSpanRef = useRef(forwardSpan);
  const backwardSpanRef = useRef(backwardSpan);

  // Keep refs in sync
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { levelRef.current = level; }, [level]);
  useEffect(() => { errorCountRef.current = errorCount; }, [errorCount]);
  useEffect(() => { sequenceLengthRef.current = sequenceLength; }, [sequenceLength]);
  useEffect(() => { successTapsRef.current = successTaps; }, [successTaps]);
  useEffect(() => { totalQuestionsRef.current = totalQuestions; }, [totalQuestions]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { questionSequenceRef.current = questionSequence; }, [questionSequence]);
  useEffect(() => { answersRef.current = answers; }, [answers]);
  useEffect(() => { startTimeRef.current = startTime; }, [startTime]);
  useEffect(() => { forwardTrialsCorrectRef.current = forwardTrialsCorrect; }, [forwardTrialsCorrect]);
  useEffect(() => { backwardTrialsCorrectRef.current = backwardTrialsCorrect; }, [backwardTrialsCorrect]);
  useEffect(() => { forwardSpanRef.current = forwardSpan; }, [forwardSpan]);
  useEffect(() => { backwardSpanRef.current = backwardSpan; }, [backwardSpan]);

  // Timeout ref for no-response
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Abort controller for audio
  const abortRef = useRef<AbortController | null>(null);

  // ─── Language init ───────────────────────────────────────────────────
  useEffect(() => {
    const configuration = props.data?.configuration ?? null;
    const lang = configuration?.language ?? "en-US";
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [props.data]);

  // ─── Start a new round (generate sequence, play audio) ──────────────
  const startRound = useCallback((seqLen: number, currentLevel: number, currentMode: number) => {
    const randomPicks = getRandomNumbers(seqLen, 1, 9);
    setQuestionSequence(randomPicks);
    setQuestions(prev => [...prev, randomPicks.join(",")]);
    setLevel(currentLevel + 1);
    setTotalQuestions(prev => prev + seqLen); // total expected digits for score/wrong_answers math
    setAnswers([]);
    setLastClickTime(new Date().getTime());
    setPhase("listening");

    // Play audio sequence, then transition to answering
    const controller = new AbortController();
    abortRef.current = controller;

    playSequence(randomPicks, 400, controller.signal, (digit) => setCurrentDigit(digit))
      .then(() => {
        if (!controller.signal.aborted) {
          setPhase("answering");
          setLastClickTime(new Date().getTime());

          // BUG FIX: 30-second timeout for no response
          timeoutRef.current = setTimeout(() => {
            // Treat as wrong answer
            handleSequenceComplete([], randomPicks, currentMode, seqLen);
          }, ANSWER_TIMEOUT_MS);
        }
      })
      .catch(() => {
        // Audio was aborted (e.g., user navigated away)
      });
  }, []);

  // ─── Evaluate completed sequence ────────────────────────────────────
  const handleSequenceComplete = useCallback((
    currentAnswers: number[],
    currentSequence: number[],
    currentMode: number,
    currentSeqLen: number
  ) => {
    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setPhase("evaluating");

    const isCorrect = currentMode === 0
      ? JSON.stringify(currentAnswers) === JSON.stringify(currentSequence)
      : JSON.stringify([...currentAnswers].reverse()) === JSON.stringify(currentSequence);

    let newErrorCount = errorCountRef.current;
    let newSeqLen = currentSeqLen;

    if (isCorrect) {
      newSeqLen = currentSeqLen + 1;
      // Standard scoring: count trial pass + update longest span
      if (currentMode === 0) {
        setForwardTrialsCorrect(prev => prev + 1);
        setForwardSpan(prev => Math.max(prev, currentSeqLen));
      } else {
        setBackwardTrialsCorrect(prev => prev + 1);
        setBackwardSpan(prev => Math.max(prev, currentSeqLen));
      }
    } else {
      newErrorCount = errorCountRef.current + 1;
      setErrorCount(newErrorCount);
    }

    // Legacy per-digit scoring (for dashboard backward compatibility)
    if (isCorrect) {
      setSuccessTaps(prev => prev + currentSequence.length);
    } else {
      const expected = currentMode === 0 ? currentSequence : [...currentSequence].reverse();
      let correct = 0;
      for (let i = 0; i < currentAnswers.length; i++) {
        if (currentAnswers[i] === expected[i]) correct++;
      }
      setSuccessTaps(prev => prev + correct);
    }

    setTimeout(() => {
      // Check end conditions: 2 errors or max 9 digits
      if (newErrorCount > 1 || newSeqLen > 9) {
        if (currentMode === 0) {
          // Switch to backward mode
          setErrorCount(0);
          setMode(1);
          setSequenceLength(2);
          setPhase("modeTransition");
        } else {
          // Game over - show questionnaire
          setPhase("questionnaire");
        }
      } else {
        // Continue with next round
        setSequenceLength(newSeqLen);
        startRound(newSeqLen, levelRef.current, currentMode);
      }
    }, 500);
  }, [startRound]);

  // ─── Handle digit tap (no feedback, no undo — matches standardized administration) ──
  const handleTap = useCallback((num: number): void => {
    const currentAnswers = [...answersRef.current, num];
    const currentSequence = questionSequenceRef.current;

    // Don't accept more taps than slots
    if (currentAnswers.length > currentSequence.length) return;

    setAnswers(currentAnswers);

    const currentMode = modeRef.current;
    const expected = currentMode === 0 ? currentSequence : [...currentSequence].reverse();
    const idx = currentAnswers.length - 1;
    const isCorrect = idx < expected.length && currentAnswers[idx] === expected[idx];

    // Record route
    const now = new Date().getTime();
    routesRef.current.push({
      duration: now - lastClickTime,
      item: num,
      level: levelRef.current,
      type: isCorrect,
      value: null,
      mode: currentMode,
    });
    setLastClickTime(now);

    // When all slots filled
    if (currentAnswers.length === currentSequence.length) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // If delete is disabled, auto-submit like before
      if (!allowDelete) {
        setTimeout(() => {
          handleSequenceComplete(
            currentAnswers,
            currentSequence,
            currentMode,
            sequenceLengthRef.current
          );
        }, 300);
      }
    }
  }, [lastClickTime, handleSequenceComplete, allowDelete]);

  // ─── Handle delete (remove last entered digit) ─────────────────────
  const handleDelete = useCallback(() => {
    if (!allowDelete || phase !== "answering") return;
    const current = answersRef.current;
    if (current.length === 0) return;

    const updated = current.slice(0, -1);
    setAnswers(updated);

    // Record delete in routes
    const now = new Date().getTime();
    routesRef.current.push({
      duration: now - lastClickTime,
      item: "delete",
      level: levelRef.current,
      type: false,
      value: null,
      mode: modeRef.current,
    });
    setLastClickTime(now);
  }, [allowDelete, phase, lastClickTime]);

  // ─── Handle submit (user confirms answer) ──────────────────────────
  const handleSubmit = useCallback(() => {
    if (phase !== "answering") return;
    const currentAnswers = answersRef.current;
    const currentSequence = questionSequenceRef.current;
    if (currentAnswers.length !== currentSequence.length) return;
    handleSequenceComplete(
      currentAnswers,
      currentSequence,
      modeRef.current,
      sequenceLengthRef.current
    );
  }, [phase, handleSequenceComplete]);

  // ─── Send game result ───────────────────────────────────────────────
  const sendGameResult = useCallback((status?: boolean, isBack?: boolean, questionnaireData?: any) => {
    const boxes = [...routesRef.current];
    const route = { type: "manual_exit", value: status ?? false };
    boxes.push(route);

    const tq = totalQuestionsRef.current;
    const st = successTapsRef.current;
    const gameScore = tq > 0 ? Math.round((st / tq) * 100) : 0;
    let points = gameScore === 100 ? 2 : 1;

    // Best span calculation
    let bestForward = { span: 0, duration: Infinity, details: [] as any[] };
    let bestBackward = { span: 0, duration: Infinity, details: [] as any[] };
    const groupedByLevel: Record<string, any[]> = {};

    boxes.forEach((entry) => {
      if (entry.type === "manual_exit") return;
      if (!entry.item || typeof entry.level !== "number" || typeof entry.mode !== "number") return;
      const key = `${entry.mode}-${entry.level}`;
      if (!groupedByLevel[key]) groupedByLevel[key] = [];
      groupedByLevel[key].push(entry);
    });

    Object.entries(groupedByLevel).forEach(([_, entries]) => {
      const allCorrect = entries.every((e) => e.type === true);
      if (!allCorrect) return;
      const totalDuration = entries.reduce((sum, e) => sum + (e.duration || 0), 0);
      const spanLength = entries.length;
      const entryMode = entries[0].mode;

      if (entryMode === 0) {
        if (spanLength > bestForward.span || (spanLength === bestForward.span && totalDuration < bestForward.duration)) {
          bestForward = { span: spanLength, duration: totalDuration, details: entries };
        }
      } else if (entryMode === 1) {
        if (spanLength > bestBackward.span || (spanLength === bestBackward.span && totalDuration < bestBackward.duration)) {
          bestBackward = { span: spanLength, duration: totalDuration, details: entries };
        }
      }
    });

    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - startTimeRef.current,
        static_data: {
          // ── Standard Digit Span scores ──
          forward_span: forwardSpanRef.current,
          backward_span: backwardSpanRef.current,
          forward_trials_correct: forwardTrialsCorrectRef.current,
          backward_trials_correct: backwardTrialsCorrectRef.current,
          total_raw_score: forwardTrialsCorrectRef.current + backwardTrialsCorrectRef.current,
          // ── Legacy fields (dashboard compatibility) ──
          correct_answers: st,
          point: points,
          score: gameScore,
          total_questions: tq,
          wrong_answers: tq - st,
          bestForwardDigitSpan: bestForward.details,
          bestBackwardDigitSpan: bestBackward.details,
          question_sequences: questionsRef.current,
          ...(questionnaireData && { questionnaire: questionnaireData }),
        },
        temporal_slices: boxes,
        timestamp: new Date().getTime(),
        ...(forward && { forward: !isBack }),
        ...(!status && { done: true }),
        ...(isBack && { clickBack: true }),
      }),
      "*"
    );
  }, [forward]);

  // ─── Questionnaire callback ─────────────────────────────────────────
  const handleQuestionnaireResponse = useCallback((response: any) => {
    setPhase("done");
    sendGameResult(false, false, response);
  }, [sendGameResult]);

  // ─── Navigation callbacks ───────────────────────────────────────────
  const handleBack = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    sendGameResult(true, true);
  }, [sendGameResult]);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleForward = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    sendGameResult(true, false);
  }, [sendGameResult]);

  // ─── Instruction modal close → start first round ────────────────────
  const handleInstructionClose = useCallback(() => {
    setStartTime(new Date().getTime());
    startRound(3, 0, 0);
  }, [startRound]);

  // ─── Mode transition → start backward rounds ────────────────────────
  const handleModeReady = useCallback(() => {
    setStartTime(new Date().getTime());
    startRound(2, levelRef.current, 1);
  }, [startRound]);

  // ─── Cleanup on unmount ─────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Instruction Modal */}
      {phase === "instructions" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={i18n.t("INSTRUCTIONS")}
          language={language}
        />
      )}

      {/* Mode Transition Overlay */}
      {phase === "modeTransition" && (
        <ModeTransitionOverlay onReady={handleModeReady} />
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <Questionnaire
          show={true}
          language={language}
          setResponse={handleQuestionnaireResponse}
        />
      )}

      {/* Main game UI - show when not in instructions/done */}
      {phase !== "instructions" && phase !== "done" && (
        <div>
          <Header
            onBack={handleBack}
            onRefresh={handleRefresh}
            onForward={forward ? handleForward : undefined}
            showForward={forward}
          />

          <LevelBadge level={level} mode={mode} />

          {/* Digit prompt: "Listen..." with visible digit beside it, then "Your turn!" */}
          <div className={`digit-prompt ${phase === "listening" ? "digit-prompt-listening" : ""}`}>
            {phase === "listening" && (
              <>
                {i18n.t("Listen...")}
                {currentDigit > 0 && (
                  <span className="digit-prompt-number">{currentDigit}</span>
                )}
              </>
            )}
            {phase === "answering" && i18n.t("Your turn!")}
          </div>

          <NumberGrid
            disabled={phase !== "answering"}
            answers={answers}
            totalSlots={questionSequence.length}
            onTap={handleTap}
            onDelete={allowDelete ? handleDelete : undefined}
            onSubmit={allowDelete ? handleSubmit : undefined}
          />
        </div>
      )}
    </div>
  );
}
