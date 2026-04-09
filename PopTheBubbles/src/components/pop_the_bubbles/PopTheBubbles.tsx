/**
 * @file   PopTheBubbles.tsx
 * @brief  Starting component which is the initial point of bubbles game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";

import {
  faArrowLeft,
  faRedo,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomNumbers } from "../../functions";

import i18n from "./../../i18n";
import Board from "./Board";
import "./bubble.css";
import { InstructionModal } from "./InstructionModal";
import { Questionnaire } from "./Questionnaire";

interface AppProps {
  configuration: any;
  activity: any;
  noBack: any;
  data: any;
}

interface AppState {
  levelCompleted: boolean;
  eventRecieved: boolean;
  gameLevel: number;
  gameOver: boolean;
  level: number;
  score: number;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  xCoords: Array<number>;
  xPoints: Array<number>;
  yCoords: Array<number>;
  yPoints: Array<number>;
  bubble_count: Array<number>;
  bubble_speed: Array<number>;
  intertrial_duration: number;
  bubble_duration: number;
  route: any;
  correctGoCount: number;
  totalGoCount: number;
  wrongNoGoCount: number;
  totalNoGoCount: number;
  falseHitsCount: number;
  lastClickTime: number;
  timeDifference: number;
  completed: boolean;
  missedClicks: number;
  correctNoGo: number;
  isGameStarted: boolean;
  levelStartTime: number;
  levelVal: number;
  allRoutes: any;
  wrongNoGoClicks: number;
  time: number;
  noBack: boolean;
  showDialog: boolean;
  showQuestionnaire: boolean;
  questionnaireResponse: any;
  isFavoriteActive: boolean;
  hasForward: boolean;
  levelStats: any[];
}

class PopTheBubbles extends React.Component<AppProps, AppState> {
  private bubbleCount: number;
  constructor(props: AppProps) {
    super(props);
    const xValues = this.getCoords(
      window.innerWidth - (window.innerWidth * 20) / 100,
      1
    );
    const yValues = this.getCoords(
      window.innerHeight - (window.innerHeight * 25) / 100,
      2
    );
    this.state = {
      allRoutes: [],
      bubble_count: [10, 10, 80],
      bubble_duration: 1.5,
      bubble_speed: [30, 40, 50],
      completed: false,
      correctGoCount: 0,
      correctNoGo: 0,
      eventRecieved: false,
      falseHitsCount: 0,
      gameLevel: 1,
      gameOver: false,
      intertrial_duration: 1.5,
      isGameStarted: false,
      lastClickTime: new Date().getTime(),
      level: 0,
      levelCompleted: false,
      levelStartTime: 0,
      levelVal: 0,
      missedClicks: 0,
      noBack: false,
      route: [],
      score: 0,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      time: new Date().getTime(),
      timeDifference: 0,
      totalGoCount: 0,
      totalNoGoCount: 0,
      wrongNoGoClicks: 0,
      wrongNoGoCount: 0,
      xCoords: xValues,
      xPoints: this.getCoordPoints(xValues),
      yCoords: yValues,
      yPoints: this.getCoordPoints(yValues),
      showDialog: true,
      showQuestionnaire: false,
      questionnaireResponse: null,
      isFavoriteActive: props?.data?.is_favorite ?? false,
      hasForward: props?.data?.forward ?? false,
      levelStats: [],
    };
    this.bubbleCount = this.state.bubble_count[0];
  }
  componentDidMount(): void {
    if (!!this.props.configuration && !this.state.eventRecieved) {
      const configuration = this.props.configuration;
      const settings = this.props.activity?.settings ?? undefined;
      this.setState({
        bubble_count: settings?.bubble_count ?? this.state.bubble_count,
        bubble_duration: settings?.bubble_duration ?? this.state.bubble_duration,
        bubble_speed: settings?.bubble_speed ?? this.state.bubble_speed,
        eventRecieved: true,
        intertrial_duration: settings?.intertrial_duration ?? this.state.intertrial_duration,
        noBack: this.props.noBack,
      });
      i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    }
    if (this.state.isGameStarted) {
      if (!this.state.completed) {
        if (this.state.levelStartTime === 0) {
          const newDateTime = new Date().getTime();
          this.setState({ levelStartTime: newDateTime });
        }
        return;
      }
    }
  }

  // componentDidUpdate = (previousProps: any, prevState: any) => {
  //   if (!!this.props.configuration && !this.state.eventRecieved) {
  //     const configuration = this.props.configuration;
  //     const settings = this.props.activity?.settings ?? undefined;
  //     this.setState({
  //       bubble_count: settings
  //         ? settings.bubble_count
  //         : this.state.bubble_count,
  //       bubble_duration: settings
  //         ? settings.bubble_duration
  //         : this.state.bubble_duration,
  //       bubble_speed: settings
  //         ? settings.bubble_speed
  //         : this.state.bubble_speed,
  //       eventRecieved:true,
  //       intertrial_duration: settings
  //         ? settings.intertrial_duration
  //         : this.state.intertrial_duration,
  //       noBack: this.props.noBack
  //     });
  //     i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
  //   }
  //   if (this.state.isGameStarted) {
  //     if (!this.state.completed) {
  //       if (this.state.levelStartTime === 0) {
  //         const newDateTime = new Date().getTime();
  //         this.setState({ levelStartTime: newDateTime });
  //       }
  //       return;
  //     }
  //   }
  // };

  // Get random coordinates for bubbles
  getCoords = (size: number, type: number) => {
    let i = 0;
    const coords = [];
    const diff = size / 100;
    for (i = 0; i < size; i = Math.round(i + diff)) {
      coords.push(i);
    }
    return coords;
  };

  // Get random numbers for x,y coordinates
  getCoordPoints = (values: Array<number>) => {
    return getRandomNumbers(80, 0, values.length);
  };

  // To refresh the game
  clickHome = () => {
    window.location.reload();
  };

  noClick = () => {
    return false;
  };

  // To render the game screens
  handleClick = () => {
    this.setState({
      level: this.state.level + 1,
      levelCompleted: false,
      levelVal: this.state.levelVal + 1,
      score: 0,
    });
  };

  millisToSeconds = (ms: any) => {
    // 1- Convert to seconds:
    let seconds: any = ms / 1000;
    // 2- Extract hours:
    const hours: any = parseInt(seconds, 10) / 3600; // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt(seconds, 10) / 60; // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    let time = "";
    if (hours > 1) {
      time += hours + " hours ";
    }
    if (minutes > 1) {
      time += minutes + " minutes ";
    }
    if (seconds > 0) {
      time += seconds + " seconds ";
    }

    return time;
  };

  isTheGameStarted = (val: any) => {
    this.setState({ isGameStarted: val });
  };

  // Once done with each level of each game, this function will be called
  onCompleted = (
    stateScore: number,
    successTaps: number,
    wrongTaps: number,
    correctGoCount: number,
    totalGoCount: number,
    wrongNoGoCount: number,
    totalNoGoCount: number,
    falseHitsCount: number,
    completed: boolean,
    missedClicks: number,
    correctNoGo: number,
    wrongNoGoClicks: number,
    levelVal: number,
    route: any
  ) => {
    const levelStat = {
      level: levelVal,
      go_correct: correctGoCount,
      go_total: totalGoCount,
      go_missed: missedClicks,
      nogo_correct: correctNoGo,
      nogo_total: totalNoGoCount,
      nogo_wrong: wrongNoGoClicks,
      false_hits: falseHitsCount,
    };

    this.setState((prevState) => ({
      completed,
      correctGoCount,
      correctNoGo,
      falseHitsCount,
      gameLevel: this.state.gameLevel + 1,
      level: 0,
      levelCompleted: true,
      levelStats: [...prevState.levelStats, levelStat],
      levelVal,
      missedClicks,
      score: stateScore > 0 ? stateScore : 0,
      stateSuccessTaps: this.state.stateSuccessTaps + successTaps,
      stateWrongTaps: this.state.stateWrongTaps + wrongTaps,
      totalGoCount,
      totalNoGoCount,
      wrongNoGoClicks,
      wrongNoGoCount,
    }));

    if (this.state.completed) {
      const newDateTime = new Date().getTime();
      const dif = newDateTime - this.state.levelStartTime;
      this.setState({ timeDifference: dif });
    }
    if (levelVal === 3) {
      // Don't show questionnaire immediately — let the score screen display first.
      // The score screen's "Finish" button will trigger the questionnaire.
    }
    this.bubbleCount = this.state.bubble_count[1];
  };

  updateRoute = (route: any, completed: boolean, level: number) => {
    const values: any = this.state.route;
    if (typeof values[level - 1] === "undefined") {
      values[level - 1] = [];
    }
    values[level - 1].push(route);
    this.setState({ route: values, completed });
  };

  updateStateData = async (obj: any) => {
    await this.setState(obj);
  };

  // Set the screen content based on each level
  getLevelCases = () => {
    if (this.state.gameOver) {
      return (
        <div className="pop-the-bubble-board">
          <div className="mt-30">
            <div className="success">{i18n.t("CONGRATULATIONS")}</div>
          </div>
        </div>
      );
    }
    let infoSection = null;

    this.bubbleCount =
      this.state.gameLevel === 1
        ? this.state.bubble_count[0]
        : this.state.gameLevel === 2
        ? this.state.bubble_count[1]
        : this.state.bubble_count[2];

    switch (this.state.level) {
      case 0:
        if (this.state.gameLevel === 1) {
          // Intro screen — tap the bubble to start
          infoSection = (
            <div className="phase-card-wrap">
              <div className="intro-bubble" onClick={this.handleClick}>
                <div className="intro-bubble-circle">
                  {i18n.t("TAP_TO_CONTINUE")}
                </div>
              </div>
            </div>
          );
        } else {
          // Level completed — clean summary
          const pct = this.state.totalGoCount > 0
            ? Math.round((this.state.correctGoCount / this.state.totalGoCount) * 100)
            : 0;
          infoSection = (
            <div className="phase-card-wrap">
              <div className="phase-card">
                <div className="phase-card-header">
                  {i18n.t("LEVEL_NUM_COMPLETED", { levelNumber: this.state.gameLevel - 1 })}
                </div>
                <div className="phase-card-body">
                  <div className="score-ring">{pct}%</div>
                  {this.state.gameLevel <= 3 ? (
                    <button className="phase-btn" onClick={this.handleClick}>
                      {i18n.t("NEXT_LEVEL")}
                    </button>
                  ) : (
                    <button className="phase-btn" onClick={() => this.setState({ showQuestionnaire: true })}>
                      {i18n.t("Submit")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }
        break;
      case 1: {
        // Level instructions — bubble previews + clean text
        const levelBubbles: { [key: number]: Array<{ cls: string; label: string }> } = {
          1: [
            { cls: "bubble-pink", label: i18n.t("COLOR_PINK") },
            { cls: "bubble-blue", label: i18n.t("COLOR_BLUE") },
            { cls: "bubble-yellow", label: i18n.t("COLOR_YELLOW") },
          ],
          2: [
            { cls: "bubble-yellow", label: i18n.t("COLOR_YELLOW") },
            { cls: "bubble-blue", label: i18n.t("COLOR_BLUE") },
          ],
          3: [
            { cls: "bubble-pink", label: i18n.t("COLOR_PINK") },
            { cls: "bubble-yellow", label: i18n.t("COLOR_YELLOW") },
            { cls: "bubble-blue", label: i18n.t("COLOR_BLUE") },
          ],
        };
        const bubbles = levelBubbles[this.state.gameLevel] || levelBubbles[1];
        const showNoRepeatRule = this.state.gameLevel >= 2;

        infoSection = (
          <div className="phase-card-wrap">
            <div className="phase-card">
              <div className="phase-card-header">
                {i18n.t("LEVEL_NUMBER", { gameLevel: this.state.gameLevel })}
              </div>
              <div className="phase-card-body">
                <p className="phase-instruction">{i18n.t("POP_THESE_COLORS")}</p>
                <div className="color-legend">
                  {bubbles.map((b, i) => (
                    <div key={i} className="color-chip">
                      <span className={"bubble-preview " + b.cls} />
                      {b.label}
                    </div>
                  ))}
                </div>
                {showNoRepeatRule && (
                  <p className="phase-rule">{i18n.t("NO_REPEAT_RULE")}</p>
                )}
                <button className="phase-btn" onClick={this.handleClick}>
                  {i18n.t("GO")}
                </button>
              </div>
            </div>
          </div>
        );
        break;
      }
      case 2:
        infoSection = (
          <Board
            bubbleCount={this.bubbleCount}
            onCompleted={this.onCompleted}
            updateRoute={this.updateRoute}
            level={this.state.gameLevel}
            xCoords={this.state.xCoords}
            yCoords={this.state.yCoords}
            xPoints={this.state.xPoints}
            yPoints={this.state.yPoints}
            bubbleDuration={this.state.bubble_duration}
            bubbleSpeed={
              this.state.gameLevel === 1
                ? this.state.bubble_speed[0]
                : this.state.gameLevel === 2
                ? this.state.bubble_speed[1]
                : this.state.bubble_speed[2]
            }
            gameStarted={this.isTheGameStarted}
            intertrialDuration={this.state.intertrial_duration}
            route={this.state.route}
          />
        );
        break;
    }

    return infoSection;
  };

  clickBack = (isBack: boolean) => {
    const route = { type: "manual_exit", value: true };
    const values: any = this.state.route ?? [];
    if (typeof values[this.state.gameLevel - 1] === "undefined") {
      values[this.state.gameLevel - 1] = [];
    }
    values[this.state.gameLevel - 1].push(route);
    const temporalSlices = [].concat.apply([], values);
    const totalTaps = this.state.stateSuccessTaps + this.state.stateWrongTaps;
    const scorePercent = totalTaps > 0
      ? Math.round((this.state.stateSuccessTaps / totalTaps) * 100)
      : 0;
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - this.state.time,
        static_data: {
          score: scorePercent,
          correct_answers: this.state.stateSuccessTaps,
          wrong_answers: this.state.stateWrongTaps,
          total_questions: totalTaps,
          point: scorePercent === 100 ? 2 : 1,
          is_favorite: this.state.isFavoriteActive,
          levels: this.state.levelStats,
        },
        temporal_slices: temporalSlices,
        timestamp: new Date().getTime(),
        ...(this.state.hasForward && { forward: !isBack }),
        ...(isBack && { clickBack : true }),
      }),
      "*"
    );
  };

  handleCloseInstructionModal = () => {
    this.setState({ showDialog: false });
  };

  handleQuestionnaireResponse = (response: any) => {
    this.setState({ questionnaireResponse: response, showQuestionnaire: false });
    const route = { type: "manual_exit", value: false };
    const values: any = this.state.route ?? [];
    if (typeof values[this.state.gameLevel - 1] === "undefined") {
      values[this.state.gameLevel - 1] = [];
    }
    values[this.state.gameLevel - 1].push(route);
    const temporalSlices = [].concat.apply([], this.state.route);
    const totalTaps = this.state.stateSuccessTaps + this.state.stateWrongTaps;
    const scorePercent = totalTaps > 0
      ? Math.round((this.state.stateSuccessTaps / totalTaps) * 100)
      : 0;
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - this.state.time,
        static_data: {
          score: scorePercent,
          correct_answers: this.state.stateSuccessTaps,
          wrong_answers: this.state.stateWrongTaps,
          total_questions: totalTaps,
          point: scorePercent === 100 ? 2 : 1,
          is_favorite: this.state.isFavoriteActive,
          levels: this.state.levelStats,
          ...(response && { questionnaire: response }),
        },
        temporal_slices: temporalSlices,
        timestamp: new Date().getTime(),
        ...(this.state.hasForward && { forward: true }),
        done: true,
      }),
      "*"
    );
  };

  // Game render function
  render() {
    const infoSection = this.getLevelCases();
    const instructionModal = this.state.showDialog ? (
      <InstructionModal
        show={true}
        modalClose={this.handleCloseInstructionModal}
        msg={`${i18n.t(
          "IN_THIS_GAME_YOU_WILL_SEE_LOTS_OF_DIFFERENT_COLORED_BUBBLES_ONE_AT_A_TIME_YOUR_TASK_IS_TO_POP_THE_CORRECTLY_COLORED_BUBBLES_WHILE_IGNORING_THE_INCORRECT_ONES_PAY_ATTENTION_TO_THE_INSTRUCTIONS_FOR_EACH_LEVEL_TO_KNOW_WHICH_COLORED_BUBBLES_YOU_SHOULD_TAP_AND_WHICH_ONES_YOU_SHOULD_IGNORE"
        )}`}
        language={i18n.language}
      />
    ) : null;
    return (
      <div id="pop-the-bubble-body">
        <div className="heading">
          {!this.state.noBack && (
            <nav className="back-link" onClick={() => this.clickBack(true)}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </nav>
          )}
          {i18n.t("POP_THE_BUBBLES")}
          {this.state.hasForward && (
            <nav className="home-link-forward" onClick={() => this.clickBack(false)}>
              <FontAwesomeIcon icon={faArrowRight} />
            </nav>
          )}
          <nav className="home-link" onClick={this.clickHome}>
            <FontAwesomeIcon icon={faRedo} />
          </nav>
        </div>
        {infoSection}
        {instructionModal}
        {this.state.showQuestionnaire && (
          <Questionnaire
            show={true}
            language={i18n.language}
            setResponse={this.handleQuestionnaireResponse}
          />
        )}
      </div>
    );
  }
}

export default PopTheBubbles;
