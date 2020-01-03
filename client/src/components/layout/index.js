import React from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout__container">
                <Topbar />
                <Sidebar />
                {this.props.children}
            </div>
        );
    }
}
