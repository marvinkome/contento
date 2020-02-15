import React from 'react';
import ReactModal from 'react-modal';
import { MdClose } from 'react-icons/md';

ReactModal.setAppElement('#root');

export default class AddPageModal extends React.Component {
    onSubmit = async (e) => {
        e.preventDefault();

        const name = e.target['page-name'].value;
        const slug = e.target['page-slug'].value;

        await this.props.addPage({ variables: { name, slug } });
        this.props.toggleModal();
    };

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.toggleModal}
                id="add-page-modal"
                overlayClassName="modal-overlay"
                className="modal-container"
            >
                <header className="modal-header">
                    <h2>Add a new page</h2>
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
                                <label htmlFor="page-name">Page Name</label>
                                <input className="form-input" id="page-name" type="text" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="page-slug">Page Slug (API Identifier)</label>
                                <input
                                    className="form-input"
                                    id="page-slug"
                                    type="text"
                                    pattern="[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?"
                                    required
                                />
                                <small>must be camelCase (e.g pageSlug)</small>
                            </div>

                            <button
                                type="submit"
                                data-testid="submit-btn"
                                className="btn btn-primary"
                            >
                                Add Page
                            </button>
                        </form>
                    </article>
                </section>
            </ReactModal>
        );
    }
}
