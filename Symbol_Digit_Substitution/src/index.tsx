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
import SymbolDigitSubstitution from "./components/SymbolDigitSubstitution"
import './index.css'
import "material-icons"
const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"

eventer(
  messageEvent, (e) => {  
    ReactDOM.render(
      <AppContainer>
        <SymbolDigitSubstitution data={e.data}/>
      </AppContainer>,  
      document.getElementById('root') 
    ) 
},
false
)