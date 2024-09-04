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
  enableTap: boolean;
  endTime: any;
  gameOver: boolean;
  gameState: number;
  lastClickTime: any;
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
  successCompletion: boolean;
  boxCount: number
  numbers: string[]
}

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
  'eleventh',
  'twelth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth'
];
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
      dogCount: 0,
      numbers: this.shuffleArray(numbers),
      enableTap: false,
      endTime: null,
      gameOver: false,
      gameState: 0,
      lastClickTime: null,
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
      successCompletion:true,
      boxCount: 2
    };
  }
  // Reset game state for each state
  resetState = () => {
    let dogTempCount = this.state.successCompletion ? this.state.dogCount + 1 : (this.state.dogCount > 1 ? this.state.dogCount -1 : 1)
    let boxCount =  this.state.successCompletion ? this.state.boxCount + 2 : (this.state.dogCount > 1 ? this.state.boxCount - 2 : 4)
   console.log(boxCount,  (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    navigator.userAgent
  )) )
    if (
      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        navigator.userAgent
      ) && boxCount >= 10) || !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i).test(
        navigator.userAgent
      ) && boxCount >= 20
    ) {
      this.sendGameResult(); 
    }
    else {
      const rP = getRandomNumbers(dogTempCount, 1, boxCount);
      this.setState({
        animate: true,
        boxClass: ["box-square"],
        dogCount: dogTempCount,
        enableTap: false,
        lastClickTime: new Date().getTime(),
        randomPoints: rP,
        showModalInfo: false,
        startTime: this.state.gameState === 1 ? new Date() : this.state.startTime,
        successTaps: 0,
        wrongTaps: 0,
        boxCount: boxCount
      });
       
        setTimeout(() => {
          this.setState({
            animate: false,
            enableTap: false,             
          })
          setTimeout(() => {
            this.setState({
              animate: true,
              enableTap: true          
            },
          )          
          }, 2000);
        }, 2000) 
      
      this.checkStatus();
    }    
  };
  // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName("box-square")).forEach(
      (elem) => {
        elem.className = "box-square dog-cover";
      }
    );
  };

  // Check the status of intervals for loading dogs and cats
  checkStatus = () => {
    if (this.state.gameOver || this.state.timeout) {
      clearInterval(this.timer!);
      this.setState({
        dogCount: 0,
        enableTap: false,
      });
    }
  };

  // Each box click is handled here
  handleClick = (e: any, i: number) => {
    let success  = this.state.randomPoints.indexOf(i) > -1 ? true : false;
    const item = e.target
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
    }, () => {
      this.updateWithTaps(i, success)
      if(this.state.successTaps + this.state.wrongTaps === this.state.randomPoints.length) { 
        this.setState({successCompletion : this.state.successTaps === this.state.randomPoints.length},
        () => {
          setTimeout(() => {
            this.resetBoxClass();
            this.resetState()
          }, 1000)
        })
      }
    });

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

  // Interval for dogs  animation
  startTimer = () => {
    // let timerValue = this.state.gameState === 0 ? 6000 ;
    this.timer = setInterval(() => {
      this.resetBoxClass();
      this.resetState();
    }, 2000);
  };

  
  // To refresh the game
  clickHome = () => {
    window.location.reload();
  };
  
  clickBack = () => {
      this.sendGameResult(true)
  }

  handleCloseInstructionModal = () => {
    this.setState({ 
      showInstruction: false ,
      showModalInfo: false,     
      lastClickTime: new Date().getTime(),
    });
    this.resetState();
    // this.startTimer();  
  };

   shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    }

  // Render the game board
  render() {
    let boxes;
    if ((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      navigator.userAgent
    ) && this.state.boxCount >= 10) || !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i).test(
      navigator.userAgent
    ) && this.state.boxCount >= 20) {
      boxes = i18n.t("GAME_OVER") +" !!!" ;
    } else if(this.state.boxCount >= 4){
      
      boxes = [];
      let classn = "";
      let dogBoxFlag = false;
      let j = 0;
      
      for (let i = 1; i <= this.state.boxCount; i++) {
        dogBoxFlag = false;
        // Image to be loaded behind the box
        if (this.state.randomPoints.includes(i)) {
          dogBoxFlag =
            this.state.dogCount > 0 && j < this.state.dogCount ? true : false;
          if (dogBoxFlag) {
            j++;
          }
        }
        const boxClass = "box-square";
        classn = "box " + this.state.numbers[i - 1];
        const img =
          dogBoxFlag === true ? "dog" : "";

        // To find the whether to enable or disable box tapping
        let enableStatus = false;
            enableStatus =
              this.state.enableTap &&
              this.state.successTaps + this.state.wrongTaps <
                this.state.randomPoints.length
                ? true
                : false;
           
        boxes.push(
          <div>
            <Box
              index={i}
              onClick={this.handleClick}
              boxClass={classn}
              img={img}
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


    const instructionModal = this.state.showInstruction ? (
      <InstructionModal
        show={true}
        modalClose={this.handleCloseInstructionModal}
        msg ={ `${i18n.t("When the squares turn white, tap where the dogs were.")}`  }      
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
            <div className="heading">{i18n.t("D-Cogs")}</div>
            <div className="game-board">
      <div>
        <div className="timer-div">{timer}</div>
        <div className="mt-30">{boxes}</div>
      </div>
      {instructionModal}
      </div>
      </div>
    );
  }
}

export default Board;
