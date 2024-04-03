#!/bin/bash

# Importation des documents dans la collection usersCollection
docker exec -i mongo1 mongoimport --db myReplicaSet --collection usersCollection --drop --jsonArray < /home/hackynov/Documents/nosql/users/users.json

