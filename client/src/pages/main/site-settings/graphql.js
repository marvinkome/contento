import gql from 'graphql-tag';

export const GET_SITE = gql`
    query GetSite($siteid: String) {
        site(id: $siteid) {
            id
            name
        }
    }
`;

export const GET_SITE_SECRET = gql`
    query GetSite($siteid: String) {
        site(id: $siteid) {
            id
            siteSecretKey
        }
    }
`;

export const UPDATE_SITE = gql`
    mutation UpdateSite($name: String!, $siteid: ID!) {
        updateSite(id: $siteid, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_SITE = gql`
    mutation DeleteSite($siteid: ID!) {
        deleteSite(id: $siteid)
    }
`;
