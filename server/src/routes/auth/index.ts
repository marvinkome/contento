import { Router } from 'express';
import passport from 'passport';

import User, { IUser } from '@models/users';
import auth, { generateJWT } from '@libs/auth';

const router = Router();

// all rest api routes
router.get('/', auth.optional, (req, res) => {
    res.send({
        message: 'Hello friend!! You have reached the api for stark cms'
    });
});

router.get('/my-profile', auth.required, async (req, res) => {
    // @ts-ignore
    const { id } = req.payload;

    const user = await User.findById(id);

    if (!user) {
        res.sendStatus(400);
    }

    res.send({ user });
});

router.post('/register', auth.optional, async (req, res) => {
    const data = req.body;

    try {
        const user = new User({
            username: data.username,
            email: data.email,
            password: data.password
        });

        await user.save();

        return res.send({
            token: generateJWT(user),
            user
        });
    } catch (e) {
        console.error(e);
        return res.status(400).send({
            error: 'Error processing data'
        });
    }
});

router.post('/login', auth.optional, (req, res, next) => {
    return passport.authenticate(
        'local',
        { session: false },
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
