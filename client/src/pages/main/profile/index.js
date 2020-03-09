import React from 'react';
import Layout from 'components/layout';
import googleIcon from 'assets/google.svg';
import githubIcon from 'assets/github.svg';
import GithubLogin from 'react-github-login';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { GOOGLE_CLIENT_KEY, GITHUB_CLIENT_KEY } from 'libs/keys';

import ProfileSection from './components/profileSection';
import './style.scss';

export default class Profile extends React.Component {
    render() {
        return (
            <Layout>
                <main className="profile-page">
                    <article className="page-header">
                        <section className="page-description">
                            <h1>My Profile</h1>
                        </section>
                    </article>

                    <ProfileSection />

                    <article className="connected-accounts">
                        <h4>Connected accounts</h4>

                        <section className="account">
                            <div className="connect-info">
                                <p className="heading">Connect to Github</p>
                                <p>You can now sign-in to Contento using your GitHub account</p>
                            </div>

                            <div className="connect-btn">
                                <GithubLogin
                                    className="btn btn-white"
                                    clientId={GITHUB_CLIENT_KEY}
                                    redirectUri="http://localhost:3000"
                                    onFailure={() =>
                                        toast.error('Error occured while trying to login')
                                    }
                                    onSuccess={() => null}
                                >
                                    <img className="svg-icon" alt="Github Icon" src={githubIcon} />
                                    Connect to Github
                                </GithubLogin>
                            </div>
                        </section>

                        <section className="account">
                            <div className="connect-info">
                                <p className="heading">Connect to Google</p>
                                <p>You can now sign-in to Contento using your Google account</p>
                            </div>

                            <div className="connect-btn">
                                <GoogleLogin
                                    clientId={GOOGLE_CLIENT_KEY}
                                    render={(renderProps) => (
                                        <button
                                            data-testid="googleOauthBtn"
                                            className="btn btn-white"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                        >
                                            <img
                                                alt="Google Icon"
                                                className="svg-icon"
                                                src={googleIcon}
                                            />
                                            Connect to Google
                                        </button>
                                    )}
                                    onSuccess={() => null}
                                    onFailure={() =>
                                        toast.error('Error occured while trying to login')
                                    }
                                />
                            </div>
                        </section>
                    </article>
                </main>
            </Layout>
        );
    }
}
