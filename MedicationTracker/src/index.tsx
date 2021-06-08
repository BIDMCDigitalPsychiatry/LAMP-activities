// Core Imports
import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"
// import "./index.css"
import MedicationTracker from "./components/MedicationTracker"
import "material-icons"

ReactDOM.render(
  <AppContainer>
    <MedicationTracker />
  </AppContainer>,
   document.getElementById('root') as HTMLElement
)
