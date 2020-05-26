/**
 * @file   PopTheBubbles.tsx
 * @brief  Starting component which is the initial point of bubbles game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import * as alerts from '../common/messages/pop_the_bubbles';

import { Link } from "react-router-dom";

import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomNumbers } from '../../functions';

import Board from './Board';
import { Bubble } from './Bubble';
import './bubble.css';

   
interface AppState {
    endTime :any,
    levelCompleted : boolean,
    gameLevel : number;
    gameOver : boolean;
    level:number;    
    score : number;
    startTime:any;
    states : any;
    stateSuccessTaps:number;
    stateWrongTaps :number;   
    xCoords : Array<number>;
    xPoints : Array<number>;
    yCoords : Array<number>;
    yPoints : Array<number>;
}

class PopTheBubbles extends React.Component<{}, AppState> {
  private bubbleCount:number;
  constructor(props: {}) {
    super(props);
    const xValues =  this.getCoords(window.innerWidth- (window.innerWidth * 20 /100), 1);
    const yValues =  this.getCoords(window.innerHeight - (window.innerHeight * 25 /100), 2);
    this.bubbleCount = typeof (process.env.REACT_APP_POP_LEVEL1_BUBBLE_COUNT) === 'undefined' ? 60 :
      Number(process.env.REACT_APP_POP_LEVEL1_BUBBLE_COUNT);
    this.state =  {
        endTime : null,
        gameLevel : 1, 
        gameOver: false,
        level : 0,
        levelCompleted:false, 
        score : 0,   
        startTime:null,        
        stateSuccessTaps:0,      
        stateWrongTaps :0,
        states : null, 
        xCoords : xValues,
        xPoints : this.getCoordPoints(xValues),
        yCoords : yValues,
        yPoints : this.getCoordPoints(yValues),
    } ;
  
  }
  
  // Get random coordinates for bubbles
  getCoords =  (size : number, type : number) => {
    let i = 0;
    const coords = [];  
    const diff = size / 100;
    for(i = 0; i < size ; i = Math.round(i + diff)) {
      coords.push(i);
    }   
    return coords;
  }

  // Get random numbers for x,y coordinates
  getCoordPoints = (values : Array<number>) => {
    return getRandomNumbers(80, 0, values.length);  
  }
 // Update the state values after each game state
 updateStateForEachState = (level : number,score : number, successTaps : number, wrongTaps : number) => {
  const states = [];
  const dif = new Date().getTime() - Date.parse(this.state.startTime);
  const lastclickTime = (dif / 1000);
  if (this.state.states !== null) {
    const r = JSON.parse(this.state.states);
    Object.keys(r).forEach(key => {
      states.push(r[key]);
    });
  }   
  const route = {
    "EndTime" : new Date(),
    "Level" : level,
    "Score" : score, 
    "StartTime" : this.state.startTime,
    "SuccessTaps" : successTaps, 
    "TimeTaken": lastclickTime.toFixed(2),    
    "wrongTaps" : wrongTaps
  };
  states.push(route);
  this.setState({ 
      states: JSON.stringify(states)   
  });
}
  // To refresh the game
  clickHome=() => {
    window.location.reload(false);
  }
  
  // To render the game screens
  handleClick = () => {
      if(this.state.level === 1) {
        this.setState({
          startTime: new Date(),
        })
      }
      this.setState({         
          level : this.state.level +  1,         
          levelCompleted : false          
      });      
  }

  // Once done with each level of each game, this function will be called
  onCompleted = (stateScore : number, successTaps : number, wrongTaps: number) => {
    this.updateStateForEachState(this.state.gameLevel, stateScore, successTaps, wrongTaps);
    if(this.state.gameLevel === 3) {
      this.setState({
        endTime: new Date(),
        gameOver :true,       
        stateSuccessTaps : this.state.stateSuccessTaps + successTaps,
        stateWrongTaps : this.state.stateWrongTaps + wrongTaps
       }) ;
    } else {
      this.setState({
        gameLevel : this.state.gameLevel + 1,
        level : 0,
        levelCompleted : true,
        score:stateScore,            
        stateSuccessTaps : this.state.stateSuccessTaps + successTaps,
        stateWrongTaps : this.state.stateWrongTaps + wrongTaps,
      });
     
      this.bubbleCount = typeof (process.env.REACT_APP_POP_LEVEL2_3_BUBBLE_COUNT) === 'undefined' ? 80 :
        Number(process.env.REACT_APP_POP_LEVEL2_3_BUBBLE_COUNT);
    }    
  }
  // Set the screen content based on each level
  getLevelCases = () => {
    if(this.state.gameOver) {
      
      return  <div className="pop-the-bubble-board">
                <div className="mt-30">
                  <div className="success">congratulations</div>
                  <h1>Level {this.state.gameLevel - 1} Completed</h1>
                  <div className="pl-30 pr-30 game-rule text-center">
                    <div className="pl-30 pr-30 game-rule text-center">
                      <h1>You got {this.state.score}%</h1>
                    </div>
                  </div>
                </div>
              </div>;
    }
    
    let infoSection = null;
    const x = window.innerWidth - (window.innerWidth * 77 /100) ;
    const y = window.innerHeight - (window.innerHeight * 60 /100); 
    this.bubbleCount =  this.state.gameLevel === 1 ?
      typeof (process.env.REACT_APP_POP_LEVEL1_BUBBLE_COUNT) === 'undefined' ? 60 :
        Number(process.env.REACT_APP_POP_LEVEL1_BUBBLE_COUNT): 
      typeof (process.env.REACT_APP_POP_LEVEL2_3_BUBBLE_COUNT) === 'undefined' ? 80 :
        Number(process.env.REACT_APP_POP_LEVEL2_3_BUBBLE_COUNT);
    switch(this.state.level) {
      case  0 :        
         infoSection = this.state.gameLevel === 1 ? <div className="pop-the-bubble-board">
                    <div className="mt-30">
                    <h1 className="mt-30per">POP THE BUBBLES!</h1> 
                    <Bubble text="Tap to continue"  bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue" onClick={this.handleClick}/>
                    </div></div>: <div className="pop-the-bubble-board">
                      <div className="mt-30"><h1>Level {this.state.gameLevel - 1} Completed</h1>
                          <div className="pl-30 pr-30 game-rule text-center">
                          <div className="pl-30 pr-30 game-rule text-center"><h1>You got {this.state.score}%</h1></div>
                          </div>
                          <div><Bubble text="Tap to continue" bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue"
                          onClick={this.handleClick}/>
                          </div>
                        </div>
                      </div>;
                    break;
      case 1:
          const alertTextTop = this.state.gameLevel === 1 ? alerts.LEVEL1_TOP : alerts.LEVEL2_3_TOP;
          const alertTextBottom = this.state.gameLevel === 1 ? alerts.LEVEL1_BOTTOM : this.state.gameLevel === 2 ? 
            alerts.LEVEL2_BOTTOM: alerts.LEVEL3_BOTTOM;

          infoSection = <div className="pop-the-bubble-board">
          <div className="mt-30"><h1>Level {this.state.gameLevel}</h1>
            <div className="pl-30 pr-30 game-rule text-center">
              <div className="pl-30 pr-30 game-rule text-center"><p>{alertTextTop}</p><br/><p>{alertTextBottom}</p></div>                   
            </div>
            <div>
              <Bubble text="Tap to continue" bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue"
            onClick={this.handleClick}/>
            </div>
            </div>
          </div>;
          break;
      case 2: 
          infoSection = <Board bubbleCount={this.bubbleCount} onCompleted={this.onCompleted} level={this.state.gameLevel}
             xCoords={this.state.xCoords} yCoords={this.state.yCoords} xPoints={this.state.xPoints} yPoints={this.state.yPoints} />  ;
          break;
      }
    
    return infoSection
  }

  // Game render function
  render() { 
    const infoSection = this.getLevelCases();   
    return (
      <div>
        <nav className="home-link">
          <Link onClick={this.clickHome}><FontAwesomeIcon icon={faRedo} /></Link>
        </nav>
        <div className="heading">Pop the bubbles</div>
            {infoSection}       
      </div> 
  
    );
  }
}

export default PopTheBubbles