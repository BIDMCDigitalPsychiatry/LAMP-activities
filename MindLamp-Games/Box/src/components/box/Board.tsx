
/**
 * @file   Board.tsx
 * @brief  Board component to load box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import { getRandomNumbers } from '../../functions';
import * as alerts from '../common/messages/box';
import { Timer } from '../common/Timer';
import './box.css';

interface BoardState {
  activeCell : number;
  animate: boolean;
  boxClass: Array<string>;
  boxCount: number;
  boxes :  any,
  enableTap: boolean;
  endTime: any;
  failureCount: number;
  gameOver: boolean;
  gameSequence : boolean;
  gameState: number;
  lastClickTime: any;
  nextButton : boolean;
  orderNumber : number;
  randomPoints: Array<number>;
  startTime: any;
  startTimer: number;
  timeout: boolean;
  showGo : boolean;
  showWait: boolean;
  successTaps: number;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any;
  wrongTaps: number;
  sendResponse: boolean;
}

class Board extends React.Component<{}, BoardState> {
  private timer: any;
  private timerBox: any;
  private resetWaitBox: any;
  private resetGoBox: any;

  constructor(props: {}) {
    super(props);
    // Initailise state values   
    const timerValue = typeof (process.env.REACT_APP_BOX_TIMOUT_PERIOD) === 'undefined' ? 120 :
      Number(process.env.REACT_APP_BOX_TIMOUT_PERIOD);
    this.state = {
      activeCell : 0,
      animate: false,
      boxClass: ['box-square'],
      boxCount: 1,
      boxes : null,
      enableTap: false,
      endTime: null,
      failureCount : 0,
      gameOver: false,
      gameSequence : false,
      gameState: 0,
      lastClickTime: null,
      nextButton : false,
      orderNumber : -1,
      randomPoints: [],
      sendResponse: false,
      showGo : false,
      showWait: true,
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
  // On load function - set state of the gamne
  componentDidMount = () => {
    this.resetState();
  }


  // Reset game state for each state
  resetState = () => {
    if (this.state.gameState > 0) {
      this.updateStateWithTaps();
    }    
    // if falied any state 2times - game will exit
    if(this.state.failureCount === 1 && this.state.wrongTaps > 0) { 
      this.checkStatus();
      // To show wait message
      this.setState({
        gameOver : true,
        gameSequence : false,
        showGo:false,
        showWait:false 
      });    
    } else {
      this.resetBoxClass();
      this.setState({
        nextButton: false,
        orderNumber : -1,
        randomPoints : [],     
      });
      // To show wait message
      this.resetWaitBox = setTimeout(
        () => {
        this.setState({
          gameSequence : true,
          orderNumber : -1,
          randomPoints : [],
          showWait : true,  
          startTime: this.state.gameState === 1 ? new Date() : this.state.startTime,      
        });
      }, 1500);
      // Set game state after infor message
      this.resetGoBox = setTimeout(
        () => {
          this.setState({lastClickTime : new Date().getTime(), showWait:false, });
          this.setGameState();
      }, 2000);
    }
  }
  // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName('box-white')).forEach(elem => {
      elem.className = "box-white";
    });
  }

  // Check the status of intervals for loading boxes 
  checkStatus = () => {
    if (this.state.gameOver || this.state.timeout) {
      clearInterval(this.timer!);
      clearInterval(this.timerBox!);
      clearInterval(this.resetGoBox!);
      clearInterval(this.resetWaitBox!);
      this.setState({
        boxCount: 0,
        enableTap: false
      });
    }
  }

  // Each box click is handled here
  handleClick = (e:any) => {
    if(this.state.enableTap && this.state.orderNumber + 1 < this.state.randomPoints.length) {
      let success = false;
      const order = this.state.randomPoints.indexOf(parseInt(e.target.getAttribute('data-key'), 10));
      success = order === this.state.orderNumber +  1 ? true : false;
      const item = e.target.className === 'box-white' ? e.target : e.target.children[0];
      if(typeof item !== 'undefined') {
        item.className = success ? 'box-white green-box-square' : 'box-white red-box-square';
    
        this.setState({
          enableTap : this.state.orderNumber + 1 < this.state.randomPoints.length ? true: false,
          nextButton : this.state.orderNumber + 2 >= this.state.randomPoints.length ? true : false,
          orderNumber : this.state.orderNumber + 1,
          stateSuccessTaps: success ? this.state.stateSuccessTaps + 1 : this.state.stateSuccessTaps,
          stateWrongTaps: !success ? this.state.stateWrongTaps + 1 : this.state.stateWrongTaps,
          successTaps: success ? this.state.successTaps + 1 : this.state.successTaps,
          wrongTaps: success ? this.state.wrongTaps : this.state.wrongTaps + 1,
        });
        // Update states for game result
        this.updateWithTaps(parseInt(e.target.getAttribute('data-key'), 10), success);
      }
    }      
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
  // To track echa tap on box
  updateStateWithTaps = () => {
    const states = [];
    if (this.state.states !== null) {
      const r = JSON.parse(this.state.states);
      Object.keys(r).forEach(key => {
        states.push(r[key]);
      });
    }    
    const box = {"Boxes" : JSON.parse(this.state.boxes)};
    states.push(box);
    this.setState({
      states: JSON.stringify(states),
    });
  }
  // Update the state values after each game state
  updateWithTaps = (boxNo : number, status : boolean) => {
    const boxes = [];
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = (dif / 1000);
    if (this.state.boxes !== null) {
      const r = JSON.parse(this.state.boxes);
      Object.keys(r).forEach(key => {
        boxes.push(r[key]);
      });
    }
    const route = {
      "GameIndex": boxNo,
      "Level" : this.state.gameState,
      "Status": status,
      "TimeTaken": lastclickTime.toFixed(2),     
    };
    boxes.push(route);
    this.setState({
      boxes: JSON.stringify(boxes),
      lastClickTime: new Date().getTime()    
    });
  }


  // Call the API to pass game result
  sendGameResult = () => {
    let points = 0;
    const r = JSON.parse(this.state.states);
    const gameScore = r !== null ? (5 / r.length) * 100 : 0;
    if (gameScore === 100) {
        points = points + 2;
    } else {
        points = points + 1;
    }
    const serverURL = typeof (process.env.REACT_APP_BOX_GAME_SERVER_URL) === 'undefined' ? '' :
      process.env.REACT_APP_BOX_GAME_SERVER_URL;
  
    if(serverURL.length > 0) {
      fetch(serverURL, {
        body: JSON.stringify(
          {
            "AdminBatchSchID":0,
            "BoxList":this.state.states,
            "CorrectAnswers":this.state.stateSuccessTaps,
            "EndTime":new Date(),
            "IsNotificationGame":false,
            "Point":points,
            "Score":gameScore,
            "SpinWheelScore":5,
            "StartTime":this.state.startTime,
            "StatusType":1,   
            "Type":1,
            "UserID":"219",
            "WrongAnswers":this.state.stateWrongTaps
          }
          ),
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
        sendResponse: true
      });
    }    
  }

  
  // Set game state values 
  setGameState = () => {
    const statePassed = this.state.boxCount >= 2 && this.state.boxCount === this.state.successTaps
      || this.state.boxCount === 1 ? true : false;
    
    const boxTempCount = statePassed ? this.state.boxCount + 1 : this.state.boxCount;
    const gameStateVal = statePassed ? this.state.gameState + 1 : this.state.gameState;
    const showWaitVal = statePassed && this.state.failureCount + 1 < 2? this.state.showWait : false;
    const failureCountVal = this.state.gameState !== gameStateVal ? 0 : 
      (!statePassed ?  this.state.failureCount + 1 : this.state.failureCount); 
    const rP = getRandomNumbers(boxTempCount, 1, 16);
    const gameOverVal = this.state.gameState !== gameStateVal &&  gameStateVal === 6 ||  failureCountVal === 2 ? true : false;
    // State values for game state
    if(gameStateVal === 6) {
      this.setState({gameOver: true});
      this.checkStatus();
    } else {
      this.setState({
        animate: showWaitVal ? false : true,
        boxCount: boxTempCount,
        boxes : null,
        enableTap: false,
        endTime: gameStateVal === 4 ? new Date() : this.state.endTime,
        failureCount : failureCountVal,      
        gameOver :  gameOverVal,  
        gameState: gameStateVal,
        nextButton:false,
        randomPoints:  rP,
        showWait: showWaitVal,
        successTaps: 0,
        wrongTaps: 0
      });
      this.timer = setTimeout(() => this.showBoxes(rP, 0), 1000);         
    }
  }

  // Show boxes one by one in secific time intervals
  showBoxes = (rP : Array<number>, i:number) => {
    this.setState({          
      activeCell : rP[i], 
      animate: false,
      successTaps: 0,
      wrongTaps: 0
    });
    if(i + 1 <= rP.length) {
      this.setState({          
        animate: true,
      });
      this.timerBox = setTimeout(() => this.showBoxes(rP, i+1), 1500);
    } else {
      this.setState({ 
        enableTap : true,         
        showGo: true,
      });
      this.timerBox = setTimeout(() => {
        this.setState({  
          gameSequence : false,       
          showGo: false
        });
      }, 1500);
    }
  }

  // To set up game board
  createTable = () => {       
    const table = []    
    let p = 1;
    // Outer loop to create parent
    for (let i = 0; i < 4; i++) {
      const children = []
      // Inner loop to create children
      for (let j = 0; j < 4; j++) {   
        const classN = this.state.animate === true && p === this.state.activeCell ? ' box-green' :  'box-white';
        children.push(
          <td key={p} >
            <div className={classN} onClick={this.handleClick} data-key={p}/>
          </td>
        );       
          p++;         
      }
      // Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>)
    }
    return table
  } 

  // To set the game board table size based on screen resolution 
  getTableStyles = () => {
    const size = window.innerWidth - (window.innerWidth * 10 /100);
    const styles= { height : `${size}px`, width :  `${size}px`};  
    return styles
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
    if (this.state.gameOver || this.state.timeout || this.state.failureCount === 2) {
      if (!this.state.sendResponse) {
        // If game exit, send result to spi
         this.sendGameResult();
      }
      board = this.state.gameOver && this.state.failureCount <= 1 && this.state.wrongTaps === 0 ? 'Congrats !!!' : 
        (this.state.gameOver || this.state.failureCount === 2 ? 'Game Over  !!' :
        ( this.state.timeout ? 'Time Out !!!' : null ));
    } else {
      board = <table className="box-table" style={this.getTableStyles()}>
                <tbody>
                  {this.createTable()}
                </tbody>
              </table>   
      // Next button rendering controlled here
      nextButton = this.state.nextButton ? <div className="next-button">
          <button onClick={this.resetState} >Next</button></div> : null;
      // Timer to be shown or not
      timer = !this.state.timeout && !this.state.gameOver && this.state.gameState > 0 ?
      <Timer passTimerUpdate={this.passTimerUpdate} startTimeInSeconds={this.state.startTimer} 
        startTimer={this.state.gameState}/> : null;
      // Wait and go message handled here
      alert = this.state.showWait ? <div className="box-alert" ><span>{alerts.wait}</span></div>
         : (this.state.showGo ? <div className="box-alert" ><span>{alerts.go}</span></div> : null);
      // Info message to show 
      infoText =  this.state.gameSequence && this.state.gameState > 0 ? <span>{alerts.info}</span> : null;
      // Game state
      level = this.state.gameState > 0 ? <span>Level {this.state.gameState}</span> : null;
      // Show the alert on bottom of game board
      alertText = this.state.gameSequence ? <div className="box-info" >{alerts.ALERT1}</div> : (this.state.gameState > 0 ? <div className="box-info" >{alerts.ALERT2}</div> : null);
    }  
    
    return (
      <div>
        <div className="timer-div">
          {timer}         
          {level}
          <br/>
          {infoText}
        </div>
        <div className="mt-30">
          {board}
        </div>
        {nextButton}
        {alert}
        {alertText}
      </div>
    );
  }
}

export default Board