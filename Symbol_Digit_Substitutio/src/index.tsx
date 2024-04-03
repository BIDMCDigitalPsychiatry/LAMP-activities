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
import './index.css'
import "material-icons"
import SymbolDigitSubstitution from "./components/SymbolDigitSubstitution"
import i18n from "./i18n"

const eventer = window.addEventListener
const messageEvent = "message"
eventer(
  messageEvent, (e: any) => {   
    const configuration = e.data.configuration
    const langugae = configuration
        ? configuration.hasOwnProperty("language")
            ? configuration.language
            : "en-US"
        : "en-US"
    i18n.changeLanguage(langugae);
console.log(langugae)
		ReactDOM.render(
      <AppContainer>
        <SymbolDigitSubstitution data={e.data}/>
      </AppContainer>     , 		  
    document.getElementById('root') as HTMLElement
    );
  },
  false
 )