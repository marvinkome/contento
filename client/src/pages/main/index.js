import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { mainClient, authApi } from 'libs/api';
import { setupApollo } from 'libs/graphql';

// pages
import NoSite from './noSite';
import Sites from './sites';
import Pages from './pages';
import Editor from './editor';

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
                <ApolloProvider client={client}>
                    <Switch>
                        {/* editor */}
                        <Route exact path="/sites/:sideid/editor/:pageid" component={Editor} />

                        {/* pages */}
                        <Route exact path="/sites/:sideid/pages" component={Pages} />

                        {/* sites */}
                        <Route exact path="/sites/:siteid" component={Sites} />

                        {/* no sites */}
                        <Route exact path="/" component={NoSite} />

                        {/* 404 */}
                        <Route path="*" render={() => <p>Future 404 page</p>} />
                    </Switch>
                </ApolloProvider>
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
