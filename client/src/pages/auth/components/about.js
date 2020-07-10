import React from 'react';
import svg1 from 'assets/auth-svg1.svg';
import svg2 from 'assets/auth-svg2.svg';

export default function AboutSection() {
    return (
        <aside className="about-section">
            <img alt="svg1" src={svg1} className="svg-icon icon1" />
            <section className="about-information">
                <h1>A modern approach to content management</h1>
                <p>Finally, the freedom to manage your contents without changing code.</p>
            </section>
            <img alt="svg2" src={svg2} className="svg-icon icon2" />
        </aside>
    );
}
