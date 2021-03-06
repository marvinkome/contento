import React from 'react';
import logo from 'assets/logo.png';
import AboutSection from '../components/about';
import { authApi } from 'libs/api';
import { Link } from 'react-router-dom';

export default class ResetPassword extends React.Component {
    onSubmit = async (e) => {
        e.preventDefault();

        const password = e.target['password'].value;
        const token = new URLSearchParams(window.location.search).get('token');

        const resp = await authApi.resetPassword({ password, token });

        if (!resp) return;

        this.props.history.push('/login');
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
                            <h1>Reset your password</h1>
                        </header>

                        {/* <p className="divider">Or</p> */}

                        <form onSubmit={this.onSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
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
                                Reset Password
                            </button>
                        </form>
                    </article>
                </section>

                <AboutSection />
            </>
        );
    }
}
