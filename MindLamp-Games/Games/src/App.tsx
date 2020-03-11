/**
 * @file   App.tsx
 * @brief  Intial component for the jewels game
 * @date   Feb , 2020
 * @author ZCO Engineer
 * @copyright (c) 2020, ZCO
 */
import * as React from 'react';
import { BrowserRouter as Router, Link,Route, Switch } from "react-router-dom";
import CatsNDogs from './components/catsndogs/CatsNDogs';
import Jewels from './components/jewels/Jewels';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component<{}> {
  
  constructor(props: {}) {
    super(props);
  }
 
  render() {  
    return (
    <Router>
      <div>
        <nav>
            <Link to="/Jewels">Jewels</Link>
        </nav>
        <Switch>
          <Route exact={true} path="/Jewels" component={Jewels} />
          <Route exact={true} path="/CatsNDogs" component={CatsNDogs} />
        </Switch>
      </div>
    </Router>
    );    
  }
}
export default App;
