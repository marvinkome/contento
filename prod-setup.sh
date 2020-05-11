#! /bin/bash

# stop previous containers
docker-compose stop
docker-compose rm -f
 
# restart container
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d