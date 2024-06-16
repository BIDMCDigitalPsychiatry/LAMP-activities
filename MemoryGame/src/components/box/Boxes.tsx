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
  autoCorrect: boolean;
  loaded: boolean;
  settings: any;
  time:number;
  noBack: boolean;
}
class Box extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    const settings = props?.data.activity?.settings ?? (props?.data?.settings ?? {});
    const configuration = props?.data?.configuration;
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    this.state ={autoCorrect: props.data.autoCorrect, settings, noBack: props.data.noBack, loaded: true, time: new Date().getTime()};         
  }

  // Game render function
  render() {
    return (
      <div>
        {this.state && !!this.state.loaded &&  Object.keys(this.state.settings).length > 0 &&  
             (<Board 
              noBack={this.state.noBack}
                animationInterval={!!this.state.settings?.animation_interval ? this.state.settings?.animation_interval * 1000 : 2000}
                animationPersistance={!!this.state.settings?.animation_persistance ? this.state.settings?.animation_persistance * 1000 : 1000}
                foils={this.state.settings?.foils ?? 2}
                encodingTrials={this.state.settings?.encoding_trials ?? 3}
                language={i18n.language}
                seqLength={!!this.state.settings?.foils ? (this.state.settings?.foils === 1 ? 3 : 4) : 4}
                time={this.state.time} 
                autoCorrect={this.state.autoCorrect}
              />            
        )}
      </div>
    );
  }
}

export default Box;
