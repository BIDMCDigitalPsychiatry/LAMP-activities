/**
 * @file   BallonStandSVG.tsx
 * @brief  BallonStandSVG component which is the used to show the Ballon stand SVG
 * @date   Apr , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";
import i18n from "./../../i18n";

interface Props {
  balloon_number?: any;
  new_current_point?: any;
  trigger_balloon_number?: any;
  trigger_total_points?: any;
  trigger_current_points?: any;
  trigger_enable_pump_btn?: any;
  trigger_reset_balloon_size?: any;
  trigger_collected_points?: any;
  collected_points?: any;
  trigger_enable_collect_btn?: any;
  btn_collect_disabled?: any;
  trigger_collect_button_class?: any;
  balloon_burst: any;
  cls_balloon_burst?: any;
  stop_timer?: any;
  trigger_stop_timer?: any;
  balloon_count?: any;
  route?: any;
  reset_data: any;
  reset_status: any;
  language: string;
}

interface AppState {
  collected_points: any;
  new_current_point: any;
  balloon_number: any;
  break_points_array: any;
  balloon_burst: any;
  disabled_collect_btn: boolean;
}

class BallonStandSVG extends React.Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    this.state = {
      balloon_burst: true,
      balloon_number: 0,
      break_points_array: [],
      collected_points: [],
      disabled_collect_btn: false,
      new_current_point: 0,
    };
  }

  componentDidUpdate = () => {
    if (this.props.reset_data === true) {
      this.setState({
        disabled_collect_btn: false,
      });
      this.props.reset_status(false);
    }
  };

  // Collect Points on clicking collect points button
  collectPoints = () => {
    if (this.props.balloon_number < this.props.balloon_count) {
      if (this.props.balloon_burst === false) {
        this.storeCurrentPoints();
      }
    } else {
      this.storeCurrentPoints();
      this.props.trigger_stop_timer();
    }
  };

  // Update the Current points and store
  storeCurrentPoints = () => {
    const collectedPointsArray = [];
    collectedPointsArray.push({
      [this.props.balloon_number]: this.props.new_current_point,
    });
    this.setState({ collected_points: this.props.collected_points });
    const newBalloonNumber = this.props.balloon_number + 1;
    this.setState({
      balloon_number:
        this.props.balloon_count === this.props.balloon_number
          ? this.props.balloon_number
          : newBalloonNumber,
      disabled_collect_btn: true,
      new_current_point: 0,
    });
    this.props.trigger_balloon_number();
    this.props.trigger_current_points();
    this.props.trigger_total_points();
    this.props.trigger_enable_pump_btn();
    this.props.trigger_reset_balloon_size();
    this.props.trigger_collected_points();
  };

  // Game render function
  render() {
    return (
      <div className="stand">
        <svg width="100" viewBox="0 0 175 223.65">
          <defs>
            <linearGradient
              id="linear-gradient"
              y1="165.92"
              x2="175"
              y2="165.92"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#efefef" />
              <stop offset="0.5" stopColor="#fff" />
              <stop offset="1" stopColor="#efefef" />
            </linearGradient>
          </defs>
          <title>stand_1</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <g id="balloons">
                <path
                  className="clss-1"
                  d="M175,208.65h-.06a2.14,2.14,0,0,1,.06.5c0,8-39.18,14.5-87.5,14.5S0,217.16,0,209.15a2.14,2.14,0,0,1,.06-.5H0V108.18c.1,8,39.24,14.47,87.5,14.47s87.4-6.47,87.5-14.47Z"
                />
                <path
                  className="clss-2"
                  d="M175,108.15v0c-.1,8-39.24,14.47-87.5,14.47S.1,116.18,0,108.18v0c0-8,39.18-14.5,87.5-14.5S175,100.14,175,108.15Z"
                />
                <line className="clss-3" x1="87.5" y1="104.07" x2="87.5" />
              </g>
            </g>
          </g>
        </svg>
        <input
          type="button"
          name="collect"
          id="collect"
          value={i18n.t("COLLECT_POINTS") as string}
          onClick={this.collectPoints}
          className={`btn btn-sm collect ${
            this.props.trigger_collect_button_class
          } 
              ${
                this.props.balloon_burst ||
                this.state.disabled_collect_btn ||
                this.props.new_current_point === 0
                  ? "opacity_05"
                  : ""
              } `}
          disabled={
            this.props.trigger_enable_collect_btn ||
            this.state.disabled_collect_btn ||
            this.props.new_current_point === 0
          }
        />
        <input
          type="text"
          name="radius_count"
          id="radius_count"
          value={this.props.balloon_number}
          className="form-control count"
          disabled={true}
        />
      </div>
    );
  }
}

export default BallonStandSVG;
