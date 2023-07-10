/**
 * @file   CatsNDogs.tsx
 * @brief  CatsNDogs component which is the initial point of Cats and Dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import Board from "./Board";


import i18n from "./../../i18n";

import { isUndefined } from "util";

interface AppState {
  loaded: boolean;
  time: number;
  noBack: false;
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
        console.log(e.data)
        this.setState({ loaded: false, noBack: e.data.noBack, time: new Date().getTime() }, () => {
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
      noBack: this.state.noBack,
      time: this.state.time
    };

    if (isUndefined(this.state)) {
      this.state = state;
    } else {
      this.setState(state);
    }
  };


  // Game render function
  render() {
    return (
      <div>
        {this.state && this.state.loaded && (
          <Board noBack={this.state.noBack} language={i18n.language} time={this.state.time} />
        )}
      </div>
    );
  }
}

export default CatsNDogs;
