// Core Imports
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
// import "./index.css"
import MedicationTracker from "./components/MedicationTracker"
import "material-icons"
import { SnackbarProvider } from "notistack"

const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
eventer(
  messageEvent, (e) => {    
		ReactDOM.render(
      <SnackbarProvider>
        <AppContainer>
        <MedicationTracker data={e.data}/>
         
        </AppContainer>
      </SnackbarProvider>
          , 		  
		  document.getElementById("root")
		);
  },
  false
 )