import React from 'react';
import { openModal } from 'components/modal';
import './style.scss';

export default class NoSiteComponent extends React.Component {
    toggleModal = () => {
        openModal();
        this.props.cb && this.props.cb();
    };

    render() {
        return (
            <div className={`no-sites-comp ${this.props.className}`}>
                <h2>Starting something new?</h2>
                <p>Create a new site to manage your contents</p>

                <button onClick={this.toggleModal} className="btn btn-primary">
                    Create Site
                </button>
            </div>
        );
    }
}
