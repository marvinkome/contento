import React from 'react';
import CollapsibleCard from 'components/collapsibleCard';

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
                id="textBlockTitle"
                placeholder="Click name of this block e.g: Header Title"
                onChange={this.onTitleChange}
                value={this.props.blockData.name}
            />
        );
    };

    render() {
        const { removeBlock, blockData } = this.props;

        return (
            <div className="text-block">
                <CollapsibleCard
                    header={this.renderBlockHeader()}
                    onDelete={() => removeBlock(blockData.id)}
                >
                    <textarea
                        className="form-input flat"
                        type="text"
                        id="textBlockContent"
                        placeholder="Text content..."
                        onChange={this.onContentChange}
                    />
                </CollapsibleCard>
            </div>
        );
    }
}
