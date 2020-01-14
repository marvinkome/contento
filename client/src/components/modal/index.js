import React, { createRef } from 'react';
import CreateSiteForm from './createSite';
import ModalEventManager from './modalManager';
import './style.scss';

// setup manager
const modalManager = new ModalEventManager();
const EVENTS = []; // list of all mounted modals
const MODAL_OPEN = 'OPEN MODAL'; // event

// export toggle methods
export const openModal = () => modalManager.openModal();
export const closeModal = (id) => modalManager.closeModal(id);

export default class ModalManager extends React.Component {
    modalRef = createRef();

    state = {
        isOpen: false,
        id: null,
        currentEventId: null
    };

    componentDidMount() {
        this.setState({ id: Symbol() }, () => {
            EVENTS.push(this.state.id);
        });

        this.modalManager = modalManager.subscribe(MODAL_OPEN, this.setModalState);
    }

    componentWillUnmount() {
        // remove index
        const eventId = EVENTS.indexOf(this.state.id);
        eventId > -1 && EVENTS.splice(eventId, 1);

        // turn off loader
        this.modalManager.unsubscribe();
    }

    setModalState = (isOpen, currentEventId) => {
        if (EVENTS.indexOf(this.state.id) > -1) {
            this.setState({ isOpen, currentEventId });
        }
    };

    closeModal = (e) => {
        // if current target being clicked is not the modal div
        // and is not a child of the modal div, then toggle
        if (e.target !== this.modalRef.current && !this.modalRef.current.contains(e.target)) {
            closeModal(this.state.currentEventId);
        }
    };

    render() {
        return (
            this.state.isOpen && (
                <div className="modal-container" onClick={this.closeModal}>
                    <CreateSiteForm
                        modalRef={this.modalRef}
                        closeModal={() => closeModal(this.state.currentEventId)}
                    />
                </div>
            )
        );
    }
}
