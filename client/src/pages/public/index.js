import React from 'react';
import Header from './header/Header';
import Discover from './discover/Discover';
import GetStarted from './getStarted/getStarted';
import Footer from './footer/Footer';

//Styles
import './layout.scss';

const Public = () => {
    return (
        <div className="container">
            <Header />
            <Discover />
            <GetStarted />
            <Footer />
        </div>
    );
};

export default Public;
