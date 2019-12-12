import React from 'react';
import { MdAdd } from 'react-icons/md';

class CreatePage extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        const pageName = e.target['page-name'];

        this.props.addPage({ variables: { name: pageName.value } });

        pageName.value = '';
    };

    render() {
        return (
            <div className="create_page_section">
                <h3>Create Page</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            id="page-name"
                            className="form-input flat"
                            placeholder="Page name"
                        />

                        <small>use comma to separate multiple pages at once</small>
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Add page <MdAdd className="icon" />
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePage;
