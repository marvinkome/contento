import React from 'react';
import GoogleLogin from 'react-google-login';
import { GOOGLE_CLIENT_KEY } from 'libs/keys';

export default class LoginForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault();

        // get inputs value
        let email = e.target['email'].value;
        let password = e.target['password'].value;

        await this.props.login({ email, password }, 'local');
        email = password = '';
    };

    render() {
        return (
            <div className="login__bg">
                <h2>Login</h2>

                <form className="login__form" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input className="form-input" type="text" id="email" required />

                    <label htmlFor="password">Password</label>
                    <input className="form-input" type="password" id="password" required />

                    <button className="btn btn-primary" type="submit">
                        Log In
                    </button>
                </form>

                <GoogleLogin
                    clientId={GOOGLE_CLIENT_KEY}
                    buttonText="login"
                    onSuccess={(resp) => this.props.login(resp, 'google')}
                    onFailure={(resp) => this.props.login(resp, 'google')}
                />
            </div>
        );
    }
}
