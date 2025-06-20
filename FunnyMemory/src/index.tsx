/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import  Layout from "./containers/Layout";
import './index.css';

const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent =  "message"
// const data = {"id":"ztwnbaz3qrsjgqp2yybd",
//   "category":["assess"],
//   "spec":"lamp.survey","name":"Survey branching","description":"desc","photo":null,"streak":{"streak":true,"streakTitle":"streak","streakDesc":"desc"},"visualSettings":null,"branchingSettings":{"total_score":1,"activityId":"6sd48f21rhwa368fc6ew"},"showFeed":true,"schedule":[],
//   "settings":
//   [{"text":"Rich or poor?","type":"list","required":true,"description":"desc",
//     "options":[
//       {"value":"Yes","description":"sfd","contigencySettings":{"enable_contigency":true,"contigency_type":"question","question_index":3}},
//       {"value":"No","description":"Desf","contigencySettings":{"enable_contigency":true,"contigency_type":"activity","activity":"fcykxn345tz3j1bnhjh9"}}],
//       "warnings":[]},
//     {"text":"Have car?","type":"text","required":true,"description":"rer","warnings":[]}, 
//     {
//       "text": "About yourself",
//       "type": "text",
//       "required": true,
//       "description": "",
//       "warnings": []
//     },]}
const data = {
    "activity": {
        "id": "g8m2aj0366azm6jw4642",
        "spec": "lamp.funny_memory",
        "name": "Funny",
        "description": "",
        "photo": null,
        "streak": {
            "streak": true,
            "streakTitle": "",
            "streakDesc": ""
        },
        "visualSettings": null,
        "showFeed": true,
        "schedule": [],
        "settings": {
            "delayBeforeRecall": 1,
            "numberOfTrials": 1,
            "imageExposureTime": 2
        },
        "category": [
            "assess"
        ]
    },
    "configuration": {
        "language": "en-US"
    },
    "autoCorrect": true,
    "noBack": false,
    "is_favorite": false
}
eventer(
    messageEvent, (e : any) => {    
		ReactDOM.render(
      <AppContainer>
        <Layout 
        data={data}
          />
      </AppContainer>, 		  
		  document.getElementById("root")
		);
    },
    false
)

