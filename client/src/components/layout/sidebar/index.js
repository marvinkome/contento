import React from 'react';
import { MdFolder, MdChevronRight, MdClose } from 'react-icons/md';
import './style.scss';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar-bg">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h3>Sites</h3>

                        <a href="/create-site">+ Create site</a>
                    </div>

                    <div className="sidebar-body">
                        <a href="/sites/myid">
                            <div>
                                <MdFolder className="icon" />
                                Site name
                            </div>

                            <MdChevronRight className="icon" />
                        </a>

                        <a href="/sites/myid">
                            <div>
                                <MdFolder className="icon" />
                                Site name
                            </div>

                            <MdChevronRight className="icon" />
                        </a>
                    </div>
                </div>

                <div className="close-sidebar">
                    <MdClose className="icon" />
                </div>
            </div>
        );
    }
}
