import passport from 'passport';
import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import moment from 'moment';
import Strategies from './strategies';
import { Request, Response } from 'express';
import { IContext } from '@gql/index';
import User, { IUser } from '@models/users';
import Site from '@models/sites';

export function setup_auth() {
    passport.use(Strategies.localStrategy);
    passport.use(Strategies.googleStrategy);
    passport.use(Strategies.githubStrategy);
}

export function generateJWT(user: IUser, useCase = 'login') {
    const today = new Date();
    const expirationDate = new Date(today);
    let signingKey = process.env.APP_KEY || '';

    switch (useCase) {
        case 'reset-password': {
            const time = 1 * 60 * 60 * 1000;
            expirationDate.setTime(today.getTime() + time); // set to expire in 1hr
            signingKey = user.password;
            break;
        }
        default: {
            expirationDate.setDate(today.getDate() + 30); // set to expire in 30 days
            break;
        }
    }

    return jwt.sign(
        {
            id: user._id,
            exp: expirationDate.getTime() / 1000
        },
        signingKey
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

export function formatUserProfile(user: IUser) {
    return {
        id: user.id,
        googleId: user.googleId,
        githubId: user.githubId,
        email: user.email,
        profile: user.profile
    };
}

export async function authorizedToSite(req: Request, res: Response, next: (...args: any[]) => any) {
    // check if JWT token passed is valid
    const token = getTokenFromHeaders(req);

    if (!token) {
        return res.status(401).send({
            error: {
                message: 'Token is required to access data'
            }
        });
    }

    // decode token
    let payload: any = null;
    try {
        payload = jwt.verify(token, process.env.APP_KEY || '');
    } catch (e) {
        return res.status(400).send({
            error: {
                message: 'Invalid access token. Go to your app to get a new token'
            }
        });
    }

    // get site
    const site = await Site.findById(payload.id);
    if (!site) {
        return res.status(401).send({
            error: {
                message: 'Invalid access token. Go to your app to get a new token'
            }
        });
    }

    // check the token date is after site last token reset time
    // convert from seconds to miliseconds
    const valid = moment(payload.iat * 1000).isAfter(site.lastTokenReset);

    if (!valid) {
        return res.status(401).send({
            error: {
                message: 'Invalid access token. Go to your app to get a new token'
            }
        });
    }

    return next();
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
