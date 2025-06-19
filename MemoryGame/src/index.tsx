/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch") 
import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import Boxes from './components/box/Boxes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";

const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent =  "message"
eventer(
    messageEvent, (e: any) => { 
const rootElement = document.getElementById("root") as HTMLElement;

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
      "text": "How are you feeling today ?",
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
      "text": "About yourself",
      "type": "text",
      "required": true,
      "description": "",
      "warnings": []
    },
    {
      "text": "How many pets do you have?",
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


if(!!rootElement) { 
	const root = createRoot(rootElement);
	root.render(<AppContainer>
		<Boxes data={data}/>
	</AppContainer>);
}
},
false
) 