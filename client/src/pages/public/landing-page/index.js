import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { GOOGLE_ANALYTICS } from 'libs/keys';

// assets
import Logo from 'assets/logo.png';
import HeaderImage from 'assets/landing-page/headerImage.svg';
import HowItWorksImage from 'assets/landing-page/howItWorks.svg';

// styles
import './style.scss';

export default function LandingPage() {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.initialize(GOOGLE_ANALYTICS);
            ReactGA.pageview('/');
        }
    }, []);

    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>

                <ul>
                    <li>
                        <a href="https://github.com/marvinkome/contento/wiki/Contento-API">
                            Documentation
                        </a>
                    </li>

                    <li>
                        <Link className="auth-link" to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
            <header className="header--container">
                <div className="text--container">
                    <div className="header--text">
                        <h1>A modern approach to content management</h1>

                        <p>
                            Create and update contents from a central location and stop deploying
                            new versions of your website because of a grammatical error or typo.
                        </p>

                        <Link to="/register" className="btn btn-primary">
                            GET STARTED - FOR FREE
                        </Link>
                    </div>
                </div>

                <div className="svg--container">
                    <img src={HeaderImage} alt="contento-header" />
                </div>
            </header>

            <section className="discover--container">
                <h2>Here's how contento works</h2>

                <div className="discover-grid">
                    <div className="svg--container">
                        <img src={HowItWorksImage} alt="How contento works" />
                    </div>

                    <div className="text--container">
                        <p>
                            <span>1:</span>
                            <span>
                                Create content easily for each page of your website using the
                                Contento editor
                            </span>
                        </p>

                        <p>
                            <span>2:</span>
                            <span>Apply content on your website using the Contento API</span>
                        </p>

                        <p>
                            <span>3:</span>
                            <span>
                                Update the content on the Contento editor and automatically get
                                changes on your website
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer--container">
                <div className="footer--background">
                    <h1>Modernize your approach to handling content</h1>

                    <Link to="/register" className="btn btn-primary">
                        GET STARTED - for free
                    </Link>
                </div>
                <div className="footer-background--light"></div>
            </footer>
        </div>
    );
}
