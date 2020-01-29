import React from 'react';
import logo from 'assets/logo.png';
import OAuthButtons from 'components/oauth-buttons';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { authApi } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';

class FormSection extends React.Component {
    onSubmit = async (e) => {
        e.preventDefault();

        const email = e.target['email'].value;
        const password = e.target['password'].value;

        this.login({ email, password }, 'local');
    };

    login = async (data, authType) => {
        let resp;

        if (authType === 'local') {
            resp = await authApi.login(data);
        } else if (authType === 'google') {
            resp = await authApi.loginGoogle({
                access_token: data.accessToken
            });
        } else if (authType === 'github') {
            resp = await authApi.loginGithub({
                code: data.code
            });
        }

        if (!resp) return;

        // set token on localstorage
        localStorage.setItem(AUTH_TOKEN_KEY, resp.data.token);

        // add user profile to store
        this.props.setProfile(resp.data.user);

        // redirect to dashboard
        this.props.history.push('/');
    };

    render() {
        return (
            <section className="form-section">
                <header className="header">
                    <img src={logo} className="logo" />

                    <p>
                        New to Contento? <a href="/register">Register</a>
                    </p>
                </header>

                <article className="form-container">
                    <header className="form-header">
                        <h1>Welcome back!</h1>
                        <p>Log in to your Contento account.</p>
                    </header>

                    <p className="divider">Login With</p>

                    <OAuthButtons />

                    <p className="divider">Or</p>

                    <form onSubmit={this.onSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input className="form-input" id="email" type="email" required />
                        </div>

                        <div className="form-group">
                            <label>
                                <span>Password</span>
                                <a href="/forgot-password">Forgot password?</a>
                            </label>
                            <input className="form-input" id="password" type="text" required />
                        </div>

                        <button type="submit" data-testid="submit-btn" className="btn btn-primary">
                            Log In
                        </button>
                    </form>
                </article>
            </section>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    return {
        setProfile: rootStore.userStore.updateProfile
    };
};
export default inject(mapStateToProps)(withRouter(FormSection));
