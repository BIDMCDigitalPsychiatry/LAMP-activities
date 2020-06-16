import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import Balloon from './components/BallonRisk/Balloon';

ReactDOM.render(
  <AppContainer>
    <Balloon/>
  </AppContainer>,
  document.getElementById('root') as HTMLElement
);
