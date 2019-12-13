import React from 'react';
import Text from '../blocks/TextBlock';
import Media from '../blocks/MediaBlock';

export default class MainEditor extends React.Component {
    render() {
        const { saveStatus, blocks, removeBlock, updateBlock } = this.props;
        return (
            <div className="main-editor">
                <h2>
                    Page Name <small>{saveStatus}</small>
                </h2>

                <div className="blocks">
                    {blocks.map((block) => {
                        switch (block.type) {
                        case 'TEXT':
                            return (
                                <Text
                                    key={block.id}
                                    blockData={block}
                                    removeBlock={removeBlock}
                                    updateBlock={updateBlock}
                                />
                            );
                        case 'MEDIA':
                            return (
                                <Media
                                    key={block.id}
                                    blockData={block}
                                    removeBlock={removeBlock}
                                    updateBlock={updateBlock}
                                />
                            );
                        default:
                            return null;
                        }
                    })}

                    {!blocks.length && (
                        <p>No block added. Use the buttons on the right to add blocks </p>
                    )}
                </div>
            </div>
        );
    }
}
