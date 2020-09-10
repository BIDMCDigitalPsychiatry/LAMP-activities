
/**
 * @file   Board.tsx
 * @brief  Board component to load jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import { Timer } from '../common/Timer';
import { Diamond } from './Diamond';

import { NegativePoints } from './NegativePoints';

export interface BoardProps {
    totalDiamonds:number; 
    diamondSpots:Array<number>;   
    currentDiamond : any;     
    diamondColor:string;
    diamondNumber: number;  
    diamondNumbers:Array<number>;   
    gameTime:number;
}

interface DiamondState { 
  displayNegativePoints: boolean;
  endTime:any;
  gameOver:boolean;  
  lastClickTime:any,
  negativePoints : number; 
  route:any; 
  startTime: any;   
  startTimer: number;
  stepNumber:number ; 
  tapCount:number;
  timeout:boolean; 
}

class Board extends React.Component<BoardProps, DiamondState> {
    constructor(props:BoardProps) {
      super(props); 
      // Initailise state values      
      this.state = {  
          displayNegativePoints: false, 
          endTime:null,
          gameOver : false,
          lastClickTime:0,
          negativePoints: 0,          
          route:[],
          startTime:null,
          startTimer: 0 , 
          stepNumber: 0 ,
          tapCount:0,
          timeout : false ,
     };      
    }
    // Each dimaond click is handled here
    handleClick = (e:any, i:number) => {
      this.setState({
        tapCount : this.state.tapCount + 1,
      });
      if(this.state.stepNumber === i - 1) {
        if(i === 1) {
          const timerVal = this.props.gameTime;   
         // state updation for diamond 1 click
          this.setState({
              startTime:new Date(),                           
              startTimer : timerVal,
              stepNumber : i,
            }, () => {
              this.updateStateWithTaps(i, true);
            });          
        } else {
          // Update the state values for each tas other than diamond 1
          this.updateStateWithTaps(i, true);          
        }       
        // Load disabled image after correct tap
        const item = e.target.className === 'number-text' ? e.target.closest('div'): e.target;
        item.className = item.className + ' diamond-disable';

       
      } else {
        this.updateStateWithTaps(i, false);  
        if(this.state.startTimer > 0) {
          // When wrong diamond is tapped, update the negative point 
            const negPoints = typeof(process.env.REACT_APP_NEG_POINTS) === 'undefined' ? 2 : Number(process.env.REACT_APP_NEG_POINTS);
            this.setState({
              displayNegativePoints : true,
              negativePoints : this.state.negativePoints - negPoints            
            });
          // Show the negative point for 3 seconds
          setTimeout(
            () => {
              this.setState({
                displayNegativePoints : false
              });
            }, 3000);
        }
      }
    }
    // To track the timer expiring
    passTimerUpdate = (timerVal:number) => {     
      if(timerVal === 0) {
        this.setState({
          endTime:new Date(),
          timeout : true
        }, () => {
          this.sendGameResult(1);  
        });    
        
      } 
      this.setState({
          startTimer : timerVal
      });
    }
    
    // Update the state values for each taps other than jewel 1
    updateStateWithTaps = (i:number, status:boolean) => {
      const routes = [];
      const dif  = new Date().getTime() - this.state.lastClickTime;          
      const lastclickTime =  (dif);
      if(this.state.route.length > 0) {
        const r = JSON.parse(this.state.route);
        Object.keys(r).forEach(key => {
          routes.push(r[key]);
        });
      }   
      const route = {'item' : i,"value": null, 'status' : status, 'duration' : status && i === 1 ? 0 : lastclickTime, "level": 1};
      routes.push(route);
      this.setState({ 
        endTime:new Date(),
        gameOver : status === true && this.props.totalDiamonds === i ?  true : false,
        lastClickTime:new Date().getTime(),
        route:JSON.stringify(routes),
        stepNumber : status === true ? i : this.state.stepNumber        
      }, () => {
        if(status === true && this.props.totalDiamonds === i ) {        
          this.sendGameResult(2);         
        }
      });
      
    }

    createTable = () => {       
        const table = []    
        let k=0;
        let p = 0;
        const rows = typeof(process.env.REACT_APP_ROWS) === 'undefined' ? 30 : Number(process.env.REACT_APP_ROWS);
        const cols = typeof(process.env.REACT_APP_COLS) === 'undefined' ? 10 : Number(process.env.REACT_APP_COLS);
        // Outer loop to create parent
        for (let i = 0; i < rows; i++) {
          const children = []
          // Inner loop to create children
          for (let j = 0; j < cols; j++) {
            
            if(this.props.diamondSpots.indexOf(p) > -1) {
                children.push(<td key={p}>
                  <Diamond 
                    diamondColor = {this.props.diamondColor}
                    diamondType={this.props.currentDiamond}            
                    index={this.props.diamondNumbers[k] + 1} diamondNumber={this.props.diamondNumber} 
                    onClick={this.handleClick}
                    />
                   </td>) 
                k++;
             } else {
                children.push(<td key={p}/>)
             }  
             p++;         
          }
          // Create the parent and add the children
          table.push(<tr key={i}>{children}</tr>)
        }
        return table
      }  

    // Call the API to pass game result
    sendGameResult = (point:number) => {
      const score = (this.state.stepNumber / this.state.tapCount) * 100;
      const totalBonusCollected = this.state.startTimer - Math.abs(this.state.negativePoints);
      const totalJewelsCollected = this.state.stepNumber;
      const totalAttempts=  this.state.tapCount + 1;
      const duration = new Date().getTime() - new Date(this.state.startTime).getTime()
      
      parent.postMessage(JSON.stringify({
            "duration": duration,            
            "static_data": {
                "point": point,
                "score": score,
                "total_attempts": totalAttempts,
                "total_bonus_collected": totalBonusCollected,
                "total_jewels_collected": totalJewelsCollected
            },
            "temporal_slices": JSON.parse(this.state.route),"timestamp":  new Date().getTime(),
        }), "*");     
    }
    // Render the game board
    render() {     
      let board ;
      let negSection = null;
      let jewelInfo = null;
      let timer;
      if(this.state.gameOver === false && this.state.timeout === false) {
        // loading game
        board = <table className="game-table">
                  <tbody>
                    {this.createTable()}
                  </tbody>
                </table>         
         // When wrong diamond is tapped
          timer = this.state.startTimer > 0 ?
             <Timer passTimerUpdate = {this.passTimerUpdate} startTimeInSeconds={this.state.startTimer} startTimer={1}/> : null;
          negSection = this.state.negativePoints < 0 && this.state.displayNegativePoints ? 
            <NegativePoints startPoints={this.state.negativePoints} /> : null       
          // Jewel info in the bottom for the inital state
          const classVal = this.props.currentDiamond + ' ' + this.props.currentDiamond + '-' + this.props.diamondColor
          jewelInfo = this.state.startTimer === 0 ? <div className="jewel-info">
              <span className="info-text">Jewels</span>
              <div className={classVal}>
                  <span className="number-text"> 1</span>
              </div>           
            </div> : null         
      } else {
        // When timer expires or successfully completed
        board =  this.state.timeout === false ? <div className="game-over">Congrats !!!</div> :
          <div className="game-over">Timeout !!!</div>         
       }
      return (
        <div> 
          <div className="countdown-timer"> 
            {timer}
            {negSection}
          </div>
          <br/>
            {board}  
            {jewelInfo}  
        </div>
      );
    }
}

export default Board