import React from 'react';
import { MdClear } from 'react-icons/md';
import './style.scss';

export default class CreateSiteForm extends React.Component {
    onSubmit = (e) => {
        const siteName = e.target['siteName'].value;
        // do magic with site name
    };

    render() {
        return (
            <div className="modal" ref={this.props.modalRef}>
                <div className="modal-header">
                    <h2>Create a new site</h2>

                    <MdClear className="icon" onClick={this.props.closeModal} />
                </div>

                <div className="modal-body">
                    <form>
                        <input
                            className="form-input flat"
                            type="text"
                            id="siteName"
                            placeholder="Site name"
                            required
                        />
                        <button className="btn btn-primary" type="submit">
                            Create Site
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
