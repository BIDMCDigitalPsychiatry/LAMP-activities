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
import Goals from './components/Goals'
import './index.css';
import "material-icons"
const eventer = window.addEventListener
const messageEvent = "message"
eventer(
  messageEvent, (e:any) => {    
		ReactDOM.render(
      <AppContainer>
        <Goals data={e.data}/> 
      </AppContainer>
      , 		  
		  document.getElementById("root")
		);
  },
  false
 )