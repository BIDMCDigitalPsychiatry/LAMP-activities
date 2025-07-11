/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
require("react-hot-loader/patch") 

import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import './index.css';
import { createRoot } from "react-dom/client";
import SpeechRecording from './components/speech_recording/SpeechRecording';

  
const eventMethod = typeof window.addEventListener !== "undefined" ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"

eventer(
    messageEvent, (e:any) => {
		const rootElement = document.getElementById("root") as HTMLElement;

if(!!rootElement) { 
const root = createRoot(rootElement);
      root.render(<AppContainer>
            <SpeechRecording noBack={e.data?.noBack} data={e.data} />
 </AppContainer>);
}
},
false
)
