import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/loader';

// styles
import 'react-toastify/dist/ReactToastify.css';

// main pages
import Auth from 'pages/auth';
import Main from 'pages/main';
import LandingPage from 'pages/public/landing-page';

// global variables
import history from 'libs/history';
import store from 'store';

function renderPublicPages() {
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />

            {/* Auth pages */}
            <Auth />
        </Switch>
    );
}

export default function App() {
    return (
        <Provider rootStore={store}>
            <Router history={history}>
                <div className="app">
                    {/* declare sub routes */}
                    <Switch>
                        {/* app dashboard */}
                        <Route path="/app" component={Main} />

                        {/* public pages*/}
                        <Route path="/" render={renderPublicPages} />
                    </Switch>

                    <Loader />
                    <ToastContainer />
                </div>
            </Router>
        </Provider>
    );
}
