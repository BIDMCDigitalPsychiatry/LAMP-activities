import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import Balloon from './components/BallonRisk/Balloon';

// const eventer = window.addEventListener
// const messageEvent = "message"
// eventer(
//   messageEvent, (e:any) => {  
  const data={
    "activity": {
        "id": "activity91",
        "spec": "lamp.balloon_risk",
        "name": "Balloon Risk",
        "description": "",
        "photo": null,
        "streak": null,
        "showFeed": true,
        "schedule": [],
        "settings": {
            "balloon_count": 15,
            "breakpoint_mean": 64.5,
            "breakpoint_std": 37
        }
    },
    "configuration": {
        "language": "en-US"
    },
    "autoCorrect": true,
    "noBack": false
}
    ReactDOM.render(
      <AppContainer>
        <Balloon data={data}/>
      </AppContainer>,
      document.getElementById('root') as HTMLElement
      ) 
//     },
// false
// )
