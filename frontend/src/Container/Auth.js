import React,{ useState,useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { authenticationService } from '../Services/LoginService';
import { PrivateRoute } from './PrivateRoute';
import error from '../Components/Common/Errors/Error';
import ForgotPassword from '../Components/Login/ForgotPassword';
import PasswordConfirmation from '../Components/Login/PasswordConfirmation';
import { createBrowserHistory } from 'history';
import Login from '../Components/Login/LoginForm';

const history = createBrowserHistory();

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
        history.push('/login');
    }


    return (
        
        <Router history={history}>
            <Switch>
                <Route exact path="/forgotpassword" component={ForgotPassword} />
                <Route exact path="/passconfirmation/:uid/:token/" component={PasswordConfirmation} />
                <Route exact path="/error" component={error} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute path="/" roles={[state.role]}/>
            </Switch>
        </Router>
    );
}

export default Auth;