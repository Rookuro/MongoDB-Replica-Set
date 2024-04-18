import { MongoClient } from 'mongodb';

// URI de connexion à la base de données.

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Créer un nouveau client en passant l'URI en paramètre

const client = new MongoClient(uri);


async function run() {

    try {
  
      // Connexion à "myReplicaSet" DB et la collection "usersCollection" 
  
      const database = client.db("myReplicaSet");
  
      const usersCollection = database.collection("usersCollection");
  
      
  
      // Object user qui stocker les informations du user
  
      const user = {
  
        name: "Alexis Giromagny",
        age: 26,
        email: "alexis.giromagny13@gmail.com",
        createdAt: "2023-11-24T08:46:21.163Z"
  
      }
  
      // Insertion du contenu user
  
      const result = await usersCollection.insertOne(user);
  
      // On imprime l'ID de 
  
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
  
    } finally {
  
       // Fermer la connexion mongoDB
  
      await client.close();
  
    }
  
  }
  
  // Run fonction et catch error
  
  run().catch(console.dir);
