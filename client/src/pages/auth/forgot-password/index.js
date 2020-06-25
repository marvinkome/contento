import React from 'react';
import logo from 'assets/logo.png';
import AboutSection from '../components/about';
import { authApi } from 'libs/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default class ForgetPassword extends React.Component {
    onSubmit = async (e) => {
        e.preventDefault();

        const email = e.target['email'].value;

        const resp = await authApi.forgetPassword({ email });
        toast.success(resp.data.message);
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
                            <h1>Forgot your password?</h1>
                            <p>
                                Enter your email and {"we'll"} send you instructions on how to reset
                                it.
                            </p>
                        </header>

                        {/* <p className="divider">Or</p> */}

                        <form onSubmit={this.onSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input className="form-input" id="email" type="email" required />
                            </div>

                            <button
                                type="submit"
                                data-testid="submit-btn"
                                className="btn btn-primary"
                            >
                                Send reset link
                            </button>
                        </form>
                    </article>
                </section>

                <AboutSection />
            </>
        );
    }
}
