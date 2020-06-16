/**
 * @file   CatsNDogs.tsx
 * @brief  CatsNDogs component which is the initial point of Cats and Dogs game
 * @date   Mar , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import Board from './Board';

import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

   
interface AppState {
    current:any;    
}

class CatsNDogs extends React.Component<{}, AppState> {
  
  constructor(props: {}) {
    super(props);
  }
  
  // To refresh the game
  clickHome=() => {
    window.location.reload(false);
  }

  // Game render function
  render() {     
    return (
      <div>
        <nav className="home-link">
          <FontAwesomeIcon icon={faRedo} onClick={this.clickHome}/>
        </nav>
        <div className="heading">Cats and Dogs</div>
        <div className="game-board">
        <Board/>          
      </div> 
    </div> 
    );
  }
}

export default CatsNDogs