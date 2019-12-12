import React from 'react';
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

        return (
            <div className="all_pages_section">
                <h2>All Pages</h2>

                <div className="all-pages__list">
                    {/* handle error and loading case */}
                    {loading && <p>Fetching pages...</p>}
                    {error && <p>Error fetching pages. {error.message}</p>}

                    {/* handle data case */}
                    {data && (
                        <React.Fragment>
                            {data.pages.length
                                ? data.pages.map((page) => <SinglePage key={page.id} page={page} />)
                                : this.renderListEmpty()}
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}
