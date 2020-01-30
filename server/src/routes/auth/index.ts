import { Router } from 'express';
import passport from 'passport';
import axios, { AxiosResponse } from 'axios';

import User, { IUser } from '@models/users';
import auth, { generateJWT, formatUserProfile } from '@libs/auth';

const router = Router();

// all rest api routes
router.get('/my-profile', auth.required, async (req, res) => {
    // @ts-ignore
    const { id } = req.payload;

    const user = await User.findById(id);

    if (!user) {
        return res.sendStatus(400);
    }

    res.send({ user: formatUserProfile(user) });
});

router.post('/register', auth.optional, async (req, res) => {
    const data = req.body;

    try {
        const user = new User({
            email: data.email,
            password: data.password
        });

        user.profile.name = data.fullName;

        await user.save();

        return res.send({
            token: generateJWT(user),
            user: formatUserProfile(user)
        });
    } catch (e) {
        const message = e.message;

        return res.status(400).send({
            error: 'Error processing data',
            message:
                message.indexOf('duplicate key error') !== -1 ? 'Email is already taken' : message
        });
    }
});

/**
 * For test use only please disable before pushing to production
 */
router.delete('/user', auth.optional, async (req, res) => {
    const data = req.body;

    try {
        await User.findOneAndDelete({ email: data.email });
        return res.send({
            message: 'User profile deleted'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            error: 'Invalid email address'
        });
    }
});

router.post('/login', auth.optional, (req, res, next) => {
    return passport.authenticate('local', { session: false }, (err, user: IUser, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.send({
                token: generateJWT(user),
                user: formatUserProfile(user)
            });
        }

        return res.status(400).send({
            error: info
        });
    })(req, res, next);
});

router.post('/google', auth.optional, (req, res, next) => {
    return passport.authenticate('google-token', { session: false }, (err, user: IUser, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.send({
                token: generateJWT(user),
                user: formatUserProfile(user)
            });
        }

        return res.status(400).send({
            error: info
        });
    })(req, res, next);
});

router.post('/github', auth.optional, async (req, res, next) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).send({
            message: 'No code in request'
        });
    }

    // Get access token from github
    let resp: AxiosResponse<any>;

    try {
        resp = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers: { Accept: 'application/json' }
            }
        );
    } catch (e) {
        return res.status(e.response.status).send({
            message: `Github Error: ${e.message}`
        });
    }

    if (resp.data.error) {
        return res.status(400).send({
            message: resp.data.error_description
        });
    }

    // add access token to body
    req.body = {
        ...req.body,
        access_token: resp.data.access_token
    };

    return passport.authenticate('github-token', { session: false }, (err, user: IUser, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.send({
                token: generateJWT(user),
                user
            });
        }

        return res.status(400).send({
            error: info
        });
    })(req, res, next);
});
export default router;
