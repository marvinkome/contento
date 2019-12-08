import React from 'react';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { MdAccountCircle } from 'react-icons/md';
import logo from 'assets/logo.svg';
import './style.scss';

class Topbar extends React.Component {
    render() {
        const profile = this.props.profile;

        return (
            <div className="main__topbar">
                <div className="logo-area">
                    <img src={logo} alt="logo" />
                </div>

                <div className="topbar-links">
                    <div className="notif-content">
                        {profile && (
                            <Link className="profile-link" to="/profile">
                                Howdy, {profile.username}
                                <MdAccountCircle className="icon" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { updateProfile, profile } = rootStore.userStore;
    return {
        setProfile: updateProfile,
        profile
    };
};
export default inject(mapStateToProps)(Topbar);
