import React from 'react';
import Text from '../blocks/TextBlock';
import Media from '../blocks/MediaBlock';

export default class MainEditor extends React.Component {
    render() {
        return (
            <div className="main-editor">
                <h2>Page Name</h2>

                <div className="blocks">
                    <Text />
                    <Media />
                </div>
            </div>
        );
    }
}
