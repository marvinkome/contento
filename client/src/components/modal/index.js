import React, { createRef } from 'react';
import { MdClear } from 'react-icons/md';
import './style.scss';

// variables
const EVENTS = [];
const MODAL_OPEN = 'OPEN MODAL';

// implement Event Bus
class ModalEventManager {
    subscriptions = new Map();
    openedModals = [];

    modalIsOpen = () => this.openedModals.length > 0;

    subscribe = (event, callback) => {
        const id = Symbol();

        // create new event if it's not available
        if (!this.subscriptions.get(event)) {
            this.subscriptions.set(event, new Map());
        }

        // register callback
        this.subscriptions.get(event).set(id, callback);

        return {
            unsubscribe: () => {
                // remove callback
                this.subscriptions.get(event).delete(id);

                if (Object.keys(this.subscriptions.get(event)).length === 0) {
                    this.subscriptions.delete(event);
                }
            }
        };
    };

    publish = (event, ...args) => {
        if (!this.subscriptions.has(event)) {
            return;
        }

        // go through each subscription and call each one
        this.subscriptions.get(event).forEach((callback) => callback.call(null, ...args));
    };

    openModal = () => {
        const id = Symbol();

        // add id to list of opened modals
        this.openedModals.push(id);

        // emit to open modal
        this.publish(MODAL_OPEN, this.modalIsOpen(), id);

        // return callback
        return () => closeModal(id);
    };

    closeModal = (id) => {
        // get id of modal
        const idx = this.openedModals.indexOf(id);
        idx > -1 && this.openedModals.splice(idx, 1);

        // emit to open modal
        this.publish(MODAL_OPEN, this.modalIsOpen());
    };
}

const modalManager = new ModalEventManager();
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
                    <div className="modal" ref={this.modalRef}>
                        <div className="modal-header">
                            <h2>Create a new site</h2>

                            <MdClear className="icon" onClick={this.props.closeModal} />
                        </div>

                        <div className="modal-body">
                            <form>
                                <input
                                    className="form-input flat"
                                    type="text"
                                    placeholder="Site name"
                                    required
                                />
                                <button className="btn btn-primary" type="submit">
                                    Create Site
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        );
    }
}
