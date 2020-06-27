import React from 'react';
import { mainClient } from 'libs/api';
import { AUTH_TOKEN_KEY } from 'libs/keys';
import { inject } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';
import Dropdown from 'components/dropdown';

function TopbarDropdown(props) {
    const { siteid } = useParams();

    const logout = (e) => {
        e.preventDefault();

        // remove profile
        props.updateProfile(null);

        // remove auth token
        localStorage.removeItem(AUTH_TOKEN_KEY);

        // remove access token
        mainClient.removeAccessToken();

        // go to landing page
        props.history.push('/login');
    };

    return (
        <Dropdown>
            {siteid && <Link to={`/app/sites/${siteid}/settings`}>Site settings</Link>}

            <Link to="/app/profile">User profile</Link>

            <hr />

            <Link to="/contact-us">Contact us</Link>
            <Link to="/documentation">Documentation</Link>

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
