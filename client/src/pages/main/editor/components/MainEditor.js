import React from 'react';
import Text from '../blocks/TextBlock';
import Media from '../blocks/MediaBlock';

export default class MainEditor extends React.Component {
    render() {
        const { blocks, removeBlock, updateBlock, response } = this.props;
        const { loading, error, data } = response;

        return (
            <div className="main-editor">
                {/* handle error and loading case */}
                {loading && <p>Fetching page contents...</p>}
                {error && <p>Error page contents. {error.message}</p>}

                {data && (
                    <React.Fragment>
                        <h2>{data.page.name}</h2>

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
                    </React.Fragment>
                )}
            </div>
        );
    }
}
