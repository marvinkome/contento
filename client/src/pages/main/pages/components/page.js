import React from 'react';
import Dropdown from 'components/dropdown';
import EditPage from './editPageModal';
import DeletePage from './deletePageModal';
import { MdSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Page(props) {
    return (
        <div className="page-container">
            <div className="page">
                <p className="page-name">{props.page.name}</p>
                <div className="page-actions">
                    <Link
                        to={`/app/sites/${props.siteId}/editor/${props.page.id}`}
                        className="primary-action"
                    >
                        Manage content
                    </Link>

                    <Dropdown toggle={<MdSettings className="icon" />}>
                        <EditPage page={props.page} editPage={props.editPage} />
                        <DeletePage
                            deletePage={() =>
                                props.deletePage({ variables: { id: props.page.id } })
                            }
                        />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
