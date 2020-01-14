import { makeExecutableSchema, ApolloServer } from 'apollo-server-express';
import { getTokenFromHeaders, getUserFromToken } from '@libs/auth';
import { IUser } from '@models/users';

// types and resolvers
import { queryType, queryResolver } from './queries';
import { mutationType, mutationResolvers } from './mutation';
import { userType, userResolvers } from './queries/users';
import { siteType, siteResolvers } from './queries/sites';
import { pageType, pageResolvers } from './queries/pages';
import { contentType, contentResolvers } from './queries/contents';

const schema = makeExecutableSchema({
    typeDefs: [
        queryType,
        mutationType,
        userType,
        siteType,
        pageType,
        contentType
    ],
    resolvers: [
        queryResolver,
        mutationResolvers,
        userResolvers,
        siteResolvers,
        pageResolvers,
        contentResolvers
    ]
});

export interface IContext {
    authToken: string | null;
    currentUser: IUser | null;
}

export default new ApolloServer({
    schema,
    context: async ({ req }): Promise<IContext> => {
        const authToken = getTokenFromHeaders(req);
        let currentUser = null;

        try {
            currentUser = await getUserFromToken(authToken || '');
        } catch (e) {
            console.error(e.message);
            console.error(`Unable to authenticate using token: ${authToken}`);
        }

        return {
            authToken,
            currentUser
        };
    }
});
