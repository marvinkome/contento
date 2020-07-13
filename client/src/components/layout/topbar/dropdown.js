import React from 'react';
import { mainClient } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { inject } from 'mobx-react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Dropdown from 'components/dropdown';

function TopbarDropdown(props) {
    const { siteid } = useParams();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();

        // remove profile
        props.updateProfile(null);

        // remove auth token
        localStorage.removeItem(AUTH_TOKEN_KEY);

        // remove access token
        mainClient.removeAccessToken();

        // go to landing page
        history.push('/login');
    };

    return (
        <Dropdown>
            {siteid && <Link to={`/app/sites/settings/${siteid}`}>Site settings</Link>}

            <Link to="/app/profile">User profile</Link>

            <hr />

            <a href="https://github.com/marvinkome/contento/wiki/Contento-API">API Documentation</a>

            <hr />

            <a href="#logout" onClick={logout}>
                Logout
            </a>
        </Dropdown>
    );
}

const mapStateToProps = ({ rootStore }) => {
    const { updateProfile } = rootStore.userStore;

    return {
        updateProfile
    };
};

export default inject(mapStateToProps)(TopbarDropdown);
