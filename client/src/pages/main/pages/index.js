import React from 'react';
import Layout from 'components/layout';
import AllPages from './components/AllPages';
import CreatePage from './components/CreatePage';
import './style.scss';

export default class PagesModule extends React.Component {
    render() {
        return (
            <Layout>
                <div className="pages">
                    <AllPages />
                    <CreatePage />
                </div>
            </Layout>
        );
    }
}
