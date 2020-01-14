import makeInspectable from 'mobx-devtools-mst';
import UserStore from './user';
import SiteStore from './sites';

class Store {
    constructor() {
        this.userStore = new UserStore(this);
        this.siteStore = new SiteStore(this);
    }
}

const store = new Store();
makeInspectable(store);

export default store;
