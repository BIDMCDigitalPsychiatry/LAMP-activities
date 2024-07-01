/**
 * @file   Balloon.tsx
 * @brief  Balloon component which is the initial point of Balloon game
 * @date   Apr , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";
import "././style.css";
import BallonStandSVG from "./BallonStandSVG";
import BallonImageSVG from "./BallonImageSVG";
import TimerComponent from "./TimerComponent";
import i18n from "./../../i18n";
import  ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface AppState {
  balloon_width: any;
  balloon_number: any;
  new_current_point: any;
  total_points: any;
  btn_pump_disabled: any;
  collected_points: any;
  break_point: number;
  btn_collect_disabled: any;
  cls_btn_collect_disabled: any;
  balloon_burst: boolean;
  cls_balloon_burst: any;
  start: boolean;
  stop: boolean;
  stop_timer: boolean;
  route: any;
  item: number;
  level: number;
  lastClickTime: number;
  loaded: boolean;
  breakpoint_mean: number;
  breakpoint_std: number;
  balloon_count: number;
  reset_data: boolean;
  participant_id: number;
  break_point_array: any;
  time:number;
  no_back:boolean;
  points: any;
}

interface AppProps{
  data: any
}

class Balloons extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);

    const configuration = props.data.configuration;
    const settings = props.data.activity?.settings ?? (props.data.settings ?? {})
    const pointsArray = this.getRandomGaussianArray(settings.breakpoint_mean, settings.breakpoint_std)
    this.state = {
      balloon_burst: false,
      balloon_count: settings.balloon_count,
      balloon_number: 1,
      balloon_width: 100,
      break_point: 0,
      breakpoint_mean: settings.breakpoint_mean,
      breakpoint_std:  settings.breakpoint_std,
      btn_collect_disabled: "disabled",
      btn_pump_disabled: null,
      cls_balloon_burst: null,
      cls_btn_collect_disabled: "opacity_05",
      collected_points: [],
      item: 0,
      lastClickTime: new Date().getTime(),
      level: 1,
      loaded: false,
      new_current_point: 0,
      route: [],
      start: false,
      stop: false,
      stop_timer: false,
      time: new Date().getTime(),
      total_points: 0,
      reset_data: false,
      participant_id: 0,
      break_point_array: [],
      no_back:props.data.noBack,
      points: pointsArray,
    };
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    const currentDate = this.dateFormating();
    const participantData: any = JSON.parse(
      localStorage.getItem("balloonrisk_") || JSON.stringify({
        currentDate,
        balloonCount: settings.balloon_count ?? 15,
        breakpointMean: settings.breakpoint_mean ?? 64.5,
        breakpointStd: settings.breakpoint_std?? 37,
        breakPointArray:pointsArray
      })
    );

    if (localStorage.getItem(
      "balloonrisk_") === null || (!!participantData && 
     (  participantData.currentDate !== currentDate ||
      !participantData.hasOwnProperty("breakPointArray") ||
      this.state.balloon_count !== participantData.balloonCount ||
      this.state.breakpoint_mean !== participantData.breakpointMean ||
      this.state.breakpoint_std !== participantData.breakpointStd))) {
      
      localStorage.setItem(
        "balloonrisk_",
        JSON.stringify({
          currentDate,
          balloonCount: settings.balloon_count,
          breakpointMean: settings.breakpoint_mean,
          breakpointStd: settings.breakpoint_std,
          breakPointArray: pointsArray
        })
      );
    }
  }

 

  getRandomGaussian =  (mean: any, std: any) => {
    let u = 0;
    let v = 0;
    while (u === 0) {
      u = Math.random();
    }
    while (v === 0) {
      v = Math.random();
    }
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num * std + mean;
    return num
  };


  getRandomGaussianArray =  (mean: any, std: any): any => {
    const list = [];
    let i=0;
    const len = this.state?.balloon_count ?? 15
    for (i = 0; i < len; i++) {
      let num = 0
      while(num < 0.5 || num >= 128) {
        num = this.getRandomGaussian(mean, std)
      }
      list[i] = Math.round(num);
    }
    this.setState({points: list})
    return list
  }

  componentDidMount = () => {
    const eventMethodObj: any = window.addEventListener;
    const eventMethod = eventMethodObj ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";

    eventer(
      messageEvent,
      (e: any) => {
        const configuration = e.data.configuration;
        const settings = e.data.activity?.settings ?? (e.data.settings ?? {});
        this.setState({
          balloon_count: settings
            ? settings.balloon_count
            : this.state.balloon_count,
          breakpoint_mean: settings
            ? settings.breakpoint_mean
            : this.state.breakpoint_mean,
          breakpoint_std: settings
            ? settings.breakpoint_std
            : this.state.breakpoint_std,
        });
        i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
      },
      false
    );
  };
  
  // Pump the balloon
  pumpBalloon = async () => {
    if (this.state.balloon_number > this.state.balloon_count) {
      this.setState({ btn_pump_disabled: "disabled" });
      this.setState({ btn_collect_disabled: "disabled" });
      return false;
    }
    const balloonPumpLimit =
      typeof process.env.REACT_APP_MAX_PUMP_BALLOON_LIMIT === "undefined"
        ? 0
        : Number(process.env.REACT_APP_MAX_PUMP_BALLOON_LIMIT);

    this.setState({
      btn_collect_disabled: null,
      lastClickTime: new Date().getTime(),
    });
    const currentPointId = document.getElementById("current_point_id") || null;
    let currentPointVal = 0;
    let newCurrentPoint = 0;
    let route = {};
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = dif;
    if (currentPointId != null) {
      this.setState({
        item: this.state.item + 1,
      });
      currentPointVal = parseInt(
        currentPointId.getAttribute("data-current-point") || "",
        10
      );
      newCurrentPoint = currentPointVal + 1;
      if (
        this.state.break_point !== 0 &&
        newCurrentPoint === this.state.break_point
      ) {
        // If break point is reached and balloon burst then increase balloon number, reset current points etc
        this.setState({
          balloon_burst: true,
          balloon_number: this.state.balloon_number + 1,
          balloon_width: 100,
          cls_balloon_burst: "disabled",
          new_current_point: 0,
          // total_points: 0,
        });
        const currentRoute = this.state.route;
        route = {
          duration: lastclickTime,
          item: currentRoute.length === 0 ? 1 : this.state.item + 1,
          level: this.state.level,
          type: false,
          value: 0,
        };
        await this.setState((prevState) => ({
          route: [...prevState.route, route],
        }));
        setTimeout(() => {
          const participantData: any = JSON.parse(
            localStorage.getItem("balloonrisk_") || "{}"
          );
          const breakPointData = this.getBreakPoinData(participantData);
          this.setState((prevState) => ({
            break_point_array: [...prevState.break_point_array, breakPointData],
            balloon_burst: false,
            break_point: breakPointData,
            cls_balloon_burst: null,
            item: 0,
            level: this.state.level + 1,
          }));
        }, 2000);
        // Call API
        if (this.state.balloon_number > this.state.balloon_count) {
          this.sendGameData();
        }
      } else {
        if (currentPointVal < balloonPumpLimit) {
          // If currentpoints is less than ballon pumping maximum limit 128
          const ballonId = document.getElementById("svgBallonImgIcon") || null;
          if (ballonId != null) {
            if (this.state.break_point === 0) {
              const participantData: any = JSON.parse(
                localStorage.getItem("balloonrisk_") || "{}"
              );
              const breakPointData = this.getBreakPoinData(participantData);

              this.setState((prevState) => ({
                break_point_array: [
                  ...prevState.break_point_array,
                  breakPointData,
                ],
                break_point: breakPointData,
              }));
            }
            const currentRoute = this.state.route;
            route = {
              duration: lastclickTime,
              item: currentRoute.length === 0 ? 1 : this.state.item + 1,
              level: this.state.level,
              type: true,
              value: 1,
            };
            await this.setState((prevState) => ({
              route: [...prevState.route, route],
            }));
            const balloonWidth = parseInt(
              ballonId.getAttribute("width") || "",
              10
            );
            const incBallonWidth = balloonWidth + 1;
            if (this.state.balloon_burst === false) {
              this.setState({
                balloon_width: incBallonWidth,
                new_current_point: newCurrentPoint,
              });
            }
            if (newCurrentPoint >= 1) {
              this.setState({ cls_btn_collect_disabled: true });
            } else {
              this.setState({ cls_btn_collect_disabled: false });
            }
          }
        } else {
          this.setState({
            btn_pump_disabled: "disabled",
            btn_collect_disabled: "disabled",
          });
        }
      }
    }
    this.setState({ reset_data: true });
    return true;
  };

  getBreakPoinData = (participantData: any, flag = true) => {
   
    return  participantData?.breakPointArray[
          flag ? this.state.balloon_number -1: this.state.balloon_number  
        ] 
  };

 
  sendGameData = async (status?:boolean) => {
    const route = {'type': 'manual_exit', 'value': status ?? false} 
    this.setState((prevState) => ({
      route: [...prevState.route, route],
    }), () => {
    const currentDate = this.dateFormating();
   
    localStorage.setItem(
      "balloonrisk_",
      JSON.stringify({
        currentDate,
        breakPointArray: this.state.break_point_array,
        balloonCount: this.state.balloon_count,
        breakpointMean: this.state.breakpoint_mean,
        breakpointStd: this.state.breakpoint_std,
      })
    );
    parent.postMessage(
      JSON.stringify({
        balloon_count: this.state.balloon_count,
        breakpoint_mean: this.state.breakpoint_mean,
        breakpoint_std: this.state.breakpoint_std,
        static_data: {
          points: this.state.total_points + this.state.new_current_point,
        },
        temporal_slices: this.state.route,
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - this.state.time,
      }),
      "*"
    );
    })
  };

  dateFormating = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return date + "-" + month + "-" + year;
  };

  // Update Ballon Number
  updateBalloonNumber = () => {
    this.setState({
      balloon_burst:
        this.state.balloon_number + 1 > this.state.balloon_count
          ? true
          : this.state.balloon_burst,
      balloon_number: this.state.balloon_number + 1,
    });
  };

  // Update Total Points
  updateTotalPoints = () => {
    const newTotalPoints =
      this.state.total_points + this.state.new_current_point;
    this.setState({ total_points: newTotalPoints });
  };

  // Update Current points
  updateCurrentPoints = () => {
    this.setState({ new_current_point: 0 });
  };

  // Enable the Pump Balloon Button from  disabled
  enablePumpBtn = () => {
    this.setState({ btn_pump_disabled: null });
  };

  // Increase the balloon width on Pumping
  resetBalloonSize = () => {
    this.setState({ balloon_width: 100 });
  };

  // Append collected points
  appendCollectedPoints = () => {
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = dif;
    const participantData: any = JSON.parse(
      localStorage.getItem("balloonrisk_") || "{}"
    );
    const breakPointData = this.getBreakPoinData(participantData, false);

    this.setState((prevState) => ({
      collected_points: [
        ...prevState.collected_points,
        this.state.collected_points,
      ],
      break_point_array: [...prevState.break_point_array, breakPointData],
      break_point: breakPointData,
      item: 0,
      level: this.state.level + 1,
    }));
    // Call API
    if (this.state.balloon_number + 1 > this.state.balloon_count) {
      this.sendGameData();
    }
  };

  // Enable the Collect Points Button from  disabled
  enableCollectBtn = () => {
    this.setState({ btn_collect_disabled: "disabled" });
    this.setState({ cls_btn_collect_disabled: "opacity_05" });
  };

  // Stop the Timer
  clickStopTimer = () => {
    this.setState({ stop_timer: true });
  };

  updateResetData = () => {
    this.setState({ reset_data: false });
  };

  reloadPage = () => {
    window.location.reload();
  };
  
  clickBack = () => {
    
      this.sendGameData(true)
    
  }

  // Game render function
  render() {
    const { start, stop } = this.state;
    const instruction = (
      <div className="instruction">
        {i18n.t("TAP_THE_BUTTON_TO_PUMP_UP_A_BALLOON_TO_INFLATE_IT_AS_LARGE_AS_YOU_CAN_BEFORE_THE_BALLOON_BURSTS_WHEN_YOU_FEEL_LIKE_YOU_CANT_INFLATE_IT_ANYMORE_WITHOUT_IT_BURSTING_TAP_THE_BUTTON_TO_COLLECT_POINTS_THE_NUMBER_OF_TIMES_YOU_PUMPED_UP_THE_BALLOON_WILL_BE_EQUAL_TO_THE_NUMBER_OF_POINTS_YOU_GET_IF_THE_BALLOON_BURSTS_YOU_GET_NO_POINTS")}
      </div>
      )
    return (
      <div>
        <div className="row">
          <div className="col">
            {!this.state.no_back && <a className="icn-menu menu-left cursorPointer" onClick={this.clickBack}>
              <ArrowBackIcon />
            </a>}
            <h4 style={{ marginRight: "-25px" }}>{i18n.t("BALLOON_RISK")}</h4>
            <a
              className="icn-menu menu-right cursorPointer"
              onClick={this.reloadPage}
            >
              <div className="refresh" />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col timer">
            <p>
              {this.state.balloon_number <= this.state.balloon_count && (
                <TimerComponent
                  start={start}
                  stop={stop}
                  trigger_stop_timer={this.clickStopTimer}
                  stop_timer_val={this.state.stop_timer}
                />
              )}
            </p>
          </div>
        </div>
        
        <div className="points">
          <div className="row">
            <div className="col-8">{i18n.t("CURRENT_POINTS")}</div>
            <div
              className="col-4 p-value"
              data-current-point={this.state.new_current_point}
              id="current_point_id"
            >
              {this.state.new_current_point}
            </div>
          </div>
          <div className="row">
            <div className="col-8">{i18n.t("TOTAL_POINTS")}</div>
            <div className="col-4 p-value">{this.state.total_points}</div>
          </div>
        </div>
        {instruction}
        <div className="baloon-container">
        <BallonImageSVG
          balloon_width={this.state.balloon_width}
          balloon_burst={this.state.balloon_burst}
          balloon_count_limit={
            this.state.balloon_number > this.state.balloon_count ? true : false
          }
          language={i18n.language}
        />
        <BallonStandSVG
          new_current_point={this.state.new_current_point}
          balloon_number={
            this.state.balloon_number > this.state.balloon_count
              ? this.state.balloon_count
              : this.state.balloon_number
          }
          trigger_balloon_number={this.updateBalloonNumber}
          trigger_total_points={this.updateTotalPoints}
          trigger_current_points={this.updateCurrentPoints}
          trigger_enable_pump_btn={this.enablePumpBtn}
          trigger_reset_balloon_size={this.resetBalloonSize}
          trigger_collected_points={this.appendCollectedPoints}
          trigger_enable_collect_btn={
            this.state.balloon_number > this.state.balloon_count
              ? true
              : this.state.btn_collect_disabled
          }
          trigger_collect_button_class={this.state.cls_btn_collect_disabled}
          balloon_burst={this.state.balloon_burst}
          trigger_stop_timer={this.clickStopTimer}
          balloon_count={this.state.balloon_count}
          route={this.state.route}
          reset_status={this.updateResetData}
          reset_data={this.state.reset_data}
          language={i18n.language}
        />
        <input
          type="button"
          name="pump_balloon"
          id="pump_balloon"
          value={`${i18n.t("PUMP_UP_BALLOON")}`}
          disabled={
            this.state.balloon_number > this.state.balloon_count ||
            this.state.balloon_burst === true
              ? true
              : this.state.btn_pump_disabled
          }
          className={`btn ${
            this.state.balloon_number > this.state.balloon_count ||
            this.state.balloon_burst
              ? "opacity_05"
              : ""
          }`}
          onClick={this.pumpBalloon}
        />
        </div>
      </div>
    );
  }
}

export default Balloons;
