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
import Boxes from './components/box/Boxes';

import CatsNDogs from './components/catsndogs/CatsNDogs';
import Jewels from './components/jewels/Jewels';


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
ReactDOM.render(
    <Router>
      <div>
        {/* <nav>
               <Link to="/jewels">Jewels</Link>
               <Link to="/dogsncats">Dogs and cats</Link>
        </nav> */}
        <Switch>
          <Route exact={true} path="/Jewels" component={Jewels} />
          <Route exact={true} path="/CatsNDogs" component={CatsNDogs} />
          <Route exact={true} path="/Box" component={Boxes} />
        </Switch>
      </div>
    </Router>
  ,
  document.getElementById('root') as HTMLElement
);
