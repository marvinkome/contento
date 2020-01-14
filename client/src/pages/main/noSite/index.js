import React from 'react';
import { inject } from 'mobx-react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import Layout from 'components/layout';
import NoSite from 'components/noSite';
import { GET_SITES } from './graphql';
import './style.scss';

function NoSitePage(props) {
    const { loading, data, error } = useQuery(GET_SITES);

    if (loading) {
        return (
            <Layout>
                <p>Loading sites...</p>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <p>Error loading sites...</p>
            </Layout>
        );
    }

    // get the list of sites
    if (!data.sites.length) {
        return (
            <Layout>
                <NoSite className="no-sites" />
            </Layout>
        );
    }

    // add list of sites to store
    props.addSites(data.sites);

    // redirect to the last site in the list
    const { id } = data.sites[data.sites.length - 1];

    return <Redirect to={`/sites/${id}/pages`} />;
}

const mapStateToProps = ({ rootStore }) => {
    const { addSites } = rootStore.siteStore;
    return {
        addSites
    };
};
export default inject(mapStateToProps)(NoSitePage);
