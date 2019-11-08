import React from 'react';
import { inject } from 'mobx-react';
import { authApi } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import LoginForm from './components/loginForm';

// import logo from 'assets/logo.svg';
import './styles.scss';

class LoginPage extends React.Component {
    loginUser = async (userData) => {
        const { data } = await authApi.login(userData);

        // set token on localstorage
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);

        // add user profile to store
        this.props.setProfile(data.user);

        // redirect to dashboard
        this.props.history.push('/admin');
    };

    render() {
        return (
            <div className="login__container">
                <div className="container">
                    <span className="login__logo">
                        {/* <img src={logo} alt="Logo" /> */}
                        Contentlify
                    </span>

                    <LoginForm login={this.loginUser} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    return {
        setProfile: rootStore.userStore.updateProfile
    };
};
export default inject(mapStateToProps)(LoginPage);
