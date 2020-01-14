import React, { createRef } from 'react';
import { MdFolder, MdChevronRight, MdClose } from 'react-icons/md';
import NoSite from 'components/noSite';
import './style.scss';

export default class Sidebar extends React.Component {
    sidebarRef = createRef();

    closeMenu = (e) => {
        // if current target being clicked is not the sidebar div
        // and is not a child of the sidebar div, then toggle
        if (e.target !== this.sidebarRef.current && !this.sidebarRef.current.contains(e.target)) {
            this.props.toggleSidebar();
        }
    };

    render() {
        return (
            <div onClick={this.closeMenu} className="sidebar-bg">
                <div className="sidebar" ref={this.sidebarRef}>
                    <div className="sidebar-header">
                        <h3>Sites</h3>

                        <a href="/create-site">+ Create site</a>
                    </div>

                    <div className="sidebar-body">
                        {/* <a href="/sites/myid">
                            <div>
                                <MdFolder className="icon" />
                                Site name
                            </div>

                            <MdChevronRight className="icon" />
                        </a> */}

                        <NoSite className="no-sites-sidebar" cb={this.props.toggleSidebar} />
                    </div>
                </div>

                <div className="close-sidebar">
                    <MdClose className="icon" />
                </div>
            </div>
        );
    }
}
