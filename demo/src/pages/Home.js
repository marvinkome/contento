import React from 'react';
import { mainApi } from 'libs/api';

export default class HomePage extends React.Component {
    state = {
        data: null
    };

    async componentDidMount() {
        // fetch the contents for this page
        const { data } = await mainApi.getPage('home');

        if (data) {
            this.setState({ data });
        }
    }

    render() {
        const { data } = this.state;

        if (!data) {
            return <p>Loading contents</p>;
        }

        return (
            <div className="home-page">
                <header>
                    <h1>{data.contents['header_title'].content}</h1>
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
