import React from 'react';
import Layout from 'components/layout';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { mainClient, authApi } from 'libs/api';
import { setupApollo } from 'libs/graphql';

// pages
import Profile from './profile';
import Sites from './sites';
import SitesSettings from './site-settings';
import Pages from './pages';
import Editor from './editor';

class Main extends React.Component {
    state = {
        client: null
    };

    async componentDidMount() {
        const auth_message = 'Session expired. Redirecting to login page';

        try {
            // setup auth
            const token = await this.setupAuth();
            this.setupApolloClient(token);
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

    setupAuth = async () => {
        const auth_message = 'Session expired. Redirecting to login page';

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

        return token;
    };

    setupApolloClient = (token) => {
        // setup apollo client
        const client = setupApollo(token);
        this.setState({ client });

        return client;
    };

    render() {
        const { client } = this.state;

        return client ? (
            <div>
                <ApolloProvider client={client}>
                    <Switch>
                        {/* editor */}
                        <Route exact path="/app/sites/:siteid/editor/:pageid" component={Editor} />

                        {/* pages */}
                        <Route exact path="/app/sites/:siteid/pages" component={Pages} />

                        {/* site settings */}
                        <Route exact path="/app/sites/settings/:siteid" component={SitesSettings} />

                        {/* sites */}
                        <Route exact path="/app/" component={Sites} />

                        {/* profile */}
                        <Route exact path="/app/profile" component={Profile} />

                        {/* 404 */}
                        <Route
                            path="/app/*"
                            render={() => (
                                <Layout>
                                    <div className="error-404-page ">
                                        <p>Page not found</p>
                                    </div>
                                </Layout>
                            )}
                        />
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
