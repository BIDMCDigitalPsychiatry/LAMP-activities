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

const activity =  {
  "activity": {
      "id": "1e5qmf93rn385tzpycxp",
      "category": [
          "assess"
      ],
      "spec": "lamp.survey",
      "name": "Matrix 1",
      "description": "test",
      "photo": null,
      "streak": {
          "streak": true,
          "streakTitle": "hai",
          "streakDesc": ""
      },
      "visualSettings": null,
      "showFeed": true,
      "schedule": [],
      "settings": [
          {
              "text": "Which number you like?",
              "type": "matrix",
              "required": true,
              "description": "q1",
              "warnings": []
          },
          {
              "text": "q1",
              "type": "list",
              "required": true,
              "description": "what you select",
              "options": [
                  {
                      "value": "1q",
                      "description": "1q"
                  }
              ],
              "warnings": []
          },
          {
              "text": "2q",
              "type": "list",
              "required": true,
              "description": "de",
              "options": [
                  {
                      "value": "1",
                      "description": ""
                  },
                  {
                      "value": "2",
                      "description": "2"
                  },
                  {
                      "value": "3",
                      "description": "3"
                  }
              ],
              "warnings": [
                  {
                      "answer": "1",
                      "warningText": "1"
                  },
                  {
                      "answer": "2",
                      "warningText": "2"
                  },
                  {
                      "answer": "3",
                      "warningText": "3"
                  },
                  {
                      "answer": "4",
                      "warningText": "4"
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
          <SurveyQuestions data={activity}/> 
        </AppContainer>
      </SnackbarProvider>
          , 		  
		  document.getElementById("root")
		);
//   },
//   false
//  )