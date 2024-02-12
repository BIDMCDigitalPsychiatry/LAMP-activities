/**
 * @file   Board.tsx
 * @brief  Board component to load box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from "react";
import getImages from "./RandomImage"

import { faArrowLeft, faRedo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { renderToString } from 'react-dom/server'

import { Backdrop,  CircularProgress } from "@material-ui/core";

import { getRandomNumbers } from "../../functions";

import i18n from "./../../i18n";

import ErrorBoundary from "../common/ErrorBoundary";

import Questions from "./Questions"

import { InfoModal } from "../common/InfoModal";

import "./box.css";

/* eslint-disable no-restricted-globals */

interface BoardState {
  activeCell: number;
  animate: boolean;
  allImages:any;
  autoCorrect: boolean;
  boxClass: Array<string>;
  boxCount: number;
  boxes: any;
  clickedImageIndex: number;
  clickedIndex: number;
  completed: boolean;
  enableLocationTap: boolean;
  enableTap: boolean;
  endTime: any;
  imageIndex: number,
  failureCount: number;
  gameSequence: boolean;
  locationIndex: number;
  error:boolean;
  gameState: number;
  lastClickTime: any;
  orderNumber: number;
  randomPoints: Array<number>;
  trail:number;
  showQuestions: boolean;
  staticData: any;
  startTime:number;
  successStages: number;
  successTaps: number;
  successTapImage: boolean;
  stateSuccessTaps: number;
  stateWrongTaps: number;
  states: any;
  resultClickIndex:number;
  imageSelections: any;
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
  noBack: boolean;
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
      clickedIndex: -1,
      completed: false,
      enableLocationTap: false,
      enableTap: false,
      endTime: null,
      error:false,
      failureCount: 0,
      gameSequence: false,
      gameState: 0,
      imageIndex:0,  
      imageSelections: null,
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
      startTime:new Date().getTime(),
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
        this.setState({lastClickTime: new Date().getTime()}, () =>{
          
          this.timer = setTimeout(() => {
            this.setGameState();
          }, this.props.animationInterval)
        });
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
  resetState = (type?:number) => {
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
            trail:this.state.trail + 1,
          }, () => {    
            this.resetState()
          })
        }, 59999)
      })
    } else {
    const selected = getImages(this.props.seqLength)
  
    this.setState({
      activeCell: -1,
      allImages:  this.state.allImages.length > 0 ? this.state.allImages : selected.resultImages,
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
      imageSelections: this.state.imageSelections?.length > 0? this.state.imageSelections : selected.imageIndexes,
      images: this.state.allImages.length > 0 ? this.state.images : selected?.images,
      lastClickTime: null,
      loading: this.state.trail > 0 && this.state.trail <=3 ? true : false,
      orderNumber: -1,
      randomPoints: this.state.randomPoints.length > 0 ? this.state.randomPoints : getRandomNumbers(this.props.seqLength, 1, 9),
      resultClickIndex:0,
      sendResponse: false,
      showModalInfo: this.state.trail === 0 ? true : false,
      showQuestions: false,
      stateSuccessTaps: 0,
      stateWrongTaps: 0,
      successStages: 0,
      successTaps: 0,
      supportsSidebar:window.matchMedia("(min-width: 768px)").matches,
      trail: typeof type !== "undefined" ? this.state.trail : this.state.trail + 1,
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
        if(this.state.trail <= 3) { this.handleClose(false) } else {
            this.setState({
              enableTap: true,
              gameSequence: false,
              imageIndex: this.props.seqLength -1,
              lastClickTime: new Date().getTime(),
              loading:false,
            });        
        }      
      }   
      this.resetBoxClass();
      this.setState({
        orderNumber: -1,
      })   
    })           
  }
}
 // Rest box styles after each load
  resetBoxClass = () => {
    Array.from(document.getElementsByClassName("box-white")).forEach((elem) => {
      elem.className = "box-white inactive";
    });
  }

  resetBoxGreyClass = () => {
    Array.from(document.getElementsByClassName("box-white")).forEach((elem) => {
      elem.className = "box-white";
    });
  }

  handleLocationClick = (e:any) => {
    if(!!this.state.enableLocationTap && (this.state.boxes === null || (this.state.boxes !== null && JSON.parse(this.state.boxes).length 
    <  2* this.state.randomPoints.length))) {
      this.resetBoxGreyClass()
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
        const elem = document.querySelector("[data-key='"+imageIndex+"']")

        if (elem) {
          elem.innerHTML = renderToString(this.state.images[this.state.resultClickIndex])        
        }
      } else {
        if(!this.state.autoCorrect) {
          const elem = document.querySelector("[data-key='"+index+"']")

          if (elem) {
            elem.innerHTML = renderToString(this.state.allImages[this.state.clickedIndex])        
          }
        }
        const ele = document.querySelector("[data-key='"+index+"']")
        if (ele) {
          ele.className = "box-white error-box"  
          this.setState({
            clickedImageIndex: index,                
            enableLocationTap: false,
            enableTap:
            this.state.boxes === null || (this.state.boxes != null && 
              JSON.parse(this.state.boxes).length < 2*this.state.randomPoints.length)    
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
        this.updateWithTaps(index, 2, success);
      })      
  }
}

  handleResultClick = (e:any) => {    
    if (this.state.enableTap && (this.state.boxes === null || (this.state.boxes !== null && JSON.parse(this.state.boxes).length 
    <  2* this.state.randomPoints.length))) {
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
        const targets = e.target.closest("table").querySelectorAll("div")
        for(const i of targets){

          i.className = !!this.state.autoCorrect ? (!success && i.getAttribute("data-key") === index ?
              "box-white inactive error-box"
            : (i.getAttribute("data-key") !== index) && !!success ?
            "box-white inactive"
          : "box-white") : (i.getAttribute("data-key") === index ?
          (!success ? "box-white error-box" : "box-white")
        : "box-white inactive") 
        }
        this.setState({
          clickedIndex: index,  locationIndex: this.state.resultClickIndex,successTapImage: success
        }, () => {
        this.updateWithTaps(index, 1, success);
        if(!success && !!this.state.autoCorrect ) {
          setTimeout(() => {
            this.correctPicture()
          }, 1500)
        }       
      })           
   }
  }
 
  // To track echa tap on box
  updateStateWithTaps = () => {
    if(JSON.parse(this.state.boxes).length === 2*this.state.randomPoints.length) {
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
    }, () => {
        if(this.state.autoCorrect !== true)
        {
          setTimeout(() => {
          this.setState({
            loading:true,
          })    
          this.sendGameResult()
   
        }, 2000) 
      } else {
        this.resetTimer = setTimeout(() => {
          this.setState({
            loading:true,
          })    
          this.resetState()   
        }, 2000) 
      }             
    });
  }
  };

  // Update the state values after each game state
  updateWithTaps = async (index: number, type: number, statusVal: boolean) => {
    const boxes = [];
    const lastclickTime = new Date().getTime() - this.state.lastClickTime;
    let status = true
    if (typeof this.state.boxes !== "undefined" && this.state.boxes !== null) {
      const r = JSON.parse(this.state.boxes);
      Object.keys(r).forEach((key) => {
        boxes.push(r[key]);
      });
      status = (r[r.length-1].item === type) ? false : true
    }
    if(!!status) {
      const route = {
        duration: lastclickTime,
        item: type,
        level: this.state.trail > 3 ? 4 : this.state.trail,
        type: statusVal,
        value: parseInt(index.toString(), 10),
      };
      boxes.push(route);
      this.setState({
        boxes: JSON.stringify(boxes),
        enableLocationTap: type === 1 && (
          this.state.boxes === null || (this.state.boxes != null && 
            JSON.parse(this.state.boxes).length < 2 * this.state.randomPoints.length)) ? true : false,
        enableTap: type === 2 && (
        this.state.boxes === null || (this.state.boxes != null && 
          JSON.parse(this.state.boxes).length < 2 * this.state.randomPoints.length))
            ? true
            : false,
        lastClickTime: new Date().getTime()
      }, () => {
        this.updateStateWithTaps()       
      })
    }
  };

  // Call the API to pass game result
  sendGameResult = (status?: boolean) => {
    const route = {'type': 'manual_exit', 'value': status?? false} 
      const states = [];
      if (this.state.states !== null) {
        const r = JSON.parse(this.state.states);
        Object.keys(r).forEach((key) => {
          states.push(r[key]);
        });
      }
      states.push(route);
      this.setState({
        states: JSON.stringify(states),
      }, () => {
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
          images: this.state.imageSelections,
          locations:this.state.randomPoints,
          point: points,
          total_questions: this.props.seqLength,
          wrong_answers: this.state.stateWrongTaps,
        }),
        temporal_slices: JSON.parse(this.state.states),
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
    })
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
      this.showBoxes(0);    
    });
  };

  // Show boxes one by one in secific time intervals
  showBoxes = (i: number) => {
    this.setState({
      activeCell: this.state.randomPoints[i],
      successTaps: 0,
      wrongTaps: 0,
    }, () => {
      if (i < this.state.randomPoints.length) {
        this.setState({
          animate: true,
          imageIndex: i,
        }, () => {
          this.timerBox = setTimeout(() => {          
            this.showBoxes(i + 1)
            this.setState({
              gameSequence: true,
            });
          }, this.props.animationInterval + 300);
        });        
      } else {
        this.timerBox = setTimeout(() => {
          this.setState({
            enableTap: true,
            gameSequence: false,
            lastClickTime: new Date().getTime(),
          }, () => {
            if(!!this.state.autoCorrect) { 
              this.updateAutoCorrection()
            }  
          });
        }, this.props.animationPersistance);  
           
      }
    });
      
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
    
      this.setState({
        locationIndex: this.state.resultClickIndex, successTapImage: true
      }, () => {
        this.locationTimer = setTimeout(() => {   
          this.updateWithTaps(imageIndex, 2, false)       
          this.correctLocation()
        } , 8000)      
      })
    }
  }

  correctLocation = () => {
    clearInterval(this.locationTimer)
    this.resetBoxGreyClass()
    const imageIndex = this.state.randomPoints[this.state.resultClickIndex]
    const ele = document.querySelector("[data-key='"+imageIndex+"']")
    if (ele) {
      ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex]) 
      this.setState({
        resultClickIndex: this.state.resultClickIndex + 1
      }, () => {
        if(JSON.parse(this.state.boxes).length < 2* this.state.randomPoints.length) {
          this.updateAutoCorrection() 
        }
      })     
    }
  }


  updateAutoCorrection = () => {
     clearInterval(this.autoCorrectionStartTimer)
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
        this.updateWithTaps(correctIndex, 1, false);

        this.setState({
            locationIndex: this.state.resultClickIndex, successTapImage: true
          }, () => {

            this.updateAutoLocation() 

            setTimeout(() => {
              this.resetBoxGreyClass()
             }, 1500)
          })
      }
    }, 8000) 

  } 
  updateAutoLocation = () => {
    clearInterval(this.locationTimer)
    clearInterval(this.autoCorrectionStartTimer)

    this.locationautoTimer = setTimeout(() => {
      const imageIndex = this.state.randomPoints[this.state.resultClickIndex]

      const ele = document.querySelector("[data-key='"+imageIndex+"']")
      if (ele) {

      ele.innerHTML = renderToString(this.state.images[this.state.resultClickIndex])
      this.updateWithTaps(imageIndex, 2, false);

      this.setState({
        locationIndex: this.state.resultClickIndex + 1, resultClickIndex: this.state.resultClickIndex + 1
      }, () => {
        if(JSON.parse(this.state.boxes).length === 2 * this.state.randomPoints.length) {           
          this.resetTimer= setTimeout(() => {
            this.resetState()
          }, 2000)
        } else {
          this.updateAutoCorrection()
        }
      })
    }
    } , 8000)  
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
        const section =  p === this.state.activeCell && this.state.animate === true
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

  
  // To refresh the game
  clickHome = () => {
    window.location.reload();
  };

  clickBack = () => {    
      this.sendGameResult(true)  
  }

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
      boardResult = (!this.state.loading && this.state.imageIndex  === this.props.seqLength - 1 && !this.state.gameSequence)?
      (
        <div>
          <table className="box-table" id="images-table" style={this.getTableStyles()}>
            <tbody>{this.createResultTable()}</tbody>
          </table>
        </div>
      ) : <div>{null}</div>;
      alertText = !this.state?.loading && !this.state.enableTap  && !this.state.enableLocationTap ? (
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
               {!this.props.noBack && <nav className="back-link">
                <FontAwesomeIcon icon={faArrowLeft} onClick={this.clickBack} />
              </nav>}
              <nav className="home-link">
                <FontAwesomeIcon icon={faRedo} onClick={this.clickHome} />
              </nav>
              <div className="heading">{i18n.t("MEMORY_GAME")}</div>
              <div className="game-board">
        <div>       
          {!!this.state && 
          !!this.state.error ? (
            <div>Some unexpected error, please <button onClick={() => this.resetState(1)}>restart</button> the trial</div>
          ) :
          (!!this.state.showModalInfo ? <InfoModal
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
              stateDetails.start_time = new Date(data.start_time)?.getHours() + ":"+ new Date(data.start_time)?.getMinutes() 
              this.setState({loading:true, staticData: stateDetails})
              setTimeout(() => {
                this.resetState()
              }, 1000)
            }} />
          )
          :
          (
            <div>
              <div className="timer-div">
                {(!!this.state.autoCorrect && this.state.trail<= 3) && <div>{"Trial " + (this.state.trail)}<br /></div>}              
                {this.state.supportsSidebar === false && alertText}
              </div>
              <div className="mt-30 box-game">
                <div style={{float:"left"}}> {board}</div>
                <div className="secondbox">
                  <ErrorBoundary errorFn={() => this.resetState(1)}>
                    {boardResult}
                  </ErrorBoundary>
                </div>
              </div>
              {this.state.supportsSidebar === true && alertText}
            </div>
          ))}
          <Backdrop className="backdrop" open={this.state.loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
       </div>
       </div> 
      );
    }
  }
  export default Board;
