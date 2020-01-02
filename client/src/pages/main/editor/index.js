import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Layout from 'components/layout';
import MainEditor from './components/MainEditor';
import BlockPicker from './components/BlockPicker';
import { GET_PAGE } from './graphql';

import './style.scss';

function useDataFetch() {
    const { pageid } = useParams();
    const queryResponse = useQuery(GET_PAGE, {
        variables: { pageId: pageid }
    });

    return queryResponse;
}

function useBlocks() {
    const [blocks, updateBlockState] = useState([]);

    const addBlock = (blockType) => {
        const block = {
            // use a random ID until item is saved
            id: Math.floor(Math.random() * 1000),
            type: blockType,
            name: '',
            content: ''
        };

        updateBlockState(blocks.concat([block]));
    };

    const removeBlock = (blockId) => {
        updateBlockState(blocks.filter((block) => block.id !== blockId));
    };

    const updateBlock = (blockId, blockField, fieldValue) => {
        updateBlockState(
            blocks.map((block) => {
                if (block.id === blockId) {
                    return Object.assign({}, block, { [blockField]: fieldValue });
                }
                return block;
            })
        );
    };

    return {
        blocks,
        addBlock,
        removeBlock,
        updateBlock
    };
}

export default function EditorHooks() {
    const queryResponse = useDataFetch();
    const { blocks, addBlock, removeBlock, updateBlock } = useBlocks();

    return (
        <Layout>
            <div className="editor-container">
                {/* main editor */}
                <MainEditor
                    blocks={blocks}
                    removeBlock={removeBlock}
                    updateBlock={updateBlock}
                    response={queryResponse}
                />

                {/* block picker */}
                <BlockPicker addBlock={addBlock} />
            </div>
        </Layout>
    );
}
