import React from 'react';

class CreatePage extends React.Component {
    render() {
        return (
            <div className="create_page_section">
                <h3>Create Page</h3>

                <form>
                    <input type="text" className="form-input flat" placeholder="Page name" />
                    <button className="btn" type="submit">
                        Add page
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePage;
