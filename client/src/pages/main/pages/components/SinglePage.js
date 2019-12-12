import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default class SinglePage extends React.Component {
    render() {
        const { page } = this.props;
        return (
            <div className="page">
                <div className="page-title">
                    <a href="/editor/569987" title="Click to add contents to Page name page">
                        {page.name}
                    </a>
                </div>

                <div className="page-actions">
                    <a href="/edit" title="Edit page">
                        <FiEdit2 className="icon" />
                    </a>
                    <a href="/delete" title="Delete page">
                        <FiTrash2 className="delete-icon icon" />
                    </a>
                </div>
            </div>
        );
    }
}
