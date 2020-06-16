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

ReactDOM.render(
    <AppContainer>
      <PopTheBubbles/>
    </AppContainer>,
  document.getElementById('root') as HTMLElement
);
