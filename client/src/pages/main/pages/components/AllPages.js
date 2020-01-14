import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import SinglePage from './SinglePage';

export default class MainSection extends React.Component {
    renderListEmpty = () => {
        return (
            <div className="no-page">
                <p>You {'haven\'t'} created any page yet.</p>
                <p>To create a page use the form on the right.</p>

                <ul>
                    <li>Name your page e.g Landing page</li>
                    <li>
                        Click on {'"ADD PAGE"'} and {'it\'ll'} reflect here
                    </li>
                </ul>
            </div>
        );
    };

    render() {
        const { loading, error, data } = this.props.response;

        if (loading) {
            return (
                <div className="all_pages_section">
                    <p>Fetching pages...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="all_pages_section">
                    <p>Error fetching pages. {error.message}</p>
                </div>
            );
        }

        // handle data
        const site = data?.site;

        return (
            <div className="all_pages_section">
                <h2>
                    {site?.name} <MdKeyboardArrowRight className="icon" /> All Pages
                </h2>

                <div className="all-pages__list">
                    {!site?.pages.length && this.renderListEmpty()}

                    {site?.pages?.map((page) => <SinglePage key={page.id} page={page} />)}
                </div>
            </div>
        );
    }
}
