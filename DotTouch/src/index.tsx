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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DotTouch from './components/DotTouch/DotTouch';
import './index.css';

ReactDOM.render(
    <Router>
      <div>
       <Switch>
          <Route exact={true} path="/DotTouch" component={DotTouch} />
        </Switch>
      </div>
    </Router>
  ,
  document.getElementById('root') as HTMLElement
);
