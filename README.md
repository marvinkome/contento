# Contento

![](https://github.com/marvinkome/contento/workflows/Client%20CI/CD/badge.svg?master)

Create contents dynamically without having to edit your code every time

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
