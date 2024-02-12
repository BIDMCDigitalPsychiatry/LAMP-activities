/**
 * @file   DotTouch.tsx
 * @brief  DotTouch component which is the initial point of DotTouch game
 * @date   May , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Dot } from './Dot';
import { getRandomAlphaNumeric,getRandomNumbers , shuffle} from '../../functions';
import UndoIcon from '@material-ui/icons/Undo';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Timer } from '../common/Timer';
import './DotTouch.css';

/* eslint-disable no-restricted-globals */
interface DotState { 
 correctTaps:number;
 dotSpots:Array<number>;
 dotValues : Array<string>;
 shuffledValues:Array<string>;
 gameLevel:number;
 gameOver:boolean;  
 lastClickTime:any,
 lastWrongClick:any,
 route:any; 
 startGame:boolean;
 startTime: any;   
 startTimer: number;
 stateChange:boolean;
 stateRoutes:any;
 tapCount:number;
 time:number;
 timeout:boolean;   
 totalTaps:number;
}

class DotTouch extends React.Component<{}, DotState> {
   constructor(props:{}) {
     super(props);
     const maxPlots = typeof(process.env.REACT_APP_MAX_PLOTS) === 'undefined' ? 200 : Number(process.env.REACT_APP_MAX_PLOTS);
     const randomArray = getRandomNumbers(8, 1, maxPlots);  
     const dotCount = typeof(process.env.REACT_APP_LEVEL1_DOTCOUNT) === 'undefined' ? 8 : Number(process.env.REACT_APP_LEVEL1_DOTCOUNT);        
    
    const values= getRandomAlphaNumeric(dotCount/2);
    
     // Initailise state values      
     this.state = {  
         correctTaps:0,
         dotSpots : randomArray,
         dotValues:values,
         gameLevel:1,
         gameOver : false,         
         lastClickTime:0,  
         lastWrongClick:null,
         route:[],
         shuffledValues:shuffle(values),
         startGame:false,
         startTime:null, 
         startTimer: 0 ,
         stateChange:true,
         stateRoutes:[],
         tapCount:0,
         time: new Date().getTime(),
         timeout : false,
         totalTaps:0
       };      
   }

   // Update each game level
   resetState = () => {
     let dotCount = 0;
     const maxPlots = typeof(process.env.REACT_APP_MAX_PLOTS) === 'undefined' ? 200 : Number(process.env.REACT_APP_MAX_PLOTS);
     let randomArray;
     switch(this.state.gameLevel) {
        case 1:
         dotCount = typeof(process.env.REACT_APP_LEVEL2_DOTCOUNT) === 'undefined' ? 10 : Number(process.env.REACT_APP_LEVEL1_DOTCOUNT);
         break;
       case 2:
         dotCount = typeof(process.env.REACT_APP_LEVEL3_DOTCOUNT) === 'undefined' ? 12 : Number(process.env.REACT_APP_LEVEL1_DOTCOUNT);
         break;
     }
     randomArray = getRandomNumbers(dotCount, 1, maxPlots);   
     const values = getRandomAlphaNumeric(dotCount/2);
     Array.from(document.getElementsByClassName('dot-style')).forEach(elem => {
      elem.className = "dot-style";
     });
     // Set state values for current game level
     this.setState({       
       dotSpots: randomArray,
       dotValues:values,  
       gameLevel: this.state.gameLevel + 1, 
       shuffledValues:shuffle(values),
       startGame:false,
       stateChange:true,
       tapCount:0
     });    
   }

