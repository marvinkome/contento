import React from 'react';

export default class HomePage extends React.Component {
    componentDidMount() {
        // fetch the contents for this page
    }

    render() {
        return (
            <div className="home-page">
                <header>
                    <h1>This is the header title</h1>
                    <p>This is the header sub title</p>
                </header>

                <hr />

                <section>
                    <p>This is the body of the main section</p>
                </section>

                <hr />

                <footer>
                    <p>This is the footer</p>
                    <p>With some copyright &copy; 2020</p>
                </footer>
            </div>
        );
    }
}
