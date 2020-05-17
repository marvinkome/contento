import React from 'react';
import googleIcon from 'assets/google.svg';
import githubIcon from 'assets/github.svg';
import GithubLogin from 'react-github-login';
import GoogleLogin from 'react-google-login';
import { inject } from 'mobx-react';
import { authApi } from 'libs/api';
import { toast } from 'react-toastify';
import { GOOGLE_CLIENT_KEY, GITHUB_CLIENT_KEY, APP_URL } from 'libs/keys';

class OAuthConnect extends React.Component {
    connectGithub = async (data) => {
        const resp = await authApi.loginGithub({
            code: data.code
        });

        this.props.updateProfile(resp.data.user);
        return toast.success('Successfully linked your Github account');
    };

    unlinkGithubAuth = async () => {
        const resp = await authApi.unlinkGithub();
        this.props.updateProfile(resp.data.user);
    };

    connectGoogle = async (data) => {
        const resp = await authApi.loginGoogle({
            access_token: data.accessToken
        });

        this.props.updateProfile(resp.data.user);
        return toast.success('Successfully linked your Goggle account');
    };

    unlinkGoogleAuth = async () => {
        const resp = await authApi.unlinkGoogle();
        this.props.updateProfile(resp.data.user);
    };

    linkGithub = () => {
        return (
            <section className="account">
                <div className="connect-info">
                    <p className="heading">Connect to Github</p>
                    <p>You can now sign-in to Contento using your GitHub account</p>
                </div>

                <div className="connect-btn">
                    <GithubLogin
                        className="btn btn-white"
                        clientId={GITHUB_CLIENT_KEY}
                        redirectUri={APP_URL}
                        onFailure={() =>
                            toast.error('Error occured while trying to connect your Github account')
                        }
                        onSuccess={(resp) => this.connectGithub(resp)}
                    >
                        <img className="svg-icon" alt="Github Icon" src={githubIcon} />
                        Connect to Github
                    </GithubLogin>
                </div>
            </section>
        );
    };

    unlinkGithub = () => {
        return (
            <section className="account">
                <div className="connect-info">
                    <p className="heading">Unlink Github</p>
                    <p>You will no longer be able sign-in to Contento using your GitHub account</p>
                </div>

                <div className="connect-btn">
                    <button onClick={this.unlinkGithubAuth} className="btn btn-white">
                        <img className="svg-icon" alt="Github Icon" src={githubIcon} />
                        Unlink Github
                    </button>
                </div>
            </section>
        );
    };

    linkGoogle = () => {
        return (
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
                                className="btn btn-white"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <img alt="Google Icon" className="svg-icon" src={googleIcon} />
                                Connect to Google
                            </button>
                        )}
                        onSuccess={(resp) => this.connectGoogle(resp)}
                        onFailure={() => toast.error('Error occured while trying to login')}
                    />
                </div>
            </section>
        );
    };

    unlinkGoogle = () => {
        return (
            <section className="account">
                <div className="connect-info">
                    <p className="heading">Unlink Google</p>
                    <p>You will no longer be able sign-in to Contento using your Google account</p>
                </div>

                <div className="connect-btn">
                    <button onClick={this.unlinkGoogleAuth} className="btn btn-white">
                        <img alt="Google Icon" className="svg-icon" src={googleIcon} />
                        Unlink Google
                    </button>
                </div>
            </section>
        );
    };

    render() {
        return (
            <article className="connected-accounts">
                <h4>Connected accounts</h4>

                {this.props.userProfile.githubId ? this.unlinkGithub() : this.linkGithub()}
                {this.props.userProfile.googleId ? this.unlinkGoogle() : this.linkGoogle()}
            </article>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { updateProfile, profile } = rootStore.userStore;

    return {
        updateProfile,
        userProfile: profile
    };
};

export default inject(mapStateToProps)(OAuthConnect);
