import React, { Component } from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import { connect } from "react-redux"
import ClinicianView from './containers/clinician'
import Patient from './containers/patient'
import GraphsView from './containers/graphs'

class PublicRoutes extends Component {
    render() {
        return (
            <HashRouter>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={Patient}
                        />
                        <Route
                            path="/clinician"
                            component={ClinicianView}
                        />
                        <Route
                            path="/graphs"
                            component={GraphsView}
                        />
                    </Switch>
            </HashRouter>
        );
    }
}

export default connect(state => ({}), {})(PublicRoutes);
