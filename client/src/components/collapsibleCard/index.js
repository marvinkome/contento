import React, { useState } from 'react';
import classnames from 'classnames';
import { FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './style.scss';

export default function CollapsibleCard(props) {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className="collapsible-card">
            <header className={classnames({ collapsed })}>
                <div onClick={toggleCollapse} className="title-and-toggle">
                    <p>{props.title}</p>

                    {collapsed ? (
                        <FiChevronDown onClick={toggleCollapse} className="icon" />
                    ) : (
                        <FiChevronUp onClick={toggleCollapse} className="icon" />
                    )}
                </div>

                <div className="delete">
                    <FiTrash2 className="icon" onClick={props.onDelete} />
                </div>
            </header>

            <div className={classnames('body', { collapsed })}>{props.children}</div>
        </div>
    );
}
