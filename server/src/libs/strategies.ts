import LocalStrategy from 'passport-local';
// @ts-ignore
import GoogleStrategy from 'passport-google-token';
// @ts-ignore
import GithubStrategy from 'passport-github-token';
import User from '@models/users';
import { setupUserAfterSignUp } from '@libs/userSetup';

const localStrategy = new LocalStrategy.Strategy(
    {
        usernameField: 'email'
    },
    async (email, password, done) => {
        // check if it's an email or username
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, {
                message: 'email or password is invalid'
            });
        }

        if (!user.password) {
            return done(null, false, {
                message: 'Your account was registered using a sign-in provider'
            });
        }

        if (!(await user.verify_password(password))) {
            return done(null, false, {
                message: 'email or password is invalid'
            });
        }

        return done(null, user);
    }
);

const googleStrategy = new GoogleStrategy.Strategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: '/api/auth/google/callback',
        passReqToCallback: true
    },
    async (req: any, _: any, __: any, profile: any, done: any) => {
        const email = profile.emails ? profile.emails[0].value : '';
        let user = await User.findOne({
            googleId: profile.id
        });

        // if user is logged in and wants to link account
        if (req.payload?.id) {
            // if existing user has a github linked already
            if (user) {
                return done(null, false, {
                    message: 'There is already a Google account that belongs to you'
                });
            }

            // link account
            user = await User.findById(req.payload.id);

            if (!user) {
                return done(null, false);
            }

            user.googleId = profile.id;
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.picture = user.profile.picture || profile._json.picture;

            await user.save();
            return done(null, user);
        }

        // if user is not logged in
        if (user) {
            return done(null, user);
        }

        // if no user found
        user = await User.findOne({
            email
        });

        // check if the email is already registered
        if (user) {
            return done(null, false, {
                message: 'An account already exists with this email'
            });
        }

        // if it isn't registered create new account
        user = new User({
            email,
            googleId: profile.id,
            profile: {
                name: profile.displayName,
                picture: profile._json.picture
            }
        });

        await user.save();
        await setupUserAfterSignUp(user);
        return done(null, user);
    }
);

const githubStrategy = new GithubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        passReqToCallback: true
    },
    async (req: any, _: any, __: any, profile: any, done: any) => {
        const email = profile.emails ? profile.emails[0].value : '';
        let user = await User.findOne({ githubId: profile.id });

        // if user is logged in and wants to link account
        if (req.payload?.id) {
            // if existing user has a github linked already
            if (user) {
                return done(null, false, {
                    message: 'There is already a Github account that belongs to you'
                });
            }

            // link account
            user = await User.findById(req.payload.id);

            if (!user) {
                return done(null, false);
            }

            user.githubId = profile.id;
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.picture = user.profile.picture || profile._json.avatar_url;

            await user.save();
            return done(null, user);
        }

        // if user is not logged in
        if (user) {
            return done(null, user);
        }

        // if no user found
        user = await User.findOne({ email });

        // check if the email is already registered
        if (user) {
            return done(null, false, {
                message: 'An account already exists with this email'
            });
        }

        // if it isn't registered create new account
        user = new User({
            email,
            githubId: profile.id,
            profile: {
                name: profile.displayName,
                picture: profile._json.avatar_url
            }
        });

        await user.save();
        await setupUserAfterSignUp(user);
        return done(null, user);
    }
);

export default {
    localStrategy,
    googleStrategy,
    githubStrategy
};
