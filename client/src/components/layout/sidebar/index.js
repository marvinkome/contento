import React from 'react';
import { Link } from 'react-router-dom';
// import SidebarRoutes from './partials/sidebarRoutes';
import SidebarAside from './sidebarAside';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className="dashboard__sidebar">
                <SidebarAside />
                {/* {routes.map((route, index) => (
                    <SidebarRoutes key={index} item={route} />
                ))} */}
            </div>
        );
    }
}
