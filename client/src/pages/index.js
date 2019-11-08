import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import history from 'libs/history';
import Loader from 'components/loader';

// styles
import 'react-toastify/dist/ReactToastify.css';

// main pages
import Login from 'pages/login';

export default class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div className="app">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/app" component={() => <p>Main Site</p>} />
                    </Switch>

                    <Loader />
                    <ToastContainer />
                </div>
            </Router>
        );
    }
}