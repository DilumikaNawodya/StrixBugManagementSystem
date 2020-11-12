import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../Services/LoginService'

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        console.log(currentUser)
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
        console.log(roles)
        console.log(roles.indexOf(currentUser.Role))
        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.Role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)