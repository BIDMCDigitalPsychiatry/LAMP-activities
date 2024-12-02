/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import Board from './components/Board.tsx'
import './index.css';
import "material-icons"
const eventer = window.addEventListener
const messageEvent = "message"
eventer(
  messageEvent, (e:any) => {    
		ReactDOM.render(
      <AppContainer>
        <Board data={e.data}/> 
      </AppContainer>
      , 		  
		  document.getElementById("root")
		);
  },
  false
 )