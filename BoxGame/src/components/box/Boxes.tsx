/**
 * @file   Boxes.tsx
 * @brief  Boxes component which is the initial point of Box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as React from "react";

import Board from "./Board";

import i18n from "./../../i18n";

interface AppState {
  loaded: boolean;
  reverse: boolean;
  time:number;
}

class Box extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const state = {
      loaded: false,
      reverse: false,
      time: new Date().getTime()
    };
    this.state = state;
    const eventMethod = !!window.addEventListener ? "addEventListener" : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(
      messageEvent,
      (e: any) => {
        const settings = e.data.activity?.settings ?? (e.data.settings ?? {});
        const configuration = e.data.configuration;
        i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
        this.setState({ reverse: settings ? (settings.reverse_tapping ? settings.reverse_tapping : false) : false, loaded: true });
      },
      false
    );
  }

  // To refresh the game
  clickHome = () => {
    window.location.reload(false);
  };

  clickBack = () => {
    parent.postMessage(null, "*");
  }
  // Game render function
  render() {
    return (
      <div>
        {this.state && this.state.loaded && (
          <div>
             <nav className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} onClick={this.clickBack} />
            </nav>
            <nav className="home-link">
              <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
            </nav>
            <div className="heading">{i18n.t("BOX_GAME")}</div>
            <div className="game-board">
              <Board reverse={this.state.reverse} language={i18n.language} time={this.state.time} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Box;
