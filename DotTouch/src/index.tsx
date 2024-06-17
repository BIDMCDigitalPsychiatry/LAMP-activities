/**
 * @file   index.tsx
 * @brief  Intial component for the game
 * @date   May , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import 'bootstrap/dist/css/bootstrap.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { AppContainer } from "react-hot-loader";
import DotTouch from './components/DotTouch/DotTouch';
import './index.css';

ReactDOM.render(
      // <AppContainer>
        <DotTouch/>,
      // </AppContainer>,
    document.getElementById('root') as HTMLElement
);
