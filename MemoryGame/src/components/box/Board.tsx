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

import { Backdrop,  CircularProgress} from "@material-ui/core";

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
  enableLocationTap: boolean;
  enableTap: boolean;
  endTime: any;
  imageIndex: number,
  failureCount: number;
  gameSequence: boolean;
  locationIndex: number;
  gameState: number;
  lastClickTime: any;
  orderNumber: number;
  randomPoints: Array<number>;
  trail:number;
  showQuestions: boolean;
  staticData: any;
  successStages: number;
  successTaps: number;
  successTapImage: boolean;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any;
  resultClickIndex:number;
  wrongTaps: number;
  showModalInfo: boolean;
  sendResponse: boolean;
  images: any,
  loading: boolean;
  supportsSidebar: boolean;
}

interface BoardProps {
  animationInterval: number;
  animationPersistance: number;
  autoCorrect: boolean;
  encodingTrials: number;
  foils: number;
  seqLength: number;
  time: number;
  language: string;
}

class Board extends React.Component<BoardProps, BoardState> {
  private timer: any;
  private locationautoTimer: any;
  private timerBox: any;
  private resetWaitBox: any;
  private resetGoBox: any;
  private autoCorrectionTimer: any;
  private autoCorrectionStartTimer: any;
  private resetTimer: any;
  private correctionTimer: any;
  private locationTimer: any;
  constructor(props: BoardProps) {
    super(props);
    i18n.changeLanguage(!props.language ? "en-US" : props.language);
    this.state = {
      activeCell: -1,
      allImages: [],
      animate: false,
      autoCorrect: this.props.autoCorrect,
      boxClass: ["box-square"],
      boxCount: 1,
      boxes: null,
      clickedImageIndex: -1,
      completed: false,
      enableLocationTap: false,
      enableTap: false,
      endTime: null,
      failureCount: 0,
      gameSequence: false,
      gameState: 0,
      imageIndex:0,
      images: [],
      lastClickTime: null,
      loading:false,
      locationIndex: 0,
      orderNumber: -1,
      randomPoints: [],
      resultClickIndex:0,
      sendResponse: false,
      showModalInfo: false,
      showQuestions: false,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      staticData: null,
      successStages: 0,
      successTapImage: false,
      successTaps: 0,
      supportsSidebar:window.matchMedia("(min-width: 768px)").matches,
      trail:0,
      wrongTaps: 0,
    };
  }
  
  // Modal close is handled here
  handleClose = (status: boolean) => {
    this.setState({
      lastClickTime: new Date().getTime(),      
      showModalInfo: status,   
    }, () => {
      this.resetGoBox = setTimeout(() => {
        this.setState({lastClickTime: new Date().getTime()}, () =>{
          this.setGameState();
        });
      }, 2000);
    });
  };

  // On load function - set state of the gamne
  componentDidMount = () => {       
    this.setState({
      loading: true,
    }, () => {
      this.resetState();
    })    
  };

