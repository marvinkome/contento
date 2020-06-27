import React, { useRef, useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_SITE_SECRET } from '../graphql';

export default function SiteKeys(props) {
    const { siteid } = useParams();

    const [generateSecretKey, { data }] = useLazyQuery(GET_SITE_SECRET, {
        fetchPolicy: 'network-only',
        variables: { siteid }
    });

    const keyRef = useRef();
    const secretRef = useRef();

    const [showSecretKey, changeShowSecretKey] = useState(false);

    const copyKey = () => {
        keyRef.current.select();

        if (document.execCommand('copy')) {
            toast.info('Key copied');
        }
    };

    const copySecret = () => {
        secretRef.current.select();

        if (document.execCommand('copy')) {
            toast.info('API secret copied');
            changeShowSecretKey(false);
        }
    };

    const generateNewKey = async () => {
        await generateSecretKey();
        changeShowSecretKey(true);
    };

    return (
        <section className="card site-keys">
            <h4>Site keys</h4>

            <div className="site-key">
                <p>Site Id</p>
                <div className="key">
                    <input ref={keyRef} defaultValue={props.site?.id} readOnly />
                    <span onClick={copyKey}>
                        <FiCopy className="icon" />
                    </span>
                </div>
            </div>

            <div className="site-key">
                <p>Site Secret Key</p>
                <small>Revealing secret keys will invalidate previously generated keys.</small>

                {showSecretKey ? (
                    <div className="key">
                        <input ref={secretRef} defaultValue={data?.site?.siteSecretKey} readOnly />
                        <span onClick={copySecret}>
                            <FiCopy className="icon" />
                        </span>
                    </div>
                ) : (
                    <button onClick={generateNewKey} className="btn btn-delete">
                        Invalidate and generate new key
                    </button>
                )}
            </div>
        </section>
    );
}
