import React from 'react';

export default class BlockPicker extends React.Component {
    render() {
        return (
            <div className="block-picker">
                <h3>Add Block</h3>

                <div className="block-list">
                    <button className="btn btn-primary-outline">Text</button>
                    <button className="btn btn-primary-outline">Media</button>
                    {/* <button className="btn btn-primary-outline">Rich Text</button> */}
                </div>
            </div>
        );
    }
}
