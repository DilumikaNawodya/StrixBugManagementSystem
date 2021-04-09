import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '../Services/LoginService';
import DashboardAdmin from './Dashboards/DashboardAdmin';
import DashboardCus from './Dashboards/DashboardCust';
import DashboardDev from './Dashboards/DashboardDev';
import DashboardManager from './Dashboards/DashboardManager';
import DashboardQA from './Dashboards/DashboardQA';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {

        if(authenticationService.currentUserValue==null){
            roles = "block"
        }else{
            roles = authenticationService.userRole
        }

        if (roles=="Admin"){
            return <DashboardAdmin {...props} />
        }else if(roles=="Manager"){
            return <DashboardManager {...props}/>
        }else if(roles=="Customer"){
            return <DashboardCus {...props}/>
        }else if(roles=="Developer"){
            return <DashboardDev {...props}/>
        }else if(roles=="QA"){
            return <DashboardQA {...props}/>
        }else{
            return <Redirect to="/login"/>
        }
    }} />
)