import React from 'react';
import logo from 'assets/logo.png';
import OAuthButtons from 'components/oauth-buttons';
import AboutSection from '../components/about';
import { inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { authApi } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';

class LoginPage extends React.Component {
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
        this.props.history.push('/app');
    };

    render() {
        return (
            <>
                <section className="form-section">
                    <header className="header">
                        <Link to="/">
                            <img alt="logo" src={logo} className="logo" />
                        </Link>

                        <p>
                            New to Contento? <Link to="/register">Register</Link>
                        </p>
                    </header>

                    <article className="form-container">
                        <header className="form-header">
                            <h1>Welcome back!</h1>
                            <p>Log into your Contento account.</p>
                        </header>

                        <form onSubmit={this.onSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input className="form-input" id="email" type="email" required />
                            </div>

                            <div className="form-group">
                                <label>
                                    <span>Password</span>
                                    <Link to="/forgot-password">Forgot password?</Link>
                                </label>
                                <input
                                    className="form-input"
                                    id="password"
                                    type="password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                data-testid="submit-btn"
                                className="btn btn-primary"
                            >
                                Log In
                            </button>
                        </form>

                        <div className="divider--container">
                            <p className="divider">Or Login With</p>

                            <OAuthButtons login={this.login} />
                        </div>
                    </article>
                </section>

                <AboutSection />
            </>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    return {
        setProfile: rootStore.userStore.updateProfile
    };
};
export default inject(mapStateToProps)(withRouter(LoginPage));
