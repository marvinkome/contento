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
                        Already a member? <a href="/login">Log In</a>
                    </p>
                </header>

                <article className="form-container">
                    <header className="form-header">
                        <h1>Get started for free</h1>
                    </header>

                    <p className="divider">Register With</p>

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
                            <label>Full Name</label>
                            <input className="form-input" type="text" />
                            <small className="error">Field is required</small>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input className="form-input" type="text" />
                            <small className="error">Email is invalid</small>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-input" type="text" />
                            <small className="error">Password is invalid</small>
                        </div>

                        <button className="btn btn-primary">Create account</button>
                    </form>

                    <p className="term-and-conditions">
                        By signing up you agree to our <a href="/terms">Terms of service</a> and
                        acknowledge our <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                </article>
            </section>
        );
    }
}
