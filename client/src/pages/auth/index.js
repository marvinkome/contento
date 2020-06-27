import React from 'react';
import { Route } from 'react-router-dom';
import './style.scss';

// pages
import Register from './register';
import Login from './login';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';

export default class AuthPages extends React.Component {
    render() {
        return (
            <main className="auth__container">
                {/* login page */}
                <Route exact path="/login" component={Login} />

                {/* register page */}
                <Route exact path="/register" component={Register} />

                {/* forget password page */}
                <Route exact path="/forgot-password" component={ForgotPassword} />

                {/* reset password page */}
                <Route exact path="/reset-password/:token" component={ResetPassword} />

                {/* 404 */}
                <Route
                    path="*"
                    render={() => (
                        <div className="error-404-page ">
                            <p>Page not found</p>
                        </div>
                    )}
                />
            </main>
        );
    }
}
