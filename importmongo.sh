#!/bin/bash

# Importation des documents dans la collection usersCollection
docker exec -i mongo_instance_1 mongoimport --db myReplicaSet --collection usersCollection --drop --jsonArray < /home/hackynov/Documents/nosql/users/users.json
    
