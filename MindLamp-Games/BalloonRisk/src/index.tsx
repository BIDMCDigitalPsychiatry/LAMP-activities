import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Balloon from './components/BallonRisk/Balloon';


ReactDOM.render(
  <Router>
    <div>      
      <Switch>
        <Route exact={true} path="/Balloons" component={Balloon} />         
      </Switch>
    </div>
  </Router>
  ,
  document.getElementById('root') as HTMLElement
);
