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
  autoCorrect: boolean;
  loaded: boolean;
  settings: any;
  time:number;
  noBack: boolean;
}

class Box extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const state = {
      autoCorrect:false,
      loaded: true,
      noBack:false,
      settings: {},
      time: new Date().getTime(),
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
        this.setState({ autoCorrect: e.data.autoCorrect, settings, noBack: e.data.noBack, loaded: true });
      },
      false
    );
  }

  // To refresh the game
  clickHome = () => {
    window.location.reload();
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
             {!this.state.noBack && <nav className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} onClick={this.clickBack} />
            </nav>}
            <nav className="home-link">
              <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
            </nav>
            <div className="heading">{i18n.t("BOX_GAME")}</div>
            <div className="game-board">
              <Board 
                animationInterval={this.state.settings?.animation_interval ?? 1000}
                animationPersistance={this.state.settings?.animation_persistance ?? 2000}
                cols={this.state.settings?.cols ?? 3}
                encodingTrials={this.state.settings?.encoding_trials ?? 3}
                language={i18n.language}
                retensionInterval={this.state.settings?.retension_interval ?? 1000}
                rows={this.state.settings?.rows ?? 3}
                seqLength={this.state.settings?.sequence_length ?? 3}
                time={this.state.time} 
                autoCorrect={this.state.autoCorrect ?? false}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Box;
