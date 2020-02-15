import React from 'react';
import Layout from 'components/layout';
import AllPages from './components/AllPages';
import CreatePage from './components/CreatePage';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_SITE_PAGES, ADD_PAGE } from './graphql';

import './style.scss';

export default function PagesModule() {
    const { siteid } = useParams();
    const queryResponse = useQuery(GET_SITE_PAGES, { variables: { siteid } });

    const [addPage] = useMutation(ADD_PAGE, {
        // update mutation with response
        update(cache, { data }) {
            // read current data from cache
            const { site } = cache.readQuery({ query: GET_SITE_PAGES, variables: { siteid } });

            // re-write cache with new data from mutation
            cache.writeQuery({
                query: GET_SITE_PAGES,
                data: {
                    site: {
                        ...site,
                        pages: site.pages.concat([data.addPage])
                    }
                }
            });
        },

        // add root variables
        variables: { siteid }
    });

    return (
        <Layout>
            <div className="pages">
                <AllPages response={queryResponse} />
                <CreatePage addPage={addPage} />
            </div>
        </Layout>
    );
}
