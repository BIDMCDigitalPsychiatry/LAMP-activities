/**
 * @file   Jewels.tsx
 * @brief  Jewels component which is the initial point of jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRandomNumbers } from "../../functions";
import i18n from "./../../i18n";
import "./jewels.css";

import * as React from "react";
import { isUndefined } from "util";
import Board from "./Board";

const diamondTypes = [
  "diamond-01",
  "diamond-02",
  "diamond-03",
  "diamond-04",
  "diamond-05",
  "diamond-06",
  "diamond-07",
  "diamond-08",
];
const colors = [
  "pink",
  "green",
  "blue",
  "violet",
  "brown",
  "red",
  "orange",
  "dark-blue",
];

interface AppState {
  current: any;
  diamondCount: number;
  diamondColor: string;
  diamondNumbers: Array<number>;
  diamondSpots: Array<number>;
  // events: any;
  gameTime: number;
  level:number,
  loaded: boolean;
  orderNumbers: Array<number>;
  pauseTime: number;
  shapeCount: number;
  shapes: Array<string>;
  winnerLine?: Array<number>;
}

class Jewels extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    const eventer = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    const state = {
      current: [],
      diamondColor: "",
      diamondCount: 0,
      diamondNumbers: [],
      diamondSpots: [],
      // events: null,
      gameTime: this.state ? this.state.gameTime : 90,
      level: 1,
      loaded: false,
      orderNumbers: [],
      pauseTime: 0,
      shapeCount: 2,
      shapes: [],
      winnerLine: undefined,
    };
    this.state = state;
    eventer(
      messageEvent,
      (e: any) => {
        const settings = e.data.activity?.settings ?? (e.data.settings ?? {});
        const configuration = e.data.configuration;
        const mode = settings ? settings.mode : 1
        let gameTimeVal = settings ? (settings.beginner_seconds ? settings.beginner_seconds : 90) : 90;
        switch (mode) {
          case 1:
            gameTimeVal = settings ? (settings.beginner_seconds ? settings.beginner_seconds : 90) : 90;
            break;
          case 2:
            gameTimeVal = settings.intermediate_seconds;
            break;
          case 3:
            gameTimeVal = settings.advanced_seconds;
            break;
          case 4:
            gameTimeVal = settings.expert_seconds;
            break;
          default:
            gameTimeVal = settings.beginner_seconds;
            break;
        }
        const langugae = configuration ? (configuration.hasOwnProperty("language") ? configuration.language : "en-US") : "en-US"
        i18n.changeLanguage(langugae);
        const events = e.data.activity?.events ?? [];
        const total = events.reduce((sum:number, bonus:any) => {
            return sum + bonus.static_data.total_bonus_collected;
        }, 0);
        const level =  Math.floor(total / settings.bonus_point_count);
        let diamondCount = settings ? (settings.diamond_count ? settings.diamond_count : 15 ) : 15
        let shapeCount =  settings ? (settings.shape_count ? settings.shape_count : 
          settings.variant && settings.variant === "trails_b" ? 2 : 1 ) : 1;
        
        if(level > 1) {
          let levelCount = Math.floor((level - 1) / settings.x_changes_in_level_count) ;
          diamondCount =  diamondCount + (settings.x_diamond_count * levelCount) > 25 ? 25 : diamondCount + (settings.x_diamond_count * levelCount);            
          
          if(settings.variant === "trails_b") {
            levelCount = Math.floor((level -1) / settings.y_changes_in_level_count);
            shapeCount = shapeCount + (settings.y_shape_count * levelCount) > 4 ? 4 : shapeCount + (settings.y_shape_count * levelCount);           
          }
        }
        this.setState(
          {
            diamondCount,
            gameTime: gameTimeVal,
            level, 
            loaded: false,
            shapeCount,
          },
          () => {
            this.reset(true);
          }
        );
      },
      false
    );
    this.reset(true);
  }
  
  // Reset game board
  reset = (loadedVal: boolean) => {
    const noOfDimonds = this.state ? this.state.shapeCount : 2;
    const diamondType = this.getDiamond(noOfDimonds);
    const maxPlots = 79
    const diamondCountVal = this.state ? this.state.diamondCount : 15;
    const shapesVals: Array<string> = [];
    let numbers: Array<any> = [];
    const numArr: Array<any> = [];
    let loopNum;
    let order: Array<number> = [];
    for (let i = 0; i < noOfDimonds; i++) {
      numArr[i] = Array.from(Array(Math.ceil(diamondCountVal / noOfDimonds)).keys());
      numbers = numbers.concat(numArr[i]);
      order = order.concat(numArr[i]);
    }
    order = order.sort((a, b) => {
      return a - b;
    }).slice(0, diamondCountVal)
  
    numbers = numbers.sort((a, b) => {
      return a - b;
    })
    numbers = numbers.slice(0, diamondCountVal)
    numbers = this.shuffle(numbers);

    loopNum = numbers;
    let type = -1;
    for (const i of loopNum) {
      for (let k = 0; k < noOfDimonds; k++) {
        type = numArr[k].indexOf(i) > -1 ? k : -1;
        if (type > -1) {
          shapesVals.push(diamondType[k]);
          numArr[k].splice(numArr[k].indexOf(i), 1);
          break;
        }
      }
    }
   
    const randomArray = getRandomNumbers(diamondCountVal, 1, maxPlots);
    const state = {
      current: diamondType,
      diamondColor: this.getRandomColor(),
      diamondCount: diamondCountVal,
      diamondNumbers: numbers,
      diamondSpots: randomArray,
      gameTime: this.state ? this.state.gameTime : 90,
      level: this.state.level, 
      loaded: loadedVal,
      orderNumbers: order,
      pauseTime: 0,
      shapeCount: noOfDimonds,
      shapes: shapesVals,
      winnerLine: undefined,
    };

    if (isUndefined(this.state)) {
      this.state = state;
    } else {
      this.setState(state);
    }
  };
  // Shuffle the diamond numbers
  shuffle = (numbers: Array<number>) => {
    numbers.sort(() => Math.random() - 0.5);
    return numbers;
  };

  // Get random diamond shape
  getDiamond = (noOfDimonds: number) => {
    const diamonds = [];
    const types = diamondTypes;
    let rand;
    for (let i = 0; i < noOfDimonds; i++) {
      rand = Math.round(Math.random() * (types.length - 1));
      diamonds.push(types[rand]);
      types.splice(rand, 1);
    }

    return diamonds;
  };

  getRandomColor = () => {
    const rand = Math.round(1 + Math.random() * (colors.length - 1));
    return colors[rand - 1];
  };
  // To refresh the game
  clickHome = () => {
    window.location.reload(false);
  };
  clickBack = () => {
    parent.postMessage(null, "*");
  }

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
            <div className="heading">{i18n.t("JEWELS")}</div>
            <div className="game-board">
              <Board
                gameTime={this.state.gameTime}
                totalDiamonds={this.state.diamondCount}
                diamondSpots={this.state.diamondSpots}
                diamondColor={this.state.diamondColor}
                currentDiamond={this.state.current}
                diamondNumbers={this.state.diamondNumbers}
                shapes={this.state.shapes}
                orderNumbers={this.state.orderNumbers}
                language={i18n.language}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Jewels;
