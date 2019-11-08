import React from 'react';
// import logo from 'assets/logo.svg';
import LoginForm from './components/loginForm';
import './styles.scss';

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className="login__container">
                <div className="container">
                    <span className="login__logo">
                        {/* <img src={logo} alt="Logo" /> */}
                        Contentlify
                    </span>

                    <LoginForm />
                </div>
            </div>
        );
    }
}
