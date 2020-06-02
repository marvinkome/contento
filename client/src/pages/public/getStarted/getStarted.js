import React from 'react';
import VidContainer from '../img/VidContainer.png';

function GetStarted() {
    return (
        <div className="get-started__container">
            <div className="get-started__text">
                <div className="header-get-started__text">
                    <h2>CONTENTO IS FOR ANYONE</h2>
                    <h6>- BUILT BY DEVELOPERS FOR DEVELOPERS</h6>
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
                <button className="site-btn">GET STARTED - FOR FREE</button>
            </div>
            <div className="media--container">
                <div className="box__container">
                    <img src={VidContainer} alt="A box" width="90%" height="80%" />
                </div>
            </div>
        </div>
    );
}

export default GetStarted;
