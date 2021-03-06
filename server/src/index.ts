import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apolloServer from '@gql/index';
import { connect } from 'mongoose';

import { setup_auth } from '@libs/auth';
import { setup_cloudinary } from '@libs/images';
import routes from '@routes/index';

export default function createApp() {
    const app = express();

    // setup mongoose
    void connect(process.env.DB_URL || '', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    // body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
        cors({
            origin: '*',
            optionsSuccessStatus: 200
        })
    );

    // setup rate limiting
    app.set('trust proxy', 1);

    // setup graphql
    apolloServer.applyMiddleware({ app });

    // setup passport
    setup_auth();

    // setup cloudinary
    setup_cloudinary();

    // api routes
    app.use('/api', routes);
    app.get('/', (_, res) => res.json({ message: "You're at contento server v1.0" }));

    return { app, apolloServer };
}
