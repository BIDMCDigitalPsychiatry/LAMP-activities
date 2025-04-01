/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import "bootstrap/dist/css/bootstrap.min.css"
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import  Layout from "./containers/Layout";
import './index.css';
const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent =  "message"
eventer(
    messageEvent, (e : any) => {    
		ReactDOM.render(
      <AppContainer>
        <Layout 
        data={e.data}
          />
      </AppContainer>, 		  
		  document.getElementById("root")
		);
    },
    false
)

