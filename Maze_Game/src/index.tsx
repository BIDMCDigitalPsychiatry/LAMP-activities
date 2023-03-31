/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import  Layout from "./containers/Layout";
const settingsDataInitial = { 
    
  "configuration" : {
    "language" : "en-US"
  }
  
}

const eventMethod = !!window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
eventer(
    messageEvent, (e : any) => {    
		ReactDOM.render(
      <AppContainer>
        <Layout 
        data={
        e.data ? e.data : 
        settingsDataInitial}
          />
      </AppContainer>, 		  
		  document.getElementById("root")
		);
    },
    false
)

