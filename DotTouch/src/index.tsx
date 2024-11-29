/**
 * @file   index.tsx
 * @brief  Intial component for the game
 * @date   May , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import { AppContainer } from "react-hot-loader";
import DotTouch from './components/DotTouch/DotTouch';
import './index.css';
import { createRoot } from "react-dom/client";
const eventMethod = "addEventListener"
const eventer = window[eventMethod]
const messageEvent =  "message"
eventer(
    messageEvent, (e: any) => { 
    const rootElement = document.getElementById("root") as HTMLElement;

    if(!!rootElement) { 
      const root = createRoot(rootElement);
            root.render(<AppContainer>
              <DotTouch data={e.data}/>
            </AppContainer>);
      }
    },
    false
)