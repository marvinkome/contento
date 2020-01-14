import React from 'react';
import Layout from 'components/layout';
import NoSite from 'components/noSite';
import './style.scss';

export default function NoSitePage() {
    return (
        <Layout>
            <NoSite className="no-sites" />
        </Layout>
    );
}
