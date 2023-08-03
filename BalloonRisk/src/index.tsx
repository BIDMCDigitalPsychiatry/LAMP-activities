import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import Balloon from './components/BallonRisk/Balloon';

const eventer = window.addEventListener
const messageEvent = "message"
eventer(
  messageEvent, (e:any) => {  
    ReactDOM.render(
      <AppContainer>
        <Balloon data={e.data}/>
      </AppContainer>,
      document.getElementById('root') as HTMLElement
      ) 
    },
false
)
