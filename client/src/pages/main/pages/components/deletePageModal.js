import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { MdClose } from 'react-icons/md';

ReactModal.setAppElement('#root');

export function DeletePageModal(props) {
    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.toggleModal}
            id="delete-page-modal"
            overlayClassName="modal-overlay"
            className="modal-container"
        >
            <header className="modal-header">
                <h2>Delete page</h2>
                <MdClose className="close-icon icon" onClick={props.toggleModal} />
            </header>

            <section className="modal-body">
                <article className="modal-content">
                    <p>Are you sure you want to delete this page and all it's contents?</p>
                    <button onClick={props.deletePage} className="btn btn-delete">
                        Yes, Delete
                    </button>
                </article>
            </section>
        </ReactModal>
    );
}

export default function DeletePage(props) {
    const [isOpen, setModalState] = useState();
    return (
        <>
            <button className="btn" onClick={() => setModalState(!isOpen)}>
                Delete page
            </button>
            <DeletePageModal
                isOpen={isOpen}
                toggleModal={() => setModalState(!isOpen)}
                {...props}
            />
        </>
    );
}
