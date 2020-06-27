import React, { useState } from 'react';
import classnames from 'classnames';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import './style.scss';

export default function Dropdown(props) {
    const [dropdownOpen, setDropdownState] = useState(false);

    const closeDropdown = () => {
        setDropdownState(false);
        document.removeEventListener('click', closeDropdown);
    };

    const openDropdown = () => {
        setDropdownState(true);
        // close the dropdown when document is clicked
        document.addEventListener('click', closeDropdown);
    };

    const dropdownClass = classnames('dropdown-container', {
        isOpen: dropdownOpen
    });

    return (
        <>
            <div onClick={dropdownOpen ? closeDropdown : openDropdown} className="dropdown-icon">
                {props.toggle ||
                    (dropdownOpen ? (
                        <MdKeyboardArrowUp onClick={closeDropdown} className="icon" />
                    ) : (
                        <MdKeyboardArrowDown onClick={openDropdown} className="icon" />
                    ))}
            </div>

            <div className={dropdownClass}>
                <div className="dropdown">{props.children}</div>
            </div>
        </>
    );
}
