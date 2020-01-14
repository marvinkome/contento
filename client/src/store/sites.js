import { observable, action, decorate } from 'mobx';

class SiteStore {
    sites = [];

    constructor(root) {
        this.root = root;
    }

    addSites = (sites) => {
        this.sites = sites;
    };
}

export default decorate(SiteStore, {
    sites: observable,
    addSites: action
});
