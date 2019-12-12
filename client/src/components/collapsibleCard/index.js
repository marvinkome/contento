import React from 'react';
import classnames from 'classnames';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';
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
                <div onClick={this.toggleCollapse} className="header">
                    {this.props.header || <h4>{this.props.title}</h4>}
                    <div className="collapse-control">
                        {this.state.collapsed ? (
                            <MdArrowDropDown className="icon" />
                        ) : (
                            <MdArrowDropUp className="icon" />
                        )}
                    </div>
                </div>
                <div className={classnames('body', { collapsed })}>{this.props.children}</div>
            </div>
        );
    }
}
