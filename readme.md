
## MongoDB Replica Set

### Démarrage du Replica Set (Docker)

La première étape consiste à créer un réseau docker (Cluster) pour cela nous allons utiliser la commande ci-dessous.

```shell
  docker network create mongoCluster
```
Ensuite, pour la deuxième étape nous allons executer le docker compose pour démarrer les trois instances. 

```shell
  docker compose up -d
```

Enfin, nous allons exécuter la commande ci-dessous, dans le MongoDB Cli il faudra exécuter cette commande pour permettre de créer le jeu de réplica réel entre les différentes instances.

```shell
  docker exec -it mongo_instance_1 mongosh --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"mongo_instance_1\"},
   {_id: 1, host: \"mongo_instance_2\"},
   {_id: 2, host: \"mongo_instance_3\"}
 ]
})"
```

Nous pouvons ensuite grâce à la commande suivante, voir les différentes instances, cela nous permettra de vérifier le replica sur les machines.

```shell
docker exec -it mongo_instance_1 mongosh --eval "rs.status()"
```

Instance 1 :

```shell
{
      _id: 0,
      name: 'mongo_instance_1:27017',
      health: 1,
      state: 1,
      stateStr: 'PRIMARY',
      uptime: 8630,
      optime: { ts: Timestamp({ t: 1713198534, i: 1 }), t: Long('2') },
      optimeDate: ISODate('2024-04-15T16:28:54.000Z'),
      lastAppliedWallTime: ISODate('2024-04-15T16:28:54.020Z'),
      lastDurableWallTime: ISODate('2024-04-15T16:28:54.020Z'),
      syncSourceHost: '',
      syncSourceId: -1,
      infoMessage: '',
      electionTime: Timestamp({ t: 1713196717, i: 1 }),
      electionDate: ISODate('2024-04-15T15:58:37.000Z'),
      configVersion: 1,
      configTerm: 2,
      self: true,
      lastHeartbeatMessage: ''
    },

```

Instance 2 :

```shell
{
      _id: 1,
      name: 'mongo_instance_2:27017',
      health: 1,
      state: 2,
      stateStr: 'SECONDARY',
      uptime: 1832,
      optime: { ts: Timestamp({ t: 1713198534, i: 1 }), t: Long('2') },
      optimeDurable: { ts: Timestamp({ t: 1713198534, i: 1 }), t: Long('2') },
      optimeDate: ISODate('2024-04-15T16:28:54.000Z'),
      optimeDurableDate: ISODate('2024-04-15T16:28:54.000Z'),
      lastAppliedWallTime: ISODate('2024-04-15T16:28:54.020Z'),
      lastDurableWallTime: ISODate('2024-04-15T16:28:54.020Z'),
      lastHeartbeat: ISODate('2024-04-15T16:29:01.027Z'),
      lastHeartbeatRecv: ISODate('2024-04-15T16:29:01.308Z'),
      pingMs: Long('0'),
      lastHeartbeatMessage: '',
      syncSourceHost: 'mongo_instance_1:27017',
      syncSourceId: 0,
      infoMessage: '',
      configVersion: 1,
      configTerm: 2
    },

```

Instance 3 :

```shell
{
      _id: 2,
      name: 'mongo_instance_3:27017',
      health: 0,
      state: 8,
      stateStr: '(not reachable/healthy)',
      uptime: 0,
      optime: { ts: Timestamp({ t: 0, i: 0 }), t: Long('-1') },
      optimeDurable: { ts: Timestamp({ t: 0, i: 0 }), t: Long('-1') },
      optimeDate: ISODate('1970-01-01T00:00:00.000Z'),
      optimeDurableDate: ISODate('1970-01-01T00:00:00.000Z'),
      lastAppliedWallTime: ISODate('1970-01-01T00:00:00.000Z'),
      lastDurableWallTime: ISODate('1970-01-01T00:00:00.000Z'),
      lastHeartbeat: ISODate('2024-04-15T16:29:00.018Z'),
      lastHeartbeatRecv: ISODate('2024-04-15T14:31:43.320Z'),
      pingMs: Long('0'),
      lastHeartbeatMessage: "Couldn't get a connection within the time limit",
      syncSourceHost: '',
      syncSourceId: -1,
      infoMessage: '',
      configVersion: 1,
      configTerm: 0
    }
```

Par la suite, nous allons générer les fausses données utilisateurs et les stocker dans un fichier users.json avec la structure de données suivantes.

