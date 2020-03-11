
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
import diamond1_trans from "./images/jewelTrails/diamond1_trans.png";
import diamond2_trans from "./images/jewelTrails/diamond2_trans.png";
import diamond3_trans from "./images/jewelTrails/diamond3_trans.png";
import diamond4_trans from "./images/jewelTrails/diamond4_trans.png";
import { NegativePoints } from './NegativePoints';

export interface BoardProps {
    totalDiamonds:number; 
    diamondSpots:Array<number>;   
    currentDiamond : any;     
    diamondNumber: number;  
    diamondNumbers:Array<number>;   
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
      const diamondTypeMaps = [diamond1_trans, diamond2_trans, diamond3_trans, diamond4_trans];
      if(this.state.stepNumber === i - 1) {
        if(i === 1) {
          const timerVal = typeof(process.env.REACT_APP_JEWELS_TIMOUT_PERIOD) === 'undefined' ? 180 :
            Number(process.env.REACT_APP_JEWELS_TIMOUT_PERIOD);   
          const routes = [];      
          routes.push({'Alphabet' : i, 'status' : 1, 'TimeTaken' : 0});
          // state updation for diamond 1 click
          this.setState({
              lastClickTime:new Date().getTime(),
              route:JSON.stringify(routes),
              startTime:new Date(),                           
              startTimer : timerVal
            });          
        } else {
          // Update the state values for each tas other than diamond 1
          this.updateStateWithTaps(i);          
        }
        // Update the state for each click to track
        this.setState({
            stepNumber : i,
        });
        // Load disabled image after correct tap
        const item = e.target.className === 'number-text' ? e.target.closest('div'): e.target;
        item.style.backgroundImage = `url(${diamondTypeMaps[this.props.diamondNumber]})`;

        if(this.props.totalDiamonds === i) {
            // When all the diamonds are correctly tapped
            this.setState({
              endTime:new Date(),
              gameOver : true
            });  
            this.sendGameResult(2);         
        }
      } else {
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
        });     
        this.sendGameResult(1);  
      } 
      this.setState({
          startTimer : timerVal
      });
    }
    
    // Update the state values for each taps other than jewel 1
    updateStateWithTaps = (i:number) => {
      const routes = [];
      const dif  = new Date().getTime() - this.state.lastClickTime;          
      const lastclickTime =  (dif / 1000);
      const r = JSON.parse(this.state.route);
      Object.keys(r).forEach(key => {
        routes.push(r[key]);
      });
      const route = {'Alphabet' : i, 'status' : 1, 'TimeTaken' : lastclickTime.toFixed(2)};
      routes.push(route);
      this.setState({ 
        lastClickTime:new Date().getTime(),
        route:JSON.stringify(routes),
      });
    }

    createTable = () => {       
        const table = []    
        let k=0;
        let p = 1;
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
      const totalAttempts=  this.state.tapCount;
      const statusType = this.state.gameOver ? 2 :1; 
      const serverURL = typeof(process.env.REACT_APP_JEWELS_GAME_SERVER_URL) === 'undefined' ? '' : 
        process.env.REACT_APP_JEWELS_GAME_SERVER_URL;
      const routeList=[];
      routeList.push({Routes:JSON.parse(this.state.route)});
      fetch(serverURL, {   
        body: JSON.stringify(
          {"AdminBatchSchID": 0, "EndTime": new Date(), "IsNotificationGame": false, "Point": point,
           "RoutesList": routeList, "Score": score,"SpinWheelScore": 5,"StartTime": this.state.startTime, 
           "StatusType": statusType,"TotalAttempts": totalAttempts, "TotalBonusCollected":totalBonusCollected, 
           "TotalJewelsCollected": totalJewelsCollected,"UserID": "200"
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
          jewelInfo = this.state.startTimer === 0 ? <div className="jewel-info">
              <span className="info-text">Jewels</span>
              <div className="diamond-style"
                    style={{ backgroundImage:`url(${this.props.currentDiamond})` }}  >
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