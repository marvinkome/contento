import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { mainClient, authApi } from 'libs/api';
import { setupApollo } from 'libs/graphql';

// pages
import Pages from './pages';

class Main extends React.Component {
    state = {
        client: null
    };

    async componentDidMount() {
        const auth_message = 'Auth key not found. Redirecting to login page';

        try {
            // get token
            const token = localStorage.getItem(AUTH_TOKEN_KEY);

            if (!token) {
                toast.error(auth_message);
                throw Error(auth_message);
            }

            // setup apollo client
            const { client } = setupApollo(token);
            this.setState({ client });

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
        const { client } = this.state;

        return client ? (
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
        ) : (
            <div>
                <p>Connecting to API.....</p>
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
