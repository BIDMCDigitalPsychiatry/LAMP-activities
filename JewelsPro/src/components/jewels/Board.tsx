/**
 * @file   Board.tsx
 * @brief  Board component — game logic for JewelsPro
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
  handleClose: any;
  sendDataToDashboard: any;
  gameTime: number;
  orderNumbers: Array<number>;
  shapes: Array<string>;
  level: number;
  language: string;
  updateLevel: any;
  updateRoutes: any;
  settings: any;
  variant: any;
  forward: boolean;
}

interface DiamondState {
  activeDiamond: string;
  clickedItems: any;
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
    this.state = {
      activeDiamond: this.props.currentDiamond[0],
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
      showInstruction: true,
    };
    i18n.changeLanguage(props.language);
  }

  // Each diamond click is handled here
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
        this.setState(
          {
            startTimer: timerVal,
            showInstruction: false,
          },
          () => {
            this.updateStateWithTaps(i, true, diamondStyle);
          }
        );
      } else {
        this.updateStateWithTaps(i, true, diamondStyle);
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
        const negPoints = 2;
        this.setState({
          displayNegativePoints: true,
          negativePoints: this.state.negativePoints - negPoints,
        });

        setTimeout(() => {
          this.setState({
            displayNegativePoints: false,
          });
        }, 3000);
      }
    }
  };

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

  updateStateWithTaps = (
    i: number,
    statusVal: boolean,
    diamondStyle: string
  ) => {
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
          statusVal && i === 1 && this.state.stepNumber === 0
            ? 0
            : lastclickTime,
        item: i,
        level: this.props.level,
        type: statusVal,
        value: null,
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
          statusVal === true
            ? this.state.stepNumber + 1
            : this.state.stepNumber,
      },
      () => {
        this.props.updateRoutes(this.state.route);
        if (
          statusVal === true &&
          this.props.diamondNumbers.length === this.state.stepNumber
        ) {
          this.setState({ showConfirmModal: true });
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
    const rows = 9;
    const cols = 6;
    for (let i = 0; i < rows; i++) {
      const children = [];
      for (let j = 0; j < cols; j++) {
        if (this.props.diamondSpots.indexOf(p) > -1) {
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
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };

  sendGameResult = (pointVal: number) => {
    const totalBonusCollected =
      this.state.stepNumber === this.props.totalDiamonds
        ? this.state.startTimer - Math.abs(this.state.negativePoints)
        : 0;
    const totalJewelsCollected = this.state.stepNumber;
    const totalAttempts = this.state.tapCount + 1;
    this.props.updateLevel(
      totalBonusCollected,
      this.state.route,
      totalJewelsCollected,
      totalAttempts,
      pointVal
    );
  };

  handleConfirmClose = (status: boolean, pointVal: number) => {
    if (status === true) {
      this.sendGameResult(2);
    } else {
      this.sendGameResult(1);
    }
    this.setState({ showConfirmModal: false });
  };

  getTotalLevels = () => {
    const maxBonusPoints = 1000;
    const bonusPointsPerLevel = this.props.settings?.bonus_point_count ?? 40;
    if (!bonusPointsPerLevel || bonusPointsPerLevel <= 0) {
      return 0;
    }
    return Math.ceil(maxBonusPoints / bonusPointsPerLevel);
  };

  formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return (m >= 10 ? m : "0" + m) + ":" + (s >= 10 ? s : "0" + s);
  };

  render() {
    let board;
    let negSection = null;
    let timer;

    if (this.state.gameOver === false && this.state.timeout === false) {
      board = (
        <table className="game-table">
          <tbody>{this.createTable()}</tbody>
        </table>
      );

      timer =
        this.state.startTimer > 0 ? (
          <Timer
            passTimerUpdate={this.passTimerUpdate}
            startTimeInSeconds={this.state.startTimer}
            startTimer={1}
          />
        ) : (
          <span>{this.formatTime(this.props.gameTime ?? 90)}</span>
        );

      negSection =
        this.state.negativePoints < 0 && this.state.displayNegativePoints ? (
          <NegativePoints startPoints={this.state.negativePoints} />
        ) : null;
    } else {
      board = null;
    }

    const confirmModal =
      this.state && this.state.showConfirmModal === true ? (
        <InfoModal
          show={this.state.showConfirmModal === true}
          modalClose={this.handleConfirmClose}
          msg={i18n.t("CONGRATS") + "!\n" + i18n.t("CONTINUE")}
          language={i18n.language}
        />
      ) : null;

    const instructionModal = this.state.showInstruction ? (
      <InstructionModal
        show={true}
        modalClose={this.handleCloseInstructionModal}
        msg={
          this.props.variant === "a"
            ? i18n.t("INSTRUCTIONS_A")
            : i18n.t("INSTRUCTIONS_B")
        }
        language={i18n.language}
      />
    ) : null;

    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Status bar */}
        <div className="status-bar">
          <div className="timer-display">
            {timer}
          </div>
          <div className="level-badge">
            {i18n.t("LEVEL")} {this.props.level}/{this.state.totalLevels.toString()}
          </div>
        </div>

        {instructionModal}
        {negSection}
        {confirmModal}
        {board}
      </div>
    );
  }
}

export default Board;
