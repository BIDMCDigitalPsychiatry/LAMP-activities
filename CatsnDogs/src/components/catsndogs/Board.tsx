/**
 * @file   Board.tsx
 * @brief  Board component to load cats and dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import { Box } from "./Box";

import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { InfoModal } from "../common/InfoModal";
import { Timer } from "../common/Timer";

import { getRandomNumbers } from "../../functions";

import i18n from "./../../i18n";

import * as React from "react";
import "./box.css";
import { InstructionModal } from "./InstructionModal";

export interface BoardProps {
  language: string;
  time: number;
  noBack: boolean;
}

interface BoardState {
  animate: boolean;
  boxClass: Array<string>;
  boxes: any,
  dogCount: number;
  catCount: number;
  enableTap: boolean;
  endTime: any;
  gameOver: boolean;
  gameState: number;
  itemToCheck: number;
  lastClickTime: any;
  modalText: string;
  randomPoints: Array<number>;
  startTime: any;
  startTimer: number;
  timeout: boolean;
  showModalInfo: boolean;
  successTaps: number;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any;
  status:any;
  wrongTaps: number;
  sendResponse: boolean;
  showInstruction: boolean;
}

class Board extends React.Component<BoardProps, BoardState> {
  private timer: any;

  constructor(props: BoardProps) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    // Initailise state values
    const timerValue =
      typeof process.env.REACT_APP_DNC_TIMOUT_PERIOD === "undefined"
        ? 360
        : Number(process.env.REACT_APP_DNC_TIMOUT_PERIOD);
    this.state = {
      animate: false,
      boxClass: ["box-square"],
      boxes: null,
      catCount: 0,
      dogCount: 0,
      enableTap: false,
      endTime: null,
      gameOver: false,
      gameState: 0,
      itemToCheck: 1,
      lastClickTime: null,
      modalText: i18n.t("TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM"),
      randomPoints: [],
      sendResponse: false,
      showModalInfo: true,
      startTime: null,
      startTimer: timerValue,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      status:null,
      successTaps: 0,
      timeout: false,
      wrongTaps: 0,
      showInstruction: true,
    };
  }
  // Reset game state for each state
  resetState = () => {
    if (this.state.gameState > 1) {
      this.updateStateWithTaps();
    }
    let catTempCount = this.state.catCount;
    let dogTempCount = this.state.dogCount;
    let itemToCheckv = this.state.itemToCheck;
    switch (this.state.gameState) {
      case 1:
        catTempCount = 0;
        dogTempCount = 1;
        itemToCheckv = 1;
        break;
      case 2:
      case 3:
        itemToCheckv = this.state.gameState === 2 ? 1 : 2;
        catTempCount = 3;
        dogTempCount = 3;
        break;
    }

    const rP = getRandomNumbers(catTempCount + dogTempCount, 1, 10);
    this.setState({
      animate: this.state.gameState >= 1 ? true : false,
      boxClass: ["box-square"],
      catCount: catTempCount,
      dogCount: dogTempCount,
      enableTap: false,
      itemToCheck: itemToCheckv,
      lastClickTime: new Date().getTime(),
      randomPoints: rP,
      showModalInfo: false,
      startTime: this.state.gameState === 1 ? new Date() : this.state.startTime,
      successTaps: 0,
      wrongTaps: 0,
    });
    this.resetBoxClass();
    if (this.state.gameState >= 1) {
      setTimeout(() => {
        this.setState({
          animate: false,
          enableTap: true,
          successTaps: 0,
          wrongTaps: 0,
        });
      }, 1000);
    }
  };
  // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName("box-square")).forEach(
      (elem) => {
        elem.className = "box-square";
      }
    );
  };

  // Check the status of intervals for loading dogs and cats
  checkStatus = () => {
    if (this.state.gameOver || this.state.timeout) {
      clearInterval(this.timer!);
      this.setState({
        catCount: 0,
        dogCount: 0,
        enableTap: false,
      });
    }
  };

  // Each box click is handled here
  handleClick = (e: any, i: number, type: number) => {
    let success = false;
    switch (this.state.gameState) {
      case 1:
        success = this.state.randomPoints.indexOf(i) > -1 ? true : false;
        break;
      case 2:
      case 3:
        success =
          this.state.randomPoints.indexOf(i) > -1 &&
          type === this.state.itemToCheck
            ? true
            : false;
        break;
    }
    const item =
      e.target.className === "box-square" ? e.target : e.target.children[0];
    item.className = success
      ? "box-square green-box-square"
      : "box-square red-box-square";
    this.setState({
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

    this.updateWithTaps(i, success)
  };

  // To track the timer expiring
  passTimerUpdate = (timerValue: number) => {
    if (timerValue === 0) {
      this.setState({
        endTime: new Date(),
        timeout: true,
      });
      this.updateStateWithTaps();
      this.sendGameResult();
    }
    this.setState({
      startTimer: timerValue,
    });
  };

  // Update the state values after each game state
  updateStateWithTaps = () => {
    const states = [];
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = dif / 1000;
    if (this.state.states !== null) {
      const r = JSON.parse(this.state.states);
      Object.keys(r).forEach((key) => {
        states.push(r[key]);
      });
    }
    const box = JSON.parse(this.state.boxes);
    states.push(box);
    const status = []
    if (this.state.status !== null) {
      const r = JSON.parse(this.state.status);
      Object.keys(r).forEach((key) => {
        status.push(r[key]);
      });
    }
    const route = {
      CorrectAnswer: this.state.stateSuccessTaps,
      TimeTaken: lastclickTime.toFixed(2),
      WrongAnswer: this.state.stateWrongTaps,
    };
    status.push(route);

    this.setState({
      lastClickTime: new Date().getTime(),
      states: JSON.stringify(states),
      status:JSON.stringify(status)
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
    const route = {'type': 'manual_exit', 'value': status ?? false} 
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
    const gameScore = Math.round(
      (this.state.stateSuccessTaps / 45) * 100
    );
    let points = 0;    
    if (gameScore === 100) {
      points = points + 2;
    } else {
      points = points + 1;
    }
     parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - this.props.time,
        static_data: {
          correct_answers: this.state.stateSuccessTaps,
          point: points,
          total_questions: 45,
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
  });

  };

  // Modal close is handled here
  handleClose = (status: boolean) => {
    this.setState({
      lastClickTime: new Date().getTime(),
      showModalInfo: status     
    });
    this.resetState();
    this.startTimer();
  };

  // Interval for dogs and cats animation
  startTimer = () => {
    let timerValue = this.state.gameState === 0 ? 3000 : 7000;
    this.timer = setInterval(() => {
      this.resetBoxClass();
      this.setGameState();
    }, timerValue);
    timerValue = 0;
  };

  // Set game state values
  setGameState = () => {
    let catTempCount = this.state.catCount;
    let dogTempCount = this.state.dogCount;
    let gameOverVal = this.state.gameOver;
    let gameStateVal = this.state.gameState;
    let showModalInfoVal = this.state.showModalInfo;
    let modalTxt = this.state.modalText;

    switch (this.state.dogCount) {
      case 0:
        dogTempCount = 1;
        gameStateVal = 1;
        break;
      case 1:
      case 2:
      case 3:
        dogTempCount =
          this.state.gameState < 3
            ? this.state.dogCount + 1
            : this.state.dogCount;
        const timerValue = this.state.dogCount === 1 ? 3000 : 7000;
        if (this.state.dogCount === 2) {
          clearInterval(this.timer);
          this.timer = setInterval(() => {
            this.resetBoxClass();
            this.setGameState();
          }, timerValue);
        }
        if (this.state.gameState === 3 && this.state.catCount < 5) {
          catTempCount = this.state.catCount + 1;
        } else if (this.state.gameState === 3 && this.state.catCount === 5) {
          gameOverVal = true;
          gameStateVal = 4;
          this.updateStateWithTaps();
        } else if (this.state.gameState === 2) {
          catTempCount = 3;
        }
        break;
      case 4:
        dogTempCount =
          this.state.gameState < 3
            ? this.state.dogCount + 1
            : this.state.dogCount;
        catTempCount = this.state.gameState === 1 ? 0 : 3;
        break;
      case 5:
        dogTempCount =
          this.state.gameState < 3
            ? this.state.dogCount + 1
            : this.state.dogCount;
        if (this.state.gameState === 2) {
          gameStateVal = 3;
          showModalInfoVal = true;
          modalTxt = i18n.t("NOW_TAP_THE_BOXES_THAT_HAVE_A_CAT_BEHIND_THEM");
          dogTempCount = 3;
          catTempCount = 3;
        }
        break;
      case 6:
        catTempCount = 3;
        dogTempCount = 3;
        gameStateVal = 2;
        showModalInfoVal = true;
        modalTxt = i18n.t(
          "CONTINUE_TO_TAP_THE_BOXES_THAT_HAVE_A_DOG_BEHIND_THEM"
        );
        break;
    }
    if (showModalInfoVal) {
      clearInterval(this.timer!);
    }
    const rP = getRandomNumbers(catTempCount + dogTempCount, 1, 10);
    // State values for game state
    this.setState({
      animate: showModalInfoVal ? false : true,
      catCount: showModalInfoVal ? 0 : catTempCount,
      dogCount: showModalInfoVal ? 0 : dogTempCount,
      enableTap: false,
      endTime: gameStateVal === 4 ? new Date() : this.state.endTime,
      gameOver: gameOverVal,
      gameState: gameStateVal,
      modalText: modalTxt,
      randomPoints: showModalInfoVal ? [] : rP,
      showModalInfo: showModalInfoVal,
      successTaps: 0,
      wrongTaps: 0,
    });

    // handle animation
    setTimeout(() => {
      this.setState({
        animate: false,
        enableTap: true,
        successTaps: 0,
        wrongTaps: 0,
      });
    }, 1000);

    this.checkStatus();
  };

  
  // To refresh the game
  clickHome = () => {
    window.location.reload();
  };
  
  clickBack = () => {
   
      this.sendGameResult(true)
    
  }

  handleCloseInstructionModal = () => {
    this.setState({ showInstruction: false });
  };

  // Render the game board
  render() {
    let boxes;
    if (this.state.gameOver || this.state.timeout) {
      if (!this.state.sendResponse) {
        this.sendGameResult();
      }
      boxes = this.state.gameOver ? i18n.t("GAME_OVER") +" !!!" : null;
    } else {
      const numbers = [
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "eightth",
        "nineth",
        "tenth",
      ];
      boxes = [];
      let classn = "";
      let dogBoxFlag = false;
      let catBoxFlag = false;
      let j = 0;
      let k = 0;
      for (let i = 1; i <= 10; i++) {
        dogBoxFlag = false;
        catBoxFlag = false;
        // Image to be loaded behind the box
        if (this.state.randomPoints.includes(i)) {
          dogBoxFlag =
            this.state.dogCount > 0 && j < this.state.dogCount ? true : false;
          if (dogBoxFlag) {
            j++;
          }
          if (!dogBoxFlag) {
            catBoxFlag =
              this.state.catCount > 0 && k < this.state.catCount ? true : false;
            if (catBoxFlag) {
              k++;
            }
          }
        }
        const boxClass = "box-square";
        classn = "box " + numbers[i - 1];
        const img =
          dogBoxFlag === true ? "dog" : catBoxFlag === true ? "cat" : "";

        // To find the whether to enable or disable box tapping
        let enableStatus = false;
        switch (this.state.gameState) {
          case 1:
            enableStatus =
              this.state.enableTap &&
              this.state.successTaps + this.state.wrongTaps <
                this.state.randomPoints.length
                ? true
                : false;
            break;
          case 2:
            enableStatus =
              this.state.enableTap &&
              this.state.successTaps + this.state.wrongTaps <
                this.state.dogCount
                ? true
                : false;
            break;
          case 3:
            enableStatus =
              this.state.enableTap &&
              this.state.successTaps + this.state.wrongTaps <
                this.state.catCount
                ? true
                : false;
            break;
        }
        const itemType = dogBoxFlag === true ? 1 : 2;
        boxes.push(
          <div>
            <Box
              index={i}
              onClick={this.handleClick}
              boxClass={classn}
              img={img}
              itemType={itemType}
              enableTap={enableStatus}
              animateStatus={this.state.animate}
              boxSQClass={boxClass}
            />
          </div>
        );
      }
    }
    // Timer to be shown or not
    const timer =
      !this.state.timeout &&
      !this.state.gameOver &&
      this.state.gameState > 0 ? (
        <Timer
          passTimerUpdate={this.passTimerUpdate}
          startTimeInSeconds={this.state.startTimer}
          startTimer={this.state.gameState}
        />
      ) : null;

    // Modal to be shown or not
    const modal = this.state.showModalInfo ? (
      <InfoModal
        show={this.state.showModalInfo}
        modalClose={this.handleClose}
        msg={this.state.modalText}
        language={i18n.language}
      />
    ) : null;

    const instructionModal = this.state.showInstruction ? (
      <InstructionModal
        show={true}
        modalClose={this.handleCloseInstructionModal}
        msg ={ `${i18n.t("IN_THIS_GAME_YOU_WILL_SEE_A_SCREEN_WITH_MANY_BOXES_THESE_BOXES_WILL_LIFT_REVEALING_EITHER_A_DOG_CAT_OR_NOTHING_BEHIND_THEM_A_TASK_IS_TO_TAP_THE_CORRECT_BOXES_BASED_ON_WHAT_IS_BEHIND_EACH_BOX_THE_INSTRUCTIONS_FOR_WHICH_BOXES_ARE_CORRECT_WILL_CHANGE_DEPENDING_ON_THE_LEVEL_SO_PAY_ATTENTION_TO_THE_ANIMALS")}`  }      
        language={i18n.language}
      />
    ) : null;
    return (
      <div>
            {!this.props.noBack && <nav className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} onClick={this.clickBack} />
            </nav>}
            <nav className="home-link">
              <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
            </nav>
            <div className="heading">{i18n.t("CATS_AND_DOGS")}</div>
            <div className="game-board">
      <div>
        <div className="timer-div">{timer}</div>
        <div className="mt-30">{boxes}</div>
        {modal}
      </div>
      {instructionModal}
      </div>
      </div>
    );
  }
}

export default Board;
