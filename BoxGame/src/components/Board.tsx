import React, { useState, useEffect, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import BlockGrid from "./BlockGrid";
import i18n from "../i18n";
import "./SpatialSpan.css";

type Phase =
  | "instructions"
  | "showing"
  | "responding"
  | "feedback"
  | "gameOver"
  | "questionnaire"
  | "done";

interface LevelResult {
  level: number;
  span: number;
  correct: boolean;
  taps: number;
  time_ms: number;
}

interface TemporalSlice {
  duration: number;
  item: number;
  level: number;
  type: boolean;
  value: null;
  span: number;
  tap_index: number;
}

function getRandomSequence(count: number, min: number, max: number): number[] {
  const result: number[] = [];
  while (result.length < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!result.includes(n)) result.push(n);
  }
  return result;
}

interface Props {
  data: any;
}

const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const configuration = data.configuration ?? {};
  const language = configuration.language || "en-US";
  const reverse = settings.reverse_tapping ?? false;
  const startingSpan = settings.starting_span ?? 2;
  const maxLevels = settings.max_levels ?? 5;
  const maxFailures = settings.max_failures ?? 2;
  const noBack = data.noBack ?? false;
  const forwardNav = data.forward ?? false;

  const startTime = useRef(Date.now());

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Phase state ──
  const [phase, setPhase] = useState<Phase>("instructions");

  // ── Game state ──
  const [level, setLevel] = useState(1);
  const [currentSpan, setCurrentSpan] = useState(startingSpan);
  const [sequence, setSequence] = useState<number[]>([]);
  const [failureCount, setFailureCount] = useState(0);
  const [levelResults, setLevelResults] = useState<LevelResult[]>([]);
  const [temporalSlices, setTemporalSlices] = useState<TemporalSlice[]>([]);
  const [maxSpan, setMaxSpan] = useState(0);

  // ── Showing phase ──
  const [highlightedBlock, setHighlightedBlock] = useState<number | null>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Responding phase ──
  const [tapIndex, setTapIndex] = useState(0);
  const [feedbackStates, setFeedbackStates] = useState<Record<number, "correct" | "wrong">>({});
  const [levelCorrect, setLevelCorrect] = useState(true);
  const [levelTapCount, setLevelTapCount] = useState(0);
  const levelStartRef = useRef(0);
  const lastTapTimeRef = useRef(0);

  // ── Feedback phase ──
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackType, setFeedbackType] = useState<"correct" | "wrong">("correct");
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Sent flag ──
  const sentRef = useRef(false);

  // ── Cleanup timers ──
  useEffect(() => {
    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  // ── Start a new level: generate sequence and begin showing ──
  const startLevel = useCallback((lvl: number, span: number) => {
    const seq = getRandomSequence(span, 1, 16);
    setSequence(seq);
    setTapIndex(0);
    setFeedbackStates({});
    setLevelCorrect(true);
    setLevelTapCount(0);
    setHighlightedBlock(null);
    setPhase("showing");

    // Show blocks one at a time
    let i = 0;
    const showNext = () => {
      if (i < seq.length) {
        setHighlightedBlock(seq[i]);
        i++;
        showTimerRef.current = setTimeout(() => {
          setHighlightedBlock(null);
          showTimerRef.current = setTimeout(showNext, 300);
        }, 800);
      } else {
        // Done showing — switch to responding
        setHighlightedBlock(null);
        levelStartRef.current = Date.now();
        lastTapTimeRef.current = Date.now();
        setPhase("responding");
      }
    };
    showTimerRef.current = setTimeout(showNext, 500);
  }, []);

  // ── Handle instruction modal close ──
  const handleInstructionClose = useCallback(() => {
    startLevel(1, startingSpan);
  }, [startLevel, startingSpan]);

  // ── Handle block tap ──
  const handleBlockTap = useCallback((blockNumber: number) => {
    if (phase !== "responding") return;

    const now = Date.now();
    const duration = now - lastTapTimeRef.current;
    lastTapTimeRef.current = now;

    // Determine expected position
    const expectedIndex = reverse ? sequence.length - 1 - tapIndex : tapIndex;
    const expected = sequence[expectedIndex];
    const isCorrect = blockNumber === expected;
    const newTapIndex = tapIndex + 1;
    const newTapCount = levelTapCount + 1;

    // Record temporal slice
    const slice: TemporalSlice = {
      duration,
      item: blockNumber,
      level,
      type: isCorrect,
      value: null,
      span: currentSpan,
      tap_index: newTapIndex,
    };

    setTemporalSlices((prev) => [...prev, slice]);
    setTapIndex(newTapIndex);
    setLevelTapCount(newTapCount);

    // Visual feedback on the tapped block
    setFeedbackStates((prev) => ({
      ...prev,
      [blockNumber]: isCorrect ? "correct" : "wrong",
    }));

    // Clear feedback after brief delay
    setTimeout(() => {
      setFeedbackStates((prev) => {
        const next = { ...prev };
        delete next[blockNumber];
        return next;
      });
    }, 400);

    if (!isCorrect) {
      setLevelCorrect(false);
    }

    // Check if sequence is complete
    if (newTapIndex >= sequence.length) {
      const timeTaken = Date.now() - levelStartRef.current;
      const wasCorrect = isCorrect && levelCorrect;

      const result: LevelResult = {
        level,
        span: currentSpan,
        correct: wasCorrect,
        taps: newTapCount,
        time_ms: timeTaken,
      };

      const newResults = [...levelResults, result];
      setLevelResults(newResults);

      if (wasCorrect) {
        setMaxSpan((prev) => Math.max(prev, currentSpan));
        setFailureCount(0);
      }

      const newFailureCount = wasCorrect ? 0 : failureCount + 1;
      if (!wasCorrect) {
        setFailureCount(newFailureCount);
      }

      // Show feedback — correct gets "Correct!", wrong shows tap score
      const correctTaps = [...temporalSlices, slice].filter(
        (s) => s.level === level && s.type
      ).length;
      setFeedbackText(wasCorrect ? i18n.t("CORRECT") : `${correctTaps} / ${sequence.length}`);
      setFeedbackType(wasCorrect ? "correct" : "wrong");
      setPhase("feedback");

      // After feedback, decide next action
      feedbackTimerRef.current = setTimeout(() => {
        const nextLevel = level + 1;

        // Game over: max failures at same span or all levels done
        if (newFailureCount >= maxFailures || nextLevel > maxLevels) {
          setPhase("gameOver");
          // Auto-transition to questionnaire after 2 seconds
          feedbackTimerRef.current = setTimeout(() => {
            setPhase("questionnaire");
          }, 2000);
          return;
        }

        // Next level
        const nextSpan = wasCorrect ? currentSpan + 1 : currentSpan;
        setLevel(nextLevel);
        setCurrentSpan(nextSpan);
        startLevel(nextLevel, nextSpan);
      }, 1000);
    }
  }, [phase, tapIndex, sequence, reverse, level, currentSpan, levelCorrect, levelTapCount, failureCount, levelResults, maxFailures, maxLevels, startLevel]);

  // ── Send results ──
  const sendResults = useCallback((q: { clarity: number; happiness: number } | null) => {
    if (sentRef.current) return;
    sentRef.current = true;

    const totalCorrect = levelResults.filter((r) => r.correct).length;
    const totalWrong = levelResults.filter((r) => !r.correct).length;
    const totalScore = levelResults
      .filter((r) => r.correct)
      .reduce((sum, r) => sum + r.span, 0);
    const score = levelResults.length > 0
      ? Math.round((totalCorrect / levelResults.length) * 100)
      : 0;

    const payload: any = {
      duration: Date.now() - startTime.current,
      timestamp: Date.now(),
      static_data: {
        mode: reverse ? "backward" : "forward",
        max_span: maxSpan,
        total_score: totalScore,
        levels_completed: levelResults.length,
        total_levels: maxLevels,
        starting_span: startingSpan,
        level_results: levelResults,
        correct_answers: totalCorrect,
        total_questions: levelResults.length,
        wrong_answers: totalWrong,
        score,
        point: score === 100 ? 2 : 1,
        ...(q && { questionnaire: q }),
      },
      temporal_slices: temporalSlices,
      done: true,
    };

    parent.postMessage(JSON.stringify(payload), "*");
  }, [levelResults, temporalSlices, reverse, maxSpan, maxLevels, startingSpan]);

  // ── Handle questionnaire response ──
  const handleQuestionnaireResponse = useCallback((response: { clarity: number; happiness: number }) => {
    setPhase("done");
    sendResults(response);
  }, [sendResults]);

  // ── Navigation handlers ──
  const clickHome = () => window.location.reload();

  const clickBack = () => {
    if (sentRef.current) return;
    sentRef.current = true;
    const totalCorrect = levelResults.filter((r) => r.correct).length;
    const totalWrong = levelResults.filter((r) => !r.correct).length;
    const totalScore = levelResults.filter((r) => r.correct).reduce((sum, r) => sum + r.span, 0);
    const score = levelResults.length > 0 ? Math.round((totalCorrect / levelResults.length) * 100) : 0;

    parent.postMessage(
      JSON.stringify({
        duration: Date.now() - startTime.current,
        timestamp: Date.now(),
        static_data: {
          mode: reverse ? "backward" : "forward",
          max_span: maxSpan,
          total_score: totalScore,
          levels_completed: levelResults.length,
          total_levels: maxLevels,
          starting_span: startingSpan,
          level_results: levelResults,
          correct_answers: totalCorrect,
          total_questions: levelResults.length,
          wrong_answers: totalWrong,
          score,
          point: score === 100 ? 2 : 1,
        },
        temporal_slices: temporalSlices,
        clickBack: true,
      }),
      "*"
    );
  };

  const clickForward = () => {
    if (sentRef.current) return;
    sentRef.current = true;
    const totalCorrect = levelResults.filter((r) => r.correct).length;
    const totalWrong = levelResults.filter((r) => !r.correct).length;
    const totalScore = levelResults.filter((r) => r.correct).reduce((sum, r) => sum + r.span, 0);
    const score = levelResults.length > 0 ? Math.round((totalCorrect / levelResults.length) * 100) : 0;

    parent.postMessage(
      JSON.stringify({
        duration: Date.now() - startTime.current,
        timestamp: Date.now(),
        static_data: {
          mode: reverse ? "backward" : "forward",
          max_span: maxSpan,
          total_score: totalScore,
          levels_completed: levelResults.length,
          total_levels: maxLevels,
          starting_span: startingSpan,
          level_results: levelResults,
          correct_answers: totalCorrect,
          total_questions: levelResults.length,
          wrong_answers: totalWrong,
          score,
          point: score === 100 ? 2 : 1,
        },
        temporal_slices: temporalSlices,
        forward: true,
      }),
      "*"
    );
  };

  // ── Computed values ──
  const mode = reverse ? i18n.t("BACKWARD") : i18n.t("FORWARD");
  const totalScore = levelResults.filter((r) => r.correct).reduce((sum, r) => sum + r.span, 0);

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <span className="back-link" onClick={clickBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
        )}
        {i18n.t("Spatial Span")}
        {forwardNav && (
          <span className="home-link-forward" onClick={clickForward}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        )}
        <span className={forwardNav ? "home-link" : "home-link"} onClick={clickHome}>
          <FontAwesomeIcon icon={faRedo} />
        </span>
      </div>

      {/* Status Bar */}
      {phase !== "instructions" && phase !== "done" && phase !== "questionnaire" && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("LEVEL")} {level} / {maxLevels}
          </span>
          <span className="level-badge">
            {i18n.t("SPAN")}: {currentSpan}
          </span>
          <span className="level-badge">{mode}</span>
        </div>
      )}

      {/* Game Container */}
      <div className="game-container">
        {/* Instructions */}
        {phase === "instructions" && (
          <InstructionModal
            show={true}
            modalClose={handleInstructionClose}
            msg={i18n.t(reverse ? "INSTRUCTIONS_BACKWARD" : "INSTRUCTIONS_FORWARD")}
            language={language}
          />
        )}

        {/* Status text — always rendered to prevent layout jump */}
        {(phase === "showing" || phase === "responding" || phase === "feedback") && (
          <div className={`status-text ${phase === "showing" ? "watch" : phase === "responding" ? "go" : ""}`}>
            {phase === "showing" ? i18n.t("WATCH") : phase === "responding" ? i18n.t("YOUR_TURN") : "\u00A0"}
          </div>
        )}

        {/* Block Grid — visible during showing, responding, feedback */}
        {(phase === "showing" || phase === "responding" || phase === "feedback") && (
          <BlockGrid
            highlightedBlock={highlightedBlock}
            feedbackStates={feedbackStates}
            disabled={phase !== "responding"}
            onBlockTap={handleBlockTap}
          />
        )}

        {/* Feedback overlay */}
        {phase === "feedback" && (
          <div className="phase-overlay" style={{ background: "transparent" }}>
            <div className={`phase-text ${feedbackType}`}>{feedbackText}</div>
          </div>
        )}

        {/* Game Over */}
        {phase === "gameOver" && (
          <div className="game-over-summary">
            <h2>
              {maxSpan > 0 ? i18n.t("CONGRATS") : i18n.t("GAME_OVER")}
            </h2>
            <div className="game-over-stats">
              <div className="stat-card">
                <div className="stat-value">{maxSpan}</div>
                <div className="stat-label">{i18n.t("MAX_SPAN")}</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{totalScore}</div>
                <div className="stat-label">{i18n.t("SPAN")} Total</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{levelResults.filter((r) => r.correct).length}/{levelResults.length}</div>
                <div className="stat-label">{i18n.t("LEVEL")}s</div>
              </div>
            </div>
          </div>
        )}

        {/* Questionnaire */}
        {phase === "questionnaire" && (
          <Questionnaire
            show={true}
            language={language}
            setResponse={handleQuestionnaireResponse}
          />
        )}

        {/* Done — results sent, parent app navigates away */}
      </div>
    </div>
  );
};

export default Board;
