import React, { useState } from 'react';
import Layout from 'components/layout';
import PageHeader from './components/pageHeader';
import CreateSiteModal from './components/createSiteModal';
import Site from './components/Site';
import './style.scss';

export default function Sites() {
    const [createModalIsOpen, setCreateModalState] = useState(false);
    const toggleCreateModal = () => setCreateModalState(!createModalIsOpen);

    return (
        <Layout>
            <main className="sites-page">
                <PageHeader toggleModal={toggleCreateModal} />

                <div className="site-list">
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                    <Site />
                </div>
            </main>

            {/* modal */}
            <CreateSiteModal toggleModal={toggleCreateModal} isOpen={createModalIsOpen} />
        </Layout>
    );
}
