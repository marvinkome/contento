import React from 'react';
import logo from 'assets/logo.png';
import TopbarDropdown from './dropdown';
import { inject } from 'mobx-react';
import { MdAccountCircle } from 'react-icons/md';

import './style.scss';

class Topbar extends React.Component {
    render() {
        const userProfile = this.props.profile;

        return (
            <div className="main__topbar">
                <div className="logo-area">
                    <a href="/app/sites">
                        <img src={logo} alt="logo" />
                    </a>
                </div>

                <div className="topbar-links">
                    <div className="notif-content">
                        {userProfile && (
                            <div className="profile-link">
                                {userProfile.profile?.name}
                                {userProfile.profile?.picture ? (
                                    <div className="image">
                                        <img src={userProfile.profile.picture} alt="Your profile" />
                                    </div>
                                ) : (
                                    <MdAccountCircle className="icon" />
                                )}
                                <TopbarDropdown />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { profile } = rootStore.userStore;
    return {
        profile
    };
};
export default inject(mapStateToProps)(Topbar);
