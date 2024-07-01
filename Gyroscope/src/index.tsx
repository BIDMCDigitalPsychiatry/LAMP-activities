/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   June , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import  Layout from "./containers/Layout";

const eventMethod = !!window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"

eventer(
    messageEvent, (e : any) => {    
		ReactDOM.render(
      <AppContainer>
        <Layout data={e.data}/>
      </AppContainer>, 		  
		  document.getElementById("root")
		);
  },
  false
)

