import React from 'react';
import ReactModal from 'react-modal';
// import modalSvg from 'ßassets/modal-svg.svg';
import { MdClose } from 'react-icons/md';

ReactModal.setAppElement('#root');

export default class CreateSiteModal extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();

        const siteName = e.target['site-name'].value;
        const siteDescription = e.target['site-description'].value;

        console.log({ siteName, siteDescription });
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
                                <label htmlFor="site-description">Site Description</label>
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

                    <aside className="modal-aside">
                        {/* <img alt="modal-svg" src={modalSvg} /> */}
                    </aside>
                </section>
            </ReactModal>
        );
    }
}
