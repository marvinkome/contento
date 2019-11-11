import React from 'react';
import Topbar from './topbar';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout__container">
                <Topbar />
                {this.props.children}
            </div>
        );
    }
}
