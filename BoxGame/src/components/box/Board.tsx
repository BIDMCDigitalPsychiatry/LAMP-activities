/**
 * @file   Board.tsx
 * @brief  Board component to load box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import { getRandomNumbers } from "../../functions";
import i18n from "./../../i18n";

import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Timer } from "../common/Timer";
import "./box.css";

interface BoardState {
  activeCell: number;
  animate: boolean;
  boxClass: Array<string>;
  boxCount: number;
  boxes: any;
  enableTap: boolean;
  endTime: any;
  failureCount: number;
  gameOver: boolean;
  gameSequence: boolean;
  gameState: number;
  lastClickTime: any;
  nextButton: boolean;
  orderNumber: number;
  randomPoints: Array<number>;
  startTime: any;
  startTimer: number;
  timeout: boolean;
  showGo: boolean;
  showWait: boolean;
  successStages: number;
  successTaps: number;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any;
  wrongStages: number;
  wrongTaps: number;
  sendResponse: boolean;
}

interface BoardProps {
  reverse: boolean;
  time: number;
  language: string;
  noBack: boolean;
}

class Board extends React.Component<BoardProps, BoardState> {
  private timer: any;
  private timerBox: any;
  private resetWaitBox: any;
  private resetGoBox: any;

  constructor(props: BoardProps) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    // Initailise state values
    const timerValue =
      typeof process.env.REACT_APP_BOX_TIMOUT_PERIOD === "undefined"
        ? 120
        : Number(process.env.REACT_APP_BOX_TIMOUT_PERIOD);
    this.state = {
      activeCell: 0,
      animate: false,
      boxClass: ["box-square"],
      boxCount: 1,
      boxes: null,
      enableTap: false,
      endTime: null,
      failureCount: 0,
      gameOver: false,
      gameSequence: false,
      gameState: 0,
      lastClickTime: null,
      nextButton: false,
      orderNumber: -1,
      randomPoints: [],
      sendResponse: false,
      showGo: false,
      showWait: true,
      startTime: null,
      startTimer: timerValue,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      successStages: 0,
      successTaps: 0,
      timeout: false,
      wrongStages: 0,
      wrongTaps: 0,
    };
  }
  // On load function - set state of the gamne
  componentDidMount = () => {
    this.resetState();
  };

  // Reset game state for each state
  resetState = () => {
    if (this.state.gameState > 0) {
      this.updateStateWithTaps();
    }
    // if falied any state 2times - game will exit
    if (this.state.failureCount === 1 && this.state.wrongTaps > 0) {
      this.checkStatus();
      // To show wait message
      this.setState({
        gameOver: true,
        gameSequence: false,
        showGo: false,
        showWait: false,
      });
    } else {
      const statePassed =
        (this.state.boxCount >= 2 &&
          this.state.boxCount === this.state.successTaps) ||
        this.state.boxCount === 1
          ? true
          : false;
      const gameStateVal = statePassed
        ? this.state.gameState + 1
        : this.state.gameState;
      const wrongStagesVal = statePassed
        ? this.state.wrongStages
        : this.state.wrongStages + 1;
      const successStagesVal = statePassed
        ? this.state.successStages + 1
        : this.state.successStages;
      if (gameStateVal !== 6) {
        this.resetBoxClass();
      }
      this.setState({
        gameState: gameStateVal,
        nextButton: false,
        orderNumber: -1,
        randomPoints: [],
        successStages: successStagesVal,
        wrongStages: wrongStagesVal,
      });

      // To show wait message
      this.resetWaitBox = setTimeout(() => {
        if (gameStateVal !== 6) {
          this.setState({
            gameSequence: true,
            orderNumber: -1,
            randomPoints: [],
            showWait: true,
            startTime:
              this.state.gameState === 1 ? new Date() : this.state.startTime,
          });
        }
        this.setState({});
      }, 500);

      // Set game state after infor message
      this.resetGoBox = setTimeout(() => {
        this.setState({ lastClickTime: new Date().getTime(), showWait: false });
        this.setGameState();
      }, 2000);
    }
  };
  // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName("box-white")).forEach((elem) => {
      elem.className = "box-white";
    });
  };

  // Check the status of intervals for loading boxes
  checkStatus = () => {
    if (this.state.gameOver || this.state.timeout) {
      clearInterval(this.timer!);
      clearInterval(this.timerBox!);
      clearInterval(this.resetGoBox!);
      clearInterval(this.resetWaitBox!);
      this.setState({
        boxCount: 0,
        enableTap: false,
      });
    }
  };

  // Each box click is handled here
  handleClick = (e: any) => {
    if (
      this.state.enableTap &&
      ((!this.props.reverse &&
        this.state.orderNumber + 1 < this.state.randomPoints.length) ||
        (this.props.reverse && this.state.orderNumber - 1 >= 0))
    ) {
      let success = false;
      const order = this.state.randomPoints.indexOf(
        parseInt(e.target.getAttribute("data-key"), 10)
      );
      success =
        (!this.props.reverse && order === this.state.orderNumber + 1) ||
        (this.props.reverse && order === this.state.orderNumber - 1)
          ? true
          : false;
      const item =
        e.target.className === "box-white" ? e.target : e.target.children[0];
      if (typeof item !== "undefined") {
        item.className = success
          ? "box-white green-box-square"
          : "box-white red-box-square";

        this.setState({
          enableTap:
            (!this.props.reverse &&
              this.state.orderNumber + 1 < this.state.randomPoints.length) ||
            (this.props.reverse && this.state.orderNumber - 1 >= 0)
              ? true
              : false,
          nextButton:
            (!this.props.reverse &&
              this.state.orderNumber + 2 >= this.state.randomPoints.length) ||
            (this.props.reverse && this.state.orderNumber - 1 >= 0)
              ? true
              : false,
          orderNumber: this.props.reverse
            ? this.state.orderNumber - 1
            : this.state.orderNumber + 1,
          stateSuccessTaps: success
            ? this.state.stateSuccessTaps + 1
            : this.state.stateSuccessTaps,
          stateWrongTaps: !success
            ? this.state.stateWrongTaps + 1
            : this.state.stateWrongTaps,
          successTaps: success
            ? this.state.successTaps + 1
            : this.state.successTaps,
          wrongTaps: success ? this.state.wrongTaps : this.state.wrongTaps + 1,
        });
        // Update states for game result
        this.updateWithTaps(
          parseInt(e.target.getAttribute("data-key"), 10),
          success
        );
      }
    }
  };

  // To track the timer expiring
  passTimerUpdate = (timerValue: number) => {
    if (timerValue === 0) {
      this.setState(
        {
          endTime: new Date(),
          timeout: true,
        },
        () => {
          this.updateStateWithTaps();
          this.sendGameResult();
        }
      );
    }
    this.setState({
      startTimer: timerValue,
    });
  };
  // To track echa tap on box
  updateStateWithTaps = () => {
    const states = [];
    if (this.state.states !== null) {
      const r = JSON.parse(this.state.states);
      Object.keys(r).forEach((key) => {
        states.push(r[key]);
      });
    }
    const box = JSON.parse(this.state.boxes);
    states.push(box);
    this.setState({
      states: JSON.stringify(states),
    });
  };
  // Update the state values after each game state
  updateWithTaps = (boxNo: number, statusVal: boolean) => {
    const boxes = [];
    const lastclickTime = new Date().getTime() - this.state.lastClickTime;
    if (this.state.boxes !== null) {
      const r = JSON.parse(this.state.boxes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }
    if (this.state.enableTap) {
      const route = {
        duration: lastclickTime,
        item: boxNo,
        level: this.state.gameState,
        type: statusVal,
        value: null,
      };
      boxes.push(route);
    }
    this.setState({
      boxes: JSON.stringify(boxes),
      lastClickTime: new Date().getTime(),
    });
  };

  // Call the API to pass game result
  sendGameResult = (status?: boolean) => {
    const route = {'type': 'manual_exit', 'value': status ??  false} 
    const boxes = [];
    if (this.state.boxes !== null) {
      const r = JSON.parse(this.state.boxes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }    
    boxes.push(route);    
    this.setState({
      boxes: JSON.stringify(boxes),
    }, () => { 
    let points = 0;
    const totalLevels = 5;
    const totalStages = totalLevels + this.state.wrongStages;
    const gameScore = Math.round(
      (this.state.successStages / totalStages) * 100
    );
    if (gameScore === 100) {
      points = points + 2;
    } else {
      points = points + 1;
    }
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - this.props.time,
        static_data: {
          EndTime: new Date(),
          StartTime: this.state.startTime,
          correct_answers: this.state.stateSuccessTaps,
          point: points,
          score: gameScore,
          max_score: 100,
          type: 1,
          wrong_answers: this.state.stateWrongTaps,
        },
        temporal_slices: JSON.parse(this.state.boxes),
        timestamp: new Date().getTime(),
      }),
      "*"
    );

    this.setState({
      sendResponse: true,
    });
    })
  };

  // Set game state values
  setGameState = () => {
    const statePassed =
      (this.state.boxCount >= 2 &&
        this.state.boxCount === this.state.successTaps) ||
      this.state.boxCount === 1
        ? true
        : false;
    const boxTempCount = statePassed
      ? this.state.boxCount + 1
      : this.state.boxCount;
    const gameStateVal = this.state.gameState;
    const showWaitVal =
      statePassed && this.state.failureCount + 1 < 2
        ? this.state.showWait
        : false;
    const failureCountVal =
      this.state.gameState !== gameStateVal
        ? 0
        : !statePassed
        ? this.state.failureCount + 1
        : this.state.failureCount;
    const rP = getRandomNumbers(boxTempCount, 1, 16);
    const gameOverVal =
      (this.state.gameState !== gameStateVal && gameStateVal === 6) ||
      failureCountVal === 2
        ? true
        : false;
    // State values for game state
    if (gameStateVal === 6) {
      this.setState({ gameOver: true });
      this.checkStatus();
    } else {
      this.setState({
        animate: showWaitVal ? false : true,
        boxCount: boxTempCount,
        // boxes: null,
        enableTap: false,
        endTime: gameStateVal === 4 ? new Date() : this.state.endTime,
        failureCount: failureCountVal,
        gameOver: gameOverVal,
        // gameState: gameStateVal,
        nextButton: false,
        orderNumber: this.props.reverse ? rP.length : -1,
        randomPoints: rP,
        showWait: showWaitVal,
        successTaps: 0,
        wrongTaps: 0,
      });
      this.timer = setTimeout(() => this.showBoxes(rP, 0), 1000);
    }
  };

  // Show boxes one by one in secific time intervals
  showBoxes = (rP: Array<number>, i: number) => {
    this.setState({
      activeCell: rP[i],
      animate: false,
      successTaps: 0,
      wrongTaps: 0,
    });
    if (i + 1 <= rP.length) {
      this.setState({
        animate: true,
      });
      this.timerBox = setTimeout(() => this.showBoxes(rP, i + 1), 1500);
    } else {
      this.setState({
        enableTap: true,
        showGo: true,
      });
      this.timerBox = setTimeout(() => {
        this.setState({
          gameSequence: false,
          showGo: false,
        });
      }, 1500);
    }
  };

  // To set up game board
  createTable = () => {
    const table = [];
    let p = 1;
    // Outer loop to create parent
    for (let i = 0; i < 4; i++) {
      const children = [];
      // Inner loop to create children
      for (let j = 0; j < 4; j++) {
        const classN =
          this.state.animate === true && p === this.state.activeCell
            ? " box-green"
            : "box-white";
        children.push(
          <td key={p}>
            <div className={classN} onClick={this.handleClick} data-key={p} />
          </td>
        );
        p++;
      }
      // Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };

  // To set the game board table size based on screen resolution
  getTableStyles = () => {
    const size = window.innerWidth - (window.innerWidth * 10) / 100;
    const styles = { height: `${size}px`, width: `${size}px` };
    return styles;
  };
    // To refresh the game
    clickHome = () => {
      window.location.reload();
    };
  
    clickBack = () => {
      this.sendGameResult(true)      
    }

  // Render the game board
  render() {
    let board;
    let nextButton = null;
    let timer = null;
    let alert = null;
    let level = null;
    let infoText = null;
    let alertText = null;
    let instruction = null;
    if (
      this.state.gameOver ||
      this.state.timeout ||
      this.state.failureCount === 2
    ) {
      if (!this.state.sendResponse) {
        // If game exit, send result to spi
        this.sendGameResult();
      }
      board =
        this.state.gameOver &&
        this.state.failureCount <= 1 &&
        this.state.wrongTaps === 0
          ? i18n.t("CONGRATS") + " !!!"
          : this.state.gameOver || this.state.failureCount === 2
          ? i18n.t("GAME_OVER") + " !!!"
          : this.state.timeout
          ? i18n.t("TIME_OUT") + " !!!"
          : null;
    } else {  
      board = (
        <table className="box-table" style={this.getTableStyles()}>
          <tbody>{this.createTable()}</tbody>
        </table>
      );
      // Next button rendering controlled here
      nextButton = this.state.nextButton ? (
        <div className="next-button">
          <button onClick={this.resetState}>{i18n.t("NEXT")}</button>
        </div>
      ) : null;
      // Timer to be shown or not
      timer =
        !this.state.timeout &&
        !this.state.gameOver &&
        this.state.gameState > 0 ? (
          <Timer
            passTimerUpdate={this.passTimerUpdate}
            startTimeInSeconds={this.state.startTimer}
            startTimer={this.state.gameState}
          />
        ) : null;
      // Wait and go message handled here
      alert = this.state.showWait ? (
        <div className="box-alert">
          <span>{i18n.t("PLEASE_WAIT_AND_WATCH")}</span>
        </div>
      ) : this.state.showGo ? (
        <div className="box-alert">
          <span>{i18n.t("GO")}</span>
        </div>
      ) : null;
      // Info message to show
      infoText =
        this.state.gameSequence && this.state.gameState > 0 ? (
          <span>{i18n.t("PLEASE_REMEMBER_THE_SEQUENCE")}</span>
        ) : null;
      // Game state
      const total_level = 6 + this.state.wrongStages;
      level =
        this.state.gameState > 0 ? (
          <span>{i18n.t("LEVEL")} {this.state.gameState}/{total_level}</span>
        ) : null;
      // Show the alert on top of game board
      alertText = this.state.gameSequence ? (
        <div className="box-info">
          {i18n.t("REMEMBER_THE_HIGHLIGHTED_BOXES_IN_THE_ORDER_YOU_SEE_THEM")}
        </div>
      ) : this.state.gameState > 0 ? (
        <div className="box-info">
          {this.props.reverse
            ? i18n.t(
                "NOW_TAP_ON_THE_BOXES_IN_THE_REVERSE_ORDER_THEY_WERE_HIGHLIGHTED"
              )
            : i18n.t("NOW_TAP_ON_THE_BOXES_IN_THE_ORDER_THEY_WERE_HIGHLIGHTED")}
        </div>
      ) : null;
      instruction = (
      <div className="instruction">
        {i18n.t("YOU_WILL_SEE_A_GRID_OF_BOXES_THE_BOXES_IN_A_GRID_WILL_LIGHT_UP_IN_A_CERTAIN_ORDER_REMEMBER_THE_ORDER_AND_THEN_TAP_THE_BOXES_IN_THE_ORDER_IN_WHICH_THEY_LIT_UP_EACH_LEVEL_WILL_HAVE_MORE_BOXES_LIGHT_UP_IN_SEQUENCE_SEE_HOW_FAR_YOU_CAN_GET")}
      </div>
      )
    }

    return (
      <div>
             {!this.props.noBack && <nav className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} onClick={this.clickBack} />
            </nav>}
            <nav className="home-link">
              <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
            </nav>
            <div className="heading">{i18n.t("BOX_GAME")}</div>
            <div className="game-board">
      <div>
        <div className="timer-div">
          {timer}
          {level}
          <br />
          {infoText}
        </div>
        <div className="mt-30 box-game">
          {board}
          {alert}
        </div>
        {nextButton}

        {alertText}
      </div>
      </div>
      {instruction}
      </div>
    );
  }
}

export default Board;
