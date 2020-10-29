import React, { Component } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import { connect } from "react-redux"
import ClinicianView from './containers/clinician'
import Patient from './containers/patient'
import PatientFelling from './containers/patient/2_fellings'
import PatientTargetBehaviour from './containers/patient/1_target'
import PatientSkills from './containers/patient/3_skills'
import PatientSkillYes from './containers/patient/3_skills/skill_yes'
import PatientSkillNo from './containers/patient/3_skills/skill_no'
import PatientSkillEffort from './containers/patient/5_effort'
import PatientAdditionalNote from './containers/patient/6_notes'
import PatientWeeklyOverview from './containers/overview'

class PublicRoutes extends Component {
    render() {
        const { history } = this.props

        return (
            <HashRouter history={history}>
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
                    </Switch>
            </HashRouter>
        );
    }
}

export default connect(state => ({}), {})(PublicRoutes);
