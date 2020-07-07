FROM node:12.0.0

# create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

# Bundle app source
COPY . .

EXPOSE 7077
CMD ["npm", "run", "dev"]