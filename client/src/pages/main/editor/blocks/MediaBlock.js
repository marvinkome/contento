import React from 'react';
import CollapsibleCard from 'components/collapsibleCard';
import FileDropZone from 'components/fileDropzone';

export default class MediaBlock extends React.Component {
    onTitleChange = (e) => {
        const { blockData } = this.props;
        const { value } = e.target;

        this.props.updateBlock(blockData.id, 'name', value);
    };

    onContentChange = (e) => {
        const { blockData } = this.props;
        const { value } = e.target;

        this.props.updateBlock(blockData.id, 'content', value);
    };

    renderBlockHeader = () => {
        return (
            <input
                className="form-input flat"
                type="text"
                id="imageBlockTitle"
                placeholder="Click name of this block e.g: Header Image"
            />
        );
    };

    render() {
        const { removeBlock, blockData } = this.props;

        return (
            <div className="media-block block">
                <CollapsibleCard title="Media Block" onDelete={() => removeBlock(blockData.id)}>
                    <header className="block-header">
                        <div className="form-group">
                            <label htmlFor="block-name">Block Name:</label>
                            <input
                                className="form-input"
                                id="block-name"
                                type="text"
                                placeholder="eg: Header Text"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="block-clug">Block Slug (API Identifier):</label>
                            <input
                                className="form-input"
                                id="block-slug"
                                type="text"
                                placeholder="eg: headerText"
                                required
                            />
                        </div>
                    </header>

                    <FileDropZone />
                </CollapsibleCard>
            </div>
        );
    }
}
