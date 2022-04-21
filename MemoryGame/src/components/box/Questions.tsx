

/**
 * @file   Questions.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2022
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import DatePicker from "react-datepicker";
import "./box.css";

import "react-datepicker/dist/react-datepicker.css";

function getDaysInCurrentMonth() {
  const date = new Date();
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
}

function range(min:number, max: number) {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

interface Props {
  onSubmit (data: any): void;
  onStateChange(data: any): void;
}

interface State {
  data: any
}
export default class Questions extends React.Component<Props, State> {
  private months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  private days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  private years = range(2022, new Date().getFullYear())
  private monthDates= Array.from(Array(getDaysInCurrentMonth()).keys())
  private seasons = ["Summer", "Winter", "Autumn", "Spring"]
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
    }
  }

  passTimerUpdate = (timerValue: number) => {
    if (timerValue === 0) {
      this.setState(
        {
          endTime: new Date(),
          timeout: true,
        },
        () => {
          this.updateStateWithTaps();
          this.sendGameResult();
        }
      );
    }
    this.setState({
      startTimer: timerValue,
    });
  };
  
  render() {
    return (
      <div className="marginTop10">timer =
      {!this.state.timeout &&
      !this.state.gameOver &&
      this.state.gameState > 0 ? (
        <Timer
          passTimerUpdate={this.passTimerUpdate}
          startTimeInSeconds={this.state.startTimer}
          startTimer={this.state.gameState}
        />
      ) : null}

        <div className='memory-outer'>
          <div className='question-nav'>
            <p>About what time is it?</p>
            <div>
            <DatePicker
              selected={this.state.data?.start_time}
              onChange={(date) => {
                  const details =  Object.assign({},this.state?.data) ?? {}
                  details.start_time = details.start_time ?? date
                  this.props.onStateChange( Object.assign({},details))

                  this.setState({data:details})
                }
              }
              showTimeSelect={true}
              showTimeSelectOnly={true}
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            </div>
          </div>
          <div className='question-nav'>
            <p>What is today’ date?</p>
            <select onChange={(evt) => {
                  const details = this.state.data
                  details.today_date = this.state.data?.today_date ?? evt.target.value
                  this.setState({data:details}, () => {
                    this.props.onStateChange(details)
                  })
                }
              }>
              <option> Select date</option>
              {this.monthDates.map((i : number) => (
                <option value={i+1}>{i+1}</option>
              ))}              
            </select>
          </div>
          <div className='question-nav'>
            <p>What is the month?</p>
            <select onChange={(evt) => {
                  const details = this.state.data
                  details.month = this.state.data?.month ?? evt.target.value
                  this.setState({data:details}, () => {
                    this.props.onStateChange(details)
                  })
                }
              }>
              <option> Select month</option>
              {this.months.map((month : string) => (
                <option value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className='question-nav'>
            <p>What is the year?</p>
            <select onChange={(evt) => {
                  const details = this.state.data
                  details.year = this.state.data?.year ?? evt.target.value
                  this.setState({data:details}, () => {
                    this.props.onStateChange(details)
                  })
                }
              }>
              <option> Select year</option>
              {this.years.map((year : number) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className='question-nav'>
            <p>What is the day of the week?</p>
            <select onChange={(evt) => {
                  const details = this.state.data
                  details.day = this.state.data?.day ?? evt.target.value
                  this.setState({data:details}, () => {
                    this.props.onStateChange(details)
                  })
                }
              }>
              <option> Select day</option>
              {this.days.map((day : string) => (
                <option value={day}>{day}</option>
              ))}
            </select>
          </div>
          <div className='question-nav'>
            <p>What season is this?</p>
            <select value={this.state.data?.season ?? ""} onChange={(evt) => {
                  const details = this.state.data
                  details.season = this.state.data?.season ?? evt.target.value
                  this.setState({data:details}, () => {
                    this.props.onStateChange(details)
                  })
                }
              }>
              <option> Select season</option>
              {this.seasons.map((season : string) => (
                <option value={season}>{season}</option>
              ))}
            </select>
          </div>
          <div className='text-right'>
          <button className='primary' onClick={() => {
            this.props.onSubmit(this.state.data)
          }}>submit</button>
          </div>
        </div>
      </div>
    );
  }
}

