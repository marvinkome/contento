import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Layout from 'components/layout';
import MainEditor from './components/MainEditor';
import BlockPicker from './components/BlockPicker';
import { GET_PAGE, SAVE_BLOCKS } from './graphql';

import './style.scss';

/* === Utils === */
function formatContents(contents) {
    return contents.map((content) => ({
        id: content.id,
        type: content.type,
        name: content.name,
        content: content.content
    }));
}

function formatContentsForSave(contents) {
    return contents.map((content) => ({
        type: content.type,
        name: content.name,
        content: content.content
    }));
}

/* === Custom Hooks ==== */

function useDataFetch() {
    const { pageid, siteid } = useParams();
    const queryResponse = useQuery(GET_PAGE, {
        variables: { pageid, siteid }
    });

    return queryResponse;
}

function useSave(blocks) {
    const [saveBlocks] = useMutation(SAVE_BLOCKS);
    const { pageid, siteid } = useParams();

    return {
        saveBlocks: () => {
            // call mutation function
            saveBlocks({
                variables: {
                    pageid,
                    siteid,
                    blocks: formatContentsForSave(blocks)
                }
            });
        }
    };
}

function useBlocks(queryResponse) {
    const [blocks, updateBlockState] = useState([]);
    const { data } = queryResponse;

    useEffect(() => {
        if (data) {
            // strip out unused GQL details
            const formattedContents = formatContents(data.page.contents);
            updateBlockState(formattedContents);
        }
    }, [data]);

    const addBlock = (blockType) => {
        const block = {
            // use a random ID until item is saved
            id: `${Math.floor(Math.random() * 1000)}`,
            type: blockType,
            name: '',
            slug: '',
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
                    // return Object.assign({}, block, { [blockField]: fieldValue });
                    return {
                        ...block,
                        [blockField]: fieldValue,
                        // conditionaly update slug
                        ...(blockField === 'name' ? { slug: fieldValue } : {})
                    };
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
    const { blocks, addBlock, removeBlock, updateBlock } = useBlocks(queryResponse);
    const { saveBlocks } = useSave(blocks);

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
                <BlockPicker addBlock={addBlock} saveBlocks={saveBlocks} />
            </div>
        </Layout>
    );
}
