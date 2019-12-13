import React from 'react';
import debounce from 'lodash/debounce';
import Layout from 'components/layout';
import MainEditor from './components/MainEditor';
import BlockPicker from './components/BlockPicker';

import './style.scss';

export default class Editor extends React.Component {
    state = {
        blocks: [],
        saveStatus: 'saved as draft'
    };

    componentDidMount() {
        this.debounceAutoSave = debounce(this.autoSave, 1000);
    }

    componentWillUnmount() {
        this.debounceAutoSave.cancel();
    }

    autoSave = () => {
        console.log('time to save all this data', this.state.blocks);
        this.setState({ saveStatus: 'saving...' });
    };

    addBlock = (blockType) => {
        const { blocks } = this.state;

        const block = {
            // use a random ID until item is saved
            id: Math.floor(Math.random() * 1000),
            type: blockType,
            name: '',
            content: ''
        };

        this.setState({ blocks: blocks.concat([block]) }, this.debounceAutoSave);
    };

    removeBlock = (blockId) => {
        const { blocks } = this.state;

        this.setState(
            {
                blocks: blocks.filter((block) => block.id !== blockId)
            },
            this.debounceAutoSave
        );
    };

    updateBlock = (blockId, blockField, fieldValue) => {
        const { blocks } = this.state;

        this.setState(
            {
                blocks: blocks.map((block) => {
                    if (block.id === blockId) {
                        return Object.assign({}, block, { [blockField]: fieldValue });
                    }
                    return block;
                })
            },
            this.debounceAutoSave
        );
    };

    render() {
        return (
            <Layout>
                <div className="editor-container">
                    {/* main editor */}
                    <MainEditor
                        blocks={this.state.blocks}
                        saveStatus={this.state.saveStatus}
                        removeBlock={this.removeBlock}
                        updateBlock={this.updateBlock}
                    />

                    {/* block picker */}
                    <BlockPicker addBlock={this.addBlock} />
                </div>
            </Layout>
        );
    }
}
