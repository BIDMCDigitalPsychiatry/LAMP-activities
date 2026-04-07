import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import Box from "./Box";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import "./sdst.css";

export default function SymbolDigitSubstitution({ ...props }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const SYMBOLS: Array<string> = [
    "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "σ",
  ];

  const [timeLimit, setTimeLimit] = useState(
    props?.data?.activity?.settings?.duration ?? 120
  );
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [currentNumber, setCurrentNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    props?.data?.activity?.settings?.duration ?? 120
  );
  const [flag, setFlag] = useState(2); // 2=neutral, 1=correct, 0=wrong
  const [clickedIndex, setClickedIndex] = useState(-1); // which button was pressed
  const [inputText, setInputText] = useState("");
  const [time, setTime] = useState(new Date().getTime());
  const [shuffledSymbols, setShuffledSymbols] = useState<Array<string>>([]);
  const [noBack, setNoBack] = useState(false);
  const [temporalSlices, setTemporalSlices] = useState<string | null>(null);
  const [previousClickTime, setPreviousClickTime] = useState(
    new Date().getTime()
  );
  const [textShow, setTextShow] = useState(false);
  const [displayedSymbol, setDisplayedSymbol] = useState<Array<string>>([]);
  const [showMapping, setShowMapping] = useState(
    props?.data?.activity?.settings?.show_mapping ?? "during"
  );
  const [startGame, setStartGame] = useState(false);
  const [random, setRandom] = useState(0);
  const [isForward, setIsForward] = useState(props?.data?.forward ?? false);

  // Phase state machine
  const [showInstructions, setShowInstructions] = useState(true);
  const [showTimeoutFlash, setShowTimeoutFlash] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const { t } = useTranslation();

  const generateRandomSymbolNumberPair = (symbols: Array<string>) => {
    const randomIndex = getRandomNumber() ?? 0;
    setCurrentSymbol(symbols[randomIndex]);
    setCurrentNumber(randomIndex + 1);
    setDisplayedSymbol((prevHistory) => [...prevHistory, symbols[randomIndex]]);
    setClickedIndex(-1);
  };

  const getRandomNumber = (): number => {
    const randomIndex = Math.floor(
      Math.random() * (props?.data?.activity?.settings?.count_of_symbols ?? 9)
    );
    if (random !== randomIndex) {
      setRandom(randomIndex);
      return randomIndex;
    }
    return getRandomNumber();
  };

  const handleClearText = () => {
    setInputText("");
    inputRef?.current?.focus();
  };

  const symbolDigitMapping: Record<string, number> = {};
  shuffledSymbols.forEach((symbol, index) => {
    symbolDigitMapping[symbol] = index + 1;
  });

  const updateWithTaps = (value: number, symbolvalue: any) => {
    const item: any[] = [];
    if (temporalSlices !== null) {
      const r = JSON.parse(temporalSlices);
      Object.keys(r).forEach((key) => {
        item.push(r[key]);
      });
    }
    const data = {
      duration: new Date().getTime() - previousClickTime,
      level: null,
      value: value === 1 ? true : false,
      type: symbolvalue,
    };
    item.push(data);
    setTemporalSlices(JSON.stringify(item));
  };

  const clearAfterTimeout = () => {
    setTimeout(() => {
      setFlag(2);
      setClickedIndex(-1);
      handleClearText();
    }, 1500);
  };

  const startTimer = () => {
    const intervalId: NodeJS.Timeout = setInterval(() => {
      setTimeLeft((prevTime: number) => prevTime - 1);
    }, 1000);
    return intervalId;
  };

  const stopTimer = (timer: NodeJS.Timeout | null) => {
    if (timer) {
      clearInterval(timer);
    }
  };

  const saveScore = (
    status?: boolean,
    backButton?: boolean,
    isnavigationBtn?: boolean,
    questionnaireData?: any
  ) => {
    const timeTakenMinutes = (timeLimit - timeLeft) / 60;
    const correctResponsesPerMinute =
      timeTakenMinutes > 0 ? Math.round(score / timeTakenMinutes) : 0;
    const route = { type: "manual_exit", value: status ?? false };
    const item: any[] = [];
    if (temporalSlices !== null) {
      const r = JSON.parse(temporalSlices);
      Object.keys(r).forEach((key) => {
        item.push(r[key]);
      });
    }
    item.push(route);
    const data = temporalSlices !== null && JSON.parse(temporalSlices);
    let trueCount = 0;
    let falseCount = 0;
    let trueDurationSum = 0;
    let falseDurationSum = 0;

    (data || []).forEach((d: any) => {
      if (d.value === true) {
        trueCount++;
        trueDurationSum += d.duration;
      } else if (d.value === false) {
        falseCount++;
        falseDurationSum += d.duration;
      }
    });

    const staticData: any = {
      score: correctResponsesPerMinute,
      number_of_symbols: displayedSymbol?.length,
      number_of_correct_responses: trueCount,
      number_of_incorrect_responses: falseCount,
      avg_correct_response_time:
        trueCount > 0 ? Math.round(trueDurationSum / trueCount) : 0,
      avg_incorrect_response_time:
        falseCount > 0 ? Math.round(falseDurationSum / falseCount) : 0,
    };

    if (questionnaireData) {
      staticData.questionnaire = questionnaireData;
    }

    parent.postMessage(
      JSON.stringify({
        timestamp: time,
        static_data: staticData,
        ...(isForward && { forward: !backButton }),
        ...(!isnavigationBtn && { done: true }),
        ...(backButton && { clickBack: true }),
        temporal_slices: item,
      }),
      "*"
    );
  };

  const clickBack = (backButton: boolean, isnavigationBtn: boolean) => {
    saveScore(true, backButton, isnavigationBtn);
  };

  const handleClick = (data: any, index: number) => {
    setInputText(data);
    setClickedIndex(index);
    const currentTime = new Date().getTime();
    setPreviousClickTime(currentTime);
    if (data === currentNumber) {
      setScore((prevScore: number) => prevScore + 1);
      setFlag(1);
      updateWithTaps(1, symbolDigitMapping[currentSymbol]);
      setTimeout(() => {
        generateRandomSymbolNumberPair(shuffledSymbols);
      }, 1500);
    } else {
      setFlag(0);
      updateWithTaps(0, symbolDigitMapping[currentSymbol]);
    }
    clearAfterTimeout();
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      setGameEnded(true);
      setShowTimeoutFlash(true);
      setTimeout(() => {
        setShowTimeoutFlash(false);
        setShowQuestionnaire(true);
      }, 1500);
    }

    if (!!startGame) {
      setTextShow(true);
      const timerId: NodeJS.Timeout | null = timeLeft > 0 ? startTimer() : null;
      return () => stopTimer(timerId);
    }
    return;
  }, [timeLeft, startGame]);

  // Init effect
  useEffect(() => {
    const configuration = props.data.configuration;
    const language = configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US";
    i18n.changeLanguage(language);
    setNoBack(props?.data?.noBack ?? false);
    setTime(new Date().getTime());
    setShowMapping(props?.data?.activity?.settings?.show_mapping ?? "during");
    setTimeLimit(props?.data?.activity?.settings?.duration ?? 120);
    setTimeLeft(props?.data?.activity?.settings?.duration ?? 120);

    inputRef?.current?.focus();
    const symbolsCopy = [...SYMBOLS];
    for (
      let i = (props?.data?.activity?.settings?.count_of_symbols ?? 10) - 1;
      i > 0;
      i--
    ) {
      const j = Math.floor(Math.random() * (i + 1));
      [symbolsCopy[i], symbolsCopy[j]] = [symbolsCopy[j], symbolsCopy[i]];
    }
    const symbols = symbolsCopy.splice(
      0,
      props?.data?.activity?.settings?.count_of_symbols ?? 10
    );
    setShuffledSymbols(symbols);
    generateRandomSymbolNumberPair(symbols);
  }, []);

  const handleInstructionClose = () => {
    setShowInstructions(false);
    if (showMapping !== "before") {
      setStartGame(true);
    }
  };

  const handleQuestionnaireResponse = (response: any) => {
    setShowQuestionnaire(false);
    saveScore(undefined, undefined, undefined, response);
  };

  const getInstructionText = () => {
    if (showMapping === "not_at_all") return t("INSTRUCTIONS_HIDDEN");
    if (showMapping === "before") return t("INSTRUCTIONS_BEFORE");
    return t("INSTRUCTIONS_DURING");
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
  };

  if (shuffledSymbols.length === 0) return null;

  return (
    <div className="game-shell">
      {/* Header */}
      <div className="heading">
        {!noBack && (
          <nav className="back-link" onClick={() => clickBack(true, true)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </nav>
        )}
        {t("Symbol-Digit Substitution")}
        {isForward && (
          <nav
            className="home-link-forward"
            onClick={() => clickBack(false, true)}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </nav>
        )}
        <nav className="home-link" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faRedo} />
        </nav>
      </div>

      {/* Instruction Modal */}
      {showInstructions && (
        <InstructionModal
          show={true}
          modalClose={handleInstructionClose}
          msg={getInstructionText()}
          language={i18n.language}
        />
      )}

      {/* Timeout Flash */}
      {showTimeoutFlash && (
        <div className="sdst-timeout-overlay">
          <div className="sdst-timeout-card">
            {t("Time's up!")}
          </div>
        </div>
      )}

      {/* Questionnaire */}
      {showQuestionnaire && (
        <Questionnaire
          show={true}
          language={i18n.language}
          setResponse={handleQuestionnaireResponse}
        />
      )}

      {/* Game Area */}
      {!showInstructions && (
        <div className="game-container">
          {timeLeft > 0 ? (
            <>
              {/* Timer */}
              <div className="sdst-timer">
                <div className="timer-pill">
                  {t("Time left:")} {formatTime(timeLeft)}
                </div>
              </div>

              {/* Legend — show during game if "during" mode */}
              {startGame && showMapping === "during" && (
                <Box data={shuffledSymbols} />
              )}

              {/* Before mode: show legend + memorize prompt + start button */}
              {!startGame && showMapping === "before" && (
                <>
                  <div className="sdst-memorize-prompt">
                    {t(
                      "Memorize the key below. It will disappear when you press Start!"
                    )}
                  </div>
                  <Box data={shuffledSymbols} />
                  <button
                    className="sdst-start-btn"
                    onClick={() => setStartGame(true)}
                  >
                    {t("Start Game")}
                  </button>
                </>
              )}

              {/* Active game play */}
              {startGame && (
                <>
                  {/* Current symbol */}
                  <Box currentSymbol={currentSymbol} />

                  {/* Number buttons */}
                  <div className="sdst-btn-container">
                    {shuffledSymbols.map((value, index) => {
                      let btnClass = "sdst-num-btn";
                      if (flag !== 2 && clickedIndex === index) {
                        btnClass += flag === 1 ? " btn-correct" : " btn-incorrect";
                      }
                      if (flag !== 2) btnClass += " disabled";
                      return (
                        <button
                          key={index}
                          className={btnClass}
                          disabled={flag !== 2}
                          onClick={() => handleClick(index + 1, index)}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
