import { gql } from 'apollo-server-express';
import { ISite } from '@models/sites';
import Pages from '@models/pages';

export const siteType = gql`
    type Site {
        id: ID!
        name: String!
        pages: [Page]
    }
`;

export const siteResolvers = {
    Site: {
        pages: (site: ISite) => {
            return Pages.find({ site: site.id }); // get all pages with this site
        }
    }
};
