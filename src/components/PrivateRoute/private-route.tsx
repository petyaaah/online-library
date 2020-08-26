import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken, checkIsAdmin } from '../../utils/auth'

export const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={props => (
        getToken()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export const AdminRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={props => (
        checkIsAdmin()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)