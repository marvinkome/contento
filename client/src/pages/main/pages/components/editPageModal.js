import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { MdClose } from 'react-icons/md';

ReactModal.setAppElement('#root');

export function EditPageModal(props) {
    const onSubmit = async (e) => {
        e.preventDefault();

        const name = e.target['page-name'].value;

        try {
            await props.editPage({ variables: { name, id: props.page.id } });
        } catch (e) {
            // do nothing, we're already handling it
        }

        props.toggleModal();
    };

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.toggleModal}
            id="edit-page-modal"
            overlayClassName="modal-overlay"
            className="modal-container"
        >
            <header className="modal-header">
                <h2>Edit page</h2>
                <MdClose className="close-icon icon" onClick={props.toggleModal} />
            </header>

            <section className="modal-body">
                <article className="modal-content">
                    <form onSubmit={onSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="page-name">Page Name</label>
                            <input
                                className="form-input"
                                id="page-name"
                                type="text"
                                defaultValue={props.page.name}
                                required
                            />
                        </div>

                        <button type="submit" data-testid="submit-btn" className="btn btn-primary">
                            Edit Page
                        </button>
                    </form>
                </article>
            </section>
        </ReactModal>
    );
}

export default function EditPage(props) {
    const [isOpen, setModalState] = useState();
    return (
        <>
            <button className="btn" onClick={() => setModalState(!isOpen)}>
                Edit page
            </button>
            <EditPageModal isOpen={isOpen} toggleModal={() => setModalState(!isOpen)} {...props} />
        </>
    );
}
