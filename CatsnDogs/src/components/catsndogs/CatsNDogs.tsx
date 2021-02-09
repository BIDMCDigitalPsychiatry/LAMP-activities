/**
 * @file   CatsNDogs.tsx
 * @brief  CatsNDogs component which is the initial point of Cats and Dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import Board from "./Board";

import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "./../../i18n";

import { isUndefined } from "util";

interface AppState {
  loaded: boolean;
}

class CatsNDogs extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";
    eventer(
      messageEvent,
      (e: any) => {
        const configuration = e.data.configuration;
        i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
        this.setState({ loaded: false }, () => {
          this.reset(true);
        });
      },
      false
    );
  }
    
  // Reset game board
  reset = (loadedVal: boolean) => {
    const state = {
      loaded: loadedVal,
    };

    if (isUndefined(this.state)) {
      this.state = state;
    } else {
      this.setState(state);
    }
  };

  // To refresh the game
  clickHome = () => {
    window.location.reload(false);
  };

  // Game render function
  render() {
    return (
      <div>
        {this.state && this.state.loaded && (
          <div>
            <nav className="home-link">
              <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
            </nav>
            <div className="heading">{i18n.t("CATS_AND_DOGS")}</div>
            <div className="game-board">
              <Board language={i18n.language} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CatsNDogs;
