import React from 'react';
import Layout from 'components/layout';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SITE, DELETE_SITE, UPDATE_SITE } from './graphql';
import { GET_SITES } from 'pages/main/sites/graphql';

import GeneralSettings from './components/generalSettings';
import SiteKeys from './components/siteKeys';
import DangerZone from './components/dangerZone';

import './style.scss';

function useMutations() {
    const { siteid } = useParams();

    // delete page
    const [deleteSite] = useMutation(DELETE_SITE, {
        // update mutation with response
        update(cache, { data }) {
            // read current data from cache
            const { sites } = cache.readQuery({ query: GET_SITES, variables: { siteid } });

            // re-write cache with new data from mutation
            cache.writeQuery({
                query: GET_SITES,
                data: {
                    sites: sites.filter((site) => site.id !== data.deleteSite)
                }
            });
        },

        // add root variables
        variables: { siteid }
    });

    // update page
    const [editSite] = useMutation(UPDATE_SITE, {
        variables: { siteid }
    });

    return [deleteSite, editSite];
}

export default function SiteSettings() {
    const { siteid } = useParams();
    const { data, loading } = useQuery(GET_SITE, { variables: { siteid } });
    const [deleteSite, editSite] = useMutations();

    if (!loading && !data.site) {
        return (
            <Layout>
                <main className="site-settings-page">
                    <p>Oops site not found</p>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="site-settings-page">
                <article className="page-header">
                    <section className="page-description">
                        <h1>{data?.site?.name} - Settings</h1>
                    </section>
                </article>

                <GeneralSettings site={data?.site} editSite={editSite} />

                <SiteKeys site={data?.site} />

                <DangerZone deleteSite={deleteSite} />
            </main>
        </Layout>
    );
}
