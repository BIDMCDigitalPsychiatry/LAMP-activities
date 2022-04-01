

/**
 * @file   Questions.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2022
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
// import React from "react";
//  import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "./box.css";
interface Props {
  show: boolean;
  modalClose(status: boolean): void;
  msg: string;
}

interface State {
  startDate: Date
}
export default class Questions extends React.Component<{}, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      startDate: new Date(),
    }
  }

  // Handles modal close 
  //  handleClose = () => {
  //    this.setState({
  //      showStatus : false
  //    });
  //    this.props.modalClose(false);
  //  } 

  // Modal render function
  render() {
    return (
      <div>
        {/* // About what time is it? (scroll wheel)
// • What is today’ date? (scroll wheel)
// • What is the month? (scroll wheel)
// • What is the year? (keypad)
// • What is the day of the week? (drop down selection or scroll wheel)
// • What season is this (drop down selection or scroll wheel) */}
        <div className='memory-outer'>
          <div className='question-nav'>
            <p>About what time is it?</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={(date) => this.setState({ startDate: date ?? new Date() })}
              showTimeSelect={true}
              showTimeSelectOnly={true}
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
          <div className='question-nav'>
            <p>What is today’ date?</p>
            <select>
              <option> Select date</option>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className='question-nav'>
            <p>What is the month?</p>
            <select>
              <option> Select month</option>
              <option>January</option>
              <option>February</option>
            </select>
          </div>
          <div className='question-nav'>
            <p>What is the year?</p>
            <select>
              <option> Select year</option>
              <option>2000</option>
              <option>2001</option>
            </select>
          </div>
          <div className='question-nav'>
            <p>What is the day of the week?</p>
            <select>
              <option> Select day</option>
              <option>Sunday</option>
              <option>Monday</option>
            </select>
          </div>
          <div className='question-nav'>
            <p>What season is this?</p>
            <select>
              <option> Select season</option>
              <option>Sunday</option>
              <option>Monday</option>
            </select>
          </div>
          <div className='text-right'>
          <button className='primary'>submit</button>
          </div>
        </div>
      </div>
    );
  }
}

