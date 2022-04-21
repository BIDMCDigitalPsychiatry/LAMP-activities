/**
 * @file   Board.tsx
 * @brief  Board component to load box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import getImages from "./RandomImage"

import { renderToString } from 'react-dom/server'

import { getRandomNumbers } from "../../functions";
import i18n from "./../../i18n";

import Questions from "./Questions"

import { InfoModal } from "../common/InfoModal";

import "./box.css";

interface BoardState {
  activeCell: number;
  animate: boolean;
  allImages:any;
  autoCorrect: boolean;
  boxClass: Array<string>;
  boxCount: number;
  boxes: any;
  clickedImageIndex: number;
  completed: boolean;
  enableTap: boolean;
  endTime: any;
  imageIndex: number,
  failureCount: number;
  gameSequence: boolean;
  gameState: number;
  lastClickTime: any;
  nextButton: boolean;
  orderNumber: number;
  randomPoints: Array<number>;
  trail:number;
  showGo: boolean;
  showQuestions: boolean;
  showWait: boolean;
  staticData: any;
  successStages: number;
  successTaps: number;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any;
  resultClickIndex:number;
  wrongTaps: number;
  showModalInfo: boolean;
  sendResponse: boolean;
  images: any
}

interface BoardProps {
  animationInterval: number;
  animationPersistance: number;
  autoCorrect: boolean;
  cols:number;
  encodingTrials: number;
  retensionInterval: number;
  rows: number;
  seqLength: number;
  time: number;
  language: string;
}

class Board extends React.Component<BoardProps, BoardState> {
  private timer: any;
  private timerBox: any;
  private resetWaitBox: any;
  private resetGoBox: any;

  constructor(props: BoardProps) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    // Initailise state values
    const selected = getImages(this.props.seqLength, [])
    const resultImages = selected.images.concat(getImages((this.props.cols * this.props.rows) - this.props.seqLength, selected.numbers).images).sort(() => Math.random() - 0.5);
    this.state = {
      activeCell: -1,
      allImages: resultImages,
      animate: false,
      autoCorrect: this.props.autoCorrect,
      boxClass: ["box-square"],
      boxCount: 1,
      boxes: null,
      clickedImageIndex: -1,
      completed: false,
      enableTap: false,
      endTime: null,
      failureCount: 0,
      gameSequence: false,
      gameState: 0,
      imageIndex:0,
      images: selected?.images,
      lastClickTime: null,
      nextButton: false,
      orderNumber: -1,
      randomPoints: [],
      resultClickIndex:0,
      sendResponse: false,
      showGo: false,
      showModalInfo: false,
      showQuestions: false,
      showWait: true,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      staticData: null,
      successStages: 0,
      successTaps: 0,
      trail:0,
      wrongTaps: 0,
    };
  }
  
  // Modal close is handled here
  handleClose = (status: boolean) => {
    this.setState({
      showModalInfo: status     
    }, () => {
      this.resetGoBox = setTimeout(() => {
        if(this.state) {
          this.setState({ lastClickTime: new Date().getTime(), showWait: false }, () =>{
            this.setGameState();
          });
        }
      }, 2000);
    });
  };

  // On load function - set state of the gamne
  componentDidMount = () => {
    if(!this.props.autoCorrect){
      this.setState({
        showQuestions: true
      }, () => {
        setTimeout(() => {
          this.setState({
            showQuestions: false
          }, () => {
            this.resetState();
          });       
      }, 60000);
      })
    } else {
      this.resetState();
    }
  };

   // Reset game state for each state
  resetState = () => {
    const selected = getImages(this.props.seqLength, [])
    const resultImages = selected.images.concat(getImages((this.props.cols * this.props.rows) - this.props.seqLength, selected.numbers).images).sort(() => Math.random() - 0.5);
    this.setState({
     activeCell: -1,
      allImages: resultImages,
      animate: false,
      autoCorrect: !!this.props.autoCorrect && this.state.trail < 3 ? true: false,
      boxClass: ["box-square"],
      boxCount: 1,
      boxes: null,
      clickedImageIndex: -1,
      completed: false,
      enableTap: false,
      endTime: null,
      failureCount: 0,
      gameSequence: false,
      gameState: 0,
      imageIndex:0,
      images: selected?.images,
      lastClickTime: null,
      nextButton: false,
      orderNumber: -1,
      randomPoints: [],
      resultClickIndex:0,
      sendResponse: false,
      showGo: false,
      showModalInfo: this.state.trail === 3 ? false : true,
      showQuestions: false,
      showWait: true,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      successStages: 0,
      successTaps: 0,
      trail:this.state.trail + 1,
      wrongTaps: 0,
    }, () => {
      console.log(this.state.showModalInfo, this.state.trail)
      if(this.state.trail > 1) {
        const items = Array.from(document.querySelectorAll("#options-table div"))
        for(const item of items){
          if(item) {
          item.innerHTML = ""
        }        
      }
      }
      if(this.state.trail === 4 && !this.state.showQuestions) {
        this.setState({
          showQuestions:true
        }, () => {
          setTimeout(() => {
            this.setState({
              showQuestions: false,
            }, () => {
              this.resetState()
            })
          }, 10000)
        })
      }

      this.resetBoxClass();
      // To show wait message
       this.resetWaitBox = setTimeout(() => {         
           this.setState({
             gameSequence: true,
             orderNumber: -1,
             randomPoints: [],
             showWait: true            
           })   
           // this.handleClose(false)  
       }, 1000);
    })
           
  }
    
  // };
  // // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName("box-white")).forEach((elem) => {
      elem.className = "box-white";
    });
  }

  handleResultClick = (e:any) => {    
    if (this.state.enableTap) {  
      const index = e.target.closest("div").getAttribute("data-key")
      const success =  this.state.allImages[parseInt(index, 10)] === this.state.images[this.state.resultClickIndex]
      const targets = e.target.closest("table").querySelectorAll("div")
      for(const i of targets){
        i.className = (i.getAttribute("data-key") !== index) ?
           "box-white inactive"
        : "box-white"
       }
       if(!success && !!this.state.autoCorrect ) {
         const correctIndex = this.state.allImages.indexOf(this.state.images[this.state.resultClickIndex])
         const items = e.target.closest("table").querySelectorAll("div")
         for(const item of items){
          item.className = (parseInt(item.getAttribute("data-key"), 10) !== correctIndex) ?
             "box-white inactive"
          : "box-white"
         }
       }
       if(!!success || !!this.state.autoCorrect) {
        const imageIndex = this.state.randomPoints[this.state.resultClickIndex]
        const ele = document.querySelector("[data-key='"+imageIndex+"']")
        if (ele) {
          ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex])        
        }
       }
       if(!this.state.autoCorrect || this.state.trail > 3) {
       this.setState({
            clickedImageIndex: index,
            enableTap:
              this.state.resultClickIndex + 1  < this.state.randomPoints.length
                ? true
                : false,
            nextButton:            
               this.state.resultClickIndex + 1 >= this.state.randomPoints.length
                ? true
                : false,
            resultClickIndex:this.state.resultClickIndex + 1,
          stateSuccessTaps: success
            ? this.state.stateSuccessTaps + 1
            : this.state.stateSuccessTaps,
          stateWrongTaps: !success
            ? this.state.stateWrongTaps + 1
            : this.state.stateWrongTaps,
          successTaps: success
            ? this.state.successTaps + 1
            : this.state.successTaps,
          wrongTaps: success ? this.state.wrongTaps : this.state.wrongTaps + 1,
    })
    this.updateWithTaps(index, success);
  }
  }
  }
 
  // To track echa tap on box
  updateStateWithTaps = () => {
    const states = [];
    if (this.state.states !== null) {
      const r = JSON.parse(this.state.states);
      Object.keys(r).forEach((key) => {
        states.push(r[key]);
      });
    }
    const box = JSON.parse(this.state.boxes);
    states.push(box);
    this.setState({
      states: JSON.stringify(states),
    });
  };
  // Update the state values after each game state
  updateWithTaps = (boxNo: number, statusVal: boolean) => {
    const boxes = [];
    const lastclickTime = new Date().getTime() - this.state.lastClickTime;
    if (this.state.boxes !== null) {
      const r = JSON.parse(this.state.boxes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }
    if (this.state.enableTap) {
      const route = {
        duration: lastclickTime,
        item: boxNo,
        level: this.state.gameState,
        type: statusVal,
        value: null,
      };
      boxes.push(route);
    }
    this.setState({
      boxes: JSON.stringify(boxes),
      lastClickTime: new Date().getTime(),
    }, () => {
      if(this.state.resultClickIndex + 1  > this.state.randomPoints.length && !this.state.autoCorrect){        
          setTimeout(() => {
            this.sendGameResult()
          }, 5000)                
      }
    });
  };

  // Call the API to pass game result
  sendGameResult = () => {
    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - this.props.time,
        static_data: Object.assign(this.state.staticData ?? {},{
          correct_answers: this.state.stateSuccessTaps,
          wrong_answers: this.state.stateWrongTaps,
        }),
        temporal_slices: JSON.parse(this.state.boxes),
        timestamp: new Date().getTime(),
      }),
      "*"
    );
    
    clearInterval(this.timer!);
      clearInterval(this.timerBox!);
      clearInterval(this.resetGoBox!);
      clearInterval(this.resetWaitBox!);
      this.setState({
        boxCount: 0,
        enableTap: false,
        sendResponse: true,
      });
  };

  // Set game state values
  setGameState = () => {
    const rP = getRandomNumbers(this.props.seqLength, 1, this.props.cols * this.props.rows);
    // State values for game state
    
    this.setState({
      // animate: showWaitVal ? false : true,
      // boxCount: this.props.seqLength,
      // boxes: null,
      enableTap: false,
      // endTime: this.state.endTime,
      // nextButton: false,
      orderNumber: -1,
      randomPoints: rP,
    //  showWait: false,
      successTaps: 0,
      wrongTaps: 0,
    });
    this.timer = setTimeout(() => this.showBoxes(rP, 0), 1000);
    
  };

  // Show boxes one by one in secific time intervals
  showBoxes = (rP: Array<number>, i: number) => {
    this.setState({
      activeCell: rP[i],
      // animate: false,
      successTaps: 0,
      wrongTaps: 0,
    });
    if (i + 1 <= rP.length) {
      this.setState({
        animate: true,
        imageIndex: i,
      });
      this.timerBox = setTimeout(() => this.showBoxes(rP, i + 1), this.props.animationInterval);
    } else {
      this.setState({
        showGo: true,
      });
      this.timerBox = setTimeout(() => {
        this.setState({
          enableTap: true,
          gameSequence: false,
          showGo: false,
        });
      }, this.props.animationPersistance);
      if(!!this.state.autoCorrect) {
        setTimeout(() => {
          this.updateAutoCorrection()
        }, 5000);
        
      }
    }
  };

  updateAutoCorrection = () => {
    const correctIndex = this.state.allImages.indexOf(this.state.images[this.state.resultClickIndex])
    const imageIndex = this.state.randomPoints[this.state.resultClickIndex]
    const ele = document.querySelector("[data-key='"+imageIndex+"']")
    if (ele) {
      const items = Array.from(document.querySelectorAll("#images-table div"))
      for(const item of items){
        if(item) {
        item.className = (item?.getAttribute("data-key") !== correctIndex.toString()) ?
            "box-white inactive"
          : "box-white"
        }
      }
      ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex]) 
    }
    this.setState({
      resultClickIndex:this.state.resultClickIndex + 1,
    }, () => {
      if(this.state.resultClickIndex === this.state.randomPoints.length) {
        setTimeout(() => {
          this.resetState()
        }, 2000)
      } else {
        setTimeout(() => {
          if(this.state.resultClickIndex < this.state.randomPoints.length) {
            this.updateAutoCorrection()
          } 
        }, 5000)
      }
    })
 }

  // To set up game board
  createTable = () => {
    const table = [];
    let p =1;
    // Outer loop to create parent
    for (let i = 0; i < this.props.rows; i++) {
      const children = [];
      // Inner loop to create children
      for (let j = 0; j < this.props.cols; j++) {
        const section =  p === this.state.activeCell
            ? <div className={"box-white"}>{this.state.images[this.state.imageIndex]}</div>
            : <div className={"box-white"} data-key={p}>{this.state.randomPoints.includes(p) && 
              this.state.randomPoints.indexOf(p) <= this.state.imageIndex && this.state.gameSequence === true ? 
              this.state.images[this.state.randomPoints.indexOf(p)] : null} </div>;
        children.push(
          <td key={p}>
           {section}
          </td>
        );
        p++;
      }
      // Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };

  createResultTable = () => {
    const table = [];
    let p = 1;
    // Outer loop to create parent
    for (let i = 0; i < this.props.rows; i++) {
      const children = [];
      // Inner loop to create children
      for (let j = 0; j < this.props.cols; j++) {
        const section = <div className={"box-white"} key={p-1} data-key={p-1}
          onClick={this.handleResultClick} >{this.state.allImages[p-1]}</div>
        children.push(
          <td key={p-1}>
           {section}
          </td>
        );
        p++;
      }
      // Create the parent and add the children
      table.push(<tr key={i}>{children}</tr>);
    }
    return table;
  };

  // To set the game board table size based on screen resolution
  getTableStyles = () => {
    const size = window.innerWidth - (window.innerWidth * 10) / 100;
    const styles = { height: `${size}px`, width: `${size}px` };
    return styles;
  };

  // Render the game board
  render() {
    let board;
    let boardResult;
    let alertText = null;
    
      board = (
        <table className="box-table" id="options-table" style={this.getTableStyles()}>
          <tbody>{this.createTable()}</tbody>
        </table>
      );
      boardResult = (
        <table className="box-table" id="images-table" style={this.getTableStyles()}>
          <tbody>{this.createResultTable()}</tbody>
        </table>
      );
     
      alertText = this.state.gameSequence ? (
        <div className="box-info">
          {i18n.t("LEARN_THE_SEQUENCE")}
        </div>
      ) : !this.state.gameSequence ? (this.state.resultClickIndex === 0 ? (
        <div className="box-info">
          { i18n.t("TAP_THE_1st_PICTURE")}
        </div>
      ) : this.state.resultClickIndex === 1 ? (
        <div className="box-info">
          { i18n.t("TAP_THE_2nd_PICTURE")}
        </div>
      ) : this.state.resultClickIndex === 2 ? (
        <div className="box-info">
          { i18n.t("TAP_THE_3rd_PICTURE")}
        </div>
      ) : null) : null; 
    // }

    return (
      <div>       
        {!!this.state.showModalInfo ? <InfoModal
          show={this.state.showModalInfo}
          modalClose={this.handleClose}
          msg={i18n.t("You will see a short sequence of pictures appear in the gray boxes. Please remember the pictures and their locations in order.")}
          language={i18n.language}
        /> :
        !!this.state.showQuestions ? (
          <Questions
           onStateChange={(data: any) => {
            const stateDetails =   Object.assign({},data)
            stateDetails.start_time = new Date(data.start_time)?.getHours() + ":"+ new Date(data.start_time)?.getMinutes() 
            this.setState({staticData: stateDetails})
           }} 
           onSubmit={(data: any) => {
            const stateDetails =   Object.assign({},data)
            stateDetails.start_time = data.start_time?.getHours() + ":"+ data.start_time?.getMinutes() 
            this.setState({staticData: stateDetails, showModalInfo: true})
          }} />
        )
        :
        (
          <div>
            <div className="timer-div">
              {(!!this.state.autoCorrect && this.state.trail<= 3) && "Trial " + (this.state.trail)}
              <br />
            </div>
            <div className="mt-30 box-game">
              <div style={{float:"left"}}> {board}</div>
              {boardResult}
              {alertText}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
