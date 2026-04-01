/**
 * @file   Jewels.tsx
 * @brief  Jewels orchestrator component (D-Cog pattern)
 */

import {
  faArrowLeft,
  faRedo,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomNumbers } from "../../functions";
import { InfoModal } from "./InfoModal";
import { Questionnaire } from "./Questionnaire";

import i18n from "./../../i18n";
import "./jewels.css";

import * as React from "react";
import Board from "./Board";

/* eslint-disable no-restricted-globals */
const colors = [
  "pink",
  "green",
  "violet",
  "brown",
  "red",
  "orange",
  "dark-blue",
];

interface AppState {
  bonusPoints: number;
  current: any;
  diamondCount: number;
  diamondColor: string;
  diamondNumbers: Array<number>;
  diamondSpots: Array<number>;
  gameTime: number;
  initialGameTime: number;
  initialDiamondCount: number;
  initialShapeCount: number;
  level: number;
  loaded: boolean;
  noBack: boolean;
  orderNumbers: Array<number>;
  pauseTime: number;
  routes: any;
  uniqueRoutes: any;
  currentRoutes: any;
  settings: any;
  shapeCount: number;
  shapes: Array<string>;
  showModal: number;
  time: number;
  totalAttempts: number;
  totalJewelsCollected: number;
  totalLevels: number;
  timeDecreasePerLevel: number;
  winnerLine?: Array<number>;
  variant: any;
  isFavoriteActive: boolean;
  forward: boolean;
  isForwardButton: boolean;
  showQuestionnaire: boolean;
  pendingPointVal: number;
}

