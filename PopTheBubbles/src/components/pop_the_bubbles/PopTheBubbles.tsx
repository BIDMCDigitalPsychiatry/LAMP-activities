/**
 * @file   PopTheBubbles.tsx
 * @brief  Starting component which is the initial point of bubbles game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";
import {Animated} from "react-animated-css";

import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomNumbers } from "../../functions";

import i18n from "./../../i18n";
import Board from "./Board";
import { Bubble } from "./Bubble";
import "./bubble.css";


interface AppState {
  levelCompleted: boolean;
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
}

class PopTheBubbles extends React.Component<{}, AppState> {
  private bubbleCount: number;
  constructor(props: {}) {
    super(props);

    const eventMethodObj: any = window.addEventListener;
    const eventMethod = eventMethodObj ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";

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
      bubble_count: [60, 80, 80],
      bubble_duration: 1.0, // 0,
      bubble_speed: [30, 40, 50],
      completed: false,
      correctGoCount: 0,
      correctNoGo: 0,
      falseHitsCount: 0,
      gameLevel: 1,
      gameOver: false,
      intertrial_duration: 1.0,
      isGameStarted: false,
      lastClickTime: new Date().getTime(),
      level: 0,
      levelCompleted: false,
      levelStartTime: 0,
      levelVal: 0,
      missedClicks: 0,
      route: [],
      score: 0,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      timeDifference: 0,
      totalGoCount: 0,
      totalNoGoCount: 0,
      wrongNoGoClicks: 0,
      wrongNoGoCount: 0,
      xCoords: xValues,
      xPoints: this.getCoordPoints(xValues),
      yCoords: yValues,
      yPoints: this.getCoordPoints(yValues),
    };

    eventer(
      messageEvent,
      (e: any) => {
        const configuration = e.data.configuration;
        const settings = e.data.activity?.settings ?? (e.data.settings ?? undefined);
        this.setState({
          bubble_count: settings
            ? settings.bubble_count
            : this.state.bubble_count,
          bubble_duration: settings
            ? settings.bubble_duration
            : this.state.bubble_duration,
          bubble_speed: settings
            ? settings.bubble_speed
            : this.state.bubble_speed,
          intertrial_duration: settings
            ? settings.intertrial_duration
            : this.state.intertrial_duration,
        });
        i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
      },
      false
    );
    this.bubbleCount = this.state.bubble_count[0];
  }

  componentDidUpdate = (previousProps: any, prevState: any) => {
    if (this.state.isGameStarted) {
      if (!this.state.completed) {
        if (this.state.levelStartTime === 0) {
          const newDateTime = new Date().getTime();
          this.setState({ levelStartTime: newDateTime });
        }
        return;
      }
    }
  };

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
    window.location.reload(false);
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
    this.setState((prevState) => ({
      completed,
      correctGoCount,
      correctNoGo,
      falseHitsCount,
      gameLevel: this.state.gameLevel + 1,
      level: 0,
      levelCompleted: true,
      levelVal,
      missedClicks,
      route: [...prevState.route, route],
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
      const temporalSlices = [].concat.apply([], this.state.route);
      setTimeout(() => {
        parent.postMessage(
          JSON.stringify({
            static_data: {},
            temporal_slices: temporalSlices,
            timestamp: new Date().getTime(),
          }),
          "*"
        );
      }, 5000);
    }
    this.bubbleCount = this.state.bubble_count[1];
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
    const x = window.innerWidth - (window.innerWidth * 77) / 100;
    const y = window.innerHeight - (window.innerHeight * 60) / 100;

    this.bubbleCount =
      this.state.gameLevel === 1
        ? this.state.bubble_count[0]
        : this.state.gameLevel === 2
        ? this.state.bubble_count[1]
        : this.state.bubble_count[2];

    switch (this.state.level) {
      case 0:
        infoSection =
          this.state.gameLevel === 1 ? (
            <div className="pop-the-bubble-board">
              <div className="mt-30">
              
   
              <Animated animationIn="bounceInDown" animationOut="fadeOut" animationInDuration={1000} isVisible={true}>
                <h1 className="mt-30per">{i18n.t("POP_THE_BUBBLES")}</h1>
                </Animated>
                <Animated animationIn="bounceInUp" animationInDuration={1500} className="bubble-blue size-l" animationOut="fadeOut" isVisible={true}>
                <Bubble
                  text={i18n.t("TAP_TO_CONTINUE")}
                  bubbleToTap={false}
                  x={x}
                  index={0}
                  y={y}
                  class="bubble-text"
                  onClick={this.handleClick}
                  bubbleDuration={this.state.bubble_duration}
                />
                </Animated>
              </div>
            </div>
          ) : (
            <div className="pop-the-bubble-board">
              <div className="mt-30">
                <h1>{i18n.t("LEVEL_NUM_COMPLETED", {levelNumber: (this.state.gameLevel - 1)})}</h1>
                <div className="pl-30 pr-30 game-rule text-center">
                  <div className=" pr-30 game-rule text-center">
                    <h1>
                      {i18n.t("YOU_GOT_PERCENT", {percentage: Math.round((this.state.correctGoCount / this.state.totalGoCount) * 100)})}
                      %
                    </h1>

                    <div className="textLabel">
                    {i18n.t("NUMBER_OF_CORRECTLY_ANSWERED_GO_TRIALS", {correctGoCount: this.state.correctGoCount,
                    percentage: Math.round(
                      (this.state.correctGoCount / this.state.totalGoCount) *
                        100
                    )})}
                      %
                    </div>

                    <div className="textLabel">                      
                    {i18n.t("NUMBER_OF_INCORRECTLY_ANSWERED_GO_TRIALS", {missedClicks: this.state.missedClicks,
                    percentage: Math.round(
                      (this.state.missedClicks / this.state.totalGoCount) *
                        100
                    )})}
                      %
                    </div>

                    <div className="textLabel">
                    {i18n.t("NUMBER_OF_CORRECTLY_ANSWERED_NO_GO_TRIALS", {correctNoGo: this.state.correctNoGo,
                    percentage: this.state.totalNoGoCount > 0
                    ? Math.round(
                        (this.state.correctNoGo /
                          this.state.totalNoGoCount) *
                          100
                      )
                    : 0})}
                      %
                    </div>

                    <div className="textLabel">
                    {i18n.t("NUMBER_OF_INCORRECTLY_ANSWERED_NO_GO_TRIALS", {
                    percentage: this.state.totalNoGoCount > 0
                    ? Math.round(
                        (this.state.wrongNoGoCount /
                          this.state.totalNoGoCount) *
                          100
                      )
                    : 0, wrongNoGoCount: this.state.wrongNoGoCount})}
                      %
                    </div>

                    <div className="textLabel">
                    {i18n.t("NUMBER_OF_FALSE_HITS", {falseHitsCount: this.state.falseHitsCount})}
                    </div>

                    <div className="textLabel">
                      {this.state.timeDifference} total time taken to complete
                      level
                    </div>
                  </div>
                </div>
                <div>
                  {this.state.gameLevel <= 3 ? (
                    <Bubble
                      text="Tap to continue"
                      bubbleToTap={false}
                      x={x}
                      index={0}
                      y={y}
                      class="size-l bubble-blue"
                      onClick={this.handleClick}
                      bubbleDuration={this.state.bubble_duration}
                    />
                  ) : (
                    <Bubble
                      text="Completed"
                      bubbleToTap={false}
                      x={x}
                      index={0}
                      y={y}
                      class="size-l bubble-blue"
                      onClick={this.noClick}
                      bubbleDuration={this.state.bubble_duration}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        break;
      case 1:
        const alertTextTop =
          this.state.gameLevel === 1 ? i18n.t("TAP_TO_POP_LEVEL_1_BUBBLES_TOP") : i18n.t("TAP_TO_POP_LEVEL_2_3_BUBBLES_TOP");
        const alertTextBottom =
          this.state.gameLevel === 1
            ? i18n.t("TAP_TO_POP_LEVEL_1_BUBBLES_BOTTOM")
            : this.state.gameLevel === 2
            ? i18n.t("TAP_TO_POP_LEVEL_2_BUBBLES_BOTTOM")
            : i18n.t("TAP_TO_POP_LEVEL_3_BUBBLES_BOTTOM");
                    
        infoSection = (
          <div className="pop-the-bubble-board">
            <div className="mt-30">
              <h1 className="mt-10">{i18n.t("LEVEL_NUMBER", {gameLevel: this.state.gameLevel})}</h1>
              <div className="pl-30 pr-30 game-rule text-center">
                <div className="pl-30 pr-30 game-rule text-center">
                  <p>{alertTextTop}</p> 
                  <p>{alertTextBottom}</p>
                </div>
              </div>
              <div>
                <Bubble
                  text={i18n.t("TAP_TO_CONTINUE")}
                  bubbleToTap={false}
                  x={x}
                  index={0}
                  y={y}
                  class="size-l bubble-blue"
                  onClick={this.handleClick}
                  bubbleDuration={this.state.bubble_duration}
                />
              </div>
            </div>
          </div>
        );
        break;
      case 2:
        infoSection = (
          <Board
            bubbleCount={this.bubbleCount}
            onCompleted={this.onCompleted}
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

  // Game render function
  render() {
    const infoSection = this.getLevelCases();
    return (
      <div id="pop-the-bubble-body">
        <nav className="home-link">
          <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
        </nav>
        <div className="heading">{i18n.t("POP_THE_BUBBLES")}</div>
        {infoSection}
      </div>
    );
  }
}

export default PopTheBubbles;