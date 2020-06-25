import React from 'react';
import { Link } from 'react-router-dom';

// assets
import Logo from 'assets/logo.png';
import VidContainer from 'assets/landing-page/VidContainer.png';

// styles
import './style.scss';

export default function LandingPage() {
    return (
        <div className="landing-page">
            <div className="header--container">
                <div className="text--container">
                    <div className="logo">
                        <img src={Logo} alt="logo" width="200px" />
                    </div>

                    <div className="header--text">
                        <h1>NEXT GEN CMS</h1>

                        <p>
                            Stop using old tools to solve a modern problem: delivering great digital
                            experiences. Web CMSes create digital sprawl — content silos that slow
                            innovation. But a unified content layer enables your team to scale and
                            iterate faster. See ya, CMS.
                        </p>

                        <div className="btn--container">
                            <Link to="/register" className="site-btn grey--md">
                                GET STARTED - FOR FREE
                            </Link>

                            <a href="/" className="site-btn white">
                                LEARN MORE
                            </a>
                        </div>
                    </div>
                </div>

                <div className="boxes--container">
                    <div className="header-box">
                        <div className="header--video">
                            <img src={VidContainer} alt="A video" width="100%" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="discover--container">
                <div className="vid-grid">
                    <h2>How Contento changes the way it was</h2>

                    <div className="video--player">
                        <img src={VidContainer} alt="A video" />
                    </div>
                </div>

                <div className="text-grid">
                    <p className="paragraph--text">
                        Stop using old tools to solve a modern problem: delivering great digital
                        experiences. Web CMSes create digital sprawl — content silos that slow
                        innovation. But a unified content layer enables your team to scale and
                        iterate faster. See ya, CMS.
                    </p>
                    <a href="/" className="site-btn">
                        Discover it’s power
                    </a>
                </div>
            </div>

            <div className="get-started__container">
                <div className="get-started__text">
                    <div className="header-get-started__text">
                        <h2>CONTENTO IS FOR ANYONE</h2>
                        <p>- BUILT BY DEVELOPERS FOR DEVELOPERS</p>
                    </div>

                    <div className="intro--text">
                        <p>
                            Stop using old tools to solve a modern problem: delivering great digital
                            experiences. Web CMSes create digital sprawl — content silos that slow
                            innovation. But a unified content layer enables your team to scale and
                            iterate faster. See ya, CMS.
                        </p>
                        <p>
                            Stop using old tools to solve a modern problem: delivering great digital
                            experiences. Web CMSes create digital sprawl — content silos that slow
                            innovation. But a unified content layer enables your team to scale and
                            iterate faster. See ya, CMS.
                        </p>
                    </div>
                    <a href="/" className="site-btn">
                        GET STARTED - FOR FREE
                    </a>
                </div>

                <div className="media--container">
                    <img src={VidContainer} alt="A box" />
                </div>
            </div>

            <div className="footer--container">
                <div className="footer--background"></div>
                <div className="footer-background--light"></div>
            </div>
        </div>
    );
}
