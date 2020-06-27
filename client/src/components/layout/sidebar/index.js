import React from 'react';
import plus from 'assets/icons/plus_icon.svg';
import { useQuery } from '@apollo/react-hooks';
import { GET_SITES } from './graphql';

export default function Sidebar() {
    const { data, error } = useQuery(GET_SITES);

    if (error) {
        console.log(error);
    }

    return (
        <div className="dashboard__sidebar">
            <aside className="sidebar--aside">
                {data?.sites &&
                    data.sites.map((site) => (
                        <a key={site.id} href="/" className="site-btn">
                            {site.name.charAt(0)}
                            <span className="tooltip__text">{site.name}</span>
                        </a>
                    ))}

                <a href="/" className="add-icon site-btn">
                    <img src={plus} alt="icon" />
                    <span className="tooltip__text">Click here to create a new site</span>
                </a>
            </aside>
        </div>
    );
}
