import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { inject } from 'mobx-react';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { toast } from 'react-toastify';
import { mainClient, authApi } from 'libs/api';

// pages
import Pages from './pages';

class Main extends React.Component {
    async componentDidMount() {
        const auth_message = 'Auth key not found. Redirecting to login page';

        try {
            // get token
            const token = localStorage.getItem(AUTH_TOKEN_KEY);

            if (!token) {
                toast.error(auth_message);
                throw Error(auth_message);
            }

            // add token to api instance
            mainClient.setAccessToken(token);

            // fetch and set profile
            const { data } = await authApi.userProfile();

            this.props.setProfile(data.user);
        } catch (e) {
            // If there's an auth error then redirect user back to login
            if (e.message === auth_message || (e.response && e.response.status === 401)) {
                return this.props.history.push('/login');
            } else {
                // TODO:: Redirect user to error page
                console.error(e); // eslint-disable-line
            }
        }
    }

    render() {
        // const username = this.props.profile?.username;
        return (
            <div>
                <Switch>
                    {/* editor */}
                    <Route
                        exact
                        path="/editor"
                        component={() => <p>All content editor modules</p>}
                    />

                    {/* pages */}
                    <Route exact path="/" component={Pages} />

                    {/* 404 */}
                    <Route path="*" render={() => <p>Future 404 page</p>} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { updateProfile, profile } = rootStore.userStore;
    return {
        setProfile: updateProfile,
        profile
    };
};
export default inject(mapStateToProps)(Main);
