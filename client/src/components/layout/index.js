import React from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';

export default class Layout extends React.Component {
    state = {
        sidebarOpen: false
    };

    toggleSidebar = () => {
        this.setState({ sidebarOpen: !this.state.sidebarOpen });
    };

    render() {
        return (
            <div className="layout__container">
                <Topbar toggleSidebar={this.toggleSidebar} />
                {this.state.sidebarOpen && <Sidebar toggleSidebar={this.toggleSidebar} />}
                {this.props.children}
            </div>
        );
    }
}
