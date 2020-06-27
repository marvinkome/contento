import React, { useState } from 'react';
import plus from 'assets/icons/plus_icon.svg';
import ReactModal from 'react-modal';
import { MdClose } from 'react-icons/md';

ReactModal.setAppElement('#root');

export function AddSiteModal(props) {
    const onSubmit = async (e) => {
        e.preventDefault();

        const name = e.target['site-name'].value;
        const description = e.target['site-description'].value;

        try {
            await props.addSite({ variables: { name, description } });
        } catch (e) {
            // do nothing, we're already handling it
        }

        props.toggleModal();
    };

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.toggleModal}
            id="add-site-modal"
            overlayClassName="modal-overlay"
            className="modal-container"
        >
            <header className="modal-header">
                <h2>Add A New Site</h2>
                <MdClose className="close-icon icon" onClick={props.toggleModal} />
            </header>

            <section className="modal-body">
                <article className="modal-content">
                    <p>Create a new website to manage with Contento.</p>

                    <form onSubmit={onSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="site-name">Site Name</label>
                            <input className="form-input" id="site-name" type="text" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="site-description">Site Description</label>
                            <textarea className="form-input" id="site-description" rows="3" />
                        </div>

                        <button type="submit" data-testid="submit-btn" className="btn btn-primary">
                            Create Site
                        </button>
                    </form>
                </article>
            </section>
        </ReactModal>
    );
}

export default function AddSite(props) {
    const [isOpen, setModalState] = useState();
    return (
        <>
            <button onClick={() => setModalState(!isOpen)} className="add-icon site-btn">
                <img src={plus} alt="icon" />
                <span className="tooltip__text">Click here to create a new site</span>
            </button>

            <AddSiteModal isOpen={isOpen} toggleModal={() => setModalState(!isOpen)} {...props} />
        </>
    );
}
