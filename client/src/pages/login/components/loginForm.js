import React from 'react';

export default class LoginForm extends React.Component {
    render() {
        return (
            <div className="login__bg">
                <h2>Login</h2>

                <form className="login__form">
                    <label htmlFor="identity">Username or Email Address</label>
                    <input className="form-input" type="text" id="identifier" required />

                    <label htmlFor="password">Password</label>
                    <input className="form-input" type="text" id="password" required />

                    <button className="btn btn-primary" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        );
    }
}
