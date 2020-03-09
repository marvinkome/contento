import React, { createRef } from 'react';
import classnames from 'classnames';
import { MdKeyboardArrowDown } from 'react-icons/md';

export default class TopbarDropdown extends React.Component {
    dropdownMenu = createRef();
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

    render() {
        const dropdownClass = classnames('dropdown-container', {
            isOpen: this.state.dropdownOpen
        });

        return (
            <>
                <MdKeyboardArrowDown onClick={this.openDropdown} className="icon dropdown-icon" />

                <div className={dropdownClass} ref={this.dropdownMenu}>
                    <div className="clip-arrow" />
                    <div className="dropdown">
                        <a href="#e">Site settings</a>
                        <a href="#e">User profile</a>

                        <hr />

                        <a href="#e">Get help</a>
                        <a href="#e">Documentation</a>

                        <hr />

                        <a href="#e">Logout</a>
                    </div>
                </div>
            </>
        );
    }
}
