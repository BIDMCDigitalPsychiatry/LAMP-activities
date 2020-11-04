/**
 * @file   Boxes.tsx
 * @brief  Boxes component which is the initial point of Box game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import { faRedo } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';

import Board from './Board';

interface AppState {
    loaded:boolean;
    order:boolean;    
}

class Box extends React.Component<{}, AppState> {
  
  constructor(props: {}) {
    super(props);
    const state = { 
      loaded:false, 
      order:false
    };
    this.state = state;
    const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
    const eventer = window[eventMethod]
    const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
    // Listen to message from child window
    eventer(
      messageEvent, (e:any) => {
        this.setState({order:e.data.order, loaded:true})
    },
      false
    )  
  }
  
  // To refresh the game
  clickHome=() => {
    window.location.reload(false);
  }

  // Game render function
  render() {     
    return (
      <div>
        {this.state && this.state.loaded && (
        <div>
          <nav className="home-link">
          <FontAwesomeIcon icon={faRedo} onClick={this.clickHome}/>
        </nav>
        <div className="heading">Box Game</div>
        <div className="game-board">
        <Board order={this.state.order} 
        />          
      </div> 
      </div>)}
    </div> 
    );
  }
}

export default Box