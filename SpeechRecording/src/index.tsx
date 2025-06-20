/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch") 

import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import './index.css';
import { createRoot } from "react-dom/client";
import SpeechRecording from './components/speech_recording/SpeechRecording';

  
const eventMethod = typeof window.addEventListener !== "undefined" ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"


const data = {
"activity": 
{
  "id": "by67jpmk9bcd771w2w2c",
  "category": [
    "assess"
  ],
  "spec": "lamp.survey",
  "name": "SurveyTesting",
  "description": "",
  "photo": null,
  "streak": {
    "streak": true,
    "streakTitle": "",
    "streakDesc": ""
  },
  "visualSettings": null,
  "branchingSettings": {
    "total_score": 1,
    "activityId": "nzhv2h07mv56sxjf0vww"
  },
  "showFeed": true,
  "schedule": [],
  "settings": [
    {
      "question": "How are you feeling today ?",
      "type": "list",
      "required": true,
      "description": "",
      "options": [
        {
          "value": "Good",
          "description": "In a good mood",
          "contigencySettings": {
            "enable_contigency": false,
            "contigency_type": "activity"
          }
        },
        {
          "value": "Bad",
          "description": "In a bad mood",
          "contigencySettings": {
            "enable_contigency": true,
            "contigency_type": "activity",
            "activity": "xbk6vss0hjqs1dfa9zm7"
          }
        }
      ],
      "warnings": []
    },
    {
      "question": "About yourself",
      "type": "text",
      "required": true,
      "description": "",
      "warnings": []
    },
    {
      "question": "How many pets do you have?",
      "type": "list",
      "required": true,
      "description": "",
      "options": [
        {
          "value": "1",
          "description": "one",
          "contigencySettings": {
            "enable_contigency": false
          }
        },
        {
          "value": "2",
          "description": "Two",
          "contigencySettings": {
            "enable_contigency": false
          }
        },
        {
          "value": "3",
          "description": "Three",
          "contigencySettings": {
            "enable_contigency": false
          }
        }
      ],
      "warnings": []
    }
  ]
}
}
eventer(
    messageEvent, (e:any) => {
		const rootElement = document.getElementById("root") as HTMLElement;

if(!!rootElement) { 
const root = createRoot(rootElement);
      root.render(<AppContainer>
            <SpeechRecording noBack={e.data?.noBack} data={data} />
 </AppContainer>);
}
},
false
)


