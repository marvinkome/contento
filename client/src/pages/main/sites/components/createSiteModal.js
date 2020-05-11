import React from 'react';
import ReactModal from 'react-modal';
import { MdClose } from 'react-icons/md';

ReactModal.setAppElement('#root');

export default class CreateSiteModal extends React.Component {
    onSubmit = async (e) => {
        e.preventDefault();

        const name = e.target['site-name'].value;
        const description = e.target['site-description'].value;

        await this.props.addSite({ variables: { name, description } });
        this.props.toggleModal();
    };

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.toggleModal}
                id="create-site-modal"
                overlayClassName="modal-overlay"
                className="modal-container"
            >
                <header className="modal-header">
                    <h2>{"Let's"} name your site</h2>
                    <MdClose className="close-icon icon" onClick={this.props.toggleModal} />
                </header>

                <section className="modal-body">
                    <article className="modal-content">
                        <p>
                            Boost your productivity by making it easier for everyone to access
                            contents in one location.
                        </p>

                        <form onSubmit={this.onSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="site-name">Site Name</label>
                                <input className="form-input" id="site-name" type="text" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="site-description">
                                    Site Description - <i>Optional</i>
                                </label>
                                <textarea
                                    className="form-input"
                                    id="site-description"
                                    type="text"
                                    rows="3"
                                />
                            </div>

                            <button
                                type="submit"
                                data-testid="submit-btn"
                                className="btn btn-primary"
                            >
                                Create Site
                            </button>
                        </form>
                    </article>
                </section>
            </ReactModal>
        );
    }
}
