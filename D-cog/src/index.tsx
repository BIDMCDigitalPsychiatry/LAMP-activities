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
import DCogs from './components/dcogs/DCogs';
import './index.css';
import { createRoot } from "react-dom/client";


const rootElement = document.getElementById("root") as HTMLElement;
const root = rootElement ? createRoot(rootElement) : null;

window.addEventListener(
    "message", (e: any) => {
      if(root) {
        root.render(<AppContainer>
          <DCogs data={e.data}/>
        </AppContainer>);
      }
    },
    false
)
