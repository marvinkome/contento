import React from 'react';
import classnames from 'classnames';
import { mainClient } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { inject } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

class TopbarDropdown extends React.Component {
    dropdownMenu = React.createRef();
    state = {
        dropdownOpen: false
    };

    openDropdown = () => {
        this.setState({ dropdownOpen: true }, () => {
            // close the dropdown when document is clicked
            document.addEventListener('click', this.closeDropdown);
        });
    };

    closeDropdown = () => {
        this.setState({ dropdownOpen: false }, () => {
            document.removeEventListener('click', this.closeDropdown);
        });
    };

    logout = (e) => {
        e.preventDefault();

        // remove profile
        this.props.updateProfile(null);

        // remove auth token
        localStorage.removeItem(AUTH_TOKEN_KEY);

        // remove access token
        mainClient.removeAccessToken();

        // go to landing page
        this.props.history.push('/');
    };

    render() {
        const dropdownClass = classnames('dropdown-container', {
            isOpen: this.state.dropdownOpen
        });

        const siteId = this.props.match.params.siteid;

        return (
            <>
                <MdKeyboardArrowDown onClick={this.openDropdown} className="icon dropdown-icon" />

                <div className={dropdownClass} ref={this.dropdownMenu}>
                    <div className="clip-arrow" />
                    <div className="dropdown">
                        {siteId && <Link to={`/app/sites/${siteId}/settings`}>Site settings</Link>}
                        <Link to="/app/profile">User profile</Link>

                        <hr />

                        <Link to="/contact-us">Contact us</Link>
                        <Link to="/documentation">Documentation</Link>

                        <hr />

                        <a href="#logout" onClick={this.logout}>
                            Logout
                        </a>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { updateProfile } = rootStore.userStore;

    return {
        updateProfile
    };
};

export default inject(mapStateToProps)(withRouter(TopbarDropdown));
