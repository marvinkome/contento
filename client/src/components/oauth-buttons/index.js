import React from 'react';
import googleIcon from 'assets/google.svg';
import githubIcon from 'assets/github.svg';
import GithubLogin from 'react-github-login';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { GOOGLE_CLIENT_KEY, GITHUB_CLIENT_KEY, APP_URL } from 'libs/keys';

import './styles.scss';

export default function OAuthButtons(props) {
    return (
        <section className="oauth-button-group">
            <GithubLogin
                className="btn btn-white"
                clientId={GITHUB_CLIENT_KEY}
                redirectUri={APP_URL}
                onFailure={() => toast.error('Error occured while trying to login')}
                onSuccess={(resp) => props.login(resp, 'github')}
            >
                <img className="svg-icon" alt="Github Icon" src={githubIcon} />
                Github
            </GithubLogin>

            <GoogleLogin
                clientId={GOOGLE_CLIENT_KEY}
                render={(renderProps) => (
                    <button
                        data-testid="googleOauthBtn"
                        className="btn btn-white"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <img alt="Google Icon" className="svg-icon" src={googleIcon} />
                        Google
                    </button>
                )}
                onSuccess={(resp) => props.login(resp, 'google')}
                onFailure={() => toast.error('Error occured while trying to login')}
            />
        </section>
    );
}
