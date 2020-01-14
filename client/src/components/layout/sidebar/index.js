import React, { createRef } from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';
import { MdFolder, MdChevronRight, MdClose } from 'react-icons/md';
import NoSite from 'components/noSite';
import './style.scss';

class Sidebar extends React.Component {
    sidebarRef = createRef();

    closeMenu = (e) => {
        // if current target being clicked is not the sidebar div
        // and is not a child of the sidebar div, then toggle
        if (e.target !== this.sidebarRef.current && !this.sidebarRef.current.contains(e.target)) {
            this.props.toggleSidebar();
        }
    };

    render() {
        const sites = this.props.sites;
        const { siteid } = this.props.match.params;

        return (
            <div onClick={this.closeMenu} className="sidebar-bg">
                <div className="sidebar" ref={this.sidebarRef}>
                    <div className="sidebar-header">
                        <h3>Sites</h3>

                        <a href="/create-site">+ Create site</a>
                    </div>

                    <div className="sidebar-body">
                        {/* if no sites available */}
                        {!sites.length && (
                            <NoSite className="no-sites-sidebar" cb={this.props.toggleSidebar} />
                        )}

                        {sites.map((site) => (
                            <Link
                                onClick={this.props.toggleSidebar}
                                key={site.id}
                                to={`/sites/${site.id}/pages`}
                                className={classnames({ active: siteid === site.id })}
                            >
                                <div>
                                    <MdFolder className="icon" />
                                    {site.name}
                                </div>

                                <MdChevronRight className="icon" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="close-sidebar">
                    <MdClose className="icon" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ rootStore }) => {
    const { sites } = rootStore.siteStore;
    return {
        sites
    };
};
export default inject(mapStateToProps)(withRouter(Sidebar));
