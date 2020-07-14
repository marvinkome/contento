import React, { useLayoutEffect } from 'react';
import Topbar from './topbar';
import Sidebar from './sidebar';

import './layout.scss';

export default function Layout(props) {
    useLayoutEffect(() => {
        document
            .querySelector('meta[name="viewport"]')
            .setAttribute(
                'content',
                'width=1024, initial-scale=0, maximum-scale=1.0, minimum-scale=0.25, ' +
                    'user-scalable=yes'
            );
    });

    return (
        <div className="dashboard__container">
            <Topbar />
            <Sidebar />
            <div className="dashboard__main">{props.children}</div>
        </div>
    );
}
