import React from 'react';
import { MdEdit } from 'react-icons/md';

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
                    <a href="#" title="Click to add contents to Page name page">
                        Page Name
                    </a>
                    <a href="#" title="Edit page">
                        <MdEdit className="icon" />
                    </a>
                </div>

                <div className="page-actions">
                    <a href="#" title="Delete page" className="btn btn-sm btn-delete-outline">
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
