/**
 * @file   Boxes.tsx
 * @brief  Boxes component which is the initial point of Box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";

import Board from "./Board";

import i18n from "./../../i18n";

interface AppState {
  loaded: boolean;
  reverse: boolean;
  time:number;
  noBack: boolean;
}

class Box extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    const settings = props.data.activity?.settings ?? (props.data.settings ?? {});
    const configuration = props.data.configuration;
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    const state = { reverse: settings ? (settings.reverse_tapping ? settings.reverse_tapping : false) : false,       time: new Date().getTime(),
      noBack: props.data.noBack, loaded: true };
    this.state = state;

  }


  // Game render function
  render() {
    return (
      <div>
        {this.state && this.state.loaded && (
          
              <Board reverse={this.state.reverse} noBack={this.state.noBack} language={i18n.language} time={this.state.time} />
          
        )}
      </div>
    );
  }
}

export default Box;
