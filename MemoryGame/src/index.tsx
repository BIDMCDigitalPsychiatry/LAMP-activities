/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import Boxes from './components/box/Boxes';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';


// const eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
// const eventer = window[eventMethod]
// const messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message"
// eventer(
//     messageEvent, (e:any) => {    
		ReactDOM.render(
		  <AppContainer>
		      <Boxes data={null} />
		  </AppContainer>,
		  document.getElementById("root")
		);
//     },
//     false
// )
