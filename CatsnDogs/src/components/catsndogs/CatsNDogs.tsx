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


interface AppState {
  loaded: boolean;
  time: number;
  noBack: false;
}

class CatsNDogs extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
        const configuration = props.data.configuration;
        i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
          this.state = { loaded: true, noBack: props.data.noBack, time: new Date().getTime() };
       
  }

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
