import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <Switch>
            <Route
                path="/auth/login"
                component={LoginScreen}
                exact
            ></Route>
            <Route
                path="/auth/register"
                component={RegisterScreen}
                exact
            ></Route>
            <Redirect to="/auth/login" />
        </Switch>
    )
}
