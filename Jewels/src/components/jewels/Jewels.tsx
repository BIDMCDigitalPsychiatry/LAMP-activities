/**
 * @file   Jewels.tsx
 * @brief  Jewels component which is the initial point of jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import { Link } from "react-router-dom";
import { isUndefined } from 'util';
import { getRandomNumbers} from '../../functions';

import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Board from './Board';


import './jewels.css';

const diamondTypes = ['diamond1', 'diamond2', 'diamond3', 'diamond4', 'diamond5', 'diamond6', 'diamond7', 'diamond8'];
const colors = ['pink', 'green', 'blue', 'violet', 'brown', 'red', 'orange', 'dark-blue']
   
interface AppState {
    current:any; 
    diamondCount: number;
    diamondColor:string;
    diamondNumber:number;
    diamondNumbers:Array<number>;  
    diamondSpots:Array<number>;  
    pauseTime : number;    
    winnerLine?: Array<number>;    
}

class Jewels extends React.Component<{}, AppState> {
  
  constructor(props: {}) {
    super(props);
    this.reset();    
  }
 
  // Reset game board
  reset = () => {    
    const dCount = 10;
    const diamondType = this.getDiamond();
    const maxPlots = typeof(process.env.REACT_APP_MAX_PLOTS) === 'undefined' ? 200 : Number(process.env.REACT_APP_MAX_PLOTS);
    const randomArray = getRandomNumbers(dCount, 1, maxPlots);
    const diamondCount =  typeof(process.env.REACT_APP_MAX_DIAMONDS) === 'undefined' ? 10 : 
      Number(process.env.REACT_APP_MAX_DIAMONDS);
    const numbers = this.shuffle(Array.from(Array(diamondCount).keys()));
    const state = { 
      current : diamondTypes[diamondType],
      diamondColor:this.getRandomColor(), 
      diamondCount:dCount,
      diamondNumber:diamondType,
      diamondNumbers:numbers,
      diamondSpots: randomArray, 
      pauseTime:0,
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
        <nav className="home-link">
          <Link onClick={this.clickHome}><FontAwesomeIcon icon={faRedo} /></Link>
        </nav>
        <div className="heading">Jewels</div>
        <div className="game-board">
        <Board  
          totalDiamonds={this.state.diamondCount} diamondSpots={this.state.diamondSpots} diamondColor={this.state.diamondColor}
          currentDiamond = {this.state.current} diamondNumber={this.state.diamondNumber} diamondNumbers={this.state.diamondNumbers}
        />          
      </div> 
    </div> 
    );
  }
}

export default Jewels