import React from 'react';
import logo from 'assets/logo.png';
import AboutSection from '../components/about';
import { authApi } from 'libs/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default class ResetPassword extends React.Component {
    onSubmit = async (e) => {
        e.preventDefault();

        const password = e.target['password'].value;
        const token = this.props.match.params.token;

        const resp = await authApi.resetPassword({ password, token });
        toast.success(resp.data.message);
    };

    render() {
        return (
            <>
                <section className="form-section">
                    <header className="header">
                        <img src={logo} className="logo" />

                        <p>
                            New to Contento? <Link to="/auth/register">Register</Link>
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
