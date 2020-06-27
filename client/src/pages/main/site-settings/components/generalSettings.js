import React from 'react';

export default function GeneralSettings(props) {
    const onSave = async (e) => {
        e.preventDefault();

        const name = e.target['siteName'].value;

        try {
            await props.editSite({ variables: { name } });
        } catch (e) {
            // do nothing, we're already handling it
        }
    };

    return (
        <form className="card site-settings" onSubmit={onSave}>
            <h4>General</h4>

            <section className="profile-details">
                <div className="form-group">
                    <label htmlFor="siteName">Site Name</label>
                    <input
                        className="form-input"
                        id="siteName"
                        type="text"
                        defaultValue={props.site?.name}
                        required
                    />
                </div>
            </section>

            <button type="submit" className="btn btn-primary">
                Save
            </button>
        </form>
    );
}
