import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Main from './main';

import { GET_PAGE } from './graphql';

import './style.scss';

export default function EditorPage() {
    const { pageid } = useParams();
    const queryResponse = useQuery(GET_PAGE, {
        variables: { pageId: pageid }
    });

    return <Main response={queryResponse} />;
}
