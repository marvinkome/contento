import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import axios, { AxiosResponse } from 'axios';

import User, { IUser } from '@models/users';
import Site from '@models/sites';
import Page from '@models/pages';
import auth, { generateJWT, formatUserProfile } from '@libs/auth';
import { sendPasswordResetLink, sendVerificationEmail } from '@libs/emails';
import { multerUploads, dataUri, uploader } from '@libs/images';
import { setupUserAfterSignUp } from '@libs/userSetup';

const router = Router();

/**
 * Email/Password Auth Routes
 */
router.post('/verify-email', auth.optional, async (req, res) => {
    const { email, callbackUrl } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).send({
            error: {
                message: 'Email is already taken'
            }
        });
    }

    // generate JWT token to reset the password
    const token = generateJWT({ email }, 'email-verification');

    try {
        await sendVerificationEmail({
            to: email,
            data: {
                verifyLink: `${process.env.CLIENT_URL}${callbackUrl}?token=${token}`
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            error: {
                message: 'Error sending email'
            }
        });
    }

    return res.send({
        message: 'A verification link has been sent to your email'
    });
});

router.post('/register', auth.optional, async (req, res) => {
    // first get email from verification token
    const { token, ...data } = req.body;

    // check if token is valid
    if (!token) {
        return res.status(400).send({
            error: { message: 'Token is required to continue' }
        });
    }

    // decode token to get email
    const payload = jwt.verify(token, process.env.APP_KEY || '');

    // get user id from token
    const email = (payload as { id: string }).id;

    try {
        const user = new User({
            email,
            password: data.password
        });

        user.profile.name = data.fullName;

        await user.save();

        await setupUserAfterSignUp(user);

        return res.send({
            token: generateJWT(user),
            user: formatUserProfile(user)
        });
    } catch (e) {
        const message = e.message as string;
        console.log(message);

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

/**
 * Oauth Login routes
 */
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
                user: formatUserProfile(user)
            });
        }

        return res.status(400).send({
            error: info
        });
    })(req, res, next);
});

/**
 * Forget password routes
 */
router.post('/forget-password', auth.optional, async (req, res) => {
    // get user model
    const { email, callbackUrl } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send({
            error: {
                message: 'No user found with this email '
            }
        });
    }

    if (!user.password) {
        return res.status(400).send({
            error: {
                message: 'Seems you signed up with either Google or Github. Please Login with that'
            }
        });
    }

    // generate JWT token to reset the password
    const token = generateJWT(user, 'reset-password');

    try {
        await sendPasswordResetLink({
            to: email,
            data: {
                resetLink: `${process.env.CLIENT_URL}${callbackUrl}?token=${token}`,
                name: user.profile.name
            }
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            error: {
                message: 'Error sending email'
            }
        });
    }

    return res.send({
        message: 'A reset link has been sent to your email'
    });
});

router.post('/reset-password', auth.optional, async (req, res) => {
    const { password, token } = req.body;

    // check if token is valid
    if (!token) {
        return res.status(401).send({
            error: {
                message: 'Token is required to reset password'
            }
        });
    }

    // decode token to get id
    let payload: any = null;
    payload = jwt.decode(token);

    // get user id from token
    const userId = payload.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
        return res.status(400).send({
            error: {
                message: 'Invalid reset token'
            }
        });
    }

    // verify token
    try {
        payload = jwt.verify(token, user.password);
    } catch (e) {
        return res.status(400).send({
            error: {
                message: 'Invalid reset token'
            }
        });
    }

    user.password = password;
    await user.save();

    return res.send({
        message: 'You can now login with your new password'
    });
});

// all rest api routes
router.get('/my-profile', auth.required, async (req, res) => {
    const { id } = (req as any).payload;

    const user = await User.findById(id);

    if (!user) {
        return res.sendStatus(401);
    }

    res.send({ user: formatUserProfile(user) });
});

router.put(
    '/update-profile',
    auth.required,
    multerUploads.single('profileImage'),
    async (req, res) => {
        const { id } = (req as any).payload;
        const { fullName, email } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.sendStatus(400);
        }

        if (fullName) {
            user.profile.name = fullName;
        }

        if (email) {
            user.email = email;
        }

        if (req.file) {
            const file = dataUri(req).content;

            try {
                const result = await uploader.upload(file);
                user.profile.picture = result.url;
            } catch (e) {
                console.log(e);
                return res.status(400).send({ message: 'Error uploading image' });
            }
        }

        await user.save();

        res.send({ user: formatUserProfile(user) });
    }
);

router.post('/unlink-github', auth.required, async (req, res) => {
    const { id } = (req as any).payload;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).send({ message: 'User not found' });
    }

    user.githubId = undefined;

    await user.save();

    return res.send({ user: formatUserProfile(user) });
});

router.post('/unlink-google', auth.required, async (req, res) => {
    const { id } = (req as any).payload;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).send({
            message: 'User not found'
        });
    }

    user.googleId = undefined;

    await user.save();

    return res.send({
        user: formatUserProfile(user)
    });
});

/**
 * For test use only please disable before pushing to production
 */
if (process.env.NODE_ENV !== 'production') {
    router.delete('/user', auth.optional, async (req, res) => {
        const data = req.body;

        try {
            const user = await User.findOne({ email: data.email });
            const sites = await Site.find({ owner: user?.id });

            for (const site of sites) {
                // delete pages
                await Page.deleteMany({ site: site.id });

                // delete sites
                await Site.findByIdAndDelete(site.id);
            }

            // delete user
            await User.findByIdAndDelete(user?.id);
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
}

export default router;
