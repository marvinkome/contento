import React from 'react';
import classnames from 'classnames';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import './style.scss';

export default class CollapsibleCard extends React.Component {
    state = {
        collapsed: false
    };

    toggleCollapse = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    render() {
        const { collapsed } = this.state;

        return (
            <div className="collapsible-card">
                <header>
                    <div onClick={this.toggleCollapse} className="title-and-toggle">
                        <h3>{this.props.title}</h3>
                        {this.state.collapsed ? (
                            <MdKeyboardArrowDown onClick={this.toggleCollapse} className="icon" />
                        ) : (
                            <MdKeyboardArrowUp onClick={this.toggleCollapse} className="icon" />
                        )}
                    </div>

                    <div className="delete">
                        <FiTrash2 className="icon" onClick={this.props.onDelete} />
                    </div>
                </header>

                <div className={classnames('body', { collapsed })}>{this.props.children}</div>
            </div>
        );
    }
}
