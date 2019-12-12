import React from 'react';
import CollapsibleCard from 'components/collapsibleCard';
import FileDropZone from 'components/fileDropzone';

export default class TextBlock extends React.Component {
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
        return (
            <div className="media-block">
                <CollapsibleCard header={this.renderBlockHeader()}>
                    <FileDropZone />
                </CollapsibleCard>
            </div>
        );
    }
}
