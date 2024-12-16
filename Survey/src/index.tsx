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

const data = {
  "activity": {
      "id": "rab6evc0c39fv190cqs0",
      "category": [
          "assess",
          "learn",
          "manage",
          "prevent"
      ],
      "spec": "lamp.survey",
      "name": "Survey warning",
      "description": "test",
      "photo": null,
      "streak": {
          "streak": true,
          "streakTitle": "test",
          "streakDesc": "l;"
      },
      "visualSettings": null,
      "showFeed": true,
      "schedule": [],
      "settings": [
          {
              "text": "Q1",
              "type": "text",
              "required": true,
              "description": "A",
              "warnings": [
                  {
                      "answer": "Help",
                      "warningText": "Please call 988"
                  }
              ]
          }
      ]
  },
  "configuration": {
      "language": "en-US"
  },
  "autoCorrect": true,
  "noBack": false
}

// eventer(
//   messageEvent, (e) => {    
		ReactDOM.render(
      <SnackbarProvider>
        <AppContainer>
          <SurveyQuestions data={data}/> 
        </AppContainer>
      </SnackbarProvider>
          , 		  
		  document.getElementById("root")
		);
//   },
//   false
//  )