import React from 'react';
import { Link } from 'react-router-dom';

export default function Page({ page, siteId }) {
    return (
        <Link className="page-container" to={`/app/sites/${siteId}/editor/${page.id}`}>
            <div className="page">
                <p className="page-name">Edit {page.name}</p>
            </div>
        </Link>
    );
}
