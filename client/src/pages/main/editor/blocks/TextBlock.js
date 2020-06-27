import React from 'react';
import CollapsibleCard from 'components/collapsibleCard';

class TextBlock extends React.Component {
    state = {
        nameError: null,
        slugError: null
    };

    componentDidMount() {
        // initial validation
        const { blockData } = this.props;

        this.validateName(blockData.name);
        this.validateSlug(blockData.slug);
    }

    validateName = (name) => {
        if (!name.length) {
            return this.setState({ nameError: 'Block name is required' });
        }

        return this.setState({ nameError: null });
    };

    validateSlug = (slug) => {
        if (!slug || !slug.length) {
            return this.setState({ slugError: 'Block slug is required' });
        }

        const isCamelCase = /^(?:[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?)$/u.test(slug);
        if (!isCamelCase) {
            return this.setState({ slugError: 'Block slug must be camelCase' });
        }

        return this.setState({ slugError: null });
    };

    onTitleChange = (e) => {
        const { blockData } = this.props;
        const { value } = e.target;

        this.validateName(value);
        this.props.updateBlock(blockData.id, 'name', value);
    };

    onSlugChange = (e) => {
        const { blockData } = this.props;
        const { value } = e.target;

        this.validateSlug(value);
        this.props.updateBlock(blockData.id, 'slug', value);
    };

    onContentChange = (e) => {
        const { blockData } = this.props;
        const { value } = e.target;

        this.props.updateBlock(blockData.id, 'content', value);
    };

    render() {
        const { removeBlock, blockData, forwardedRef } = this.props;
        const { slugError, nameError } = this.state;

        return (
            <div ref={forwardedRef} className="text-block block">
                <CollapsibleCard
                    title={blockData.name.length ? blockData.name : 'Untitled'}
                    onDelete={() => removeBlock(blockData.id)}
                >
                    <header className="block-header">
                        <div className="form-group">
                            <label htmlFor="block-name">Block Name:</label>
                            <input
                                className="form-input flat"
                                id={`block-name-${blockData.id}`}
                                type="text"
                                placeholder="eg: Header Text"
                                onChange={this.onTitleChange}
                                value={blockData.name}
                                required
                            />
                            {nameError && <small className="error">{nameError}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="block-slug">Block Slug (API Identifier):</label>
                            <input
                                className="form-input flat"
                                id={`block-slug-${blockData.id}`}
                                type="text"
                                placeholder="eg: headerText"
                                onChange={this.onSlugChange}
                                value={blockData.slug}
                                required
                            />
                            {slugError && <small className="error">{slugError}</small>}
                        </div>
                    </header>

                    <div className="form-group">
                        <textarea
                            className="form-input"
                            type="text"
                            id={blockData.id}
                            placeholder="Text content..."
                            onChange={this.onContentChange}
                            value={blockData.content}
                        />
                    </div>
                </CollapsibleCard>
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <TextBlock {...props} forwardedRef={ref} />);