   // Reset game state for each state
  resetState = () => {
    clearInterval(this.timer!);
    clearInterval(this.timerBox!);
    clearInterval(this.resetGoBox!);
    clearInterval(this.resetWaitBox!);
    clearInterval(this.autoCorrectionTimer)
    clearInterval(this.resetTimer)
    clearInterval(this.correctionTimer)
    clearInterval(this.autoCorrectionStartTimer)
    clearInterval(this.locationTimer)
    clearInterval(this.locationautoTimer)
    if(this.state.trail === 3 && !this.state.showQuestions) {
      this.setState({
        loading: false,
        showQuestions:true
      }, () => {
        setTimeout(() => {
          this.setState({
            loading: true,
            showQuestions: false,
          }, () => {
            this.resetState()
          })
        }, 60000)
      })
    } else {
    

    const selected = getImages(this.props.seqLength, [])
    const resultImages = selected.images.concat(getImages((this.props.foils === 1 ? 9 : 12) - this.props.seqLength, 
      selected.numbers, selected.keys).images).sort(() => Math.random() - 0.5);

    this.setState({
      activeCell: -1,
      allImages:  this.state.trail <= 3 && this.state.allImages.length > 0 ? this.state.allImages : resultImages,
      animate: false,
      autoCorrect: this.state.trail <= 3 ? true : false,
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
      images: this.state.trail <= 3  && this.state.allImages.length > 0 ? this.state.images : selected?.images,
      lastClickTime: null,
      loading: this.state.trail > 0 ? true : false,
      orderNumber: -1,
      randomPoints: this.state.trail <= 3  && this.state.randomPoints.length > 0 ? this.state.randomPoints : getRandomNumbers(this.props.seqLength, 1, 9),
      resultClickIndex:0,
      sendResponse: false,
      showModalInfo: this.state.trail === 0 ? true : false,
      showQuestions: false,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      states: null,
      successStages: 0,
      successTaps: 0,
      supportsSidebar:window.matchMedia("(min-width: 768px)").matches,
      trail: this.state.trail + 1,
      wrongTaps: 0,
    }, () => {
      if(this.state.trail > 1) {
          let items = Array.from(document.querySelectorAll("#options-table div"))
          for(const item of items){
            if(item) {
            item.innerHTML = ""
          }
        }    
          items = Array.from(document.querySelectorAll("#images-table div"))
          for(const item of items){
            if(item) {
            item.innerHTML = ""
          }               
        }
        setTimeout(() => {
          this.handleClose(false)         
        }, 1000)
      }   
      this.resetBoxClass();
      // To show wait message
      this.resetWaitBox = setTimeout(() => {  
          this.setState({
            gameSequence: true,
            orderNumber: -1,
          })   
      }, 1000);   

      
    })           
  }
}
 // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName("box-white")).forEach((elem) => {
      elem.className = "box-white inactive";
    });
  }

  handleLocationClick = (e:any) => {
    if(!!this.state.enableLocationTap) {
      if(!!this.state.autoCorrect) {
        clearInterval(this.autoCorrectionTimer)
        clearInterval(this.resetTimer)
        clearInterval(this.correctionTimer)
        clearInterval(this.autoCorrectionStartTimer)
        clearInterval(this.locationTimer)
        clearInterval(this.locationautoTimer)

      }
      let success = false
      const index = e.target.closest("div").getAttribute("data-key")
      const imageIndex = this.state.randomPoints[this.state.resultClickIndex]
      if((!!this.state.successTapImage && parseInt(index, 10) === imageIndex)) {
        success = true
        const ele = document.querySelector("[data-key='"+imageIndex+"']")
        if (ele) {
          ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex])        
        }
      } else {
        const ele = document.querySelector("[data-key='"+index+"']")
        if (ele) {
          ele.className = "box-white error-box"  
          this.setState({
            clickedImageIndex: index,                
            enableLocationTap: false,
            enableTap:
              this.state.resultClickIndex + 1  < this.state.randomPoints.length
                ? true
                : false}, () => {
          setTimeout(() => {
            ele.className = "box-white" 
            if(!!this.state.autoCorrect) {
              this.correctLocation()
            }
          }, 1500) 
        })     
        }          
      }
      
      this.setState({
        clickedImageIndex: index,                
        enableLocationTap: false,
        enableTap:
          this.state.resultClickIndex + 1  < this.state.randomPoints.length
            ? true
            : false,
        resultClickIndex:  !!success || !this.state.autoCorrect ? 
            this.state.resultClickIndex + 1 : this.state.resultClickIndex,        
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
      }, () => {                    
        if(!this.state.autoCorrect) {
          this.updateWithTaps(index, success);
        }
        this.setUpdateProcess()
      })      
  }
}

  handleResultClick = (e:any) => {    
    if (this.state.enableTap) { 
      if(!!this.state.autoCorrect) {
        clearInterval(this.autoCorrectionTimer)
        clearInterval(this.resetTimer)
        clearInterval(this.correctionTimer)
        clearInterval(this.autoCorrectionStartTimer)
        clearInterval(this.locationTimer)
        clearInterval(this.locationautoTimer)
      } 
      
      const index = e.target.closest("div").getAttribute("data-key")
      const success =  this.state.allImages[parseInt(index, 10)] === this.state.images[this.state.resultClickIndex]
     console.log(success, index )
        const targets = e.target.closest("table").querySelectorAll("div")
        for(const i of targets){
          i.className = !success && i.getAttribute("data-key") === index ?
              "box-white inactive error-box"
            : (i.getAttribute("data-key") !== index) && !!success ?
            "box-white inactive"
          : "box-white"
        }
        this.setState({
          enableLocationTap: true, enableTap: false,  locationIndex: this.state.resultClickIndex,successTapImage: success
        }, () => {
        setTimeout(() => {
          for(const i of targets){
            i.className =  "box-white"
          }           
        }, 1000)

        if(!success && !!this.state.autoCorrect ) {
          setTimeout(() => {
            this.correctPicture()
          }, 1500)
        } 
        if(!!success && !!this.state.autoCorrect ) {
          this.locationTimer = setTimeout(() => {
            this.correctLocation()
          }, 5000)
        }
      })
        
                   
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

    if (typeof this.state.boxes !== "undefined" && this.state.boxes !== null) {
      const r = JSON.parse(this.state.boxes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
    }
    const route = {
      duration: lastclickTime,
      item: boxNo,
      level: this.state.gameState,
      type: statusVal,
      value: null,
    };
    boxes.push(route);
    this.setState({
      boxes: JSON.stringify(boxes),
      lastClickTime: new Date().getTime(),
    }, () => {
      if(this.state.resultClickIndex + 1  > this.state.randomPoints.length && !this.state.autoCorrect){         
        setTimeout(() => {
          this.setState({
            loading:true,
          })       
          this.sendGameResult()
        }, 2000)                
      }
    });
  };

  // Call the API to pass game result
  sendGameResult = () => {
    let points = 0
    const gameScore = (this.state.stateSuccessTaps/this.props.seqLength) * 100
    if (gameScore === 100) {
      points = points + 2;
    } else {
      points = points + 1;
    }

    parent.postMessage(
      JSON.stringify({
        duration: new Date().getTime() - this.props.time,
        static_data: Object.assign(this.state.staticData ?? {},{
          correct_answers: this.state.stateSuccessTaps,
          point: points,
          total_questions: this.props.seqLength,
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
    // State values for game state
    this.setState({
      enableTap: false,
      loading: false,
      orderNumber: -1,
      randomPoints:  this.state.randomPoints,
      successTaps: 0,
      wrongTaps: 0,
    }, () => {
      this.timer = setTimeout(() => this.showBoxes( this.state.randomPoints , 0), 1000);    
    });
  };

  // Show boxes one by one in secific time intervals
  showBoxes = (rP: Array<number>, i: number) => {
    this.setState({
      activeCell: rP[i],
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
      this.timerBox = setTimeout(() => {
        this.setState({
          enableTap: true,
          gameSequence: false,
          lastClickTime: new Date().getTime(),
        });        
      }, this.props.animationPersistance); 
      if(!!this.state.autoCorrect) {   
        this.updateAutoCorrection()
      }
    }  
  };

  correctPicture = () => {
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
      setTimeout(() => {
        for(const item of items){
          if(item) {
            item.className = "box-white"
          }
        } 
      }, 1500)
      this.setState({
        enableLocationTap: true, enableTap: false,  locationIndex: this.state.resultClickIndex,successTapImage: true
      }, () => {
        this.locationTimer = setTimeout(() => {          
          this.correctLocation()
        } , 5000)      
      })
    }
  }

  correctLocation = () => {
    const imageIndex = this.state.randomPoints[this.state.resultClickIndex]
    const ele = document.querySelector("[data-key='"+imageIndex+"']")
    if (ele) {
      ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex]) 
      this.setState({
        enableLocationTap: false, enableTap: true, resultClickIndex: this.state.resultClickIndex + 1
      }, () => {
        this.setUpdateProcess()
      })        
    }
  }

  setUpdateProcess = () => {
    if (!!this.state.autoCorrect) {
      if (this.state.resultClickIndex < this.state.randomPoints.length) {
        this.updateAutoCorrection() 
      } else {
        setTimeout(() => {
          this.resetState()
        }, 1500)
      }
    }
  }

  updateAutoCorrection = () => {
    clearInterval(this.locationTimer)
    this.autoCorrectionStartTimer = setTimeout(() => {
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
        setTimeout(() => {
          for(const item of items){
            if(item) {
              item.className = "box-white"
            }
          } 
        }, 1500)
        this.locationautoTimer = setTimeout(() => {
          ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex])
          this.setState({
            enableLocationTap: false, enableTap: true, locationIndex: this.state.resultClickIndex + 1, resultClickIndex: this.state.resultClickIndex + 1
          }, () => {
            if(this.state.resultClickIndex < this.state.randomPoints.length) {
                this.updateAutoCorrection() 
            } else {
              setTimeout(() => {
                this.resetState()
              }, 1500)
            }
          })
        } , 5000)  
      }
    }, 5000)  
  }   
 
  // To set up game board
  createTable = () => {
    const table = [];
    let p =1;
    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      const children = [];
      // Inner loop to create children
      for (let j = 0; j < 3; j++) {
        const section =  p === this.state.activeCell
            ? <div className={"box-white"} key={p-1} data-key={p-1} onClick={this.handleLocationClick} >{!!this.state?.images ? this.state?.images[this.state?.imageIndex ?? 0]?? null : null}</div>
            : <div className={"box-white"} onClick={this.handleLocationClick} data-key={p}>{!!this.state.randomPoints && (this.state.randomPoints || []).includes(p) && 
              (this.state?.randomPoints || []).indexOf(p) <= this.state.imageIndex && this.state.gameSequence === true ? 
              (this.state?.images[(this.state.randomPoints || []).indexOf(p)] ?? null) : null} </div>;
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
    if((this.state?.allImages || []).length > 0) {
    // Outer loop to create parent
    for (let i = 0; i < (this.props.foils === 1 ? 3 : 4); i++) {
      const children = [];
      // Inner loop to create children
      for (let j = 0; j < 3 ; j++) {
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
  }
    return table;
  };

  // To set the game board table size based on screen resolution
  getTableStyles = () => {
    const size = window.innerWidth - (window.innerWidth * 10) / 100;
    const styles = { width: `${size}px` };
    return styles;
  };

  // Render the game board
  render() {
    let board;
    let boardResult;
    let alertText = null;
    if(!!this.state) { 
      if(!this.state?.loading && (this.state?.images || []).length > 0) {
        board = (
          <table className="box-table" id="options-table" style={this.getTableStyles()}>
            <tbody>{this.createTable()}</tbody>
          </table>
        );
      }
      boardResult = (
        <table className="box-table" id="images-table" style={this.getTableStyles()}>
          <tbody>{this.createResultTable()}</tbody>
        </table>
      );
      alertText = !this.state?.loading && !!this.state.gameSequence ? (
        <div className="box-info">
          {i18n.t("LEARN_THE_SEQUENCE")}
        </div>
      ) : (!!this.state.enableTap || !!this.state.enableLocationTap) && this.state.resultClickIndex < this.props.seqLength ? 
        (this.state.resultClickIndex === 0 ? (
        <div className="box-info">
          {!!this.state.enableTap ? i18n.t("TAP_THE_1st_PICTURE") : i18n.t("PLACE_THE_1st_PICTURE")}
        </div>  
      ) : this.state.resultClickIndex === 1 ? (
        <div className="box-info">
          {!!this.state.enableTap ? i18n.t("TAP_THE_2nd_PICTURE"): i18n.t("PLACE_THE_2nd_PICTURE")}
        </div>
      ) : this.state.resultClickIndex === 2 ? (
        <div className="box-info">
          {!!this.state.enableTap ? i18n.t("TAP_THE_3rd_PICTURE") :  i18n.t("PLACE_THE_3rd_PICTURE")}
        </div>
      ) : this.state.resultClickIndex === 3 ? (
        <div className="box-info">
          {!!this.state.enableTap ? i18n.t("TAP_THE_4th_PICTURE") :  i18n.t("PLACE_THE_4th_PICTURE")}
        </div>
      ) : null) : null; 
      }
    
    return (
      <div>       
        {!!this.state && (!!this.state.showModalInfo ? <InfoModal
          show={this.state.showModalInfo}
          modalClose={this.handleClose}
          msg={i18n.t("INSTRUCTION")}
          language={i18n.language}
        /> :
        !!this.state.showQuestions ? (
          <Questions
           language={this.props.language}
           onStateChange={(data: any) => {
            const stateDetails =   Object.assign({},data)
            stateDetails.start_time = new Date(data.start_time)?.getHours() + ":"+ new Date(data.start_time)?.getMinutes() 
            this.setState({staticData: stateDetails})
           }} 
           onSubmit={(data: any) => {
            const stateDetails =   Object.assign({},data)
            stateDetails.start_time = data.start_time?.getHours() + ":"+ data.start_time?.getMinutes() 
            this.setState({loading:true, staticData: stateDetails})
            setTimeout(() => {
              this.resetState()
            }, 1500)
          }} />
        )
        :
        (
          <div>
            <div className="timer-div">
              {(!!this.state.autoCorrect && this.state.trail<= 3) && "Trial " + (this.state.trail)}
              <br />
              {this.state.supportsSidebar === false && alertText}
            </div>
            <div className="mt-30 box-game">
              <div style={{float:"left"}}> {board}</div>
              <div className="secondbox">
              {(!this.state.loading && this.state.imageIndex  === this.props.seqLength - 1 && !this.state.gameSequence) 
                && boardResult}
              </div>
              {this.state.supportsSidebar === true && alertText}
            </div>
          </div>
        ))}
        <Backdrop className="backdrop" open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default Board;
