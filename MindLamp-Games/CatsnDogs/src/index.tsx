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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CatsNDogs from './components/catsndogs/CatsNDogs';
import './index.css';

ReactDOM.render(
    <Router>
      <div>
         <Switch>
          <Route exact={true} path="/CatsNDogs" component={CatsNDogs} />
        </Switch>
      </div>
    </Router>
  ,
  document.getElementById('root') as HTMLElement
);
