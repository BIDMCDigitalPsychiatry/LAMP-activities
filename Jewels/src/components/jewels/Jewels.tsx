/**
 * @file   Jewels.tsx
 * @brief  Jewels component which is the initial point of jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
// import { Link } from "react-router-dom";
import { isUndefined } from 'util';
import { getRandomNumbers} from '../../functions';

import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Board from './Board';
import './jewels.css';

const diamondTypes = ['diamond-01', 'diamond-02', 'diamond-03', 'diamond-04', 'diamond-05', 'diamond-06', 'diamond-07', 'diamond-08'];
const colors = ['pink', 'green', 'blue', 'violet', 'brown', 'red', 'orange', 'dark-blue']
   
interface AppState {
    current:any; 
    diamondCount: number;
    diamondColor:string;
    diamondNumber:number;
    diamondNumbers:Array<number>;  
    diamondSpots:Array<number>;  
    gameTime:number;
    loaded:boolean;
    pauseTime : number; 
    shapeCount:number;   
    winnerLine?: Array<number>;  

}

class Jewels extends React.Component<{}, AppState> {
  
  constructor(props: {}) {
    super(props);
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
  const eventer = window[eventMethod]
  const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
  // Listen to message from child window
  const mode = typeof(process.env.REACT_APP_GAME_LEVEL) === 'undefined' ? 1 : Number(process.env.REACT_APP_GAME_LEVEL);
  this.reset(false); 
  eventer(
    messageEvent, (e:any) => {
      let gameTimeVal = e.data.beginner_seconds
      switch(mode) {
        case 1:
          gameTimeVal = e.data.beginner_seconds
          break;
        case 2:
          gameTimeVal = e.data.intermediate_seconds
          break;
        case 3:
          gameTimeVal = e.data.advanced_seconds
          break;
        case 4:
          gameTimeVal = e.data.expert_seconds
          break;
        default:
          gameTimeVal = e.data.beginner_seconds
          break
      }
      this.setState({diamondCount:e.data.diamond_count,  loaded:true,  gameTime:gameTimeVal, shapeCount:e.data.shape_count}, () => {
        this.reset(true); 
      })
   },
    false
  ) 
  }
   
  // Reset game board
  reset = (loadedVal:boolean) => {    
   
    const diamondType = this.getDiamond();
    const maxPlots = typeof(process.env.REACT_APP_MAX_PLOTS) === 'undefined' ? 200 : Number(process.env.REACT_APP_MAX_PLOTS);
  
    const diamondCountVal =  this.state ? this.state.diamondCount : 15;
    const numbers = this.shuffle(Array.from(Array(diamondCountVal).keys())); 
   
    const randomArray = getRandomNumbers(diamondCountVal, 1, maxPlots);
    const state = { 
      current : diamondTypes[diamondType],
      diamondColor:this.getRandomColor(), 
      diamondCount:diamondCountVal,
      diamondNumber:diamondType,
      diamondNumbers:numbers,
      diamondSpots: randomArray, 
      gameTime:this.state ? this.state.gameTime : 90,
      loaded:loadedVal, 
      pauseTime:0,
      shapeCount : this.state ? this.state.shapeCount : 1,
      winnerLine: undefined      
    };

    if (isUndefined(this.state)) {
      this.state = state;
    } else {
      this.setState(state);
    }
  }
  // Shuffle the diamond numbers
  shuffle=(numbers : Array<number>) => {
    numbers.sort(() => Math.random() - 0.5);
    return numbers;
  }
 
  // Get random diamond shape
  getDiamond = () => {  
    if (!isUndefined(this.state)) {
      const index = diamondTypes.indexOf(this.state.current);
      if (index > -1) {
        diamondTypes.splice(index, 1);
      }
    }
    const rand = Math.round(1 + Math.random() * (diamondTypes.length - 1));      
    return rand-1 ;
  }

  getRandomColor = () => {
    const rand = Math.round(1 + Math.random() * (colors.length - 1));  
    return colors[rand-1];    
  }
  // To refresh the game
  clickHome=() => {
    window.location.reload(false);
  }
  render() {     
    return (
      <div>
        {this.state && this.state.loaded && (<div><nav className="home-link">
           <FontAwesomeIcon icon={faRedo} onClick={this.clickHome}/>
        </nav> 
        <div className="heading">Jewels</div>
        <div className="game-board">
        <Board  
          gameTime={this.state.gameTime}
          totalDiamonds={this.state.diamondCount} diamondSpots={this.state.diamondSpots} diamondColor={this.state.diamondColor}
          currentDiamond = {this.state.current} diamondNumber={this.state.diamondNumber} diamondNumbers={this.state.diamondNumbers}
        />          
      </div></div>)}
    </div> 
    );
  }
}

export default Jewels