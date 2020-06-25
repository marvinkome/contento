import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import SidebarAside from './sidebarAside';
import { GET_SITES } from './graphql';

export default function Sidebar() {
    const { data, error, loading } = useQuery(GET_SITES);

    if (loading) {
        return null;
    }

    if (error) {
        console.log(error);
    }

    return (
        <div className="dashboard__sidebar">
            <SidebarAside />

            <div className="sidebar__main">
                <p>SideBar Main</p>
            </div>
        </div>
    );
}
