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
import PopTheBubbles from './components/pop_the_bubbles/PopTheBubbles';
import './index.css';

const eventMethod = typeof window.addEventListener !== "undefined" ? "addEventListener" : "attachEvent"
const eventer = window[eventMethod]
const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
eventer(
    messageEvent, (e:any) => {
		ReactDOM.render(
      <AppContainer>
        <PopTheBubbles activity={e.data.activity} configuration={e.data.configuration} noBack={e.data.noBack} />
      </AppContainer>,
    document.getElementById('root') as HTMLElement
    );
  },
  false
)
