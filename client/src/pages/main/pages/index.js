import React, { useState } from 'react';
import Layout from 'components/layout';
import PageHeader from './components/pageHeader';
import AddPageModal from './components/addPageModal';
import Page from './components/page';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SITE_PAGES, ADD_PAGE } from './graphql';

import './style.scss';

export default function Pages() {
    // modal
    const [addPageModalIsOpen, setAddPageModal] = useState(false);
    const toggleAddModal = () => setAddPageModal(!addPageModalIsOpen);

    // page query
    const { siteid } = useParams();
    const { loading, error, data } = useQuery(GET_SITE_PAGES, { variables: { siteid } });

    // add page
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
            <main className="pages-page">
                <PageHeader siteName={data?.site?.name} toggleModal={toggleAddModal} />

                <section className="page-list">
                    {loading && <p>Fetching pages...</p>}
                    {error && <p>Error loading pages</p>}

                    {data &&
                        data.site.pages.map((page) => (
                            <Page page={page} key={page.id} siteId={data.site.id} />
                        ))}
                </section>

                {/* modal */}
                <AddPageModal
                    isOpen={addPageModalIsOpen}
                    toggleModal={toggleAddModal}
                    addPage={addPage}
                />
            </main>
        </Layout>
    );
}
