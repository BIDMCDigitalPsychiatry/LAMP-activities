import * as React from "react";
import { Dot } from "./Dot";
import {
  getRandomAlphaNumeric,
  getRandomPositions,
  shuffle,
} from "../../functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRedo, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./DotTouch.css";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";
import i18n from "../../i18n";

/* eslint-disable no-restricted-globals */
interface LevelSummary {
  level: number;
  duration_ms: number;
  correct_taps: number;
  wrong_taps: number;
  total_items: number;
  sequence: Array<string>;
  dot_positions: Array<{x: number, y: number}>;
}

interface DotState {
  correctTaps: number;
  dotPositions: Array<{x: number, y: number}>;
  dotValues: Array<string>;
  shuffledValues: Array<string>;
  gameLevel: number;
  gameOver: boolean;
  lastClickTime: any;
  lastWrongClick: any;
  route: any;
  startGame: boolean;
  startTime: any;
  startTimer: number;
  stateChange: boolean;
  stateRoutes: any;
  tapCount: number;
  time: number;
  timeout: boolean;
  totalTaps: number;
  settings: any;
  showInstruction: boolean;
  mistakeCount: number;
  isFavoriteActive: boolean;
  forward: boolean;
  isForwardButton: boolean;
  phase: "playing" | "game_over" | "timeout" | "questionnaire";
  endReason: string;
  endReasonKey: string;
  noBack: boolean;
  language: string;
  timerEnabled: boolean;
  timeRemaining: number;
  levelStartTime: number;
  levelCorrectTaps: number;
  levelWrongTaps: number;
  levelSummaries: Array<LevelSummary>;
}

class DotTouch extends React.Component<any, DotState> {
  private timerInterval: any = null;

  constructor(props: any) {
    super(props);
    const settingsData =
      props.data.activity?.settings ?? props.data.settings ?? {};
    const language = settingsData?.language ?? props.data.language ?? "en-US";
    i18n.changeLanguage(language);

    const dotCount = settingsData?.level1_dot_count ?? 12;
    const positions = getRandomPositions(dotCount, 22, 10);
    const values = getRandomAlphaNumeric(dotCount / 2);

    this.state = {
      correctTaps: 0,
      dotPositions: positions,
      dotValues: values,
      gameLevel: 1,
      gameOver: false,
      lastClickTime: 0,
      lastWrongClick: null,
      route: [],
      settings: settingsData,
      shuffledValues: shuffle(values),
      startGame: false,
      startTime: null,
      startTimer: 0,
      stateChange: true,
      stateRoutes: [],
      tapCount: 0,
      time: new Date().getTime(),
      timeout: false,
      totalTaps: 0,
      showInstruction: true,
      mistakeCount: 0,
      isFavoriteActive: props?.data?.is_favorite ?? false,
      forward: props?.data?.forward ?? false,
      isForwardButton: false,
      phase: "playing",
      endReason: "",
      endReasonKey: "",
      noBack: props?.data?.noBack ?? false,
      language: language,
      timerEnabled: settingsData?.timer_enabled ?? false,
      timeRemaining: (settingsData?.timer_enabled) ? (settingsData?.level1_timeout ?? 60) : 0,
      levelStartTime: 0,
      levelCorrectTaps: 0,
      levelWrongTaps: 0,
      levelSummaries: [],
    };
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  };

  startLevelTimer = (seconds: number) => {
    this.clearTimer();
    if (!(this.state as any).timerEnabled) return;
    this.setState({ timeRemaining: seconds });
    this.timerInterval = setInterval(() => {
      this.setState(
        (prev) => ({ timeRemaining: prev.timeRemaining - 1 }),
        () => {
          if (this.state.timeRemaining <= 0) {
            this.clearTimer();
            this.finishLevel();
            this.setState({
              timeout: true,
              gameOver: true,
              phase: "game_over",
              endReason: i18n.t("Time's up!"),
              endReasonKey: "timeout",
            });
          }
        }
      );
    }, 1000);
  };

  formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
  };

  // Save summary for the current level.
  // pendingCorrect/pendingWrong account for the last tap whose setState
  // hasn't been flushed yet when this is called synchronously.
  finishLevel = (pendingCorrect: number = 0, pendingWrong: number = 0) => {
    const summary: LevelSummary = {
      level: this.state.gameLevel,
      duration_ms: new Date().getTime() - this.state.levelStartTime,
      correct_taps: this.state.levelCorrectTaps + pendingCorrect,
      wrong_taps: this.state.levelWrongTaps + pendingWrong,
      total_items: this.state.dotValues.length,
      sequence: this.state.dotValues.slice(),
      dot_positions: this.state.dotPositions.map((p, idx) => ({
        x: Math.round(p.x * 10) / 10,
        y: Math.round(p.y * 10) / 10,
        label: this.state.shuffledValues[idx],
      })) as any,
    };
    this.state.levelSummaries.push(summary);
  };

  // Update each game level
  resetState = () => {
    this.clearTimer();
    this.finishLevel(1, 0); // last tap was correct (level completed)
    const dotCount = this.state.settings?.level2_dot_count ?? 24;
    const positions = getRandomPositions(dotCount, 20, 9);
    const values = getRandomAlphaNumeric(dotCount / 2);
    const timerVal = this.state.timerEnabled ? (this.state.settings?.level2_timeout ?? 120) : 0;
    this.setState({
      dotPositions: positions,
      dotValues: values,
      gameLevel: this.state.gameLevel + 1,
      shuffledValues: shuffle(values),
      startGame: false,
      stateChange: true,
      tapCount: 0,
      showInstruction: true,
      timeRemaining: timerVal,
      levelCorrectTaps: 0,
      levelWrongTaps: 0,
    });
  };

  // Each dot click is handled here
  handleClick = (e: any, i: string) => {
    if (i === "1" || this.state.startGame) {
      if (!this.state.timeout && !this.state.gameOver) {
        const item =
          e.target.className === "number-text"
            ? e.target.closest("div")
            : e.target;
        if (item.className !== "dot-style dot-selected") {
          const expected = this.state.dotValues[this.state.tapCount];
          const status = i === expected;

          if (status) {
            item.className = "dot-style dot-selected";
          } else {
            item.className = "dot-style wrong-dot-selection";
            // Flash red briefly then reset so it can be tapped again
            setTimeout(() => {
              if (item.className === "dot-style wrong-dot-selection") {
                item.className = "dot-style";
              }
            }, 500);
          }

          this.setState({
            correctTaps: status
              ? this.state.correctTaps + 1
              : this.state.correctTaps,
            lastWrongClick: !status ? item : null,
            tapCount: status ? this.state.tapCount + 1 : this.state.tapCount,
            totalTaps: this.state.totalTaps + 1,
            mistakeCount: !status
              ? this.state.mistakeCount + 1
              : this.state.mistakeCount,
            levelCorrectTaps: status
              ? this.state.levelCorrectTaps + 1
              : this.state.levelCorrectTaps,
            levelWrongTaps: !status
              ? this.state.levelWrongTaps + 1
              : this.state.levelWrongTaps,
          });

          if (!status && this.state.mistakeCount + 1 >= 5) {
            this.clearTimer();
            this.finishLevel(0, 1); // last tap was wrong (triggered mistake limit)
            setTimeout(() => {
              this.setState({
                gameOver: true,
                phase: "game_over",
                endReason: i18n.t("TOO_MANY_MISTAKES"),
                endReasonKey: "too_many_mistakes",
              });
            }, 500);
            return;
          }

          let routeList: any;
          if (i === "1") {
            const now = new Date().getTime();
            const timerVal =
              this.state.gameLevel == 1
                ? this.state.settings.level1_timeout ?? 60
                : this.state.settings.level2_timeout ?? 120;
            routeList = [];
            if (this.state.gameLevel > 1) {
              routeList = this.updateRouteList();
            }
            const routes = [];

            routes.push({
              duration: now - this.state.startTime,
              item: i,
              tapped: i,
              expected: expected,
              level: this.state.gameLevel,
              type: status,
              correct: status,
              value: null,
            });
            this.setState({
              lastClickTime: now,
              route: JSON.stringify(routes),
              startGame: true,
              startTime:
                this.state.gameLevel === 1 ? new Date() : this.state.startTime,
              startTimer: timerVal,
              stateChange: false,
              stateRoutes: JSON.stringify(routeList),
              showInstruction: false,
              levelStartTime: now,
            });
            // Start the countdown timer for this level
            this.startLevelTimer(timerVal);
          } else {
            this.updateStateWithTaps(i, status, expected);
          }
          if (this.state.dotValues.length - 1 === this.state.tapCount) {
            if (this.state.gameLevel === 3) {
              this.clearTimer();
              this.finishLevel(1, 0); // last tap was correct (game completed)
              setTimeout(() => {
                this.setState({
                  gameOver: true,
                  phase: "game_over",
                  endReason: i18n.t("CONGRATULATIONS"),
                  endReasonKey: "completed",
                });
              }, 1000);
            } else {
              this.resetState();
            }
          }
        }
      }
    }
  };

  // Update the state values for each taps other than dot 1
  updateStateWithTaps = (i: string, status: boolean, expected: string) => {
    const routes = [];
    const lastclickTime = new Date().getTime() - this.state.lastClickTime;
    if (this.state.route.length > 0) {
      const r = JSON.parse(this.state.route);
      Object.keys(r).forEach((key) => {
        routes.push(r[key]);
      });
    }
    const route = {
      duration: lastclickTime,
      item: i,
      tapped: i,
      expected: expected,
      level: this.state.gameLevel,
      type: status,
      correct: status,
      value: null,
    };
    routes.push(route);

    this.setState({
      lastClickTime: new Date().getTime(),
      route: JSON.stringify(routes),
    });
  };

  // Create dots at random absolute positions
  createDots = () => {
    return this.state.shuffledValues.map((val, i) => {
      const pos = this.state.dotPositions[i];
      return (
        <div
          key={`${this.state.gameLevel}-${i}`}
          style={{
            position: "absolute",
            left: pos.x + "%",
            top: pos.y + "%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dot index={val} onClick={this.handleClick} />
        </div>
      );
    });
  };

  // Call the API to pass game result
  sendGameResult = (status?: boolean, isBack?: Boolean) => {
    this.clearTimer();
    // If exiting mid-game, save the current level summary
    if (!this.state.gameOver && this.state.levelStartTime > 0) {
      this.finishLevel();
      this.setState({ endReasonKey: "manual_exit" });
    }
    const route = { type: "manual_exit", value: status ?? false };
    const boxes = [];
    if (this.state.route && this.state.route.length > 0) {
      const r = JSON.parse(this.state.route);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }
    boxes.push(route);
    this.setState(
      {
        route: JSON.stringify(boxes),
      },
      () => {
        const totalAttempts = this.state.totalTaps;
        const totalItems = this.state.levelSummaries.reduce(
          (sum, l) => sum + l.total_items, 0
        );
        const percentageCorrectOverall =
          totalAttempts > 0
            ? Math.round((this.state.correctTaps / totalAttempts) * 100)
            : 0;
        const gameScore = percentageCorrectOverall;
        const points = gameScore === 100 ? 2 : 1;
        parent.postMessage(
          JSON.stringify({
            duration: new Date().getTime() - this.state.startTime,
            static_data: {
              // Backward-compatible fields
              correct_answers: this.state.correctTaps,
              point: points,
              total_questions: this.state.totalTaps,
              wrong_answers: this.state.totalTaps - this.state.correctTaps,
              score: gameScore,
              percentageCorrectOverall: percentageCorrectOverall,
              total_levels: this.state.gameLevel,
              is_favorite: this.state.isFavoriteActive,
              // New cognitive-test fields
              total_taps: this.state.totalTaps,
              total_items: totalItems,
              end_reason: this.state.endReasonKey || "manual_exit",
              level_summaries: this.state.levelSummaries,
              ...((this.state as any).questionnaire && {
                questionnaire: (this.state as any).questionnaire,
              }),
            },
            temporal_slices: JSON.parse(this.state.route),
            timestamp: new Date().getTime(),
            ...(this.state.forward && { forward: this.state.isForwardButton }),
            ...(!status && { done: true }),
            ...(isBack && { clickBack: true }),
          }),
          "*"
        );
      }
    );
  };

  // Restart button action
  restartState = () => {
    this.clearTimer();
    const dotCount = this.state.dotPositions.length;
    const positions = getRandomPositions(dotCount, dotCount > 16 ? 20 : 22, dotCount > 16 ? 9 : 10);
    const routeList = this.updateRouteList();

    this.setState({
      dotPositions: positions,
      gameOver: false,
      lastClickTime: 0,
      shuffledValues: shuffle(this.state.dotValues),
      startGame: false,
      startTime: null,
      stateChange: true,
      stateRoutes: JSON.stringify(routeList),
      tapCount: 0,
      timeout: false,
    });
  };

  // Update route list for API
  updateRouteList = () => {
    const routeList = [];
    if (this.state.route.length > 0) {
      const r = JSON.parse(this.state.stateRoutes);
      Object.keys(r).forEach((key) => {
        routeList.push(r[key]);
      });
      routeList.push({ Routes: JSON.parse(this.state.route) });
    }
    return routeList;
  };

  clickBack = () => {
    this.setState(() => ({
      isForwardButton: false,
    }));
    this.sendGameResult(true, true);
  };

  clickForward = () => {
    this.setState(() => ({
      isForwardButton: true,
    }));
    this.sendGameResult(true, false);
  };

  // To refresh the game
  clickHome = () => {
    window.location.reload();
  };

  handleCloseInstructionModal = () => {
    this.setState({ showInstruction: false });
  };

  handleGameOverContinue = () => {
    this.setState({ phase: "questionnaire" });
  };

  handleQuestionnaireResponse = (response: any) => {
    (this.state as any).questionnaire = response;
    this.sendGameResult();
  };

  // Render the game board
  render() {
    // Game over phase card
    if (this.state.phase === "game_over") {
      const totalAttempts = this.state.totalTaps;
      const pct =
        totalAttempts > 0
          ? Math.round((this.state.correctTaps / totalAttempts) * 100)
          : 0;
      return (
        <div className="dot-touch-board">
          <div className="heading">
            {i18n.t("TRAILS_B")}
          </div>
          <div className="phase-card-wrap">
            <div className="phase-card">
              <div className="phase-card-header">{i18n.t("GAME_OVER")}</div>
              <div className="phase-card-body">
                <div className="phase-instruction">{this.state.endReason}</div>
                <div className="score-ring">{pct}%</div>
                <div className="phase-instruction">
                  {this.state.correctTaps} / {totalAttempts}
                </div>
                <button
                  className="phase-btn"
                  onClick={this.handleGameOverContinue}
                >
                  {i18n.t("CONTINUE")}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Questionnaire phase
    if (this.state.phase === "questionnaire") {
      return (
        <div className="dot-touch-board">
          <div className="heading">
            {i18n.t("TRAILS_B")}
          </div>
          <Questionnaire
            language={this.state.language}
            setResponse={this.handleQuestionnaireResponse}
          />
        </div>
      );
    }

    const Instruction = this.state.showInstruction ? (
      <InstructionModal
        show={true}
        modalClose={this.handleCloseInstructionModal}
        msg={i18n.t("INSTRUCTIONS")}
        language={this.state.language}
      />
    ) : null;

    return (
      <div className="dot-touch-board">
        <div className="heading">
          {!this.state.noBack && (
            <nav className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} onClick={this.clickBack} />
            </nav>
          )}

          {i18n.t("TRAILS_B")}

          <nav
            className={this.state.forward ? "home-link-forward" : "home-link"}
          >
            <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
          </nav>
          {this.state.forward && (
            <nav className="forward-link">
              <FontAwesomeIcon icon={faArrowRight} onClick={this.clickForward} />
            </nav>
          )}
        </div>
        <div className="status-bar">
          {this.state.timerEnabled && (
            <div className="timer-display">
              {this.formatTime(this.state.timeRemaining)}
            </div>
          )}
          <div className="level-badge">
            {i18n.t("LEVEL_NUMBER", { level: this.state.gameLevel })}
          </div>
        </div>
        <div className="game-board with-status-bar">
          {Instruction}
          <div className="dot-field">
            {this.createDots()}
          </div>
        </div>
      </div>
    );
  }
}
export default DotTouch;
