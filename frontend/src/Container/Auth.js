import React,{ useState,useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { authenticationService } from '../Services/LoginService';
import { PrivateRoute } from './PrivateRoute';
import LoginForm from '../Components/Login/LoginForm'
import DashboardCust from './Dashboards/DashboardCust';
import DashboardAdmin from './Dashboards/DashboardAdmin';
import DashboardQA from './Dashboards/DashboardQA';
import DashboardManager from './Dashboards/DashboardManager';
import DashboardDev from './Dashboards/DashboardDev';
import error from '../Components/Common/Errors/Error';
import ForgotPassword from '../Components/Login/ForgotPassword';
import PasswordConfirmation from '../Components/Login/PasswordConfirmation';
import { createBrowserHistory } from 'history';



const history = createBrowserHistory();

const Role = {
    Admin: 'Admin',
    Manager: 'Manager',
    QA: 'QA',
    Developer: 'Developer',
    Customer: 'Customer',
    Block: 'Block'    
}


function Auth(props){

    const [state,setState] = useState({
        currentUser: null,
        role: 'block'
    });

    useEffect(() => {
        authenticationService.currentUser.subscribe(x => setState({
            currentUser: x,
            role: x && x.Role
        }));
    },[]);
        

    const logout = () => {
        authenticationService.logout();
        history.push('/');
    }

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/Admin" roles={[Role.Admin]} component={DashboardAdmin} />
                <PrivateRoute path="/Manager" roles={[Role.Manager]} component={DashboardManager} />
                <PrivateRoute path="/QA" roles={[Role.QA]} component={DashboardQA} />
                <PrivateRoute path="/Developer" roles={[Role.Developer]} component={DashboardDev} />
                <PrivateRoute path="/Customer" roles={[Role.Customer]} component={DashboardCust} />
                <Route path="/error" component={error} />
                <Route exact path="/forgotpassword" component={ForgotPassword} />
                <Route exact path="/passconfirmation/:uid/:token/" component={PasswordConfirmation} />
                <Route path="/" component={LoginForm} />
            </Switch>
        </Router>
    );
}

export default Auth;