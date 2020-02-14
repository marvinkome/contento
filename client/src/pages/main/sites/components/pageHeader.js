import React from 'react';

export default class PageHeader extends React.Component {
    render() {
        return (
            <article className="page-header">
                <section className="page-description">
                    <h1>My Projects</h1>
                    <p>Select a website to manage or create a new one.</p>
                </section>

                <section className="page-action">
                    <button onClick={this.props.toggleModal} className="btn btn-primary">
                        Create New Site
                    </button>
                </section>
            </article>
        );
    }
}