   // Each dot click is handled here
  handleClick = (e:any, i:string) => {
     if(i === '1' || this.state.startGame) {
      if(!this.state.timeout && !this.state.gameOver) {
       const item = e.target.className === 'number-text' ? e.target.closest('div'): e.target;
      if(item.className !== 'dot-style dot-selected') {
      const status =  i ===   this.state.dotValues[this.state.tapCount] ? true:false;
    
      item.className = status ?  'dot-style dot-selected' : 'dot-style wrong-dot-selection';
      
      this.setState({
        correctTaps : status? this.state.correctTaps + 1 : this.state.correctTaps,
        lastWrongClick: !status ? item :null, 
        tapCount : status ? this.state.tapCount + 1 : this.state.tapCount,
        totalTaps:this.state.totalTaps + 1
      });
        let routeList:any;
        if(i === '1') {
          const timerVal = typeof(process.env.REACT_APP_TIMOUT_PERIOD) === 'undefined' ? 30 :
            Number(process.env.REACT_APP_TIMOUT_PERIOD);  
            routeList = []; 
            if(this.state.gameLevel > 1) {
              routeList = this.updateRouteList();    
            }
          const routes = [];      
          routes.push({'Alphabet' : i, 'status' : 1, 'TimeTaken' : 0});
          // state updation for dot 1 click
          this.setState({
              lastClickTime:new Date().getTime(),
              route:JSON.stringify(routes),
              startGame:true,
              startTime: this.state.gameLevel === 1 ? new Date() : this.state.startTime,                           
              startTimer : timerVal,
              stateChange:false,
              stateRoutes:JSON.stringify(routeList)
            });          
        } else {
          // Update the state values for each taps other than dot 1
          this.updateStateWithTaps(i);          
        }
        if(this.state.dotValues.length - 1 === this.state.tapCount ) {
              // When all the dots are correctly tapped              
              if(this.state.gameLevel === 3) {
                setTimeout(() => {
                this.setState({
                    gameOver : true
                  });
                  this.sendGameResult();  
                }, 1000);
              } else {
                this.resetState();         
              }
          }
        }
      }
    }
  }

   // To track the timer expiring
   passTimerUpdate = (timerVal:number) => {     
     if(timerVal === 0) {
       this.setState({
         timeout : true
       });     
      this.sendGameResult();  
     } 
     this.setState({
         startTimer : timerVal
     });
   }
   
   // Update the state values for each taps other than dot 1
   updateStateWithTaps = (i:string) => {
     const routes = [];
     const dif  = new Date().getTime() - this.state.lastClickTime;          
     const lastclickTime =  (dif / 1000);
     if(this.state.route.length > 0) {
        const r = JSON.parse(this.state.route);
        Object.keys(r).forEach(key => {
          routes.push(r[key]);
        });
     }
     const route = {'Alphabet' : i, 'status' : 1, 'TimeTaken' : lastclickTime.toFixed(2)};
     routes.push(route);
    
     this.setState({ 
       lastClickTime:new Date().getTime(),
       route:JSON.stringify(routes),
     });   
   }

