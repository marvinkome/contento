import React from 'react';
import Layout from 'components/layout';
import MainEditor from './components/MainEditor';
import BlockPicker from './components/BlockPicker';

import './style.scss';

export default function Editor() {
    return (
        <Layout>
            <div className="editor-container">
                {/* main editor */}
                <MainEditor />

                {/* block picker */}
                <BlockPicker />
            </div>
        </Layout>
    );
}
