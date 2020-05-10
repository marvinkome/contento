import React from 'react';
import plus from 'assets/icons/plus_icon.svg';

export default class PageHeader extends React.Component {
    render() {
        return (
            <article className="page-header">
                <section className="page-description">
                    <h1>PopArt Pages</h1>
                    <p>Select a page to manage or create a new one.</p>
                </section>

                <section className="page-action">
                    <button onClick={this.props.toggleModal} className="btn btn-primary">
                        <img
                            src={plus}
                            alt="icon"
                            style={{ position: 'relative', right: '20px' }}
                        />
                        Create New Site
                    </button>
                </section>
            </article>
        );
    }
}
