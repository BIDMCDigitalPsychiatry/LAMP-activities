/**
 * @file   TimerComponent.tsx
 * @brief  TimerComponent component which is the used to show the Timer functionalities
 * @date   Apr , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";
import Timer from "react-compound-timer";
import "././style.css";

interface Props {
  start?: boolean;
  stop?: boolean;
  trigger_stop_timer?: any;
  stop_timer_val?: any;
}

interface AppState {
  collected_points: any;
  new_current_point: any;
  balloon_number: any;
  break_points_array: any;
  balloon_burst: any;
}

class TimerComponent extends React.Component<Props, AppState> {
  private timerStartButton: any;
  private timerStopButton: any;

  constructor(props: Props) {
    super(props);
    this.timerStartButton = React.createRef();
    this.timerStopButton = React.createRef();
  }

  // Start TImer
  startTimer(start: any) {
    start();
  }

  // Stop TImer
  stopTimer(stop: any) {
    stop();
  }

  // Update when the state changes
  componentDidUpdate(prevProps: any) {
    // the only way for inner buttons is by using refs
    if (prevProps.start === false && this.props.start === true) {
      this.timerStartButton.current.click();
    }
    if (
      (prevProps.stop === false && this.props.stop === true) ||
      this.props.stop_timer_val === true
    ) {
      this.timerStopButton.current.click();
    }
  }

  // Game render function
  render() {
    return (
      <Timer
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        startImmediately={true}
      >
        {({ start, stop }: { start: any; stop: any }) => (
          <React.Fragment>
            <Timer.Hours />:
            <Timer.Minutes />:
            <Timer.Seconds />
            <button
              hidden={true}
              ref={this.timerStartButton}
              onClick={() => this.startTimer(start)}
            >
              Start
            </button>
            <button
              hidden={true}
              ref={this.timerStopButton}
              onClick={() => this.stopTimer(stop)}
            >
              Stop
            </button>
          </React.Fragment>
        )}
      </Timer>
    );
  }
}

export default TimerComponent;
