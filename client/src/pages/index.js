import React from 'react';
import { Provider } from 'mobx-react';
import { Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/loader';

// styles
import 'react-toastify/dist/ReactToastify.css';

// main pages
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
import Main from 'pages/main';

// global variables
import history from 'libs/history';
import store from 'store';

export default class App extends React.Component {
    render() {
        return (
            <Provider rootStore={store}>
                <Router history={history}>
                    <div className="app">
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route path="/" component={Main} />
                        </Switch>

                        <Loader />
                        <ToastContainer />
                    </div>
                </Router>
            </Provider>
        );
    }
}
