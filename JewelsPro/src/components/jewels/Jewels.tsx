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
import { InfoModal } from "./InfoModal";

import i18n from "./../../i18n";
import "./jewels.css";

import * as React from "react";
// import { isUndefined } from "util";
import Board from "./Board";
/* eslint-disable no-restricted-globals */
const colors = [
  "pink",
  "green",
  "violet",
  "brown",
  "red",
  "orange",
  "dark-blue",
];

interface AppState {
  bonusPoints:number;
  current: any;
  diamondCount: number;
  diamondColor: string;
  diamondNumbers: Array<number>;
  diamondSpots: Array<number>;
  // events: any;
  gameTime: number;
  level:number,
  loaded: boolean;
  noBack:boolean;
  orderNumbers: Array<number>;
  pauseTime: number;
  routes:any,
  settings: any;
  shapeCount: number;
  shapes: Array<string>;
  showModal: number;
  time: number;
  totalAttempts: number;
  totalJewelsCollected:number;
  winnerLine?: Array<number>;
  variant: any;
}

class Jewels extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    const settingsData = props.data.activity?.settings ?? (props.data.settings ?? {});
    const configuration = props.data.configuration;
      const mode = settingsData ? settingsData.mode : 1
      let gameTimeVal = settingsData ? (settingsData.beginner_seconds ? settingsData.beginner_seconds : 90) : 90;
      switch (mode) {
        case 1:
          gameTimeVal = settingsData ? (settingsData.beginner_seconds ? settingsData.beginner_seconds : 90) : 90;
          break;
        case 2:
          gameTimeVal = settingsData.intermediate_seconds;
          break;
        case 3:
          gameTimeVal = settingsData.advanced_seconds;
          break;
        case 4:
          gameTimeVal = settingsData.expert_seconds;
          break;
        default:
          gameTimeVal = settingsData.beginner_seconds;
          break;
      }
      const langugae = configuration ? (configuration.hasOwnProperty("language") ? configuration.language : "en-US") : "en-US"
      i18n.changeLanguage(langugae);
      const diamondCountVal = settingsData ? (settingsData.diamond_count ? settingsData.diamond_count : 15 ) : 15
      const shapeCountVal =  settingsData ? (settingsData.shape_count ? settingsData.shape_count : 
        settingsData.variant && settingsData.variant === "trails_b" ? 2 : 1 ) : 1;
      const state = {
        bonusPoints:0,
        current: [],
        diamondColor: "",
        diamondCount: diamondCountVal,
        diamondNumbers: [],
        diamondSpots: [],
        gameTime: gameTimeVal,
        level: 1,
        loaded: false,
        noBack: props.data.noBack,
        orderNumbers: [],
        pauseTime: 0,
        routes: [],
        settings: settingsData,
        shapeCount: shapeCountVal,
        shapes: [],
        showModal: 0,
        time: new Date().getTime(),
        totalAttempts: 0,
        totalJewelsCollected:0,
        winnerLine: undefined,
        variant:  settingsData.variant === "trails_b" ? "b" : "a"
      };
      this.state=state
      this.reset(true)          
    }
    

  // messageEvent = () => {
  //   const eventMethod ="addEventListener"
  //   const eventer = window[eventMethod]
  //   const messageEvent =  "onmessage"
  //   // Listen to message from child window
  //   eventer(
  //     messageEvent,
  //     (e: any) => {
  //       if(!!e.data) {
  //       const settingsData = e.data.activity?.settings ?? (e.data.settings ?? {});
  //       const configuration = e.data.configuration;
  //         const mode = settingsData ? settingsData.mode : 1
  //         let gameTimeVal = settingsData ? (settingsData.beginner_seconds ? settingsData.beginner_seconds : 90) : 90;
  //         switch (mode) {
  //           case 1:
  //             gameTimeVal = settingsData ? (settingsData.beginner_seconds ? settingsData.beginner_seconds : 90) : 90;
  //             break;
  //           case 2:
  //             gameTimeVal = settingsData.intermediate_seconds;
  //             break;
  //           case 3:
  //             gameTimeVal = settingsData.advanced_seconds;
  //             break;
  //           case 4:
  //             gameTimeVal = settingsData.expert_seconds;
  //             break;
  //           default:
  //             gameTimeVal = settingsData.beginner_seconds;
  //             break;
  //         }
  //         const langugae = configuration ? (configuration.hasOwnProperty("language") ? configuration.language : "en-US") : "en-US"
  //         i18n.changeLanguage(langugae);
  //         const diamondCountVal = settingsData ? (settingsData.diamond_count ? settingsData.diamond_count : 15 ) : 15
  //         const shapeCountVal =  settingsData ? (settingsData.shape_count ? settingsData.shape_count : 
  //           settingsData.variant && settingsData.variant === "trails_b" ? 2 : 1 ) : 1;
  //         const state = {
  //           bonusPoints:0,
  //           current: [],
  //           diamondColor: "",
  //           diamondCount: diamondCountVal,
  //           diamondNumbers: [],
  //           diamondSpots: [],
  //           gameTime: gameTimeVal,
  //           level: 1,
  //           loaded: false,
  //           noBack: e.data.noBack,
  //           orderNumbers: [],
  //           pauseTime: 0,
  //           routes: [],
  //           settings: settingsData,
  //           shapeCount: shapeCountVal,
  //           shapes: [],
  //           showModal: 0,
  //           time: new Date().getTime(),
  //           totalAttempts: 0,
  //           totalJewelsCollected:0,
  //           winnerLine: undefined,
  //         };
  //         this.state=state
  //         this.reset(true)          
  //       }
  //     },
  //     false
  //   );
  // }
  
  componentDidMount = () => {
    this.reset(true)
  }

  getLevelColor = (level: number) => {

    switch(level) {
      case 1:
        return "#BDD2FA"
      case 2:
        return "#5E92F2"
      case 3:
        return "#1257D9"
      default:
        return "#1A4493"
    }
  }

  updateRoutes = ( routesValus: any) => {
    const routeData:any = []
    if (this.state.routes.length > 0) {
      const r = JSON.parse(this.state.routes);
      Object.keys(r).forEach((key) => {
        routeData.push(r[key]);
      });
    }
    const r1 = JSON.parse(routesValus)
    Object.keys(r1).forEach((key) => {
      routeData.push(r1[key]);
    }); 
    this.setState({routes: JSON.stringify(routeData)})
  }

  updateLevel = (bonus: number, routesValus: any, totalJewelsCollected: number, totalAttempts:number, pointVal: number) => {
    const level =  Math.floor((this.state.bonusPoints + bonus) / this.state.settings.bonus_point_count);
    this.updateRoutes(routesValus)  
    if(level > 1) {
     let levelCount = Math.floor((level - 1) / this.state.settings.x_changes_in_level_count) ;
        const diamondCount =  this.state.diamondCount + (this.state.settings.x_diamond_count * levelCount) > 25 ? 25 : this.state.diamondCount + (this.state.settings.x_diamond_count * levelCount);            
        let shapeCount = this.state.shapeCount
        if(this.state.settings.variant === "trails_b") {
          levelCount = Math.floor((level -1) / this.state.settings.y_changes_in_level_count);
          shapeCount = this.state.shapeCount + (this.state.settings.y_shape_count * levelCount) > 4 ? 4 : this.state.shapeCount + (this.state.settings.y_shape_count * levelCount);           
        }
        this.setState(
          {
            bonusPoints: this.state.bonusPoints + bonus,
            diamondCount,
            level: this.state.level === level ? this.state.level : this.state.level + 1,
            loaded: false,
            shapeCount,
            totalAttempts: this.state.totalAttempts + totalAttempts,
            totalJewelsCollected: this.state.totalJewelsCollected + totalJewelsCollected
          },
          () => {
            document.body.style.backgroundColor = this.getLevelColor(this.state.level)

            pointVal === 1 ? this.handleClose(true, 1) : this.reset(true);
          }
        );
        } else {
          this.setState(
            {
              bonusPoints: this.state.bonusPoints + bonus,
              level : this.state.level === level ? this.state.level : this.state.level + 1,
              loaded: false, 
              totalAttempts: this.state.totalAttempts + totalAttempts,
              totalJewelsCollected: this.state.totalJewelsCollected + totalJewelsCollected          
            },
            () => {
              pointVal === 1 ? this.handleClose(true, 1) : this.reset(true);
            }
          );
       }
  }
  
  // Reset game board
  reset = (loadedVal: boolean) => {
    console.log(this.state)
    const noOfDimonds = this.state ? this.state.shapeCount : 2;
    const diamondType = this.getDiamond(noOfDimonds);
    const maxPlots = 52
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
      bonusPoints: this.state? this.state.bonusPoints : 0,
      current: diamondType,
      diamondColor: this.getRandomColor(),
      diamondCount: diamondCountVal,
      diamondNumbers: numbers,
      diamondSpots: randomArray,
      gameTime: this.state ? this.state.gameTime : 90,
      level:  this.state ? this.state.level : 1, 
      loaded: loadedVal,
      noBack: this.state.noBack,
      orderNumbers: order,
      pauseTime: 0,
      routes: this.state? this.state.routes : {},
      settings:  this.state ? this.state.settings : {},
      shapeCount: noOfDimonds,
      shapes: shapesVals, 
      showModal: 0,
      time: this.state.time,
      totalAttempts: this.state? this.state.totalAttempts : 0,
      totalJewelsCollected:this.state? this.state.totalJewelsCollected : 0,
      winnerLine: undefined,
    };

    // if (isUndefined(this.state)) {
    //   this.state = state;
    //   document.body.style.backgroundColor = this.getLevelColor(this.state.level)
    // } else {
      this.setState(state, () => {
        document.body.style.backgroundColor = this.getLevelColor(this.state.level)
      });
    // }
  };
  // Shuffle the diamond numbers
  shuffle = (numbers: Array<number>) => {
    numbers.sort(() => Math.random() - 0.5);
    return numbers;
  };

  // Get random diamond shape
  getDiamond = (noOfDimonds: number) => {
    const diamonds = [];
    const types = [
      "diamond-01",
      "diamond-02",
      "diamond-03",
      "diamond-04",
      "diamond-05",
      "diamond-06",
      "diamond-07",
      "diamond-08",
    ];;
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
    window.location.reload();
  };

  clickBack = () => {
    
      this.sendDataToDashboard(2, true)
  
  }

  sendDataToDashboard = (pointVal : number, status?: boolean) => {
    const route = {'type': 'manual_exit', 'value': status ?? false}  
    const routeData:any = []
    if (this.state.routes.length > 0) {
      const r = JSON.parse(this.state.routes);
      Object.keys(r).forEach((key) => {
        routeData.push(r[key]);
      });
    }
    routeData.push(route);
    this.setState({routes: JSON.stringify(routeData)}, () => {
    const scoreVal = ((this.state.totalJewelsCollected / (this.state.totalAttempts)) * 100).toFixed(2);
      parent.postMessage(
        JSON.stringify({
          static_data: {
            point: pointVal,
            score: scoreVal,
            total_attempts: this.state.totalAttempts,
            total_bonus_collected: this.state.bonusPoints,
            total_jewels_collected: this.state.totalJewelsCollected,
          },
          temporal_slices: JSON.parse(this.state.routes),
          timestamp: new Date().getTime(),
          duration: new Date().getTime() - this.state.time
        }),
        "*"
      );
    })
  }
  handleClose = (status:boolean, pointVal: number) => {
    if(status) {
      this.sendDataToDashboard(pointVal)
      
    } else {
      this.state.showModal === 1 ?  window.location.reload() : parent.postMessage(null, "*")
    }
    this.setState({showModal: 0})
  }

  render() {
    const modal = this.state && this.state.showModal > 0 ? (
      <InfoModal
        show={this.state.showModal > 0}
        modalClose={this.handleClose}
        msg={i18n.t("DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING")}
        language={i18n.language}
      />) : null

    return (
      <div>
        {this.state && this.state.loaded && (
          <div>
            {modal}
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
                level={this.state.level}
                language={i18n.language}
                updateRoutes={this.updateRoutes}
                updateLevel={this.updateLevel}
                handleClose={this.handleClose}
                sendDataToDashboard={this.sendDataToDashboard}
                settings={this.state.settings}
                variant={this.state.variant}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Jewels;
