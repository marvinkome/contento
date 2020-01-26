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
                    <p>{data.contents['header_sub_title'].content}</p>
                </header>

                <hr />

                <section>
                    <p>{data.contents['main_body'].content}</p>
                </section>

                <hr />

                <footer>
                    <p>{data.contents['footer_text'].content}</p>
                    <p>With some copyright &copy; 2020</p>
                </footer>
            </div>
        );
    }
}
