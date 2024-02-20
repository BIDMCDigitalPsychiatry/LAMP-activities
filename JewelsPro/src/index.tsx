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
import * as ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import Jewels from './components/jewels/Jewels';
import './index.css';
   
ReactDOM.render(
      <AppContainer>
        <Jewels/>
      </AppContainer>,  
    document.getElementById('root') as HTMLElement
);
