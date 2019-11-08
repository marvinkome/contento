import React from 'react';

export default class LoginForm extends React.Component {
    handleSubmit = async (e) => {
        e.preventDefault();

        // get inputs value
        let identifier = e.target['identifier'].value;
        let password = e.target['password'].value;

        await this.props.login({ identifier, password });
        identifier = password = '';
    };

    render() {
        return (
            <div className="login__bg">
                <h2>Login</h2>

                <form className="login__form" onSubmit={this.handleSubmit}>
                    <label htmlFor="identifier">Username or Email Address</label>
                    <input className="form-input" type="text" id="identifier" required />

                    <label htmlFor="password">Password</label>
                    <input className="form-input" type="password" id="password" required />

                    <button className="btn btn-primary" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        );
    }
}
