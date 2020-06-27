import React, { useState } from 'react';
import Layout from 'components/layout';
import PageHeader from './components/pageHeader';
import AddPageModal from './components/addPageModal';
import Page from './components/page';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_SITE_PAGES, ADD_PAGE, DELETE_PAGE, UPDATE_PAGE } from './graphql';

import './style.scss';

function useMutations() {
    const { siteid } = useParams();

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

    // delete page
    const [deletePage] = useMutation(DELETE_PAGE, {
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
                        pages: site.pages.filter((page) => page.id !== data.deletePage)
                    }
                }
            });
        },

        // add root variables
        variables: { siteid }
    });

    // update page
    const [editPage] = useMutation(UPDATE_PAGE, {
        variables: { siteid }
    });

    return [addPage, deletePage, editPage];
}

export default function Pages() {
    // modal
    const [addPageModalIsOpen, setAddPageModal] = useState(false);
    const toggleAddModal = () => setAddPageModal(!addPageModalIsOpen);

    // page query
    const { siteid } = useParams();
    const { error, data } = useQuery(GET_SITE_PAGES, { variables: { siteid } });

    // add page
    const [addPage, deletePage, editPage] = useMutations();

    return (
        <Layout>
            <main className="pages-page">
                <PageHeader siteName={data?.site?.name} toggleModal={toggleAddModal} />

                <section className="page-list">
                    {error && <p>Error loading pages</p>}

                    {data &&
                        data.site.pages.map((page) => (
                            <Page
                                page={page}
                                key={page.id}
                                siteId={data.site.id}
                                deletePage={deletePage}
                                editPage={editPage}
                            />
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
