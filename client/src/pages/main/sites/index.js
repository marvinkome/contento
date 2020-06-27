import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import Layout from 'components/layout';
import { GET_SITES } from './graphql';

export default function SitePage() {
    const { data, error } = useQuery(GET_SITES);

    if (error) {
        return (
            <Layout>
                <p>Error loading site...</p>
            </Layout>
        );
    }

    // redirect to the last site in the list
    const site = data?.sites[data.sites.length - 1];

    if (site?.id) {
        return <Redirect to={`/app/sites/${site.id}/pages`} />;
    }

    return null;
}
