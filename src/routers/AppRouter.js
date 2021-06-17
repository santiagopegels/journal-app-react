import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path="/auth"
                    component={AuthRouter}
                ></Route>

                <Route
                    path="/"
                    exact
                    component={JournalScreen}
                ></Route>

                <Redirect to="/auth/login" />

            </Switch>
        </Router>
    )
}
