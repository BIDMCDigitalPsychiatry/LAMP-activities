/**
 * @file   Board.tsx
 * @brief  Board component to load jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import { Timer } from "../common/Timer";
import { Diamond } from "./Diamond";
import { InfoModal } from "./InfoModal";
import { InstructionModal } from "./InstructionModal";

import i18n from "./../../i18n";
import { NegativePoints } from "./NegativePoints";

export interface BoardProps {
  totalDiamonds: number;
  diamondSpots: Array<number>;
  currentDiamond: any;
  diamondColor: string;
  diamondNumbers: Array<number>;
  handleClose:any;
  sendDataToDashboard:any;
  gameTime: number;
  orderNumbers: Array<number>;
  shapes: Array<string>;
  level: number;
  language: string;
  updateLevel: any;
  updateRoutes: any;
  settings: any;
  variant: any;
}

interface DiamondState {
  activeDiamond: string;
  clickedItems: any;
  bottomHelp: boolean;
  displayNegativePoints: boolean;
  endTime: any;
  gameOver: boolean;
  lastClickElement: any;
  lastClickTime: any;
  negativePoints: number;
  route: any;
  startTimer: number;
  stepNumber: number;
  tapCount: number;
  timeout: boolean;  
  showConfirmModal: boolean;
  totalLevels: number; 
  showInstruction: boolean;
}

class Board extends React.Component<BoardProps, DiamondState> {
  constructor(props: BoardProps) {
    super(props);
    // Initailise state values
    this.state = {
      activeDiamond: this.props.currentDiamond[0],
      bottomHelp: true,
      clickedItems: [],
      displayNegativePoints: false,
      endTime: null,
      gameOver: false,
      lastClickElement: null,
      lastClickTime: 0,
      negativePoints: 0,
      route: [],
      startTimer: 0,
      stepNumber: 0,
      tapCount: 0,
      timeout: false,
      showConfirmModal: false,
      totalLevels: this.getTotalLevels(),
      showInstruction: true
    };
    i18n.changeLanguage(props.language);
  }
  // Each dimaond click is handled here
  handleClick = (e: any, i: number, diamondStyle: string) => {
    this.setState({
      tapCount: this.state.startTimer > 0 ? this.state.tapCount + 1 : 0,
    });
    const lastItem = this.state.lastClickElement;
    const key =
      this.state.lastClickElement === null
        ? 0
        : this.props.currentDiamond.indexOf(lastItem.diamond);
    const nextKey = key === this.props.currentDiamond.length - 1 ? 0 : key + 1;
    if (
      (this.state.lastClickElement === null &&
        i === 1 &&
        diamondStyle === this.props.shapes[0]) ||
      (this.state.lastClickElement !== null &&
        diamondStyle === this.props.currentDiamond[nextKey] &&
        i === this.props.orderNumbers[this.state.stepNumber] + 1)
    ) {
      if (
        this.state.lastClickElement === null &&
        i === 1 &&
        diamondStyle === this.props.currentDiamond[0]
      ) {
        const timerVal = this.props.gameTime ?? 90;
        // state updation for diamond 1 click
        this.setState(
          {
            // startTime: new Date(),
            startTimer: timerVal,
            showInstruction: false
          },
          () => {
            this.updateStateWithTaps(i, true, diamondStyle);
          }
        );
      } else {
        // Update the state values for each tas other than diamond 1
        if (
          this.state.stepNumber === this.props.currentDiamond.length - 1 &&
          i === 1
        ) {
          this.setState(
            {
              bottomHelp: false,
            },
            () => {
              this.updateStateWithTaps(i, true, diamondStyle);
            }
          );
        } else {
          this.updateStateWithTaps(i, true, diamondStyle);
        }
      }
      const item =
        e.target.className === "number-text"
          ? e.target.closest("div")
          : e.target;
      item.className = item.className + " diamond-disable";
    } else {
      this.updateStateWithTaps(i, false, diamondStyle);
      const lastClickedItems =
        this.state.clickedItems.length > 0
          ? JSON.parse(this.state.clickedItems)
          : [];
      if (
        this.state.startTimer > 0 &&
        lastClickedItems.filter(
          (item: any) => item.item === i && item.style === diamondStyle
        ).length === 0
      ) {
        // When wrong diamond is tapped, update the negative point
        const negPoints = 2
        this.setState({
          displayNegativePoints: true,
          negativePoints: this.state.negativePoints - negPoints,
        });
        // Show the negative point for 3 seconds
        setTimeout(() => {
          this.setState({
            displayNegativePoints: false,
          });
        }, 3000);
      }
    }
  };
  // To track the timer expiring
  passTimerUpdate = (timerVal: number) => {
    if (timerVal === 0) {
      this.setState(
        {
          endTime: new Date(),
        },
        () => {
          this.sendGameResult(1);
        }
      );
    }
    this.setState({
      startTimer: timerVal,
    });
  };

  // Update the state values for each taps other than jewel 1
  updateStateWithTaps = (i: number, statusVal: boolean, diamondStyle: string) => {
    const routes = [];
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = dif;
    const clickedItems: Array<any> =
      this.state.clickedItems.length > 0
        ? JSON.parse(this.state.clickedItems)
        : [];
    if (this.state.route.length > 0) {
      const r = JSON.parse(this.state.route);
      Object.keys(r).forEach((key) => {
        routes.push(r[key]);
      });
    }
    if (statusVal === true) {
      clickedItems.push({ item: i, style: diamondStyle });
    }
    const lastClickedItems =
      this.state.clickedItems.length > 0
        ? JSON.parse(this.state.clickedItems)
        : [];
    if (
      this.state.startTimer > 0 &&
      lastClickedItems.filter(
        (item: any) => item.item === i && item.style === diamondStyle
      ).length === 0
    ) {
      const route = {
        duration:
        statusVal && i === 1 && this.state.stepNumber === 0 ? 0 : lastclickTime,
        item: i,
        level: this.props.level,
        type: statusVal,
        value: null          
      };
      routes.push(route);
    }
    this.setState(
      {
        activeDiamond:
        statusVal === true ? diamondStyle : this.state.activeDiamond,
        clickedItems: JSON.stringify(clickedItems),
        endTime: new Date(),
        gameOver:
        statusVal === true && this.props.totalDiamonds === i ? true : false,
        lastClickElement:
        statusVal === true
            ? { item: i, diamond: diamondStyle }
            : this.state.lastClickElement,
        lastClickTime: new Date().getTime(),
        route: JSON.stringify(routes),
        stepNumber:
        statusVal === true ? this.state.stepNumber + 1 : this.state.stepNumber,
      },
      () => {
        this.props.updateRoutes(this.state.route)
        if (
          statusVal === true &&
          this.props.diamondNumbers.length === this.state.stepNumber
        ) {          
          // this.sendGameResult(2);
          this.setState({showConfirmModal: true})

        }
      }
    );
  };

  handleCloseInstructionModal = () => {
    this.setState({ showInstruction: false });
  };

  createTable = () => {
    const table = [];
    let k = 0;
    let p = 0;
    const rows = 9
    const cols = 6
    const height = (window.innerHeight - (window.innerHeight * 15) / 100) / 12.5
    // let diamondStyle = this.props.currentDiamond[0]
    // Outer loop to create parent
    for (let i = 0; i < rows; i++) {
      const children = [];
      // Inner loop to create children
      for (let j = 0; j < cols; j++) {
        if (this.props.diamondSpots.indexOf(p) > -1) {
          //  diamondStyle = k >= Math.ceil(this.props.diamondNumbers.length / 2) ?  this.props.currentDiamond[1] :this.props.currentDiamond[0]
          children.push(
            <td key={p}>
              <Diamond
                diamondColor={this.props.diamondColor}
                diamondType={this.props.shapes[k]}
                index={this.props.diamondNumbers[k] + 1}
                onClick={this.handleClick}
              />
            </td>
          );
          k++;
        } else {
          children.push(<td key={p} />);
        }
        p++;
      }
      // Create the parent and add the children
      table.push(<tr style={{height:`${height}px`}} key={i}>{children}</tr>);
    }
    return table;
  };

  // Call the API to pass game result
  sendGameResult = (pointVal: number) => {
    const totalBonusCollected =
    this.state.stepNumber === this.props.totalDiamonds ? this.state.startTimer - Math.abs(this.state.negativePoints) : 0;
    const totalJewelsCollected = this.state.stepNumber;
    const totalAttempts = this.state.tapCount + 1;
    this.props.updateLevel(totalBonusCollected, this.state.route, totalJewelsCollected, totalAttempts, pointVal)
  };

  handleConfirmClose = (status:boolean, pointVal: number) => {    
    if(status=== true) {
      this.sendGameResult(2)
    } else {
      this.sendGameResult(1)     
    }
    this.setState({showConfirmModal: false})
  }

  getTotalLevels = () => {
    const maxBonusPoints = 1000; 
    const bonusPointsPerLevel = this.props.settings?.bonus_point_count ?? 40; // Default value 
    if (!bonusPointsPerLevel || bonusPointsPerLevel <= 0) {
      console.error("Invalid or missing bonus_point_count in settings");
      return 0; 
    }
    const totalLevels = Math.ceil(maxBonusPoints / bonusPointsPerLevel);
    return totalLevels;
  };
  // Render the game board
  render() {
    let board;
    let negSection = null;
    let jewelInfo = null;
    let timer;
    // const { showInstruction } = this.state;
    if (this.state.gameOver === false && this.state.timeout === false) {
      // loading game
      board = (
        <table className="game-table">
          <tbody>{this.createTable()}</tbody>
        </table>
      )
      // When wrong diamond is tapped
      timer =
        this.state.startTimer > 0 ? (
          <Timer
            passTimerUpdate={this.passTimerUpdate}
            startTimeInSeconds={this.state.startTimer}
            startTimer={1}
          />
        ) : null
      negSection =
        this.state.negativePoints < 0 && this.state.displayNegativePoints ? (
          <NegativePoints startPoints={this.state.negativePoints} />
        ) : null
      // negSection =  <NegativePoints startPoints={this.state.negativePoints} />
      // Jewel info in the bottom for the inital state
      const classVal =
        this.props.currentDiamond[this.state.stepNumber] +
        " " +
        this.props.currentDiamond[this.state.stepNumber] +
        "-" +
        this.props.diamondColor;
      jewelInfo = this.state.bottomHelp ? (
        <div className="jewel-info">
          <span className="info-text">{i18n.t("JEWELS")}</span>
          <div className={classVal}>
            <span className="number-text"> 1</span>
          </div>
        </div>
      ) : null
    } else {
      // When timer expires or successfully completed
      board =
        this.state.timeout === false ? (
          <div className="game-over">{i18n.t("CONGRATS")} !!!</div>
        ) : (
          <div className="game-over">{i18n.t("TIMEOUT")} !!!</div>
        )
    }
    const confirmModal = this.state && this.state.showConfirmModal === true ? (
      <InfoModal
        show={this.state.showConfirmModal===true}
        modalClose={this.handleConfirmClose}
        msg={i18n.t("CONTINUE")}
        language={i18n.language}
      />) : null

      const instructionModal = this.state.showInstruction ? (
        <InstructionModal
          show={true}
          longTxt={this.props.variant==='a' ? false: true }
          modalClose={this.handleCloseInstructionModal}
          msg = {this.props.variant==='a' ? i18n.t('TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1'): 
          i18n.t('LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED')}
          language={i18n.language}
        />
      ) : null;

    return (
      <div>
        <div className="countdown-timer">
          <div>{timer}</div>
          <div className="level">{i18n.t("LEVEL")}{this.props.level}/{this.state.totalLevels.toString()}</div>
        </div>
        {instructionModal}
        {/* {showInstruction && this.props.variant==='a' && (
        //   <div className="instruction1">{i18n.t("TAP_THE_JEWELS_IN_NUMERIC_ORDER_STARTING_WITH_NUMBER_1")}</div>
        // )}
        // {showInstruction && this.props.variant==='b' &&  (
          <div className="instruction2">
            <p>
            {i18n.t("LOOK_AT_THE_BOTTOM_OF_THE_SCREEN_TO_SEE_WHICH_JEWEL_TO_COLLECT_FIRST_TAP_NUMBER_1_OF_THAT_SHAPE_AND_THEN_NUMBER_1_OF_THE_SECOND_SHAPE_CONTINUE_ALTERNATING_THE_JEWEL_PATTERN_IN_CHRONOLOGICAL_ORDER_UNTIL_ALL_OF_THE_JEWELS_HAVE_BEEN_COLLECTED")}</p></div>
        )} */}
        {negSection}
          {confirmModal}
        {board}
        {jewelInfo}
        
      </div>
    );
  }
}

export default Board;