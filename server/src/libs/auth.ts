import passport from 'passport';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import Strategies from './strategies';
import { Request } from 'express';

import { IContext } from '@gql/index';
import User, { IUser } from '@models/users';

export function setup_auth() {
    passport.use(Strategies.localStrategy);
    passport.use(Strategies.googleStrategy);
}

export function generateJWT(user: IUser) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 30); // set to expire in 30 days

    return jwt.sign(
        {
            email: user.email,
            id: user._id,
            exp: expirationDate.getTime() / 1000
        },
        process.env.APP_KEY || ''
    );
}

export function getTokenFromHeaders(req: Request) {
    const auth = req.headers.authorization;

    if (auth && auth.split(' ')[0] === 'Bearer') {
        return auth.split(' ')[1];
    }

    return null;
}

export async function getUserFromToken(token: string): Promise<IUser> {
    // decode token
    let payload: any = null;
    try {
        payload = jwt.verify(token, process.env.APP_KEY || '');
    } catch (e) {
        throw Error('invalid token');
    }

    // get user
    const user = await User.findById(payload.id);
    if (!user) {
        throw Error(`user not found`);
    }

    return user;
}

export function authenticated(next: (...args: any[]) => any) {
    return (root: any, args: any, context: IContext, info: any) => {
        if (!context.currentUser) {
            throw new Error('Unauthenticated');
        }

        return next(root, args, context, info);
    };
}

export default {
    required: expressJWT({
        secret: process.env.APP_KEY || '',
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: expressJWT({
        secret: process.env.APP_KEY || '',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    })
};
