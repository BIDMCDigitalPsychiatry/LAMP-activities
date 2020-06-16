
/**
 * @file   Board.tsx
 * @brief  Board component to load box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from 'react';
import { getRandomNumbers } from '../../functions';
import { Bubble } from './Bubble';

import './bubble.css';

interface BoardProps {
  bubbleCount:number;
  level : number;
  xCoords : Array<number>;
  xPoints : Array<number>;
  yCoords : Array<number>;
  yPoints : Array<number>;
  onCompleted(score : number, successTaps : number, wrongTaps : number): void
}

interface BoardState {  
  bubblesToTapCount : number;
  bubbleStyles : Array<string>;
  completed:boolean,
  index : number;  
  showBoard : boolean;
  showGo : boolean;
  showNo : number;
  showWait: boolean   ;
  successTaps : number;
  wrongTaps : number;  
}

class Board extends React.Component<BoardProps, BoardState> {
  private timer: any;
  private classes : Array<string>;
  private count :number;
  constructor(props: BoardProps) {
    super(props);
    this.classes = ['bubble-pink', 'bubble-red', 'bubble-green', 'bubble-yellow', 'bubble-blue'];
    const bubbleStyleValues = this.getBubbleStyles();
    // Initailise state values 
    this.count = 0;
    this.state = {      
      bubbleStyles: bubbleStyleValues,
      bubblesToTapCount : this.count,
      completed : false,
      index : 0,
      showBoard : false,
      showGo : false,
      showNo : 3,
      showWait: true  ,
      successTaps : 0,
      wrongTaps : 0,    
    };
  } 
  
  // On load function - set state of the gamne
  componentDidMount = () => {
    this.timer = setInterval(() => {
        if(this.state.showNo === 1) {
          // Countdown timer
          clearInterval(this.timer);
          this.setState({  
            showGo : true,
            showWait : false        
          });
          setTimeout(() => {
            this.setState({ 
              showBoard : true,
              showGo : false
            });
            // Game over interval
            const timeoutPeriod = this.props.level === 1 ? 20000 : 27000;             
            setTimeout(() => {
              this.setState({ 
                completed : true
              });
             const percentage = this.state.successTaps / this.state.bubblesToTapCount * 100;
              const score = Math.round(percentage);
              this.props.onCompleted(score, this.state.successTaps, this.state.wrongTaps); 
            }, timeoutPeriod);    
          }, 1000);
        } else {
          this.setState({  
            showNo : this.state.showNo - 1
          });
        }
    }, 1000);    
  }


  // To set the game board table size based on screen resolution 
  getTableStyles = () => {
    const size = window.innerWidth - (window.innerWidth * 10 /100);
    const styles= { height : `${size}px`, width :  `${size}px`};  
    return styles
  } 
  
  // Get random bubble styles
  getBubbleStyles = () : Array<string> => {
    let selectedStyle = null;    
    const styles = [];
    this.count = 0;
    const toBeSelected = this.props.level === 1 || this.props.level === 3 ? ['bubble-pink', 'bubble-yellow', 'bubble-blue'] 
        : ['bubble-yellow', 'bubble-blue'];
    for(let i = 0; i < this.props.bubbleCount ; i++) {      
      selectedStyle = getRandomNumbers(1, 0, this.classes.length - 1)[0];     
      styles.push(this.classes[selectedStyle]); 
      this.count = toBeSelected.indexOf(this.classes[selectedStyle]) > -1 ?  this.count + 1 :  this.count;   
    }   
    return styles;
  }
  // Hanlde bubble taps here
  handleClick = (e:any, index:number, lastClass : string, toBeTapped : boolean) => {
    const pointsToReduce  = typeof this.state.bubbleStyles[index-1] !== 'undefined' &&  lastClass !== this.state.bubbleStyles[index-1] ? 1 : 0;
    const success = this.props.level === 1 ? (toBeTapped ? true :  false) : 
      (toBeTapped &&(typeof this.state.bubbleStyles[index-1] === 'undefined' || 
      (typeof this.state.bubbleStyles[index-1] !== 'undefined' &&  lastClass !== this.state.bubbleStyles[index-1]))? true :  false) ;
    this.setState({
      successTaps : success ? this.state.successTaps + 1 :  this.state.successTaps - pointsToReduce,
      wrongTaps : !success ? this.state.wrongTaps + 1 :  this.state.wrongTaps      
    });       
  }

  // Render the game board
  render() {
    let board;
    if(this.state.showWait) {
      board = <div><h1 className="cowndown">{this.state.showNo}</h1></div>
    }
    if(this.state.showGo) {
      board = <div><h1 className="cowndown">GO</h1></div>
    }
    if(this.state.showBoard) {
      const bubbles = [];      
      const toBeSelected = this.props.level === 1 || this.props.level === 3 ? ['bubble-pink', 'bubble-yellow', 'bubble-blue'] 
        : ['bubble-yellow', 'bubble-blue'];
      let bubbleToTap = false;
      // Set bubble rendering interval in 300ms
      let p = 300;
      for (let i = 0; i < this.props.bubbleCount; i++) {
        bubbleToTap = toBeSelected.indexOf(this.state.bubbleStyles[i]) > -1 ? true : false;       
        bubbles.push(<Bubble  delayed={p} x={this.props.xCoords[this.props.xPoints[i]]} index={i} y={this.props.yCoords[this.props.yPoints[i]]} 
              class={this.state.bubbleStyles[i]} bubbleToTap={bubbleToTap}  onClick={this.handleClick}/>)
        p = p + 300;
      }      
      board = bubbles; 
    }   
    return (
      <div className="pop-the-bubble-board">
        <div className="mt-30">
          {board} 
        </div>
      </div>
     );
  }
}

export default Board