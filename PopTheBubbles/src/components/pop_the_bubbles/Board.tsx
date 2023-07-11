/**
 * @file   Board.tsx
 * @brief  Board component to load box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from "react";
import i18n from "./../../i18n";

import { getRandomNumbers } from "../../functions";
import { Bubble } from "./Bubble";

import "./bubble.css";

interface BoardProps {
  bubbleCount: number;
  level: number;
  xCoords: Array<number>;
  xPoints: Array<number>;
  yCoords: Array<number>;
  yPoints: Array<number>;
  onCompleted(
    score: number,
    successTaps: number,
    wrongTaps: number,
    correctGoCount: number,
    totalGoCount: number,
    wrongNoGoCount: number,
    totalNoGoCount: number,
    falseHitsCount: number,
    completed: boolean,
    missedClicks: number,
    correctNoGo: number,
    wrongNoGoClicks: number,
    levelVal: number,
    route: any
  ): void;
  updateRoute(route: any, completed: boolean, level: number): void;
  bubbleDuration: number;
  bubbleSpeed: any;
  gameStarted: any;
  intertrialDuration: any;
  route: any;
}

interface BoardState {
  bubblesToTapCount: number;
  bubbleStyles: Array<string>;
  completed: boolean;
  index: number;
  showBoard: boolean;
  showGo: boolean;
  showNo: number;
  showWait: boolean;
  successTaps: number;
  wrongTaps: number;
  route: any;
  lastClickTime: any;
  lastSelectedColor: string;
  correctGoCount: number;
  totalGoCount: number;
  wrongNoGoCount: number;
  totalNoGoCount: number;
  falseHitsCount: number;
  newColor: string;
  previousColor: string;
  colorsArray: Array<string>;
  goIndexes: Array<string>;
  clickedBubbleIndexes: any;
  noGoIndexes: Array<string>;
  goArray: Array<string>;
  noGoArray: Array<string>;
  noGoLureArray: Array<string>;
  noGoTwoInRowArray: Array<string>;
  noGoConstantArray: Array<string>;
}

class Board extends React.Component<BoardProps, BoardState> {
  private timer: any;
  private count: number;
  private totalGoCount: number;
  private totalNoGoCount: number;
  constructor(props: BoardProps) {
    super(props);
    this.count = 0;
    this.totalGoCount = 0;
    this.totalNoGoCount = 0;
    const bubbleStyleValues: any = this.getBubbleStyles();
    // Initailise state values	
    this.state = {
      bubbleStyles: bubbleStyleValues,
      bubblesToTapCount: this.count,
      clickedBubbleIndexes: [],
      colorsArray: [],
      completed: false,
      correctGoCount: 0,
      falseHitsCount: 0,
      goArray: [],
      goIndexes: [],
      index: 0,
      lastClickTime : new Date().getTime(),
      lastSelectedColor: "",
      newColor: "",
      noGoArray: [],
      noGoConstantArray: [],
      noGoIndexes: [],
      noGoLureArray: [],
      noGoTwoInRowArray: [],
      previousColor: "",
      route: [],
      showBoard: false,
      showGo: false,
      showNo: 3,
      showWait: true,
      successTaps: 0,
      totalGoCount: this.totalGoCount,
      totalNoGoCount: this.totalNoGoCount,
      wrongNoGoCount: 0,
      wrongTaps: 0,
    };
  }

  setResult = () => {
    const filteredClickedBubble = this.state.clickedBubbleIndexes.filter(
      (item: any, index: any, inputArray: any) => {
        return inputArray.indexOf(item) === index;
      }
    );

    this.setState({
      clickedBubbleIndexes: filteredClickedBubble,
      wrongNoGoCount: this.state.noGoIndexes.filter((value) =>
        this.state.clickedBubbleIndexes.includes(value)
      ).length,
    });

    const percentage =
      (this.state.successTaps / this.state.bubblesToTapCount) * 100;

    const correctGoClicks = this.state.goIndexes.filter((value) =>
      this.state.clickedBubbleIndexes.includes(value)
    ).length;

    const wrongGoClicks = this.state.goIndexes.filter(
      (value) => !this.state.clickedBubbleIndexes.includes(value)
    ).length;

    const correctNoGoClicks = this.state.noGoIndexes.filter(
      (value) => !this.state.clickedBubbleIndexes.includes(value)
    ).length;

    const wrongNoGoClicks = this.state.noGoIndexes.filter((value) =>
      this.state.clickedBubbleIndexes.includes(value)
    ).length;

    const newLevel = this.props.level;

    const score = Math.round(percentage);

    this.props.onCompleted(
      score,
      this.state.successTaps,
      this.state.wrongTaps,
      correctGoClicks,
      this.state.goIndexes.length,
      this.state.wrongNoGoCount,
      this.state.noGoIndexes.length,
      this.state.falseHitsCount,
      this.state.completed,
      wrongGoClicks,
      correctNoGoClicks,
      wrongNoGoClicks,
      newLevel,
      this.state.route
    );
  }

  // On load function - set state of the gamne
  componentDidMount = () => {
    this.timer = setInterval(() => {
      if (this.state.showNo === 1) {
        // Countdown timer
        clearInterval(this.timer);
        this.setState({
          showGo: true,
          showWait: false,
        });
        setTimeout(() => {
          this.setState({
            showBoard: true,
            showGo: false,
          });
          // Game over interval
          const timeoutPeriod =
            this.props.bubbleCount * (this.props.intertrialDuration * 1000) +
            1000;
          setTimeout(() => {
            this.setState({
              completed: true,
            });

            this.setResult()
          }, timeoutPeriod);

          if (this.state.showBoard) {
            this.props.gameStarted(true);
          }
        }, 1500);
      } else {
        this.setState({
          showNo: this.state.showNo - 1,
        });
      }
    }, 1500);

    document.addEventListener("click", this.handleClickOutside, true);
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event: any) => {
    const currentItem = event.target;
    if (this.state.showBoard) {
      if (!currentItem.classList.contains("bubble-colors")) {
        this.setState((prevState) => ({
          falseHitsCount: prevState.falseHitsCount + 1,
        }));
      }
    }
  };

  // To set the game board table size based on screen resolution
  getTableStyles = () => {
    const size = window.innerWidth - (window.innerWidth * 10) / 100;
    const styles = { height: `${size}px`, width: `${size}px` };
    return styles;
  };

  randomArrayShuffle = (array: any) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  getGoCountData = (totalArrayCount: number, goCount: number) => {
    if (this.props.bubbleCount !== totalArrayCount) {
      if (this.props.bubbleCount < totalArrayCount) {
        goCount = goCount - (totalArrayCount - this.props.bubbleCount);
      } else if (this.props.bubbleCount > totalArrayCount) {
        goCount = goCount + (this.props.bubbleCount - totalArrayCount);
      } else {
        goCount = goCount;
      }
    }
    return goCount;
  };

  // Get random bubble styles
  getBubbleStyles = (): Array<string> => {
    this.count = 0;
    let selectedClass = null;
    const stylesArray: Array<string> = [];
    let goArray: any;
    let goCount: number = 0;
    let noGoCount: number = 0;
    let randomArray: any = [];
    let totalArrayCount = 0;

    switch (this.props.level) {
      case 1:
        goArray = ["bubble-yellow", "bubble-pink", "bubble-blue"];
        const noGoOtherArray = ["bubble-red", "bubble-green"];
        goCount = Math.round((this.props.bubbleCount * 80) / 100);
        noGoCount = Math.round((this.props.bubbleCount * 20) / 100);
        totalArrayCount = goCount + noGoCount;
        goCount = this.getGoCountData(totalArrayCount, goCount);
        const tempDataCount =
          this.props.bubbleCount % 3 === 0
            ? this.props.bubbleCount
            : this.props.bubbleCount % 3 === 1
            ? this.props.bubbleCount + 2
            : this.props.bubbleCount + 1;

        for (let k = 0; k < tempDataCount; k++) {
          if (k % 3 === 0) {
            stylesArray.push(goArray[0]);
          } else if (k % 3 === 1) {
            stylesArray.push(goArray[1]);
          } else {
            stylesArray.push(goArray[2]);
          }
        }

        const stylesNoGoOtherArray: any = [];
        for (let n = 0; n < noGoCount; n++) {
          selectedClass = getRandomNumbers(1, 0, noGoOtherArray.length - 1)[0];
          stylesNoGoOtherArray.push(noGoOtherArray[selectedClass]);
        }

        const newYellowIndx = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-yellow") {
              r.push(i);
            }
            return r;
          },
          []
        );

        const newBlueIndx = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-blue") {
              r.push(i);
            }
            return r;
          },
          []
        );
        const newPinkIndx = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-pink") {
              r.push(i);
            }
            return r;
          },
          []
        );

        // Merge 2 arrays into alternate positions like yellow, blue, yellow, blue etc.
        let newArrayGoIndx = newBlueIndx.reduce((arr: any, v: any, i: any) => {
          return arr.concat(v, newYellowIndx[i]);
        }, []);

        newArrayGoIndx = [newArrayGoIndx, newPinkIndx]
          .reduce(
            (r, a: any) => (
              a.forEach((a: any, i: any) => (r[i] = r[i] || []).push(a)), r
            ),
            []
          )
          .reduce((a: any, b: any) => a.concat(b));

        const goNewArray: any = [];
        const goNewArrayKeys: any = [];
        const copyNewGoArrayIndx = newArrayGoIndx;
        newArrayGoIndx.forEach((element: any, index: any) => {
          if (newBlueIndx.includes(element)) {
            goNewArray[index] = "bubble-blue";
          }
          if (newYellowIndx.includes(element)) {
            goNewArray[index] = "bubble-yellow";
          }
          if (newPinkIndx.includes(element)) {
            goNewArray[index] = "bubble-pink";
          }
        });

        let noGoIncrm = 0;
        const arrayNoGoIndx: any = [];
        // Remove elements from array
        if (goNewArray.length - this.props.bubbleCount > 0) {
          goNewArray.splice(this.props.bubbleCount - goNewArray.length);
          copyNewGoArrayIndx.splice(
            this.props.bubbleCount - copyNewGoArrayIndx.length
          );
        }

        const iteratorDataKeys = Object.keys(goNewArray);
        iteratorDataKeys.forEach((numberData) =>
          goNewArrayKeys.push(parseInt(numberData, 10))
        );

        let sortCopyNewDataGo = copyNewGoArrayIndx.sort(
          (a: number, b: number) => a - b
        );

        sortCopyNewDataGo = sortCopyNewDataGo.filter((el: any, i: any) => {
          if (i < sortCopyNewDataGo.length - (noGoCount + 1)) {
            return el;
          }
        });

        const noGoDataIndxArr: any = [];
        goNewArray.forEach((element: any, index: any) => {
          if (noGoCount > 0 && noGoIncrm < noGoCount) {
            // no-go
            const res = sortCopyNewDataGo.sort(() => {
              return 0.5 - Math.random();
            });
            let randIndNoGo = res.slice(sortCopyNewDataGo, 1)[0];
            if (arrayNoGoIndx.indexOf(randIndNoGo) > -1) {
              randIndNoGo = this.generateRandomNumber(sortCopyNewDataGo);
            }
            stylesNoGoOtherArray.forEach((elem: any) => {
              if (noGoCount <= stylesNoGoOtherArray.length) {
                goNewArray[randIndNoGo] = elem;
                if (arrayNoGoIndx.indexOf(randIndNoGo) <= -1) {
                  arrayNoGoIndx.push(randIndNoGo);
                  noGoDataIndxArr.push(randIndNoGo);
                }
                const copyIndex = copyNewGoArrayIndx.indexOf(randIndNoGo);
                if (copyIndex > -1) {
                  copyNewGoArrayIndx.splice(copyIndex, 1);
                }
              }
            });
            noGoIncrm++;
            noGoDataIndxArr.sort((a: number, b: number) => a - b);
          }
        });

        setTimeout(() => {
          this.setState({
            goIndexes: copyNewGoArrayIndx,
            noGoArray: noGoDataIndxArr,
            noGoIndexes: noGoDataIndxArr,
          });
        }, 10);
        randomArray = goNewArray;
        this.updateColorsArray(randomArray);
        break;

      case 2:
        goArray = ["bubble-yellow", "bubble-blue"];
        const noGoArray = ["bubble-red", "bubble-green"];
        const lureArray = ["bubble-pink"];
        const twoInRowArray = ["bubble-yellow", "bubble-blue"];
        goCount = Math.round((this.props.bubbleCount * 75) / 100);
        noGoCount = Math.round((this.props.bubbleCount * 7.5) / 100);
        const lureOrTwoInRowCount: any = Math.round(
          (this.props.bubbleCount * 8.75) / 100
        );
        totalArrayCount =
          goCount + noGoCount + lureOrTwoInRowCount + lureOrTwoInRowCount;

        this.totalNoGoCount =
          noGoCount + lureOrTwoInRowCount + lureOrTwoInRowCount;

        goCount = this.getGoCountData(totalArrayCount, goCount);

        this.totalGoCount = goCount;
        const tempCount =
          this.props.bubbleCount % 2 === 0
            ? this.props.bubbleCount
            : this.props.bubbleCount + 1;

        for (let k = 0; k < tempCount; k++) {
          if (k % 2 === 0) {
            stylesArray.push(goArray[0]);
          } else {
            stylesArray.push(goArray[1]);
          }
        }

        const stylesNoGoArr: any = [];
        for (let n = 0; n < noGoCount; n++) {
          selectedClass = getRandomNumbers(1, 0, noGoArray.length - 1)[0];
          stylesNoGoArr.push(noGoArray[selectedClass]);
        }

        const stylesLureArr: any = [];
        if (lureOrTwoInRowCount > 0) {
          for (let p = 0; p < lureOrTwoInRowCount; p++) {
            selectedClass = getRandomNumbers(1, 0, lureArray.length - 1)[0];
            stylesLureArr.push(lureArray[selectedClass]);
          }
        }

        const yellowIndexes = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-yellow") {
              r.push(i);
            }
            return r;
          },
          []
        );

        const blueIndexes = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-blue") {
              r.push(i);
            }
            return r;
          },
          []
        );

        // Merge 2 arrays into alternate positions like yellow, blue, yellow, blue etc.
        const newGoIndexes = blueIndexes.reduce((arr: any, v: any, i: any) => {
          return arr.concat(v, yellowIndexes[i]);
        }, []);
        const goArrayNew: any = [];

        const copyNewGoIndexes = newGoIndexes;

        newGoIndexes.forEach((element: any, index: any) => {
          if (blueIndexes.includes(element)) {
            goArrayNew[index] = "bubble-blue";
          }
          if (yellowIndexes.includes(element)) {
            goArrayNew[index] = "bubble-yellow";
          }
        });

        // Remove elements from array
        if (this.props.bubbleCount !== goArrayNew.length) {
          goArrayNew.splice(this.props.bubbleCount - goArrayNew.length);
          copyNewGoIndexes.splice(
            this.props.bubbleCount - copyNewGoIndexes.length
          );
        }

        let noGoInc = 0;
        let lureInc = 0;
        let twoInRowInc = 0;
        const arrayInx: any = [];
        const lureArrIndx: any = [];
        const twoInRowArrIndx: any = [];
        const constNoGoArrIndx: any = [];

        let twoInRowDataArray: any = [];
        if (lureOrTwoInRowCount >= 2) {
          if (lureOrTwoInRowCount === 2) {
            twoInRowDataArray = twoInRowArray.reduce(
              (res: any, current: any) => {
                return res.concat(Array(1).fill(current));
              },
              []
            );
          } else {
            const b1 = Math.round(lureOrTwoInRowCount / 2);
            twoInRowDataArray = twoInRowArray.reduce(
              (res: any, current: any) => {
                return res.concat(Array(b1).fill(current));
              },
              []
            );
            if (twoInRowDataArray.length > lureOrTwoInRowCount) {
              const diff = twoInRowDataArray.length - lureOrTwoInRowCount;
              twoInRowDataArray.splice(twoInRowDataArray.length - diff);
            }
          }
        } else {
          if (lureOrTwoInRowCount === 1) {
            twoInRowDataArray = [twoInRowArray[0]];
          }
        }

        let sortCopyNewGoIndx = copyNewGoIndexes.sort(
          (a: number, b: number) => a - b
        );

        sortCopyNewGoIndx = sortCopyNewGoIndx.filter((el: any, i: any) => {
          if (i < sortCopyNewGoIndx.length - (lureOrTwoInRowCount + 1)) {
            return el;
          }
        });

        goArrayNew.forEach((element: any, index: any) => {
          if (lureOrTwoInRowCount > 0 && lureInc < lureOrTwoInRowCount) {
            // lure-no-go
            const res1 = sortCopyNewGoIndx.sort(() => {
              return 0.5 - Math.random();
            });
            const randIndLureGo = res1.slice(sortCopyNewGoIndx, 1)[0];
            stylesLureArr.forEach((elem: any) => {
              if (lureOrTwoInRowCount <= stylesLureArr.length) {
                goArrayNew[randIndLureGo] = elem;
                if (arrayInx.indexOf(randIndLureGo) <= -1) {
                  arrayInx.push(randIndLureGo);
                  lureArrIndx.push(randIndLureGo);
                }
                const copyIndex = copyNewGoIndexes.indexOf(randIndLureGo);
                if (copyIndex > -1) {
                  copyNewGoIndexes.splice(copyIndex, 1);
                }
              }
            });
            lureInc++;
            lureArrIndx.sort((a: number, b: number) => a - b);
          }
        });

        goArrayNew.forEach((element: any, index: any) => {
          if (lureOrTwoInRowCount > 0 && twoInRowInc < lureOrTwoInRowCount) {
            // two-in-a-row
            let lastLureVal = 0;
            let rangeNum: any = [];
            if (lureArrIndx.length > 0) {
              rangeNum = this.rangeNumber(
                lureArrIndx[lureArrIndx.length - 1],
                this.props.bubbleCount
              );
              lastLureVal = lureArrIndx[lureArrIndx.length - 1];
            }
            if (lastLureVal > this.props.bubbleCount) {
              const res1 = copyNewGoIndexes.sort(() => {
                return 0.5 - Math.random();
              });
              lastLureVal = res1.slice(copyNewGoIndexes, 1)[0];
            }
            twoInRowDataArray.forEach((elem: any) => {
              lastLureVal =
                lastLureVal >= this.props.bubbleCount
                  ? lastLureVal
                  : lastLureVal + 1;

              if (lureOrTwoInRowCount <= stylesLureArr.length) {
                goArrayNew[lastLureVal] = elem;
                if (arrayInx.indexOf(lastLureVal) <= -1) {
                  arrayInx.push(lastLureVal);
                  twoInRowArrIndx.push(lastLureVal);
                }
                const copyIndex = rangeNum.indexOf(lastLureVal);
                if (copyIndex > -1) {
                  rangeNum.splice(copyIndex, 1);
                }
                const copyIndex1 = copyNewGoIndexes.indexOf(lastLureVal);
                if (copyIndex1 > -1) {
                  copyNewGoIndexes.splice(copyIndex1, 1);
                }
              }
            });
            twoInRowInc++;
          }
        });

        goArrayNew.forEach((element: any, index: any) => {
          if (noGoCount > 0 && noGoInc < noGoCount) {
            // constant-no-go
            const res = copyNewGoIndexes.sort(() => {
              return 0.5 - Math.random();
            });
            const randIndNoGo = res.slice(copyNewGoIndexes, 1)[0];
            stylesNoGoArr.forEach((elem: any) => {
              if (noGoCount <= stylesNoGoArr.length) {
                goArrayNew[randIndNoGo] = elem;
                if (arrayInx.indexOf(randIndNoGo) <= -1) {
                  arrayInx.push(randIndNoGo);
                  constNoGoArrIndx.push(randIndNoGo);
                }
                const copyIndex = copyNewGoIndexes.indexOf(randIndNoGo);
                if (copyIndex > -1) {
                  copyNewGoIndexes.splice(copyIndex, 1);
                }
              }
            });
            noGoInc++;
          }
        });

        setTimeout(() => {
          this.setState({
            goIndexes: copyNewGoIndexes,
            noGoConstantArray: constNoGoArrIndx,
            noGoIndexes: arrayInx,
            noGoLureArray: lureArrIndx,
            noGoTwoInRowArray: twoInRowArrIndx,
          });
        }, 10);

        randomArray = goArrayNew;
        this.updateColorsArray(randomArray);
        break;

      case 3:
        goArray = ["bubble-yellow", "bubble-blue", "bubble-pink"];
        const constNoGoArray: any = ["bubble-red", "bubble-green"];
        const twoRowArray = ["bubble-yellow", "bubble-pink", "bubble-blue"];

        goCount = Math.round((this.props.bubbleCount * 75) / 100);
        noGoCount = Math.round((this.props.bubbleCount * 12.5) / 100);
        const twoInRowCount = Math.round((this.props.bubbleCount * 12.5) / 100);

        totalArrayCount = goCount + noGoCount + twoInRowCount;

        this.totalNoGoCount = noGoCount + twoInRowCount;

        goCount = this.getGoCountData(totalArrayCount, goCount);

        this.totalGoCount = goCount;
        const newTempCount =
          this.props.bubbleCount % 3 === 0
            ? this.props.bubbleCount
            : this.props.bubbleCount % 3 === 1
            ? this.props.bubbleCount + 2
            : this.props.bubbleCount + 1;

        for (let k = 0; k < newTempCount; k++) {
          if (k % 3 === 0) {
            stylesArray.push(goArray[0]);
          } else if (k % 3 === 1) {
            stylesArray.push(goArray[1]);
          } else {
            stylesArray.push(goArray[2]);
          }
        }

        const stylesNoGoArray: any = [];
        for (let n = 0; n < noGoCount; n++) {
          selectedClass = getRandomNumbers(1, 0, constNoGoArray.length - 1)[0];
          stylesNoGoArray.push(constNoGoArray[selectedClass]);
        }

        const newYellowIndexes = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-yellow") {
              r.push(i);
            }
            return r;
          },
          []
        );

        const newBlueIndexes = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-blue") {
              r.push(i);
            }
            return r;
          },
          []
        );

        const newPinkIndexes = stylesArray.reduce(
          (r: any, n: string, i: number) => {
            if (n === "bubble-pink") {
              r.push(i);
            }
            return r;
          },
          []
        );

        // Merge 2 arrays into alternate positions like yellow, blue, yellow, blue etc.
        let newArrayGoIndexes = newBlueIndexes.reduce(
          (arr: any, v: any, i: any) => {
            return arr.concat(v, newYellowIndexes[i]);
          },
          []
        );

        newArrayGoIndexes = [newArrayGoIndexes, newPinkIndexes]
          .reduce(
            (r, a: any) => (
              a.forEach((a: any, i: any) => (r[i] = r[i] || []).push(a)), r
            ),
            []
          )
          .reduce((a: any, b: any) => a.concat(b));

        const goNewDataArray: any = [];
        const goNewDataArrayKeys: any = [];

        const copyNewGoArrayIndexes = newArrayGoIndexes;

        newArrayGoIndexes.forEach((element: any, index: any) => {
          if (newBlueIndexes.includes(element)) {
            goNewDataArray[index] = "bubble-blue";
          }
          if (newYellowIndexes.includes(element)) {
            goNewDataArray[index] = "bubble-yellow";
          }
          if (newPinkIndexes.includes(element)) {
            goNewDataArray[index] = "bubble-pink";
          }
        });

        let noGoIncr = 0;
        let twoInRowIncr = 0;
        const arrayIndx: any = [];

        // Remove elements from array
        if (goNewDataArray.length - this.props.bubbleCount > 0) {
          goNewDataArray.splice(this.props.bubbleCount - goNewDataArray.length);
          copyNewGoArrayIndexes.splice(
            this.props.bubbleCount - copyNewGoArrayIndexes.length
          );
        }

        const iteratorKeys = Object.keys(goNewDataArray);

        iteratorKeys.forEach((numberData) =>
          goNewDataArrayKeys.push(parseInt(numberData, 10))
        );

        let twoInRowNewArray: any = [];
        if (twoInRowCount >= 2) {
          if (twoInRowCount === 2) {
            twoInRowNewArray = twoRowArray.reduce((res: any, current: any) => {
              return res.concat(Array(1).fill(current));
            }, []);
          } else {
            const b1 = Math.round(twoInRowCount / 2);
            twoInRowNewArray = twoRowArray.reduce((res: any, current: any) => {
              return res.concat(Array(b1).fill(current));
            }, []);
            if (twoInRowNewArray.length > twoInRowCount) {
              const diff = twoInRowNewArray.length - twoInRowCount;
              twoInRowNewArray.splice(twoInRowNewArray.length - diff);
            }
          }
        } else {
          if (twoInRowCount === 1) {
            twoInRowNewArray = [twoRowArray[0]];
          }
        }

        let sortCopyNewGo = copyNewGoArrayIndexes.sort(
          (a: number, b: number) => a - b
        );

        sortCopyNewGo = sortCopyNewGo.filter((el: any, i: any) => {
          if (i < sortCopyNewGo.length - (noGoCount + 1)) {
            return el;
          }
        });

        const noGoIndxArr: any = [];
        const constNoGoArrIndxes: any = [];
        goNewDataArray.forEach((element: any, index: any) => {
          if (noGoCount > 0 && noGoIncr < noGoCount) {
            // constant-no-go
            const res = sortCopyNewGo.sort(() => {
              return 0.5 - Math.random();
            });
            let randIndNoGo = res.slice(sortCopyNewGo, 1)[0];
            if (arrayIndx.indexOf(randIndNoGo) > -1) {
              randIndNoGo = this.generateRandomNumber(sortCopyNewGo);
            }
            stylesNoGoArray.forEach((elem: any) => {
              if (noGoCount <= stylesNoGoArray.length) {
                goNewDataArray[randIndNoGo] = elem;
                if (arrayIndx.indexOf(randIndNoGo) <= -1) {
                  arrayIndx.push(randIndNoGo);
                  noGoIndxArr.push(randIndNoGo);
                  constNoGoArrIndxes.push(randIndNoGo);
                }
                const copyIndex = copyNewGoArrayIndexes.indexOf(randIndNoGo);
                if (copyIndex > -1) {
                  copyNewGoArrayIndexes.splice(copyIndex, 1);
                }
              }
            });
            noGoIncr++;
            noGoIndxArr.sort((a: number, b: number) => a - b);
          }
        });

        const twoInRowIndxArr: any = [];
        goNewDataArray.forEach((element: any, index: any) => {
          if (twoInRowCount > 0 && twoInRowIncr < twoInRowCount) {
            let lastNoGoVal = 0;
            lastNoGoVal = noGoIndxArr[noGoIndxArr.length - 1];
            twoInRowNewArray.forEach((elem: any) => {
              lastNoGoVal =
                lastNoGoVal >= this.props.bubbleCount
                  ? lastNoGoVal
                  : lastNoGoVal + 1;
              goNewDataArray[lastNoGoVal] = elem;
              if (arrayIndx.indexOf(lastNoGoVal) <= -1) {
                arrayIndx.push(lastNoGoVal);
                twoInRowIndxArr.push(lastNoGoVal);
              }
              const copyIndex = copyNewGoArrayIndexes.indexOf(lastNoGoVal);
              if (copyIndex > -1) {
                copyNewGoArrayIndexes.splice(copyIndex, 1);
              }
            });
            twoInRowIncr++;
          }
        });

        setTimeout(() => {
          this.setState({
            goIndexes: copyNewGoArrayIndexes,
            noGoConstantArray: constNoGoArrIndxes,
            noGoIndexes: arrayIndx,
            noGoTwoInRowArray: twoInRowIndxArr,
          });
        }, 10);

        randomArray = goNewDataArray;
        this.updateColorsArray(randomArray);
        break;
    }
    return randomArray;
  };

  generateRandomNumber = (sortCopyNewGo: any) => {
    const res = sortCopyNewGo.sort(() => {
      return 0.5 - Math.random();
    });
    const randIndNoGo = res.slice(sortCopyNewGo, 1)[0];
    return randIndNoGo;
  };

  rangeNumber = (start: number, end: number) => {
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => start + idx);
  };

  missingArrayValues = (incoming: any) => {
    const missing = [];
    const a = incoming;
    const count = this.props.bubbleCount;
    let found = false;

    for (let j = 1; j < count; j++) {
      found = false;
      for (let i = 0; i <= a.length; i++) {
        if (a[i] === j) {
          found = true;
          break;
        }
      }
      if (!found) {
        missing.push(j);
      }
    }
    return missing;
  };

  shuffleNumbers = (o: any) => {
    for (
      let j, x, i = o.length;
      i;
      j = Math.random() * i, x = o[--i], o[i] = o[j], o[j] = x
    ) {
      /* tslint:disable:no-empty */
    }
    return o;
  };

  getArrayColorData = (
    newGoArray: any,
    stylesNoGo: any,
    noGoCount: number,
    newGoLength: number
  ) => {
    let noGoCounter = 0;
    const arrayIndex = [];
    const randIndNoGo = getRandomNumbers(1, 0, newGoLength - 1)[0];
    if (noGoCount > 0 && noGoCounter < noGoCount) {
      stylesNoGo.forEach((elem: any) => {
        if (noGoCount <= stylesNoGo.length) {
          newGoArray[randIndNoGo] = elem;
          arrayIndex.push(randIndNoGo);
        }
      });
      noGoCounter++;
    }
  };

  updateColorsArray = (randomArray: any) => {
    setTimeout(() => {
      this.setState({ colorsArray: randomArray });
    }, 10);
  };

  insertArray = (arr: any, items: any) => {
    const itemJoin = items.join(",");
    const itemSplit = itemJoin.split(",");
    const randomIndex = Math.floor(Math.random() * arr.length);
    arr.splice(randomIndex, 0, ...itemSplit);
    const indexesArray = this.generateArrayData(
      randomIndex,
      randomIndex + Number(items.length)
    );
    return { arr, indexesArray };
  };

  generateArrayData = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, idx) => start + idx);
  };

  bubbleSpecifics = (colorSelected: string, success: boolean, index: any) => {
    let trialData: any = "";
    if (this.state.goIndexes.includes(index)) {
      trialData = colorSelected + " go";
    } else if (this.state.noGoArray.includes(index)) {
      trialData = colorSelected + " no-go";
    } else if (this.state.noGoConstantArray.includes(index)) {
      trialData = colorSelected + " no-go-constant";
    } else if (this.state.noGoLureArray.includes(index)) {
      trialData = colorSelected + " no-go-lure";
    } else if (this.state.noGoTwoInRowArray.includes(index)) {
      trialData = colorSelected + " no-go-2inrow";
    }else{
      trialData = colorSelected + " go";
    }
    return trialData;
  };

  // Hanlde bubble taps here
  handleClick = (
    e: any,
    index: any,
    lastClass: string,
    toBeTapped: boolean
  ) => {
    const pointsToReduce =
      typeof this.state.bubbleStyles[index] !== "undefined" &&
      lastClass !== this.state.bubbleStyles[index]
        ? 1
        : 0;

    const success = this.props.level
      ? toBeTapped
        ? true
        : false
      : toBeTapped &&
        (typeof this.state.bubbleStyles[index] === "undefined" ||
          typeof this.state.bubbleStyles[index] !== "undefined")
      ? true
      : false;

    this.setState({
      successTaps: success
        ? this.state.successTaps + 1
        : this.state.successTaps - pointsToReduce,
      wrongTaps: !success ? this.state.wrongTaps + 1 : this.state.wrongTaps,
    });

    if (!this.state.clickedBubbleIndexes.includes(index)) {
      let route = {};
    const dif = new Date().getTime() - this.state.lastClickTime;
    const lastclickTime = dif;
      route = {
        duration: lastclickTime,
        item: this.state.route.length + 1,
        level: this.props.level,
        type: success,
        value: this.bubbleSpecifics(
          lastClass.replace("bubble-", ""),
          success,
          index
        ),
      };
      this.setState((prevState) => ({
        clickedBubbleIndexes: [...prevState.clickedBubbleIndexes, index],
        lastClickTime: new Date().getTime(),
        route: [...prevState.route, route],
      }), 
      () => {
        this.props.updateRoute(route, false, this.props.level)
      })
    }
  };
    
  // Render the game board
  render() {
    let board;
    if (this.state.showWait) {
      board = (
        <div>
          <h1 className="cowndown">{this.state.showNo}</h1>
        </div>
      );
    }
    if (this.state.showGo) {
      board = (
        <div>
          <h1 className="cowndown">{i18n.t("GO")}</h1>
        </div>
      );
    }
    if (this.state.showBoard) {
      const bubbles = [];
      const toBeSelected =
        this.props.level === 1 || this.props.level === 3
          ? ["bubble-pink", "bubble-yellow", "bubble-blue"]
          : ["bubble-yellow", "bubble-blue"];
      let bubbleToTap = false;
      // Set bubble rendering interval in 300ms
      let p = this.props.bubbleSpeed;
      const screenWidth = window.innerWidth - (window.innerWidth * 20) / 100
      const screenHeight = window.innerHeight - (window.innerHeight * 25) / 100
  

      for (let i = 0; i < this.props.bubbleCount; i++) {
        bubbleToTap =
          toBeSelected.indexOf(this.state.bubbleStyles[i]) > -1 ? true : false;
          
          if(Math.abs(this.props.xCoords[this.props.xPoints[i]] - this.props.xCoords[this.props.xPoints[i-1]]) < 80) {
            this.props.xCoords[this.props.xPoints[i]] = (this.props.xCoords[this.props.xPoints[i]]  + 80 < screenWidth) ? 
          this.props.xCoords[this.props.xPoints[i]] + 80 : this.props.xCoords[this.props.xPoints[i]] - 80
          
          }
            if(Math.abs(this.props.yCoords[this.props.yPoints[i]] - this.props.yCoords[this.props.yPoints[i-1]]) < 80){
              this.props.yCoords[this.props.yPoints[i]] = (this.props.yCoords[this.props.yPoints[i]]  + 80 < screenHeight) ? 
           this.props.yCoords[this.props.yPoints[i]] + 80 : this.props.yCoords[this.props.yPoints[i]] - 80
            }
        bubbles.push(
          <Bubble
            delayed={p}
            x={this.props.xCoords[this.props.xPoints[i]]}
            index={i}
            y={this.props.yCoords[this.props.yPoints[i]]}
            class={this.state.bubbleStyles[i]}
            bubbleToTap={bubbleToTap}
            onClick={this.handleClick}
            bubbleDuration={this.props.bubbleDuration}
          />
        );
        p = p + this.props.intertrialDuration * 1000;
      }
      board = bubbles;
    }
    return (
      <div className="pop-the-bubble-board">
        <div className="mt-30 ">{board}</div>
      </div>
    );
  }
}

export default Board;
