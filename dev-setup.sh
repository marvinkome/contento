#! /bin/bash

# Let's setup the server first
cd server # go to the server directory
yarn install # install packagees
cp .env.example .env # create env file

# Let's setup the client
cd ../client
yarn install

# Then demo
cd ../demo
yarn install

# then run everything now
cd ../
yarn dev
