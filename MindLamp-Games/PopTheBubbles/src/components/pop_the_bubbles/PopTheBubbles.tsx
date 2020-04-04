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
    gameLevel : number;
    level:number;    
    score : number;
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
    this.state = {
        gameLevel : 1, 
        level : 0, 
        score : 0,   
        stateSuccessTaps:0,
        stateWrongTaps :0,  
        xCoords : xValues,
        xPoints : this.getCoordPoints(xValues),
        yCoords : yValues,
        yPoints : this.getCoordPoints(yValues),
    }
    this.bubbleCount = typeof (process.env.REACT_APP_POP_LEVEL1_BUBBLE_COUNT) === 'undefined' ? 60 :
      Number(process.env.REACT_APP_POP_LEVEL1_BUBBLE_COUNT);
  }
  
  getCoords =  (size : number, type : number) => {
    let i = 0;
    const coords = [];  
    const diff = size / 100;
    for(i = 0; i < size ; i = Math.round(i + diff)) {
      coords.push(i);
    }   
    return coords;
  }

  getCoordPoints = (values : Array<number>) => {
    return getRandomNumbers(60, 0, values.length);  
  }

  // To refresh the game
  clickHome=() => {
    window.location.reload(false);
  }
  
  handleClick = () => {
      this.setState({
          gameLevel : this.state.score > 0 ? this.state.gameLevel + 1 : this.state.gameLevel,
          level : this.state.score > 0 ? 0 :  this.state.level +  1,         
          score : 0
      });      
  }

  onCompleted = (stateScore : number, successTaps : number, wrongTaps: number) => { 
    this.setState({
      score : stateScore,
      stateSuccessTaps : this.state.stateSuccessTaps + successTaps,
      stateWrongTaps : this.state.stateWrongTaps + wrongTaps,
    })
  }
  // Game render function
  render() { 
    const x = window.innerWidth - (window.innerWidth * 77 /100) ;
    const y = window.innerHeight - (window.innerHeight * 60 /100); 
    let infoSection = <div className="pop-the-bubble-board">
    <div className="mt-30">
        <h1 className="mt-30per">POP THE BUBBLES!</h1> 
        <Bubble text="Tap to continue"  bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue" onClick={this.handleClick}/>
        </div></div>;
        console.log(this.state.level + ' --' + this.state.gameLevel);
        switch(this.state.gameLevel) {
          case 1:
              switch(this.state.level) {
                  case 1:
                      infoSection = <div className="pop-the-bubble-board">
                      <div className="mt-30"><h1>Level 1</h1>
                      <div className="pl-30 pr-30 game-rule text-center">
                      <div className="pl-30 pr-30 game-rule text-center"><p>{alerts.LEVEL1_TOP}</p><br/><p>{alerts.LEVEL1_BOTTOM}</p></div>;                    
                      </div>
                      <div><Bubble text="Tap to continue" bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue"
                      onClick={this.handleClick}/>
                      </div>
                      </div>
                      </div>;
                      break;
                  case 2: 
                      infoSection =  this.state.score > 0 ?
                      <div className="pop-the-bubble-board">
                      <div className="mt-30"><h1>Level 1 Completed</h1>
                      <div className="pl-30 pr-30 game-rule text-center">
                      <div className="pl-30 pr-30 game-rule text-center"><h1>You got {this.state.score}%</h1></div>
                      </div>
                      <div><Bubble text="Tap to continue" bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue"
                      onClick={this.handleClick}/>
                      </div>
                      </div>
                      </div>:
                      <Board bubbleCount={this.bubbleCount} onCompleted={this.onCompleted} level={this.state.gameLevel} xCoords={this.state.xCoords} yCoords={this.state.yCoords} xPoints={this.state.xPoints} yPoints={this.state.yPoints}  
                      />  ;
                      break;
            }
    break;
    case 2 : 
    this.bubbleCount = typeof (process.env.REACT_APP_POP_LEVEL2_BUBBLE_COUNT) === 'undefined' ? 80 :
      Number(process.env.REACT_APP_POP_LEVEL2_BUBBLE_COUNT);
    switch(this.state.level) {
      case 1:
          infoSection = <div className="pop-the-bubble-board">
          <div className="mt-30"><h1>Level 2</h1>
          <div className="pl-30 pr-30 game-rule text-center">
          <div className="pl-30 pr-30 game-rule text-center"><p>{alerts.LEVEL2_3_TOP}</p><br/><p>{alerts.LEVEL2_BOTTOM}</p></div>;                    
          </div>
          <div><Bubble text="Tap to continue" bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue"
          onClick={this.handleClick}/>
          </div>
          </div>
          </div>;
          break;
      case 2: 
          infoSection =  this.state.score > 0 ?
          <div className="pop-the-bubble-board">
          <div className="mt-30"><h1>Level 2 Completed</h1>
          <div className="pl-30 pr-30 game-rule text-center">
          <div className="pl-30 pr-30 game-rule text-center"><h1>You got {this.state.score}%</h1></div>
          </div>
          <div><Bubble text="Tap to continue" bubbleToTap={false} x={x} index={0} y={y} class="size-l bubble-blue"
          onClick={this.handleClick}/>
          </div>
          </div>
          </div>:
          <Board bubbleCount={this.bubbleCount} onCompleted={this.onCompleted} level={this.state.gameLevel} xCoords={this.state.xCoords} yCoords={this.state.yCoords} xPoints={this.state.xPoints} yPoints={this.state.yPoints}  
          />  ;
          break;
        }
    break;
    case 3 : 
    break;
       
    }
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