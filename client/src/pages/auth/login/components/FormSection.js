import React from 'react';
import logo from 'assets/logo.png';
import googleIcon from 'assets/google.svg';
import githubIcon from 'assets/github.svg';

export default class FormSection extends React.Component {
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

                    <section className="oauth-button-group">
                        <a className="btn btn-white" href="/">
                            <img className="svg-icon" src={githubIcon} />
                            Github
                        </a>

                        <a className="btn btn-white" href="/">
                            <img className="svg-icon" src={googleIcon} />
                            Google
                        </a>
                    </section>

                    <p className="divider">Or</p>

                    <form className="form">
                        <div className="form-group">
                            <label>Email address</label>
                            <input className="form-input" type="text" />
                            <small className="error">Email is invalid</small>
                        </div>

                        <div className="form-group">
                            <label>
                                <span>Password</span>
                                <a href="/forgot-password">Forgot password?</a>
                            </label>
                            <input className="form-input" type="text" />
                            <small className="error">Password is invalid</small>
                        </div>

                        <button className="btn btn-primary">Log In</button>
                    </form>
                </article>
            </section>
        );
    }
}
