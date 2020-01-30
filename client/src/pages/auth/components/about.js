import React from 'react';
import svg1 from 'assets/auth-svg1.svg';
import svg2 from 'assets/auth-svg2.svg';

export default function AboutSection() {
    return (
        <aside className="about-section">
            <img src={svg1} className="svg-icon icon1" />
            <section className="about-information">
                <h1>The new standard in content management</h1>
                <p>
                    Finally, the freedom to use your favorite tools and frameworks without CMS
                    technical debt.
                </p>
            </section>
            <img src={svg2} className="svg-icon icon2" />
        </aside>
    );
}
