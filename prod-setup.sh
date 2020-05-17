#! /bin/bash

# stop previous containers
docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop
docker-compose -f docker-compose.yml -f docker-compose.prod.yml rm -f
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down --rmi all
 
# restart container
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d