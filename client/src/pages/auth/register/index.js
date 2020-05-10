import React from 'react';
import logo from 'assets/logo.png';
import OAuthButtons from 'components/oauth-buttons';
import AboutSection from '../components/about';
import { inject } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import { authApi } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';

class RegistrationPage extends React.Component {
  onSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target['fullName'].value;
    const email = e.target['email'].value;
    const password = e.target['password'].value;

    this.register({ fullName, email, password }, 'local');
  };

  register = async (data, authType) => {
    let resp;

    if (authType === 'local') {
      resp = await authApi.register(data);
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
      <>
        <section className="form-section">
          <header className="header">
            <img alt="logo" src={logo} className="logo" />

            <p>
              Already a member? <Link to="/auth/login">Log In</Link>
            </p>
          </header>

          <article className="form-container">
            <header className="form-header">
              <h1 className="register--h1--cta">Get started for free</h1>
            </header>

            <p className="divider">Register With</p>

            <OAuthButtons login={this.register} />

            <p className="divider">Or</p>

            <form onSubmit={this.onSubmit} className="form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input className="form-input" id="fullName" type="text" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input className="form-input" id="email" type="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-input" id="password" type="password" required />
              </div>

              <button data-testid="submit-btn" type="submit" className="btn btn-primary">
                Create account
              </button>
            </form>

            <p className="term-and-conditions">
              By signing up you agree to our <a href="/terms">Terms of service</a> and acknowledge
              our <a href="/privacy-policy">Privacy Policy</a>
            </p>
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
export default inject(mapStateToProps)(withRouter(RegistrationPage));
