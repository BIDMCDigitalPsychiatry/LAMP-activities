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
import "./WCST.css";

// ── Types ──────────────────────────────────────────────
type Phase = "instruction" | "playing" | "questionnaire" | "done";
type SortRule = "color" | "shape" | "number";
type CardColor = "red" | "blue" | "green" | "yellow";
type CardShape = "triangle" | "star" | "cross" | "circle";

interface WCSTCard {
  color: CardColor;
  shape: CardShape;
  number: number; // 1–4
}

interface TrialResult {
  item: string;
  type: string;
  trial_number: number;
  card_color: string;
  card_shape: string;
  card_number: number;
  chosen_key: number;        // 0–3 index of key card chosen
  current_rule: string;
  match_dimension: string;   // which dimension(s) the choice matched
  correct: boolean;
  perseverative: boolean;
  perseverative_error: boolean;
  rt_ms: number;
  duration: number;
  consecutive_correct: number;
  categories_completed: number;
}

interface Props {
  data: any;
}

// ── Constants ──────────────────────────────────────────

// The four key cards (standard WCST)
const KEY_CARDS: WCSTCard[] = [
  { color: "red",    shape: "triangle", number: 1 },
  { color: "green",  shape: "star",     number: 2 },
  { color: "yellow", shape: "cross",    number: 3 },
  { color: "blue",   shape: "circle",   number: 4 },
];

// Rule cycle: Color → Shape → Number → Color → Shape → Number
const RULE_ORDER: SortRule[] = ["color", "shape", "number", "color", "shape", "number"];

// Color palette for SVG rendering
const COLOR_MAP: Record<CardColor, string> = {
  red: "#E53935",
  blue: "#1E88E5",
  green: "#43A047",
  yellow: "#FDD835",
};

// ── Deck Generation ────────────────────────────────────
function generateDeck(deckSize: number): WCSTCard[] {
  const colors: CardColor[] = ["red", "blue", "green", "yellow"];
  const shapes: CardShape[] = ["triangle", "star", "cross", "circle"];
  const numbers = [1, 2, 3, 4];

  const fullDeck: WCSTCard[] = [];
  for (const color of colors) {
    for (const shape of shapes) {
      for (const num of numbers) {
        fullDeck.push({ color, shape, number: num });
      }
    }
  }

  // Shuffle (Fisher-Yates)
  for (let i = fullDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
  }

  if (deckSize <= 64) return fullDeck;

  // 128-card: duplicate and shuffle again
  const doubleDeck = [...fullDeck, ...fullDeck];
  for (let i = doubleDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubleDeck[i], doubleDeck[j]] = [doubleDeck[j], doubleDeck[i]];
  }
  return doubleDeck;
}

// ── Matching Logic ─────────────────────────────────────
function getMatchDimensions(card: WCSTCard, keyIdx: number): SortRule[] {
  const key = KEY_CARDS[keyIdx];
  const matches: SortRule[] = [];
  if (card.color === key.color) matches.push("color");
  if (card.shape === key.shape) matches.push("shape");
  if (card.number === key.number) matches.push("number");
  return matches;
}

function isCorrectMatch(card: WCSTCard, keyIdx: number, rule: SortRule): boolean {
  const key = KEY_CARDS[keyIdx];
  switch (rule) {
    case "color": return card.color === key.color;
    case "shape": return card.shape === key.shape;
    case "number": return card.number === key.number;
  }
}

