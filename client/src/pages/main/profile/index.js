import React from 'react';
import Layout from 'components/layout';

import ProfileSection from './components/profileSection';
import OAuthConnect from './components/OAuthConnect';
import './style.scss';

export default class Profile extends React.Component {
    render() {
        return (
            <Layout>
                <main className="profile-page">
                    <article className="page-header">
                        <section className="page-description">
                            <h1>My Profile</h1>
                        </section>
                    </article>

                    <ProfileSection />

                    <OAuthConnect />
                </main>
            </Layout>
        );
    }
}
