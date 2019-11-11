import React from 'react';
import { MdNotificationsNone, MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.svg';
import './style.scss';

class Topbar extends React.Component {
    render() {
        return (
            <div className="main__topbar">
                <div className="logo-area">
                    <img src={logo} alt="logo" />
                </div>

                <div className="topbar-links">
                    <div className="notif-content">
                        <a className="notif-box" href="/">
                            <MdNotificationsNone className="icon" />
                            <i className="notif-icon" />
                        </a>

                        <Link className="profile-link" to="/admin">
                            Howdy, Marvin
                        </Link>
                        <MdAccountCircle className="icon" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Topbar;
