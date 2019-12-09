import React from 'react';

export default class MainSection extends React.Component {
    renderListEmpty = () => {
        return (
            <div className="no-page">
                <p>You {"haven't"} created any page yet.</p>
                <p>To create a page use the form on the right.</p>

                <ul>
                    <li>Name your page e.g Landing page</li>
                    <li>
                        Click on {'"ADD PAGE"'} and {"it'll"} reflect here
                    </li>
                </ul>
            </div>
        );
    };

    renderPage = () => {
        return (
            <div className="page">
                <div className="page-title">
                    <p>Page Name</p>
                    {/* edit icon */}
                </div>

                <div className="page-actions">
                    <a href="#" className="btn btn-outline">
                        Delete
                    </a>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="all_pages_section">
                <h2>All Pages</h2>

                <div className="all-pages__list">
                    {/* {this.renderListEmpty()} */}
                    {this.renderPage()}
                    {this.renderPage()}
                </div>
            </div>
        );
    }
}
