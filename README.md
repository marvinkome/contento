# Contento

![](https://github.com/marvinkome/contento/workflows/Client%20CI/CD/badge.svg?master)

The codebase for Contento, an open source content platform for developers. You don't have to make a
deployment to fix a typo or grammatical error.

Website: [https://mycontento.com](https://mycontento.com)
Api documentation: [Api documentation wiki](https://github.com/marvinkome/contento/wiki/Contento-API)

## Stack

This project uses

Fronted: ReactJs, Mobx and Apollo client.
Backend: Apollo server, typescript, express and mongo db on the backend.
CI/CD: Cypress, Github actions, Docker and Kubernates on a GCP cluster.

## Development

#### Docker

Docker is the prefered option for development to avoid unneccesary errors, To run using docker

**Note you need to have docker and docker-compose installed on your system**

```bash
# first copy the .env files
cp .env.example .env
cp ./server/.env.example ./server/.env

# build and run docker images
docker-compose up --build -d && docker-compose logs -f --tail=10
```

To build and run all containers and services

#### Manually

If you don't have docker installed, you can also run use a simple bash script to run everything together:

To setup

```bash
dev-setup.sh && yarn dev
```
