/**
 * @file   Questions.tsx
 * @brief  Modal component which shows modal dialog for Cats and Dogs game
 * @date   Mar , 2022
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import DatePicker from "react-datepicker";
import { Timer } from "../common/Timer";
import i18n from "./../../i18n";

import "./box.css";

import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";
import ColourMemo from "src/minigame/ColourMemo";

function getDaysInCurrentMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function range(min: number, max: number) {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

interface Props {
  onSubmit(data: any): void;
  onStateChange(data: any): void;
  language: string;
  timeLimit: number;
}

interface State {
  data: any;
  timeout: boolean;
  startTimer: number;
  dataSubmitted: boolean;
  showMiniGame: boolean;
}

interface ExampleCustomInputProps {
  value: string;
  onClick: () => void;
  className?: string;
}

class ExampleCustomInput extends React.Component<ExampleCustomInputProps> {
  render() {
    const { value, onClick, className } = this.props;
    return (
      <button className={className} onClick={onClick}>
        {value} 
      </button>
    );
  }
}
export default class Questions extends React.Component<Props, State> {
  private months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  private days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  private years = range(
    new Date().getFullYear() - 10,
    new Date().getFullYear() + 5
  );
  private monthDates = Array.from(Array(getDaysInCurrentMonth()).keys());
  private seasons = ["Summer", "Winter", "Autumn", "Spring"];

  constructor(props: Props) {
    super(props);
    this.state = {
      data: {},
      startTimer: props.timeLimit,
      timeout: false,
      dataSubmitted: false,
      showMiniGame: false,
    };
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
  }

  passTimerUpdate = (timerValue: number) => {
    if (timerValue === 1) {
      setTimeout(() => {
        this.props.onSubmit(this.state.data);
      }, 1000);
    } else {
      this.setState({
        startTimer: timerValue,
      });
    }
  };

  checkDataReadyToSubmit = () => {
    if (
      !this.state.data.start_time ||
      !this.state.data.today_date ||
      this.state.data.today_date === "Select date" ||
      !this.state.data.month ||
      this.state.data.month === "Select month" ||
      !this.state.data.year ||
      this.state.data.year === "Select year" ||
      !this.state.data.day ||
      this.state.data.day === "Select day" ||
      !this.state.data.season ||
      this.state.data.season === "Select season"
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <div className="marginTop10">
        {!this.state.timeout ? (
          <Timer
            passTimerUpdate={this.passTimerUpdate}
            startTimeInSeconds={this.state.startTimer}
            startTimer={this.state.startTimer - 1}
            showMiniGame={this.state.showMiniGame}
          />
        ) : null}

        {this.state.showMiniGame ? (
          <ColourMemo />
        ) : (
          <div className="memory-outer">
            <div className="question-nav">
              <p>{i18n.t("ABOUT_TIME")} *</p>
              <div>
              <DatePicker
                selected={this.state.data?.start_time}
                onChange={(date: any) => {
                  const details = Object.assign({}, this.state?.data) ?? {};
                  details.start_time = date;
                  this.props.onStateChange(Object.assign({}, details));
                  this.setState({ data: details });
                }}
                showTimeSelect={true}
                showTimeSelectOnly={true}
                customInput={<ExampleCustomInput value="Select Date" onClick={() => {}} className="example-custom-input" />}
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                disabled={this.state.dataSubmitted===true}
                className="lamp-datepicker"
              />
              </div>
            </div>
            <div className="question-nav">
              <p>{i18n.t("TODAY")} *</p>
              <select
                onChange={(evt) => {
                  const details = this.state.data;
                  details.today_date =
                    evt.target.value === "Select date"
                      ? null
                      : evt.target.value;
                  this.setState({ data: details }, () => {
                    this.props.onStateChange(details);
                  });
                }}
                disabled={this.state.dataSubmitted === true}
              >
                <option>{i18n.t("SELECT_DATE")}</option>
                {this.monthDates.map((i: number) => (
                  <option value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="question-nav">
              <p>{i18n.t("CURRENT_MONTH")} *</p>
              <select
                onChange={(evt) => {
                  const details = this.state.data;
                  details.month =
                    evt.target.value === "Select month"
                      ? null
                      : evt.target.value;
                  this.setState({ data: details }, () => {
                    this.props.onStateChange(details);
                  });
                }}
                disabled={this.state.dataSubmitted === true}
              >
                <option>{i18n.t("SELECT_MONTH")}</option>
                {this.months.map((month: string) => (
                  <option value={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className="question-nav">
              <p>{i18n.t("CURRENT_YEAR")} *</p>
              <select
                onChange={(evt) => {
                  const details = this.state.data;
                  details.year =
                    evt.target.value === "Select year"
                      ? null
                      : evt.target.value;
                  this.setState({ data: details }, () => {
                    this.props.onStateChange(details);
                  });
                }}
                disabled={this.state.dataSubmitted === true}
              >
                <option>{i18n.t("SELECT_YEAR")}</option>
                {this.years.map((year: number) => (
                  <option value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="question-nav">
              <p>{i18n.t("CURRENT_DAY")} *</p>
              <select
                onChange={(evt) => {
                  const details = this.state.data;
                  details.day =
                    evt.target.value === "Select day" ? null : evt.target.value;
                  this.setState({ data: details }, () => {
                    this.props.onStateChange(details);
                  });
                }}
                disabled={this.state.dataSubmitted === true}
              >
                <option>{i18n.t("SELECT_DAY")}</option>
                {this.days.map((day: string) => (
                  <option value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="question-nav">
              <p>{i18n.t("CURRENT_SEASON")} *</p>
              <select
                onChange={(evt) => {
                  const details = this.state.data;
                  details.season =
                    evt.target.value === "Select season"
                      ? null
                      : evt.target.value;
                  this.setState({ data: details }, () => {
                    this.props.onStateChange(details);
                  });
                }}
                disabled={this.state.dataSubmitted === true}
              >
                <option>{i18n.t("SELECT_SEASON")}</option>
                {this.seasons.map((season: string) => (
                  <option value={season}>{season}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <Button
                className={
                  this.checkDataReadyToSubmit() === false || this.state.dataSubmitted
                    ? "btn-submit-disabled"
                    : "btn-submit"
                }
                variant="primary"
                disabled={this.checkDataReadyToSubmit() === false}
                onClick={() => {
                  this.setState({
                    dataSubmitted: true,
                    showMiniGame: true,
                  });
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
