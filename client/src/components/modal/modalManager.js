const MODAL_OPEN = 'OPEN MODAL';

export default class ModalEventManager {
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
        return () => this.closeModal(id);
    };

    closeModal = (id) => {
        // get id of modal
        const idx = this.openedModals.indexOf(id);
        idx > -1 && this.openedModals.splice(idx, 1);

        // emit to open modal
        this.publish(MODAL_OPEN, this.modalIsOpen());
    };
}
