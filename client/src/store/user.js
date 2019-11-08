import { observable, action, decorate } from 'mobx';

class UserStore {
    profile = null;

    constructor(root) {
        this.root = root;
    }

    updateProfile = (profile) => {
        this.profile = profile;
    };
}

export default decorate(UserStore, {
    profile: observable,
    updateProfile: action
});
