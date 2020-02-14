import React, { useState } from 'react';
import Layout from 'components/layout';
import PageHeader from './components/pageHeader';
import CreateSiteModal from './components/createSiteModal';
import Site from './components/Site';
import { useQuery } from '@apollo/react-hooks';
import { GET_SITES } from './graphql';
import './style.scss';

export default function Sites() {
    // modal
    const [createModalIsOpen, setCreateModalState] = useState(false);
    const toggleCreateModal = () => setCreateModalState(!createModalIsOpen);

    // sites query
    const { loading, error, data } = useQuery(GET_SITES);

    return (
        <Layout>
            <main className="sites-page">
                <PageHeader toggleModal={toggleCreateModal} />

                <div className="site-list">
                    {loading && <p>Fetching sites...</p>}
                    {error && <p>Error loading sites</p>}

                    {data && data.sites.map((site) => <Site key={site.id} site={site} />)}
                </div>
            </main>

            {/* modal */}
            <CreateSiteModal toggleModal={toggleCreateModal} isOpen={createModalIsOpen} />
        </Layout>
    );
}
