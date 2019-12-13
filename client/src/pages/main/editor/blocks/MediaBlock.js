import React from 'react';
import CollapsibleCard from 'components/collapsibleCard';
import FileDropZone from 'components/fileDropzone';

export default class TextBlock extends React.Component {
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
            <div className="media-block">
                <CollapsibleCard
                    header={this.renderBlockHeader()}
                    onDelete={() => removeBlock(blockData.id)}
                >
                    <FileDropZone />
                </CollapsibleCard>
            </div>
        );
    }
}
