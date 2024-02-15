/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch")

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
import MedicationTracker from './components/MedicationTracker'
import './index.css';
import "material-icons";

const eventMethod ="addEventListener"
const eventer = window[eventMethod]
const messageEvent = "message"
eventer(
  messageEvent, (e:any) => {    
		ReactDOM.render(
      <AppContainer>
        <MedicationTracker data={e.data}/> 
      </AppContainer>
      , 		  
		  document.getElementById("root")
		);
  },
  false
 )