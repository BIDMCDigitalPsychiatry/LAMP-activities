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


let root: ReturnType<typeof createRoot> | null = null;

window.addEventListener(
    "message", (e: any) => {
      if (!root) {
        const rootElement = document.getElementById("root");
        if (rootElement) {
          root = createRoot(rootElement);
        }
      }
      if (root) {
        root.render(<AppContainer>
          <DCogs data={e.data}/>
        </AppContainer>);
      }
    },
    false
)
