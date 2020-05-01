# Contento

Create contents dynamically without having to edit your code every time

## Development

#### Docker

Docker is the prefered option for development to avoid unneccesary errors, To run using docker use

```bash
docker-compose up --build -d && docker-compose logs -f --tail=10
```

To build and run all containers and services

#### Manually

You can also run use a simple bash script to run everything together:

To setup

```bash
dev-setup.sh && yarn dev
```
