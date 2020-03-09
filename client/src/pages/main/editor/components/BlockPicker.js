import React from 'react';

export default class BlockPicker extends React.Component {
    render() {
        return (
            <div className="block-picker">
                <h3>Add Block</h3>

                <div className="block-list">
                    <button
                        type="button"
                        onClick={() => this.props.addBlock('TEXT')}
                        className="btn btn-primary-outline"
                    >
                        Add Text
                    </button>
                    {/* <button
                        type="button"
                        onClick={() => this.props.addBlock('MEDIA')}
                        className="btn btn-primary-outline"
                    >
                        Add Media
                    </button> */}

                    {/* Save Button */}
                    <button
                        type="button"
                        onClick={() => this.props.saveBlocks()}
                        className="btn btn-primary"
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}
