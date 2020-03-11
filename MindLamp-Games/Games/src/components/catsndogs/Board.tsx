
/**
 * @file   Board.tsx
 * @brief  Board component to load cats and dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from 'react';
import { getRandomNumbers } from '../../functions';
import { InfoModal } from '../common/InfoModal';
import * as alerts from '../common/messages/dogsncats';
import { Timer } from '../common/Timer';
import { Box } from './Box';
import './box.css';
import cat from "./images/cat.png";
import dog from "./images/dog.png";

interface BoardState {
  animate: boolean;
  boxClass: Array<string>;
  dogCount: number;
  catCount: number;
  enableTap: boolean;
  endTime: any;
  gameOver: boolean;
  gameState: number;
  itemToCheck: number;
  lastClickTime: any,
  modalText: string;
  randomPoints: Array<number>;
  startTime: any;
  startTimer: number;
  timeout: boolean;
  showModalInfo: boolean;
  successTaps: number;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any,
  wrongTaps: number;
  sendResoponse: boolean;
}

class Board extends React.Component<{}, BoardState> {
  private timer: any;

  constructor(props: {}) {
    super(props);
    // Initailise state values   
    const timerValue = typeof (process.env.REACT_APP_DNC_TIMOUT_PERIOD) === 'undefined' ? 360 :
      Number(process.env.REACT_APP_DNC_TIMOUT_PERIOD);
    this.state = {
      animate: false,
      boxClass: ['box-square'],
      catCount: 0,
      dogCount: 0,
      enableTap: false,
      endTime: null,
      gameOver: false,
      gameState: 0,
      itemToCheck: 1,
      lastClickTime: null,
      modalText: alerts.ALERT1,
      randomPoints: [],
      sendResoponse: false,
      showModalInfo: true,
      startTime: null,
      startTimer: timerValue,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      successTaps: 0,
      timeout: false,
      wrongTaps: 0
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

    const rP = getRandomNumbers( catTempCount + dogTempCount, 1, 10);
    this.setState({
      animate: true,
      boxClass: ['box-square'],
      catCount: catTempCount,
      dogCount: dogTempCount,
      enableTap: false,
      itemToCheck: itemToCheckv,
      lastClickTime: new Date().getTime(),
      randomPoints: rP,
      showModalInfo: false,
      startTime: this.state.gameState === 1 ? new Date() : this.state.startTime,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      successTaps: 0,
      wrongTaps: 0
    });
    this.resetBoxClass();
    setTimeout(
      () => {
        this.setState({
          animate: false,
          enableTap: true,
          successTaps: 0,
          wrongTaps: 0
        });
      }, 1000);
  }
  // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName('box-square')).forEach(elem => {
      elem.className = "box-square";
    });
  }

  // Check the status of intervals for loading dogs and cats
  checkStatus = () => {
    if (this.state.gameOver || this.state.timeout) {
      clearInterval(this.timer!);
      this.setState({
        catCount: 0,
        dogCount: 0,
        enableTap: false
      });
    }
  }

  // Each box click is handled here
  handleClick = (e: any, i: number, type: number) => {
    let success = false;
    switch (this.state.gameState) {
      case 1:
        success = this.state.randomPoints.indexOf(i) > -1 ? true : false;
        break;
      case 2:
      case 3:
        success = this.state.randomPoints.indexOf(i) > -1 && type === this.state.itemToCheck ? true : false;
        break;
    }
    const item = e.target.className === 'box-square' ? e.target : e.target.children[0];
    item.className = success ? 'box-square green-box-square' : 'box-square red-box-square';
    this.setState({
      stateSuccessTaps: success ? this.state.stateSuccessTaps + 1 : this.state.stateSuccessTaps,
      stateWrongTaps: !success ? this.state.stateWrongTaps + 1 : this.state.stateWrongTaps,
      successTaps: success ? this.state.successTaps + 1 : this.state.successTaps,
      wrongTaps: success ? this.state.wrongTaps : this.state.wrongTaps + 1,
    });
  }

  // To track the timer expiring
  passTimerUpdate = (timerValue: number) => {
    if (timerValue === 0) {
      this.setState({
        endTime: new Date(),
        timeout: true
      });
      this.updateStateWithTaps();
      this.sendGameResult();
    }
    this.setState({
      startTimer: timerValue
    });
  }

  // Update the state values after each game state
  updateStateWithTaps = () => {
    const states = [];
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = (dif / 1000);
    if (this.state.states !== null) {
      const r = JSON.parse(this.state.states);
      Object.keys(r).forEach(key => {
        states.push(r[key]);
      });
    }
    const route = {
      "CorrectAnswer": this.state.stateSuccessTaps,
      "TimeTaken": lastclickTime.toFixed(2),
      "WrongAnswer": this.state.stateWrongTaps
    };
    states.push(route);
    this.setState({
      lastClickTime: new Date().getTime(),
      states: JSON.stringify(states),
    });
  }


  // Call the API to pass game result
  sendGameResult = () => {
    let totalSuccessTaps = 0;
    let totalWrongTaps = 0;
    let points = 0;
    const r = JSON.parse(this.state.states);
    Object.keys(r).forEach(key => {
      totalSuccessTaps += r[key].CorrectAnswer;
      totalWrongTaps += r[key].WrongAnswer;
    });
    const gameScore = Math.round((totalSuccessTaps / 45) * 100);
    if (gameScore === 100) {
      points = points + 2;
    } else {
      points = points + 1;
    }
    const serverURL = typeof (process.env.REACT_APP_CATSANDDOGS_GAME_SERVER_URL) === 'undefined' ? '' :
      process.env.REACT_APP_CATSANDDOGS_GAME_SERVER_URL;
    fetch(serverURL, {
      body: JSON.stringify(
        {
          "AdminBatchSchID": 0,
          "CorrectAnswers": totalSuccessTaps,
          "EndTime": new Date(),
          "GameLevelDetailList": this.state.states,
          "IsNotificationGame": false,
          "Point": points,
          "Score": gameScore,
          "SpinWheelScore": 5,
          "StartTime": this.state.startTime,
          "StatusType": 2,
          "UserID": "200",
          "WrongAnswers": totalWrongTaps
        }),
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      sendResoponse: true
    });
  }

  // Modal close is handled here
  handleClose = (status: boolean) => {
    this.setState({
      showModalInfo: status
    });
    this.resetState();
    this.startTimer();
  }

  // Interval for dogs and cats animation
  startTimer = () => {
    let timerValue = this.state.gameState === 0 ? 3000 : 7000;
    this.timer = setInterval(() => {
      this.resetBoxClass();
      this.setGameState();
    }, timerValue);
    timerValue = 0;
  }

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
        dogTempCount = this.state.gameState < 3 ? this.state.dogCount + 1 : this.state.dogCount;
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
        dogTempCount = this.state.gameState < 3 ? this.state.dogCount + 1 : this.state.dogCount;
        catTempCount = this.state.gameState === 1 ? 0 : 3;
        break;
      case 5:
        dogTempCount = this.state.gameState < 3 ? this.state.dogCount + 1 : this.state.dogCount;
        if (this.state.gameState === 2) {
          gameStateVal = 3;
          showModalInfoVal = true;
          modalTxt = alerts.ALERT3;
          dogTempCount = 3;
          catTempCount = 3;
        }
        break;
      case 6:
        catTempCount = 3;
        dogTempCount = 3;
        gameStateVal = 2;
        showModalInfoVal = true;
        modalTxt = alerts.ALERT2;
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
      wrongTaps: 0
    });

    // handle animation
    setTimeout(
      () => {
        this.setState({
          animate: false,
          enableTap: true,
          successTaps: 0,
          wrongTaps: 0
        });
      }, 1000);

    this.checkStatus();
  }
  // Render the game board
  render() {
    let boxes;
    if (this.state.gameOver || this.state.timeout) {
      if (!this.state.sendResoponse) {
        this.sendGameResult();
      }
      boxes = this.state.gameOver ? 'Game Over  !!' : null;
    } else {
      const numbers = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eightth', 'nineth', 'tenth'];
      boxes = [];
      let classn = '';
      let dogBoxFlag = false;
      let catBoxFlag = false;
      let j = 0;
      let k = 0;
      for (let i = 1; i <= 10; i++) {
        dogBoxFlag = false;
        catBoxFlag = false;
        // Image to be loaded behind the box        
        if (this.state.randomPoints.includes(i)) {
          dogBoxFlag = this.state.dogCount > 0 && j < this.state.dogCount ? true : false;
          if (dogBoxFlag) {
            j++;
          }
          if (!dogBoxFlag) {
            catBoxFlag = this.state.catCount > 0 && k < this.state.catCount ? true : false;
            if (catBoxFlag) {
              k++;
            }
          }
        }
        const boxClass = 'box-square';
        classn = 'box ' + numbers[i - 1];
        const img = dogBoxFlag === true ? dog : (catBoxFlag === true ? cat : null);

        // To find the whether to enable or disable box tapping
        let enableStatus = false;
        switch (this.state.gameState) {
          case 1:
            enableStatus = this.state.enableTap &&
              this.state.successTaps + this.state.wrongTaps < this.state.randomPoints.length ? true : false;
            break;
          case 2:
            enableStatus = this.state.enableTap && this.state.successTaps + this.state.wrongTaps < this.state.dogCount ? true : false;
            break;
          case 3:
            enableStatus = this.state.enableTap && this.state.successTaps + this.state.wrongTaps < this.state.catCount ? true : false;
            break;
        }
        const itemType = dogBoxFlag === true ? 1 : 2;
        boxes.push(
          <div><Box index={i} onClick={this.handleClick} boxClass={classn} img={img} itemType={itemType}
            enableTap={enableStatus} animateStatus={this.state.animate} boxSQClass={boxClass} /></div>
        );
      }
    }
    // Timer to be shown or not
    const timer = !this.state.timeout && !this.state.gameOver && this.state.gameState > 0 ?
       <Timer passTimerUpdate={this.passTimerUpdate} startTimeInSeconds={this.state.startTimer} startTimer={this.state.gameState}/> : null;

    // Modal to be shown or not
    const modal = this.state.showModalInfo ? <InfoModal show={this.state.showModalInfo} modalClose={this.handleClose} 
      msg={this.state.modalText} /> : null;
    return (
      <div>
        <div className="timer-div">
          {timer}
        </div>
        <div className="mt-30">
          {boxes}
        </div>
        {modal}
      </div>
    );
  }
}

export default Board