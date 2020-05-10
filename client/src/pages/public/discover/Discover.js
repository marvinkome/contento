import React from 'react';
import VidContainer from '../img/VidContainer.png';

const Discover = () => {
    return (
        <div className="discover--container">
            <div className="vid-grid">
                <h1 className="h1-text">How Contento changes the way it was</h1>
                <div className="bottom--image">
                    <div className="video--player">
                        <img src={VidContainer} alt="A video" />
                    </div>
                </div>
            </div>
            <div className="text-grid">
                <p className="paragraph--text">
                    Stop using old tools to solve a modern problem: delivering great digital
                    experiences. Web CMSes create digital sprawl — content silos that slow
                    innovation. But a unified content layer enables your team to scale and iterate
                    faster. See ya, CMS.
                </p>
                <button className="site-btn">Discover it’s power</button>
            </div>
        </div>
    );
};

export default Discover;
