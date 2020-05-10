import express from 'express';
import path from 'path';
import createApp from './src';

const { app, apolloServer } = createApp();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`🚀 App is running on 0.0.0.0:${port}`);

    console.log(`🚀 GraphQL server running on 0.0.0.0:${port}${apolloServer.graphqlPath}`);
});