class Jewels extends React.Component<any, AppState> {
  private boardRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.boardRef = React.createRef();
    const settingsData =
      props.data.activity?.settings ?? props.data.settings ?? {};
    const configuration = props.data.configuration;
    const mode = settingsData ? settingsData.mode : 1;
    let gameTimeVal = settingsData
      ? settingsData.beginner_seconds
        ? settingsData.beginner_seconds
        : 90
      : 90;
    switch (mode) {
      case 1:
        gameTimeVal = settingsData
          ? settingsData.beginner_seconds
            ? settingsData.beginner_seconds
            : 90
          : 90;
        break;
      case 2:
        gameTimeVal = settingsData.intermediate_seconds;
        break;
      case 3:
        gameTimeVal = settingsData.advanced_seconds;
        break;
      case 4:
        gameTimeVal = settingsData.expert_seconds;
        break;
      default:
        gameTimeVal = settingsData.beginner_seconds;
        break;
    }
    const langugae = configuration
      ? configuration.hasOwnProperty("language")
        ? configuration.language
        : "en-US"
      : "en-US";
    i18n.changeLanguage(langugae);
    const diamondCountVal = settingsData
      ? settingsData.diamond_count
        ? settingsData.diamond_count
        : 15
      : 15;
    const shapeCountVal = settingsData
      ? settingsData.shape_count
        ? settingsData.shape_count
        : settingsData.variant && settingsData.variant === "trails_b"
        ? 2
        : 1
      : 1;
    const bonusPointsPerLevel = settingsData?.bonus_point_count ?? 40;
    const defaultTotalLevels = bonusPointsPerLevel > 0
      ? Math.ceil(1000 / bonusPointsPerLevel)
      : 25;
    const totalLevelsVal = settingsData?.total_levels ?? defaultTotalLevels;
    const timeDecreaseVal = settingsData?.time_decrease_per_level ?? 0;
    const state = {
      bonusPoints: 0,
      current: [],
      diamondColor: "",
      diamondCount: diamondCountVal,
      diamondNumbers: [],
      diamondSpots: [],
      gameTime: gameTimeVal,
      initialGameTime: gameTimeVal,
      initialDiamondCount: diamondCountVal,
      initialShapeCount: shapeCountVal,
      level: 1,
      loaded: false,
      noBack: props.data.noBack,
      orderNumbers: [],
      pauseTime: 0,
      routes: [],
      uniqueRoutes: [],
      currentRoutes: [],
      settings: settingsData,
      shapeCount: shapeCountVal,
      shapes: [],
      showModal: 0,
      time: new Date().getTime(),
      totalAttempts: 0,
      totalJewelsCollected: 0,
      totalLevels: totalLevelsVal,
      timeDecreasePerLevel: timeDecreaseVal,
      winnerLine: undefined,
      variant: settingsData.variant === "trails_b" ? "b" : "a",
      isFavoriteActive: props?.data?.is_favorite ?? false,
      forward: props?.data?.forward ?? false,
      isForwardButton: false,
      showQuestionnaire: false,
      pendingPointVal: 2,
    };
    this.state = state;
    this.reset(true);
  }

  componentDidMount = () => {
    this.reset(true);
  };

  getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "#E8F0FE";
      case 2:
        return "#D0E2FC";
      case 3:
        return "#B8D4FA";
      default:
        return "#A0C6F8";
    }
  };

  applyLevelColor = (level: number) => {
    if (this.boardRef.current) {
      this.boardRef.current.style.backgroundColor = this.getLevelColor(level);
    }
  };

  updateRoutes = (routesValues: any) => {
    let routeData: any[] = [];
    if (this.state.routes.length > 0) {
      routeData = JSON.parse(this.state.routes);
    }

    const newRoutes = JSON.parse(routesValues);
    const newTaps = Object.values(newRoutes);

    const filteredRoutes = routeData.filter(
      (route) => !(route.level === this.state.level)
    );

    filteredRoutes.push(...newTaps);
    this.setState({ routes: JSON.stringify(filteredRoutes) });
  };

  updateLevel = (
    bonus: number,
    routesValus: any,
    totalJewelsCollected: number,
    totalAttempts: number,
    pointVal: number
  ) => {
    this.updateRoutes(routesValus);

    // Always advance on completion (pointVal=2), stay on timeout (pointVal=1)
    const nextLevel =
      pointVal === 2 ? this.state.level + 1 : this.state.level;

    // If we've reached the max level, end the game
    if (nextLevel > this.state.totalLevels) {
      this.setState(
        {
          bonusPoints: this.state.bonusPoints + bonus,
          loaded: false,
          totalAttempts: this.state.totalAttempts + totalAttempts,
          totalJewelsCollected:
            this.state.totalJewelsCollected + totalJewelsCollected,
        },
        () => {
          this.handleClose(true, 1);
        }
      );
      return;
    }

    // Calculate time for next level (decrease per level, minimum 10s)
    const newGameTime = Math.max(
      10,
      this.state.initialGameTime -
        (nextLevel - 1) * this.state.timeDecreasePerLevel
    );

    // Calculate diamond/shape counts from initial values + level scaling
    // Level 1 = base count, level 2 = base + 1×increment, etc.
    const xLevelCount = Math.floor(
      Math.max(0, nextLevel - 1) / (this.state.settings.x_changes_in_level_count || 1)
    );
    const diamondCount = Math.min(
      25,
      this.state.initialDiamondCount +
        (this.state.settings.x_diamond_count ?? 0) * xLevelCount
    );

    let shapeCount = this.state.initialShapeCount;
    if (this.state.settings.variant === "trails_b") {
      const yLevelCount = Math.floor(
        Math.max(0, nextLevel - 1) / (this.state.settings.y_changes_in_level_count || 1)
      );
      shapeCount = Math.min(
        4,
        this.state.initialShapeCount +
          (this.state.settings.y_shape_count ?? 0) * yLevelCount
      );
    }

    this.setState(
      {
        bonusPoints: this.state.bonusPoints + bonus,
        diamondCount,
        gameTime: newGameTime,
        level: nextLevel,
        loaded: false,
        shapeCount,
        totalAttempts: this.state.totalAttempts + totalAttempts,
        totalJewelsCollected:
          this.state.totalJewelsCollected + totalJewelsCollected,
      },
      () => {
        this.applyLevelColor(this.state.level);
        pointVal === 1 ? this.handleClose(true, 1) : this.reset(true);
      }
    );
  };

  // Reset game board
  reset = (loadedVal: boolean) => {
    const noOfDimonds = this.state ? this.state.shapeCount : 2;
    const diamondType = this.getDiamond(noOfDimonds);
    const maxPlots = 52;
    const diamondCountVal = this.state ? this.state.diamondCount : 15;
    const shapesVals: Array<string> = [];
    let numbers: Array<any> = [];
    const numArr: Array<any> = [];
    let loopNum;
    let order: Array<number> = [];
    for (let i = 0; i < noOfDimonds; i++) {
      numArr[i] = Array.from(
        Array(Math.ceil(diamondCountVal / noOfDimonds)).keys()
      );
      numbers = numbers.concat(numArr[i]);
      order = order.concat(numArr[i]);
    }
    order = order
      .sort((a, b) => {
        return a - b;
      })
      .slice(0, diamondCountVal);

    numbers = numbers.sort((a, b) => {
      return a - b;
    });
    numbers = numbers.slice(0, diamondCountVal);
    numbers = this.shuffle(numbers);

    loopNum = numbers;
    let type = -1;
    for (const i of loopNum) {
      for (let k = 0; k < noOfDimonds; k++) {
        type = numArr[k].indexOf(i) > -1 ? k : -1;
        if (type > -1) {
          shapesVals.push(diamondType[k]);
          numArr[k].splice(numArr[k].indexOf(i), 1);
          break;
        }
      }
    }

    const randomArray = getRandomNumbers(diamondCountVal, 1, maxPlots);
    const state = {
      bonusPoints: this.state ? this.state.bonusPoints : 0,
      current: diamondType,
      diamondColor: this.getRandomColor(),
      diamondCount: diamondCountVal,
      diamondNumbers: numbers,
      diamondSpots: randomArray,
      gameTime: this.state ? this.state.gameTime : 90,
      level: this.state ? this.state.level : 1,
      loaded: loadedVal,
      noBack: this.state.noBack,
      orderNumbers: order,
      pauseTime: 0,
      routes: this.state ? this.state.routes : {},
      settings: this.state ? this.state.settings : {},
      shapeCount: noOfDimonds,
      shapes: shapesVals,
      showModal: 0,
      time: this.state.time,
      totalAttempts: this.state ? this.state.totalAttempts : 0,
      totalJewelsCollected: this.state ? this.state.totalJewelsCollected : 0,
      winnerLine: undefined,
    };

    this.setState(state, () => {
      this.applyLevelColor(this.state.level);
    });
  };

  // Shuffle the diamond numbers
  shuffle = (numbers: Array<number>) => {
    numbers.sort(() => Math.random() - 0.5);
    return numbers;
  };

  // Get random diamond shape
  getDiamond = (noOfDimonds: number) => {
    const diamonds = [];
    const types = [
      "diamond-01",
      "diamond-02",
      "diamond-03",
      "diamond-04",
      "diamond-05",
      "diamond-06",
      "diamond-07",
      "diamond-08",
    ];
    let rand;
    for (let i = 0; i < noOfDimonds; i++) {
      rand = Math.round(Math.random() * (types.length - 1));
      diamonds.push(types[rand]);
      types.splice(rand, 1);
    }

    return diamonds;
  };

  getRandomColor = () => {
    const rand = Math.round(1 + Math.random() * (colors.length - 1));
    return colors[rand - 1];
  };

  clickHome = () => {
    window.location.reload();
  };

  clickBack = () => {
    this.setState(() => ({
      isForwardButton: false,
    }));
    this.sendDataToDashboard(2, true, true);
  };

  sendDataToDashboard = (pointVal: number, status?: boolean, isback?: boolean) => {
    const route = { type: "manual_exit", value: status ?? false };
    let routeData: any[] = [];

    if (this.state.routes.length > 0) {
      const r = JSON.parse(this.state.routes);
      Object.keys(r).forEach((key) => {
        routeData.push(r[key]);
      });
    }
    routeData.push(route);
    this.setState({ routes: JSON.stringify(routeData) }, () => {
      // Nav exits skip questionnaire
      if (status) {
        this.postResult(pointVal, status, isback);
      } else {
        // Normal game end — show questionnaire
        this.setState({ showQuestionnaire: true, pendingPointVal: pointVal });
      }
    });
  };

  postResult = (pointVal: number, status?: boolean, isback?: boolean, questionnaireData?: any) => {
    const scoreVal = this.state.totalAttempts > 0
      ? ((this.state.totalJewelsCollected / this.state.totalAttempts) * 100).toFixed(2)
      : "0.00";
    parent.postMessage(
      JSON.stringify({
        static_data: {
          point: pointVal,
          score: scoreVal,
          total_attempts: this.state.totalAttempts,
          total_bonus_collected: this.state.bonusPoints,
          total_jewels_collected: this.state.totalJewelsCollected,
          is_favorite: this.state.isFavoriteActive,
          ...(questionnaireData && { questionnaire: questionnaireData }),
        },
        temporal_slices: JSON.parse(this.state.routes),
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - this.state.time,
        ...(this.state.forward && { forward: this.state.isForwardButton }),
        ...(!status && { done: true }),
        ...(isback && { clickBack: true }),
      }),
      "*"
    );
  };

  handleQuestionnaireSubmit = (response: any) => {
    this.setState({ showQuestionnaire: false });
    this.postResult(this.state.pendingPointVal, false, false, response);
  };

  handleClose = (status: boolean, pointVal: number) => {
    if (status) {
      this.sendDataToDashboard(pointVal);
    } else {
      this.state.showModal === 1
        ? window.location.reload()
        : parent.postMessage(
            JSON.stringify({
              completed: true,
              static_data: { is_favorite: this.state.isFavoriteActive },
              done: true,
            }),
            "*"
          );
    }
    this.setState({ showModal: 0 });
  };

  clickForward = () => {
    this.setState(() => ({
      isForwardButton: true,
    }));
    this.sendDataToDashboard(2, true, false);
  };

  render() {
    const modal =
      this.state && this.state.showModal > 0 ? (
        <InfoModal
          show={this.state.showModal > 0}
          modalClose={this.handleClose}
          msg={i18n.t(
            "DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING"
          )}
          language={i18n.language}
        />
      ) : null;

    return (
      <div>
        {/* Questionnaire — outside loaded gate so it shows after timeout */}
        {this.state.showQuestionnaire && (
          <Questionnaire
            show={true}
            language={i18n.language}
            setResponse={this.handleQuestionnaireSubmit}
          />
        )}

        {this.state && this.state.loaded && (
          <div className="game-shell">
            {modal}

            {/* D-Cog Header */}
            <div className="heading">
              <nav className="back-link" onClick={this.clickBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </nav>
              {i18n.t("JEWELS")}
              {this.state.forward && (
                <nav className="home-link-forward" onClick={this.clickForward}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </nav>
              )}
              <nav className="home-link" onClick={this.clickHome}>
                <FontAwesomeIcon icon={faRedo} />
              </nav>
            </div>

            {/* Game board with level-colored background */}
            <div
              className="game-board-container"
              ref={this.boardRef}
              style={{ backgroundColor: this.getLevelColor(this.state.level) }}
            >
              <Board
                gameTime={this.state.gameTime}
                totalDiamonds={this.state.diamondCount}
                totalLevels={this.state.totalLevels}
                diamondSpots={this.state.diamondSpots}
                diamondColor={this.state.diamondColor}
                currentDiamond={this.state.current}
                diamondNumbers={this.state.diamondNumbers}
                shapes={this.state.shapes}
                orderNumbers={this.state.orderNumbers}
                level={this.state.level}
                language={i18n.language}
                updateRoutes={this.updateRoutes}
                updateLevel={this.updateLevel}
                handleClose={this.handleClose}
                sendDataToDashboard={this.sendDataToDashboard}
                settings={this.state.settings}
                variant={this.state.variant}
                forward={this.state.forward}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Jewels;
