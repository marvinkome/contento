import makeInspectable from 'mobx-devtools-mst';
import UserStore from './user';

class Store {
    constructor() {
        this.userStore = new UserStore(this);
    }
}

const store = new Store();
makeInspectable(store);

export default store;