// ── SVG Shape Renderers ────────────────────────────────
function renderShape(
  shape: CardShape,
  color: string,
  cx: number,
  cy: number,
  size: number,
  key: string
): React.ReactElement {
  switch (shape) {
    case "triangle":
      return (
        <polygon
          key={key}
          points={`${cx},${cy - size * 0.6} ${cx - size * 0.55},${cy + size * 0.45} ${cx + size * 0.55},${cy + size * 0.45}`}
          fill={color}
          stroke="#333"
          strokeWidth={1}
        />
      );
    case "star": {
      const outerR = size * 0.55;
      const innerR = size * 0.22;
      const pts: string[] = [];
      for (let i = 0; i < 5; i++) {
        const oAngle = (Math.PI / 2) * -1 + (i * 2 * Math.PI) / 5;
        const iAngle = oAngle + Math.PI / 5;
        pts.push(`${cx + outerR * Math.cos(oAngle)},${cy + outerR * Math.sin(oAngle)}`);
        pts.push(`${cx + innerR * Math.cos(iAngle)},${cy + innerR * Math.sin(iAngle)}`);
      }
      return (
        <polygon
          key={key}
          points={pts.join(" ")}
          fill={color}
          stroke="#333"
          strokeWidth={1}
        />
      );
    }
    case "cross": {
      const arm = size * 0.18;
      const len = size * 0.5;
      return (
        <polygon
          key={key}
          points={`${cx - arm},${cy - len} ${cx + arm},${cy - len} ${cx + arm},${cy - arm} ${cx + len},${cy - arm} ${cx + len},${cy + arm} ${cx + arm},${cy + arm} ${cx + arm},${cy + len} ${cx - arm},${cy + len} ${cx - arm},${cy + arm} ${cx - len},${cy + arm} ${cx - len},${cy - arm} ${cx - arm},${cy - arm}`}
          fill={color}
          stroke="#333"
          strokeWidth={1}
        />
      );
    }
    case "circle":
      return (
        <circle
          key={key}
          cx={cx}
          cy={cy}
          r={size * 0.4}
          fill={color}
          stroke="#333"
          strokeWidth={1}
        />
      );
  }
}

// ── Card SVG Component ─────────────────────────────────
function CardSVG({ card, size }: { card: WCSTCard; size: number }) {
  const color = COLOR_MAP[card.color];
  const padding = size * 0.12;
  const innerW = size - padding * 2;

  // Layout shapes based on count
  const shapeSize = Math.min(innerW / 2, (size - padding * 2) / (card.number <= 2 ? 2 : 3));
  const shapes: React.ReactElement[] = [];

  if (card.number === 1) {
    shapes.push(renderShape(card.shape, color, size / 2, size / 2, shapeSize, "s0"));
  } else if (card.number === 2) {
    const gap = shapeSize * 0.7;
    shapes.push(renderShape(card.shape, color, size / 2, size / 2 - gap, shapeSize, "s0"));
    shapes.push(renderShape(card.shape, color, size / 2, size / 2 + gap, shapeSize, "s1"));
  } else if (card.number === 3) {
    const gap = shapeSize * 0.75;
    shapes.push(renderShape(card.shape, color, size / 2, size / 2 - gap, shapeSize * 0.85, "s0"));
    shapes.push(renderShape(card.shape, color, size / 2 - gap * 0.6, size / 2 + gap * 0.5, shapeSize * 0.85, "s1"));
    shapes.push(renderShape(card.shape, color, size / 2 + gap * 0.6, size / 2 + gap * 0.5, shapeSize * 0.85, "s2"));
  } else {
    // 4 shapes in 2x2 grid
    const gap = shapeSize * 0.6;
    shapes.push(renderShape(card.shape, color, size / 2 - gap, size / 2 - gap, shapeSize * 0.8, "s0"));
    shapes.push(renderShape(card.shape, color, size / 2 + gap, size / 2 - gap, shapeSize * 0.8, "s1"));
    shapes.push(renderShape(card.shape, color, size / 2 - gap, size / 2 + gap, shapeSize * 0.8, "s2"));
    shapes.push(renderShape(card.shape, color, size / 2 + gap, size / 2 + gap, shapeSize * 0.8, "s3"));
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {shapes}
    </svg>
  );
}

