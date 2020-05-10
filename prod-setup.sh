#! /bin/bash

alias docker-compose-prod="docker-compose -f docker-compose.yml -f docker-compose.prod.yml"

# stop previous containers
docker-compose stop
docker-compose rm -f
 
# restart container
docker-compose-prod up -d