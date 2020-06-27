import React from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';

import './layout.scss';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="dashboard__container">
                <Topbar />
                <Sidebar />
                <div className="dashboard__main">{this.props.children}</div>
            </div>
        );
    }
}
