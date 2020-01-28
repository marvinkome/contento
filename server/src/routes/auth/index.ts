import { Router } from 'express';
import passport from 'passport';

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

    console.log(formatUserProfile(user));
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
    return passport.authenticate(
        'google-token',
        {
            session: false
        },
        (err, user: IUser, info) => {
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
        }
    )(req, res, next);
});

export default router;