   // To create the game borad with dots on random positions
   createTable = () => {       
      const table = []    
      let k = 0;
      let p = 0;
      const rows = typeof(process.env.REACT_APP_ROWS) === 'undefined' ? 30 : Number(process.env.REACT_APP_ROWS);
      const cols = typeof(process.env.REACT_APP_COLS) === 'undefined' ? 10 : Number(process.env.REACT_APP_COLS);
      const dotValuesToRender = this.state.shuffledValues;
      // Outer loop to create parent
      for (let i = 0; i < rows; i++) {
        const children = []
        // Inner loop to create children
        for (let j = 0; j < cols; j++) {
          
          if(this.state.dotSpots.indexOf(p) > -1) {
              children.push(<td key={p}>
                <Dot 
                  index={dotValuesToRender[k]} 
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
   sendGameResult = () => {
     const totalAttempts=  this.state.totalTaps;
     const gameScore = totalAttempts < 30 ? Math.round((this.state.correctTaps / 30) * 100) :
          Math.round((this.state.correctTaps / totalAttempts) * 100);
     const points = gameScore === 100 ? 2 : 1;
     const statusType = this.state.gameOver ? 2 :1; 
     const serverURL = typeof(process.env.REACT_APP_JEWELS_GAME_SERVER_URL) === 'undefined' ? '' : 
       process.env.REACT_APP_JEWELS_GAME_SERVER_URL;     
     const routeList = this.updateRouteList();    
     fetch(serverURL, {   
       body: JSON.stringify(
         {
           "AdminBatchSchID":0,
           "EndTime": new Date(),
           "IsNotificationGame":false,
           "Point":points, 
           "RoutesList": routeList,
           "Score":gameScore,
           "SpinWheelScore":5,   
           "StartTime": this.state.startTime,
           "StatusType":statusType,    
           "TotalAttempts":this.state.totalTaps,   
           "UserID":"200",
           "Duration" : new Date().getTime() - this.state.time
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

   // Restart button action
   restartState = () => {
    const maxPlots = typeof(process.env.REACT_APP_MAX_PLOTS) === 'undefined' ? 200 : Number(process.env.REACT_APP_MAX_PLOTS);
    const randomArray = getRandomNumbers(this.state.dotSpots.length, 1, maxPlots);
    const routeList = this.updateRouteList();    
               
     this.setState({  
       dotSpots : randomArray,
       gameOver : false,       
       lastClickTime:0,  
       shuffledValues:shuffle(this.state.dotValues),
       startGame:false,
       startTime:null,
       stateChange:true, 
       stateRoutes:JSON.stringify(routeList),
       tapCount:0,
       timeout : false 
      });      
   }

   // Update route list for API
   updateRouteList = () => {
    const routeList = [];
    if(this.state.route.length > 0) {
      const r = JSON.parse(this.state.stateRoutes);
      Object.keys(r).forEach(key => {
        routeList.push(r[key]);
      });
      routeList.push({Routes:JSON.parse(this.state.route)});
    }
    return routeList;
   }

   // Undo button action
   undoAction = () => {
     if(this.state.startGame) {
      const item = this.state.lastWrongClick;
      if(item !== null) {
        item.className ='dot-style';
      }
      const routeList = this.updateRouteList();     
      this.setState({  
        route:[], 
        stateRoutes:JSON.stringify(routeList)     
      });  
     }
   }
   
  clickBack = () => {
    parent.postMessage(null, "*");
  }

   // Render the game board
   render() {     
     const alertMsg = this.state.gameOver ? 'Congrats !!' : (this.state.timeout ? 'Timeout !' : 
       this.state.tapCount === 0 ? (this.state.gameLevel === 1 ? "Tap '1' to start the test": "Tap '1' to begin") :
         (this.state.tapCount === 1 ? "Pick the matching alphabet" : 
       <Button variant="outlined" color="primary" onClick={this.restartState}>
         Restart
       </Button>));
     
     return (
       <div className="dot-touch-board">
         <nav className="back-link">
           <ArrowBackIcon color="primary" onClick={this.clickBack}/>
           {/* <ArrowBackIcon icon={faRedo}  onClick={this.undoAction}/> */}
         </nav>         
         <nav className="home-link">
           <UndoIcon color="primary" onClick={this.undoAction}/>
           {/* <FontAwesomeIcon icon={faRedo}  onClick={this.undoAction}/> */}
         </nav>
         <div className="heading">Dot touch</div>
         <div className="game-board">
           <div> 
             <div className="countdown-timer mt-10"> 
             { this.state.startTimer > 0 && !this.state.gameOver &&
               <Timer passTimerUpdate = {this.passTimerUpdate} stateChange={this.state.stateChange} startTimeInSeconds={this.state.startTimer} startTimer={1}/> 
             }
             </div>
             {this.state.startTimer > 0 && !this.state.gameOver && <div className="level-text">Level {this.state.gameLevel}</div>}
             <br/>
             <table className="game-table" id="game-table">
               <tbody>
                 {this.createTable()}
               </tbody>
             </table> 
             <div className="footer">
               {alertMsg}                    
             </div>            
           </div>
         </div>
       </div>
     );
   }
}
export default DotTouch