import React from 'react';
import { useHistory } from 'react-router-dom';
export default function DangerZone(props) {
    const history = useHistory();

    const deleteSite = async () => {
        await props.deleteSite();
        history.push('/app');
    };

    return (
        <section className="card danger-zone">
            <h4>
                Danger Zone
                <small>
                    Once you delete this site, all of its contents and pages will be removed.
                </small>
            </h4>

            <button onClick={deleteSite} className="btn btn-delete">
                Delete site and all its contents
            </button>
        </section>
    );
}
