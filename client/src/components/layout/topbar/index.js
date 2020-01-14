import React from 'react';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { MdAccountCircle, MdMenu } from 'react-icons/md';
import logo from 'assets/logo.png';
import './style.scss';

class Topbar extends React.Component {
    render() {
        const profile = this.props.profile;

        return (
            <div className="main__topbar">
                <div className="logo-area">
                    <MdMenu onClick={this.props.toggleSidebar} className="icon" />
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
    const { profile } = rootStore.userStore;
    return {
        profile
    };
};
export default inject(mapStateToProps)(Topbar);
