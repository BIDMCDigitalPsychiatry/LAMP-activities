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
import "material-icons"
import SurveyQuestions from './components/SurveyQuestions'
import './index.css';
import { SnackbarProvider } from "notistack"
import "./i18n"
const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"

 eventer(
   messageEvent, (e) => {    
		ReactDOM.render(
      <SnackbarProvider>
        <AppContainer>
          <SurveyQuestions data={e.data}/> 
        </AppContainer>
      </SnackbarProvider>
          , 		  
		  document.getElementById("root")
		);
   },
   false
  )