/**
 * @file   BalloonHeader.tsx
 * @brief  BalloonHeader component which is the used to show the Balloon Header
 * @date   Apr , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */

import * as React from 'react';

class BalloonHeader extends React.Component
{  
  
  // Reload the page 
  reloadPage=() =>{
    window.location.reload();
  }

  // Game render function
  render() {
    return (
        <div className="row">
          <div className="col">
            <h4 style={ {marginRight: "-25px" }}>{process.env.REACT_APP_GAME_TILE}</h4>
            <a className="icn-menu menu-right cursorPointer" onClick={ this.reloadPage }>
            <div className="refresh"/>
            </a>
          </div>
        </div>
    );
  }
}

export default BalloonHeader