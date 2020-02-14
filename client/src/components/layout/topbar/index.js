import React from 'react';
import classnames from 'classnames';
import { inject } from 'mobx-react';
import { MdAccountCircle, MdKeyboardArrowDown } from 'react-icons/md';
import logo from 'assets/logo.png';
import './style.scss';

class Topbar extends React.Component {
    state = {
        dropdownOpen: false
    };

    toggleDropdown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    renderDropdown = () => {
        return (
            <div className={classnames('dropdown-container', { isOpen: this.state.dropdownOpen })}>
                <div className="clip-arrow" />
                <div className="dropdown">
                    <a href="/">Site settings</a>
                    <hr />
                    <a href="/">Profile settings</a>
                </div>
            </div>
        );
    };

    render() {
        const userProfile = this.props.profile;

        return (
            <div className="main__topbar">
                <div className="logo-area">
                    <img src={logo} alt="logo" />
                </div>

                <div className="topbar-links">
                    <div className="notif-content">
                        {userProfile && (
                            <div className="profile-link">
                                {userProfile.profile?.name}
                                <MdAccountCircle className="icon account-icon" />
                                <MdKeyboardArrowDown
                                    onClick={this.toggleDropdown}
                                    className="icon dropdown-icon"
                                />
                                {this.renderDropdown()}
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
