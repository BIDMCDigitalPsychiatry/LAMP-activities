/**
 * @file   BallonImageSVG.tsx
 * @brief  BallonImageSVG component which is the used to show the Ballon and buttons
 * @date   Apr , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";
import i18n from "./../../i18n";

interface Props {
  balloon_width: any;
  balloon_burst: any;
  language: string;
  balloon_count_limit: boolean;
}

class BallonImageSVG extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
  }
  // Game render function
  render() {
    return (
      <div>
        <div className="cls_balloon_bursted box-alert">
          {this.props.balloon_count_limit ? (
            <span>{i18n.t("GAME_OVER")}</span>
          ) : this.props.balloon_burst ? (
            <span>{i18n.t("BALLOON_BURSTED")}</span>
          ) : (
            ""
          )}
        </div>
        <div className="b-container">
          <svg
            width={this.props.balloon_width}
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 327.78 400.03"
            id="svgBallonImgIcon"
          >
            <defs>
              <radialGradient
                id="radial-gradient"
                cx="-8178.99"
                cy="-7548.19"
                r="21.1"
                gradientTransform="matrix(1.06, 0, 0, -1.06, 8862.76, -7668.81)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#b1def4" />
                <stop offset="1" stopColor="#10a7ce" />{" "}
              </radialGradient>
              <radialGradient
                id="radial-gradient-2"
                cx="-8213.4"
                cy="-7300.26"
                r="165.23"
                xlinkHref="#radial-gradient"
              />
              <radialGradient
                id="radial-gradient-3"
                cx="-8265.73"
                cy="9305.61"
                r="53.61"
                gradientTransform="translate(8862.76 -9841.55) scale(1.06)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />{" "}
              </radialGradient>
            </defs>
            <title>balloon</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g
                  id="balloons"
                  className={` ${
                    this.props.balloon_burst ? "opacity_05" : ""
                  } `}
                >
                  <path
                    className="cls-1"
                    d="M164.52,353.05h0a4.85,4.85,0,0,1,4.21,2.42l21.55,37.29h0a4.84,4.84,0,0,1-4.19,7.27h-44.4a4.84,4.84,0,0,1-4.14-7.38l22.84-37.28A4.77,4.77,0,0,1,164.52,353.05Z"
                  />
                  <path
                    className="cls-2"
                    d="M163.88,0h0c90.52,0,163.9,83.77,163.9,187.11h0c0,103.35-73.39,187.12-163.9,187.12h0C73.37,374.22,0,290.45,0,187.11S73.37,0,163.88,0Z"
                  />
                  <path
                    className="cls-3"
                    d="M81.71,32.31c25.65-15.25,49.41,8.55,27.36,17.37-34.2,13.68-74.6,111.54-74.6,111.54C25.15,65,81.71,32.31,81.71,32.31Z"
                  />{" "}
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default BallonImageSVG;
