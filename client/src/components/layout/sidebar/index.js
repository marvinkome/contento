import React from 'react';
import AddSiteModal from './addSiteModal';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SITES, ADD_SITE } from './graphql';
import './style.scss';

export default function Sidebar() {
    const { data, error } = useQuery(GET_SITES);

    // add site mutation
    const [addSite] = useMutation(ADD_SITE, {
        update(cache, { data: { addSite } }) {
            const { sites } = cache.readQuery({ query: GET_SITES });

            cache.writeQuery({
                query: GET_SITES,
                data: { sites: sites.concat([addSite]) }
            });
        }
    });

    if (error) {
        console.log(error);
    }

    return (
        <div className="dashboard__sidebar">
            <aside className="sidebar--aside">
                {data?.sites &&
                    data.sites.map((site) => (
                        <Link key={site.id} to={`/app/sites/${site.id}/pages`} className="site-btn">
                            {site.name.charAt(0)}
                            <span className="tooltip__text">{site.name}</span>
                        </Link>
                    ))}

                <AddSiteModal addSite={addSite} />
            </aside>
        </div>
    );
}
