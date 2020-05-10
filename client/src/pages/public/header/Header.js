import React from 'react';
import Logo from '../img/logo.png';
import VidContainer from '../img/VidContainer.png';

const Header = () => {
    return (
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
                        <button className="site-btn grey--md">GET STARTED - FOR FREE</button>
                        <button className="site-btn white">LEARN MORE</button>
                    </div>
                </div>
            </div>
            <div className="boxes--container">
                <div className="header-box">
                    <div className="header--video">
                        <img src={VidContainer} alt="A video" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
