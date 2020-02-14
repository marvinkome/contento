import React from 'react';
import { Link } from 'react-router-dom';

export default class Site extends React.Component {
    render() {
        const { site } = this.props;
        return (
            <Link className="site-container" to={`/app/sites/${site.id}/pages`}>
                <div className="site">
                    <p className="site-name">Manage {site.name}</p>
                </div>
            </Link>
        );
    }
}
