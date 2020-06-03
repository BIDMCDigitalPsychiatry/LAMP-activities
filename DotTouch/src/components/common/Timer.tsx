/**
 * @file   Timer.tsx
 * @brief  Timer component which shows timer for dot touch game
 * @date   May , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';

interface Props  {
    startTimeInSeconds: number;
    startTimer: number;
    stateChange:boolean;
    passTimerUpdate(i:number): void;
}

interface State  {
    timeRemainingInSeconds: number;
}

export class Timer extends React.Component<Props, State> {    
    private timer: any;

    constructor(props: Props) {
      super(props);
      this.state = {
        timeRemainingInSeconds: props.startTimeInSeconds
      };
      if(this.props.stateChange) {
            clearInterval(this.timer!);
        } else { 
             clearInterval(this.timer!);
             this.timer = setInterval(() => {
                this.decrementTimeRemaining();
            }, 1000);
        }
    }
    // To update the timer value
    decrementTimeRemaining = () => {
       if (this.state.timeRemainingInSeconds > 0 && !this.props.stateChange) {            
            this.updateTimerVal();   
        } else {
            const timerVal = typeof(process.env.REACT_APP_TIMOUT_PERIOD) === 'undefined' ? 30 :
                Number(process.env.REACT_APP_TIMOUT_PERIOD);   
            this.setState({
                timeRemainingInSeconds: timerVal
            });
            this.props.passTimerUpdate(timerVal); 
        }
    };
    // Update time value
    updateTimerVal = () => {
        this.setState({
            timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
        });
        this.props.passTimerUpdate(this.state.timeRemainingInSeconds); 
    }

    // Once component unmounted, clear interval
    componentWillUnmount () {
       clearInterval(this.timer!); 
    }

    // Return timer in minutes and seconds
    getTimeInMinutesAndSeconds = (t:number) => {        
        if(this.state.timeRemainingInSeconds === 0) {
            this.props.passTimerUpdate(this.state.timeRemainingInSeconds);  
        }
        let minutes;
        let seconds;
        const divisorForMinutes = this.state.timeRemainingInSeconds % (60 * 60);
        minutes = Math.floor(divisorForMinutes / 60 );
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        const divisorForSeconds = divisorForMinutes % 60;
        seconds = Math.ceil(divisorForSeconds);
        seconds = seconds >= 10 ? seconds : '0' + seconds;        
        return minutes + ':' + seconds;       
    }
    
    // Render timer
    render() {   
         return (            
            <div className="countdown-timer__text">
               {this.getTimeInMinutesAndSeconds(this.state.timeRemainingInSeconds)}
            </div>        
        );
    }
}
  
