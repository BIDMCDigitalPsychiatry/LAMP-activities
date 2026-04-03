import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import ScratchCanvas, { ScratchPoint } from "./ScratchCanvas";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import { getShuffledBackgrounds, Background, ElementRegion } from "./backgrounds";
import "./ScratchImage.css";

type Phase =
  | "instructions"
  | "scratching"     // actively scratching — continues after threshold
  | "questionnaire"
  | "done";

interface CardResult {
  card: number;
  background_name: string;
  time_ms: number;
  final_pct: number;       // how much they actually scratched (may exceed threshold)
  threshold_reached: boolean;
  elements: ElementRegion[];  // visual element positions for scratch pattern analysis
  scratch_path: ScratchPoint[];  // sampled pointer trajectory (normalized 0–1 coords + ms)
}

interface Props {
  data: any;
}

const Board: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>("instructions");
  const [cardIndex, setCardIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [thresholdReached, setThresholdReached] = useState(false);
  const [cardResults, setCardResults] = useState<CardResult[]>([]);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [noBack, setNoBack] = useState(false);
  const [hasForward, setHasForward] = useState(false);

  const startTimeRef = useRef(Date.now());
  const cardStartRef = useRef(Date.now());
  const sentRef = useRef(false);
  const settingsRef = useRef<any>({});
  const languageRef = useRef("en-US");
  const progressRef = useRef(0);
  const scratchPathRef = useRef<ScratchPoint[]>([]);

  // Extract settings on mount
  useEffect(() => {
    const settings = data.activity?.settings ?? data.settings ?? {};
    settingsRef.current = settings;
    const config = data.configuration;
    const language = config?.language ?? "en-US";
    languageRef.current = language;
    i18n.changeLanguage(language);
    setNoBack(data.noBack ?? false);
    setHasForward(data.forward ?? false);
    startTimeRef.current = Date.now();

    const numCards = Math.min(5, Math.max(1, settings.num_cards ?? 3));
    setBackgrounds(getShuffledBackgrounds(numCards));
  }, [data]);

  const threshold = settingsRef.current.threshold ?? 80;
  const numCards = Math.min(5, Math.max(1, settingsRef.current.num_cards ?? 3));
  const pathIntervalMs = Math.min(200, Math.max(33, settingsRef.current.scratch_path_interval_ms ?? 50));

  const handleProgress = useCallback((pct: number) => {
    setProgress(pct);
    progressRef.current = pct;
  }, []);

  const handleThresholdReached = useCallback(() => {
    setThresholdReached(true);
  }, []);

  const handlePathUpdate = useCallback((path: ScratchPoint[]) => {
    scratchPathRef.current = path;
  }, []);

  /** Record the current card and advance to the next or finish */
  const finishCurrentCard = useCallback(() => {
    const elapsed = Date.now() - cardStartRef.current;
    const result: CardResult = {
      card: cardIndex + 1,
      background_name: backgrounds[cardIndex]?.name ?? "unknown",
      time_ms: elapsed,
      final_pct: progressRef.current,
      threshold_reached: thresholdReached,
      elements: backgrounds[cardIndex]?.elements ?? [],
      scratch_path: scratchPathRef.current,
    };
    const updatedResults = [...cardResults, result];
    setCardResults(updatedResults);

    if (cardIndex + 1 < numCards && cardIndex + 1 < backgrounds.length) {
      // Next card
      setCardIndex((prev) => prev + 1);
      setProgress(0);
      setThresholdReached(false);
      progressRef.current = 0;
      scratchPathRef.current = [];
      cardStartRef.current = Date.now();
      // Phase stays "scratching" — canvas remounts because background changes
    } else {
      // All cards done — go to questionnaire
      setPhase("questionnaire");
    }
  }, [cardIndex, cardResults, backgrounds, numCards, thresholdReached]);

  const sendResults = useCallback(
    (
      questionnaire: { clarity: number; happiness: number } | null,
      allCards?: CardResult[],
      isBack?: boolean,
      isNav?: boolean
    ) => {
      if (sentRef.current) return;
      sentRef.current = true;

      const totalDuration = Date.now() - startTimeRef.current;
      const cards = allCards ?? cardResults;
      const totalScratchTime = cards.reduce((s, c) => s + c.time_ms, 0);
      const completed = cards.filter((c) => c.threshold_reached);

      const temporalSlices = cards.map((c) => ({
        duration: c.time_ms,
        item: c.card,
        level: 1,
        type: c.threshold_reached,
        value: c.final_pct,
        background_name: c.background_name,
      }));

      const payload: any = {
        timestamp: startTimeRef.current,
        duration: totalDuration,
        static_data: {
          num_cards: numCards,
          cards_completed: completed.length,
          cards_attempted: cards.length,
          total_scratch_time_ms: totalScratchTime,
          avg_scratch_time_ms:
            cards.length > 0
              ? Math.round(totalScratchTime / cards.length)
              : 0,
          threshold,
          card_results: cards,
          correct_answers: completed.length,
          total_questions: numCards,
          wrong_answers: numCards - completed.length,
          score:
            numCards > 0 ? Math.round((completed.length / numCards) * 100) : 0,
          point: completed.length > 0 ? 2 : 0,
          ...(questionnaire && { questionnaire }),
        },
        temporal_slices: temporalSlices,
      };

      if (hasForward) payload.forward = !isBack;
      if (!isNav) payload.done = true;
      if (isBack) payload.clickBack = true;

      parent.postMessage(JSON.stringify(payload), "*");
    },
    [cardResults, threshold, numCards, hasForward]
  );

  const handleQuestionnaireResponse = useCallback(
    (response: { clarity: number; happiness: number }) => {
      setPhase("done");
      sendResults(response, cardResults);
    },
    [sendResults, cardResults]
  );

  const handleNavBack = useCallback(() => {
    sendResults(null, cardResults, true, true);
  }, [sendResults, cardResults]);

  const handleNavForward = useCallback(() => {
    sendResults(null, cardResults, false, true);
  }, [sendResults, cardResults]);

  const handleNavHome = useCallback(() => {
    sendResults(null, cardResults, false, false);
  }, [sendResults, cardResults]);

  const handleInstructionClose = useCallback(() => {
    cardStartRef.current = Date.now();
    setPhase("scratching");
  }, []);

  const currentBg = backgrounds[cardIndex];

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <div className="back-link" onClick={handleNavBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
        )}
        <span>{t("Scratch Card")}</span>
        {hasForward && (
          <div className="home-link-forward" onClick={handleNavForward}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        )}
        <div className="home-link" onClick={handleNavHome}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      </div>

      {/* Instruction modal */}
      {phase === "instructions" && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={t("INSTRUCTION_TEXT")}
          language={languageRef.current}
        />
      )}

      {/* Scratch phase */}
      {phase === "scratching" && currentBg && (
        <>
          {/* Progress bar + card counter */}
          <div className="progress-bar-container">
            <span className="card-counter">
              {cardIndex + 1} / {numCards}
            </span>
            <div className="progress-bar-track">
              <div
                className={`progress-bar-fill${thresholdReached ? " complete" : ""}`}
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
            <span className="progress-label">
              {Math.min(100, progress)}%
            </span>
          </div>

          <div className="scratch-area">
            <ScratchCanvas
              key={cardIndex}
              background={currentBg}
              threshold={threshold}
              pathIntervalMs={pathIntervalMs}
              onThresholdReached={handleThresholdReached}
              onProgress={handleProgress}
              onPathUpdate={handlePathUpdate}
            />

            {/* Threshold reached — subtle floating prompt */}
            {thresholdReached && (
              <div className="threshold-prompt">
                <button
                  className="btn-next-card"
                  onClick={finishCurrentCard}
                >
                  {cardIndex + 1 < numCards
                    ? t("NEXT_CARD")
                    : t("FINISH")}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <Questionnaire
          show={true}
          language={languageRef.current}
          setResponse={handleQuestionnaireResponse}
        />
      )}
    </div>
  );
};

export default Board;