// ── Board Component ────────────────────────────────────
const Board: React.FC<Props> = ({ data }) => {
  const settings = data.activity?.settings ?? data.settings ?? {};
  const deckSize: number = Math.min(128, Math.max(64, settings.deck_size ?? 64));
  const timeLimitMs =
    settings.time_limit_per_trial_s && settings.time_limit_per_trial_s > 0
      ? Math.max(5, Math.min(120, settings.time_limit_per_trial_s)) * 1000
      : 0; // 0 = untimed

  const language =
    data.activity?.spec === "lamp.wcst"
      ? (settings.language ?? "en-US")
      : (data.language ?? "en-US");

  // ── State ────────────────────────────────────────────
  const [phase, setPhase] = useState<Phase>("instruction");
  const [cardIdx, setCardIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [feedbackKeyIdx, setFeedbackKeyIdx] = useState<number | null>(null);
  const [disabled, setDisabled] = useState(false);

  // Rule tracking
  const [ruleIdx, setRuleIdx] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [categoriesCompleted, setCategoriesCompleted] = useState(0);

  // ── Refs ─────────────────────────────────────────────
  const trialStartRef = useRef(0);
  const resultsRef = useRef<TrialResult[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevRuleRef = useRef<SortRule | null>(null);

  // ── i18n ─────────────────────────────────────────────
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  // ── Generate deck ────────────────────────────────────
  const deck = useMemo(() => generateDeck(deckSize), [deckSize]);

  // ── Start a trial ────────────────────────────────────
  const startTrial = useCallback(
    (idx: number) => {
      if (idx >= deck.length || categoriesCompleted >= 6) {
        setPhase("questionnaire");
        return;
      }
      setCardIdx(idx);
      setElapsed(0);
      setFeedback(null);
      setFeedbackKeyIdx(null);
      setDisabled(false);
      trialStartRef.current = Date.now();
      setPhase("playing");
    },
    [deck, categoriesCompleted]
  );

  // ── Timer (only if time limit is set) ────────────────
  useEffect(() => {
    if (phase === "playing" && !disabled && timeLimitMs > 0) {
      timerRef.current = setInterval(() => {
        const el = Date.now() - trialStartRef.current;
        setElapsed(el);
        if (el >= timeLimitMs) {
          if (timerRef.current) clearInterval(timerRef.current);
          // Timeout — record as incorrect
          const card = deck[cardIdx];
          const currentRule = RULE_ORDER[ruleIdx];

          resultsRef.current.push({
            item: `card_${cardIdx + 1}`,
            type: "timeout",
            trial_number: cardIdx + 1,
            card_color: card.color,
            card_shape: card.shape,
            card_number: card.number,
            chosen_key: -1,
            current_rule: currentRule,
            match_dimension: "none",
            correct: false,
            perseverative: false,
            perseverative_error: false,
            rt_ms: timeLimitMs,
            duration: timeLimitMs,
            consecutive_correct: 0,
            categories_completed: categoriesCompleted,
          });

          setConsecutiveCorrect(0);
          setFeedback("incorrect");
          setDisabled(true);
          setTimeout(() => startTrial(cardIdx + 1), 600);
        }
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, cardIdx, timeLimitMs, deck, disabled, startTrial, ruleIdx, categoriesCompleted]);

  // ── Handle key card selection ────────────────────────
  const handleKeyCardClick = useCallback(
    (keyIdx: number) => {
      if (phase !== "playing" || disabled) return;
      if (timerRef.current) clearInterval(timerRef.current);

      const now = Date.now();
      const rt = now - trialStartRef.current;
      const card = deck[cardIdx];
      const currentRule = RULE_ORDER[ruleIdx];
      const matchDims = getMatchDimensions(card, keyIdx);
      const correct = isCorrectMatch(card, keyIdx, currentRule);

      // Perseveration scoring
      const prevRule = prevRuleRef.current;
      let perseverative = false;
      let perseverativeError = false;
      if (prevRule !== null && prevRule !== currentRule) {
        // Check if the response matches the previous rule
        perseverative = matchDims.includes(prevRule);
        perseverativeError = perseverative && !correct;
      }

      // Update consecutive correct and categories
      let newConsecutive = correct ? consecutiveCorrect + 1 : 0;
      let newCategories = categoriesCompleted;
      let newRuleIdx = ruleIdx;

      if (newConsecutive >= 10) {
        // Category completed!
        newCategories = categoriesCompleted + 1;
        newConsecutive = 0;
        prevRuleRef.current = currentRule;
        newRuleIdx = ruleIdx + 1;
      }

      resultsRef.current.push({
        item: `card_${cardIdx + 1}`,
        type: "response",
        trial_number: cardIdx + 1,
        card_color: card.color,
        card_shape: card.shape,
        card_number: card.number,
        chosen_key: keyIdx,
        current_rule: currentRule,
        match_dimension: matchDims.join(",") || "none",
        correct,
        perseverative,
        perseverative_error: perseverativeError,
        rt_ms: rt,
        duration: rt,
        consecutive_correct: newConsecutive,
        categories_completed: newCategories,
      });

      setConsecutiveCorrect(newConsecutive);
      setCategoriesCompleted(newCategories);
      setRuleIdx(newRuleIdx);
      setFeedback(correct ? "correct" : "incorrect");
      setFeedbackKeyIdx(keyIdx);
      setDisabled(true);

      // Check end conditions
      if (newCategories >= 6 || cardIdx + 1 >= deck.length) {
        setTimeout(() => setPhase("questionnaire"), 800);
      } else {
        setTimeout(() => startTrial(cardIdx + 1), 600);
      }
    },
    [phase, disabled, deck, cardIdx, ruleIdx, consecutiveCorrect, categoriesCompleted, startTrial]
  );

  // ── Send results ─────────────────────────────────────
  const sendResults = useCallback(
    (questionnaire: any) => {
      const results = resultsRef.current;
      const responded = results.filter((r) => r.type === "response");
      const correct = responded.filter((r) => r.correct);
      const errors = responded.filter((r) => !r.correct);
      const perseverativeResponses = responded.filter((r) => r.perseverative);
      const perseverativeErrors = responded.filter((r) => r.perseverative_error);
      const nonPerseverativeErrors = errors.filter((r) => !r.perseverative_error);

      // Conceptual level responses: correct responses in runs of 3+
      let conceptualLevel = 0;
      let runLength = 0;
      for (const r of responded) {
        if (r.correct) {
          runLength++;
        } else {
          if (runLength >= 3) conceptualLevel += runLength;
          runLength = 0;
        }
      }
      if (runLength >= 3) conceptualLevel += runLength;

      // Failure to maintain set: errors after 5–9 consecutive correct (not category completion)
      // Uses consecutive_correct from trial data which resets at category boundaries
      let failureToMaintain = 0;
      for (let i = 1; i < responded.length; i++) {
        if (!responded[i].correct && responded[i - 1].consecutive_correct >= 5) {
          failureToMaintain++;
        }
      }

      // Trials to first category
      const firstCatTrial = responded.findIndex((r) => r.categories_completed >= 1);
      const trialsToFirstCategory = firstCatTrial >= 0 ? firstCatTrial + 1 : responded.length;

      // Mean RT for correct responses
      const correctRTs = correct.map((r) => r.rt_ms);
      const meanRT =
        correctRTs.length > 0
          ? Math.round(correctRTs.reduce((a, b) => a + b, 0) / correctRTs.length)
          : 0;

      const finalCategories = results.length > 0
        ? results[results.length - 1].categories_completed
        : 0;

      const finalRoutes = [
        ...results,
        {
          item: "exit",
          type: "exit",
          trial_number: 0,
          card_color: "",
          card_shape: "",
          card_number: 0,
          chosen_key: -1,
          current_rule: "",
          match_dimension: "",
          correct: false,
          perseverative: false,
          perseverative_error: false,
          rt_ms: 0,
          duration: 0,
          consecutive_correct: 0,
          categories_completed: finalCategories,
        },
      ];

      const payload = {
        timestamp: new Date().getTime(),
        duration: results.reduce((s, r) => s + r.duration, 0),
        static_data: {
          // Legacy compat
          score: Math.round(
            (correct.length / Math.max(1, responded.length)) * 100
          ),
          correct_answers: correct.length,
          total_questions: results.length,

          // Settings
          deck_size: deckSize,
          time_limit_per_trial_s: timeLimitMs > 0 ? timeLimitMs / 1000 : null,

          // WCST-specific metrics
          total_trials: results.length,
          total_responses: responded.length,
          total_correct: correct.length,
          total_errors: errors.length,
          categories_completed: finalCategories,
          perseverative_responses: perseverativeResponses.length,
          perseverative_errors: perseverativeErrors.length,
          non_perseverative_errors: nonPerseverativeErrors.length,
          conceptual_level_responses: conceptualLevel,
          failure_to_maintain_set: failureToMaintain,
          trials_to_first_category: trialsToFirstCategory,
          mean_rt_correct_ms: meanRT,

          questionnaire,
        },
        temporal_slices: finalRoutes,
      };

      setPhase("done");
      parent.postMessage(JSON.stringify(payload), "*");
    },
    [deckSize, timeLimitMs]
  );

  // ── Instruction close ────────────────────────────────
  const handleInstructionClose = useCallback(() => {
    startTrial(0);
  }, [startTrial]);

  // ── Render ───────────────────────────────────────────
  const remaining = timeLimitMs > 0 ? Math.max(0, timeLimitMs - elapsed) : 0;
  const remainingSec = Math.ceil(remaining / 1000);
  const isWarning = timeLimitMs > 0 && remaining < 5000;

  const currentCard = deck[cardIdx];

  // Dynamic sizing
  const availW = window.innerWidth;
  const keyCardSize = Math.min(80, Math.floor((availW - 50) / 4));
  const responseCardSize = Math.min(120, Math.floor(availW * 0.3));

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
        {i18n.t("WCST")}
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
      {phase === "playing" && currentCard && (
        <div className="status-bar">
          <span className="level-badge">
            {i18n.t("CARD_COUNT", {
              current: cardIdx + 1,
              total: deck.length,
            })}
          </span>
          <span className="level-badge">
            {i18n.t("CATEGORIES", { count: categoriesCompleted })}
          </span>
          {timeLimitMs > 0 && (
            <span className={`timer-badge${isWarning ? " warning" : ""}`}>
              {remainingSec}s
            </span>
          )}
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
      {phase === "playing" && currentCard && (
        <div className="wcst-area">
          {/* Key cards row */}
          <div className="wcst-key-cards">
            {KEY_CARDS.map((kc, idx) => {
              let feedbackClass = "";
              if (feedbackKeyIdx === idx) {
                feedbackClass = feedback === "correct"
                  ? " feedback-correct"
                  : " feedback-incorrect";
              }
              return (
                <div
                  key={idx}
                  className={`wcst-card key-card${feedbackClass}`}
                  style={{ width: keyCardSize, height: keyCardSize }}
                  onClick={() => handleKeyCardClick(idx)}
                >
                  <CardSVG card={kc} size={keyCardSize - 8} />
                </div>
              );
            })}
          </div>

          <div className="wcst-divider" />

          {/* Feedback text */}
          <div
            className={`wcst-feedback${
              feedback ? ` ${feedback}` : ""
            }`}
          >
            {feedback === "correct" && i18n.t("CORRECT")}
            {feedback === "incorrect" && i18n.t("INCORRECT")}
          </div>

          {/* Response card */}
          <div className="wcst-response-area">
            <div
              className="wcst-card response-card"
              style={{ width: responseCardSize, height: responseCardSize }}
            >
              <CardSVG card={currentCard} size={responseCardSize - 12} />
            </div>
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {phase === "questionnaire" && (
        <div className="wcst-area">
          <div className="wcst-overlay-text">{i18n.t("GAME_OVER")}</div>
          <Questionnaire
            show={true}
            language={language}
            setResponse={sendResults}
          />
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div className="wcst-area">
          <div className="wcst-overlay-text">{i18n.t("GAME_OVER")}</div>
        </div>
      )}
    </div>
  );
};

export default Board;
