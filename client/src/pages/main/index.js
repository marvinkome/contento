import React from 'react';
import Modal from 'components/modal';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { inject } from 'mobx-react';
import { toast } from 'react-toastify';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { mainClient, authApi } from 'libs/api';
import { setupApollo } from 'libs/graphql';
import { GET_SITES } from './graphql';

// pages
import NoSite from './noSite';
import Pages from './pages';
import Editor from './editor';

class Main extends React.Component {
    state = {
        client: null
    };

    async componentDidMount() {
        const auth_message = 'Auth key not found. Redirecting to login page';

        try {
            // setup auth
            const token = await this.setupAuth();
            const client = this.setupApolloClient(token);
            this.setupSites(client);
        } catch (e) {
            // If there's an auth error then redirect user back to login
            if (e.message === auth_message || (e.response && e.response.status === 401)) {
                return this.props.history.push('/auth/login');
            } else {
                // TODO:: Redirect user to error page
                console.error(e); // eslint-disable-line
            }
        }
    }

    setupAuth = async () => {
        const auth_message = 'Auth key not found. Redirecting to login page';

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

    setupSites = async (client) => {
        const { data } = await client.query({ query: GET_SITES });

        if (!data.sites.length) {
            return this.props.history.push('/app');
        }

        // add list of sites to store
        this.props.addSites(data.sites);

        // redirect to the last site in the list
        const { id } = data.sites[data.sites.length - 1];

        // redirect to last site in the list
        // check if it's the home page
        if (this.props.location.pathname === '/') {
            return this.props.history.push(`/app/sites/${id}/pages`);
        }
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

                        {/* no sites */}
                        <Route exact path="/app" component={NoSite} />

                        {/* 404 */}
                        <Route path="/app/*" render={() => <p>Future 404 page</p>} />
                    </Switch>

                    <Modal />
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
    const { addSites } = rootStore.siteStore;

    return {
        setProfile: updateProfile,
        addSites,
        profile
    };
};
export default inject(mapStateToProps)(Main);
