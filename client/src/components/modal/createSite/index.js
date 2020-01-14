import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { MdClear } from 'react-icons/md';
import { ADD_SITE } from './graphql';
import './style.scss';

export default function CreateSiteForm(props) {
    const [addSite] = useMutation(ADD_SITE);

    const onSubmit = async (e) => {
        e.preventDefault();
        const input = e.target['siteName'];

        // do magic with site name
        const { data } = await addSite({ variables: { name: input.value } });

        input.value = '';

        // redirect to created site
        console.log(data?.addSite.id);
    };

    return (
        <div className="modal" ref={props.modalRef}>
            <div className="modal-header">
                <h2>Create a new site</h2>

                <MdClear className="icon" onClick={props.closeModal} />
            </div>

            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <input
                        className="form-input flat"
                        type="text"
                        id="siteName"
                        placeholder="Site name"
                        required
                    />
                    <button className="btn btn-primary" type="submit">
                        Create Site
                    </button>
                </form>
            </div>
        </div>
    );
}
