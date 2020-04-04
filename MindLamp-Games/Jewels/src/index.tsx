/**
 * @file   index.tsx
 * @brief  Intial component for the react app
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Jewels from './components/jewels/Jewels';
import './index.css';

ReactDOM.render(
    <Router>
      <div>
       <Switch>
          <Route exact={true} path="/Jewels" component={Jewels} />
        </Switch>
      </div>
    </Router>
  ,
  document.getElementById('root') as HTMLElement
);
