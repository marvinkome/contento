import React from 'react';
import Layout from 'components/layout';
import MainEditor from './components/MainEditor';
import BlockPicker from './components/BlockPicker';

export default class Editor extends React.Component {
    state = {
        blocks: []
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

        this.setState({ blocks: blocks.concat([block]) });
    };

    removeBlock = (blockId) => {
        const { blocks } = this.state;

        this.setState({
            blocks: blocks.filter((block) => block.id !== blockId)
        });
    };

    updateBlock = (blockId, blockField, fieldValue) => {
        const { blocks } = this.state;

        this.setState({
            blocks: blocks.map((block) => {
                if (block.id === blockId) {
                    return Object.assign({}, block, { [blockField]: fieldValue });
                }
                return block;
            })
        });
    };

    render() {
        return (
            <Layout>
                <div className="editor-container">
                    {/* main editor */}
                    <MainEditor
                        blocks={this.state.blocks}
                        removeBlock={this.removeBlock}
                        updateBlock={this.updateBlock}
                        response={this.props.response}
                    />

                    {/* block picker */}
                    <BlockPicker addBlock={this.addBlock} />
                </div>
            </Layout>
        );
    }
}
