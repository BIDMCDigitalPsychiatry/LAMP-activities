/**
 * @file   Timer.tsx
 * @brief  Timer component which shows timer for jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';

interface Props  {
    startTimeInSeconds: number;
    startTimer: number;
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
    }
    // To update the timer value
    decrementTimeRemaining = () => {
        if (this.state.timeRemainingInSeconds >= 0) {
            this.setState({
                timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
            }, () => {
                if(this.state.timeRemainingInSeconds === 1) {                    
                    clearInterval(this.timer);
                }
                this.props.passTimerUpdate(this.state.timeRemainingInSeconds);  
            });
        } else {
            clearInterval(this.timer!);
        }
    };
    // To update the timer value once component is mounted
    componentDidMount() {
        if(this.props.startTimer > 0) {
            this.timer = setInterval(() => {
                this.decrementTimeRemaining();
            }, 1000);
        }
    }

    // Return timer in minutes and seconds
    getTimeInMinutesAndSeconds = (t:number) => {
        if(this.state.timeRemainingInSeconds === 1) {
            clearInterval(this.timer)
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
    
    render() {   
         return (            
            <div className="countdown-timer__text">
               {this.getTimeInMinutesAndSeconds(this.state.timeRemainingInSeconds)}
            </div>        
        );
    }
}
  
