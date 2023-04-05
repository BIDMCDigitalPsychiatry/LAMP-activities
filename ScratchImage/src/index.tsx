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
import ScratchImage from './components/ScratchImage'
import './index.css';
   
const eventMethod = typeof window.addEventListener !== "undefined" ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
eventer(
    messageEvent, (e:any) => {
		ReactDOM.render(
  <AppContainer>
    <ScratchImage  data={e.data}/>
  </AppContainer>,  
  document.getElementById('root') as HTMLElement
  );
  },
  false
)

