import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'libs/serviceWorker';
import Home from 'pages/Home';
import { ToastContainer } from 'react-toastify';

// styles
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
    <div>
        <Home />
        <ToastContainer />
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
