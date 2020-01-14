import React from 'react';
import Layout from 'components/layout';
import NoSite from 'components/noSite';
import './style.scss';

export default class NoSitePage extends React.Component {
    render() {
        return (
            <Layout>
                <NoSite className="no-sites" />
            </Layout>
        );
    }
}
