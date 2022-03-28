/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import 'bootstrap/dist/css/bootstrap.min.css';
 
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import VoiceRecording from './components/voice_recording/VoiceRecording';
import './index.css';

const eventMethod: any = window.addEventListener !== undefined ? "addEventListener" : "attachEvent";
const eventer: any = window[eventMethod];
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

eventer(
  messageEvent,
  (e: any) => {
    if(e.data){
      ReactDOM.render(
        <AppContainer>
          <VoiceRecording noBack={e.data.noBack} data={e.data} />
        </AppContainer>,
        document.getElementById("root")
      );
    }
  },
  false
);