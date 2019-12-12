import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Layout from 'components/layout';
import AllPages from './components/AllPages';
import CreatePage from './components/CreatePage';

import { GET_PAGES, ADD_PAGE } from './graphql';

import './style.scss';

export default function PagesModule() {
    const queryResponse = useQuery(GET_PAGES);

    const [addPage] = useMutation(ADD_PAGE, {
        // update mutation with response
        update(cache, { data }) {
            // read current data from cache
            const { pages } = cache.readQuery({ query: GET_PAGES });

            // re-write cache with new data from mutation
            cache.writeQuery({
                query: GET_PAGES,
                data: { pages: pages.concat([data.addPage]) }
            });
        }
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
