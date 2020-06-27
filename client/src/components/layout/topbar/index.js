import React from 'react';
import TopbarDropdown from './dropdown';
import Logo from 'assets/logo.png';
import { inject } from 'mobx-react';
import { MdAccountCircle } from 'react-icons/md';

function Topbar(props) {
    const userProfile = props.profile;

    return (
        <div className="dashboard__topbar">
            <div className="logo-area">
                <img src={Logo} alt="Contento" />
            </div>

            <div className="notif-content">
                {userProfile && (
                    <div className="profile-link">
                        {userProfile.profile?.picture ? (
                            <div className="user--avatar">
                                <img src={userProfile.profile.picture} alt="Your profile" />
                            </div>
                        ) : (
                            <MdAccountCircle className="icon" />
                        )}

                        <span className="topbar--username">{userProfile.profile?.name}</span>

                        <TopbarDropdown />
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = ({ rootStore }) => {
    const { profile } = rootStore.userStore;
    return {
        profile
    };
};
export default inject(mapStateToProps)(Topbar);
