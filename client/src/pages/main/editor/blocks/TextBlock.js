import React from 'react';
import CollapsibleCard from 'components/collapsibleCard';

export default class TextBlock extends React.Component {
    renderBlockHeader = () => {
        return (
            <input
                className="form-input flat"
                type="text"
                id="textBlockTitle"
                placeholder="Click name of this block e.g: Header Title"
            />
        );
    };

    render() {
        return (
            <div className="text-block">
                <CollapsibleCard header={this.renderBlockHeader()}>
                    <textarea
                        className="form-input flat"
                        type="text"
                        id="textBlockContent"
                        placeholder="Text content..."
                    />
                </CollapsibleCard>
            </div>
        );
    }
}
