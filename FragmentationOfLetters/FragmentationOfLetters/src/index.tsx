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
const settingsData = {
  "activity": {
      "id": "9qk2rp1759shht2xxag6",
      "spec": "lamp.simple_memory",
      "name": "memory funny",
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
          "startingFragmentation": 50,          
      },
      "category": [
          "assess"
      ]
  },
  "configuration": {
      "language": "en-US"
  },
  "autoCorrect": true,
  "noBack": false
}



// const eventMethod = !!window.addEventListener ? "addEventListener" : "attachEvent"
// const eventer = window[eventMethod]
// const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
// eventer(
//     messageEvent, (e : any) => {    
		ReactDOM.render(
      <AppContainer>
        <Layout 
        data={settingsData}
          />
      </AppContainer>, 		  
		  document.getElementById("root")
		);
//     },
//     false
// )

