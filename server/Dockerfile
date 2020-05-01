FROM node:10
RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.26.1

# create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

EXPOSE 7077
CMD ["npm", "run", "dev"]