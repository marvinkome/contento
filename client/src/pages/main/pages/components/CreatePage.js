import React from 'react';
import { MdAdd } from 'react-icons/md';

class CreatePage extends React.Component {
    render() {
        return (
            <div className="create_page_section">
                <h3>Create Page</h3>

                <form>
                    <input type="text" className="form-input flat" placeholder="Page name" />
                    <button className="btn btn-primary" type="submit">
                        Add page <MdAdd className="icon" />
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePage;
