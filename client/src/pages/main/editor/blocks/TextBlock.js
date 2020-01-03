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
        const { blockData } = this.props;
        return (
            <input
                className="form-input flat"
                type="text"
                id={`textBlockTitle-${blockData.id}`}
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
                        id={blockData.id}
                        placeholder="Text content..."
                        onChange={this.onContentChange}
                        value={blockData.content}
                    />
                </CollapsibleCard>
            </div>
        );
    }
}
