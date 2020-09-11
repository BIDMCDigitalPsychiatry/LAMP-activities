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
    diamondNumbers:Array<any>;  
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
    const state = { 
      current : [],
      diamondColor:"", 
      diamondCount:0,
      diamondNumbers:[],
      diamondSpots: [], 
      gameTime:this.state ? this.state.gameTime : 90,
      loaded:false, 
      pauseTime:0,
      shapeCount : 0,
      winnerLine: undefined      
    };
    this.state = state;
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
        console.log(e.data)
        this.setState({diamondCount:e.data.diamond_count,  loaded:false,  gameTime:gameTimeVal, shapeCount:e.data.shape_count}, () => {
          this.reset(true); 
        })
    },
      false
    )   
  }
   
  // Reset game board
  reset = (loadedVal:boolean) => {    
    const noOfDimonds = this.state ? this.state.shapeCount : 2
    const diamondType = this.getDiamond(noOfDimonds);
    const maxPlots = typeof(process.env.REACT_APP_MAX_PLOTS) === 'undefined' ? 200 : Number(process.env.REACT_APP_MAX_PLOTS);
  
    const diamondCountVal =  this.state ? this.state.diamondCount : 15;
    let initial 
    if(noOfDimonds === 2) {
      const numbers1 = Math.ceil(diamondCountVal/2)
      const numbers2 = Math.floor(diamondCountVal/2)
      initial = this.shuffle(Array.from(Array(numbers1).keys()))
      initial = initial.concat(this.shuffle(Array.from(Array(numbers2).keys())))
    } else {
      initial = this.shuffle(Array.from(Array(diamondCountVal).keys()))
    }

    const randomArray = getRandomNumbers(diamondCountVal, 1, maxPlots);
    const state = { 
      current : diamondType,
      diamondColor:this.getRandomColor(), 
      diamondCount:diamondCountVal,
      diamondNumbers:initial,
      diamondSpots: randomArray, 
      gameTime:this.state ? this.state.gameTime : 90,
      loaded:loadedVal, 
      pauseTime:0,
      shapeCount : noOfDimonds,
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
  getDiamond = (noOfDimonds : number) => {  
    const diamonds = []
    
    let rand = Math.round(Math.random() * (diamondTypes.length - 1)); 
    diamonds.push(diamondTypes[rand])  
    if(noOfDimonds > 1) {
      diamondTypes.splice(rand, 1);        
      rand = Math.round(Math.random() * (diamondTypes.length - 1)); 
      diamonds.push(diamondTypes[rand])  
    }   
    return diamonds;
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
          currentDiamond = {this.state.current} diamondNumbers={this.state.diamondNumbers}
        />          
      </div></div>)}
    </div> 
    );
  }
}

export default Jewels