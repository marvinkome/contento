import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.scss';

// pages
import Register from './register';
import Login from './login';

export default class AuthPages extends React.Component {
    render() {
        return (
            <main className="auth__container">
                <Switch>
                    {/* login page */}
                    <Route exact path="/auth/login" component={Login} />

                    {/* register page */}
                    <Route exact path="/auth/register" component={Register} />

                    {/* common 404 page */}
                    <Route exact path="/auth/*" component={() => <p>404 page</p>} />
                </Switch>
            </main>
        );
    }
}