```shell
 {
  _id: new ObjectId('661d0f6a9eac75371bab12d1'),
  name: 'Ms. Blanca Krajcik',
  age: 78,
  email: 'Trey37@hotmail.com',
  createAt: '2024-01-12T05:17:50.007Z'
}
```

### Génération et Manipulation de fausses données

Une fois nos 100 utilisateurs créer, nous allons ensuite insérer nos données à travers la CLI de MongoDB.

```shell
#!/bin/bash

docker exec -i mongo_instance_1 mongoimport --db myReplicaSet --collection usersCollection --drop 
--jsonArray < /home/hackynov/Documents/nosql/users/users.json
```

Tout simplement nous allons faire un fichier importmongo.sh, il suffira juste de l'exécuter avec la commande suivante.

```shell
./mongoimport.sh
```

Voici les résultats que nous obtenons lors de l'exécution de la commande, nous avons bien nos 100 users qui viennent d'être insérer.

```shell
connected to: mongodb://localhost/
dropping: myReplicaSet.usersCollection
100 document(s) imported successfully. 0 document(s) failed to import.
```

### Les commandes MongoDB Cli et leurs résultats

Il va falloir accéder au Cli de MongoDB et pour cela nous allons exécuter la commande suivante.

```shell
docker exec -it mongo_instance_1 mongosh
```

Ensuite, nous arrivons sur la Cli mais nous ne serons pas encore sur la bonne database, pour cela nous allons utiliser la commande suivante.

```shell
use myReplicaSet
```

#### Commandes

Insertion de données :
```shell
db.usersCollection.insertOne({
"name": "Alexis Giromagny", 
"age" : 24, 
"email" : "alexis.giromagny@gmail.com", 
"createdAt": new Date()
})
```

Résultat :

```shell
{
	"acknowledged" : true,
	"insertedId" : ObjectId("660d37841a29f180e7094ac4")
}
```

Affichage de données :

```shell
db.usersCollection.find({ "age": { "$gt": 30 } })
```

Résultat :

```shell
{
    _id: ObjectId('661d59a364ca9275623aa0c6'),
    name: 'Carlton Turcotte',
    age: 81,
    email: 'Zane_Fritsch@hotmail.com',
    createAt: '2023-04-30T23:14:24.268Z'
  },
  {
    _id: ObjectId('661d59a364ca9275623aa0c7'),
    name: 'Lucille Dietrich',
    age: 60,
    email: 'Mariam.Mohr@yahoo.com',
    createAt: '2023-05-29T22:41:35.212Z'
  },
  {
    _id: ObjectId('661d59a364ca9275623aa0c9'),
    name: 'Karl VonRueden',
    age: 52,
    email: 'Amalia45@yahoo.com',
    createAt: '2023-11-01T21:19:25.027Z'
  },
  {
    _id: ObjectId('661d59a364ca9275623aa0ca'),
    name: 'Eloise Morar',
    age: 51,
    email: 'Enoch90@hotmail.com',
    createAt: '2023-09-11T01:44:54.676Z'
  },
  {
    _id: ObjectId('661d59a364ca9275623aa0cb'),
    name: 'Lydia Crona',
    age: 40,
    email: 'Rollin.Orn@hotmail.com',
    createAt: '2023-05-01T00:50:47.523Z'
  }
```

Augmentation d'une données :

```shell
db.usersCollection.updateMany({}, { "$inc": { "age": 5 } })
```

Résultat

```shell
{ 
  "acknowledged" : true, "matchedCount" : 100, "modifiedCount" : 100 
}
```

Suppression de données :

```shell
db.usersCollection.deleteOne({ "name": "Alexis Giromagny" })}
```

Résultat :

```shell
{ "acknowledged" : true, "deletedCount" : 1 }
```

### Exécution du script CRUD (JS)

Script create :

```shell
const user = {
      name: "Alexis Giromagny",
      age: 26,
      email: "alexis.giromagny13@gmail.com",
      createdAt: "2023-11-24T08:46:21.163Z",
    };

    // Insertion du contenu user

    const result = await usersCollection.insertOne(user);
```

Script delete :

```shell
const query = { name: "Alexis Giromagny" };

    //On passe en paramètre la valeur query pour supprimer le user

    const result = await usersCollection.deleteOne(query);
```

Script read :

```shell
const cursor = usersCollection.find({ name: "Alexis Giromagny" });
```

Script update :

```shell
const filter = { name: "Alexis Giromagny" };

    // Spécifier le valeur à mettre à jour

    const updateDoc = {
      $set: {
        name: "Bernard Giromagny",
      },
    };

    // Mettre à jour

    const result = await usersCollection.updateOne(filter, updateDoc);
```







