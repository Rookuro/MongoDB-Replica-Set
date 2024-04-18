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
  
      // On passe en paramètre le name et la valeur
  
      const cursor = usersCollection.find({name :"Alexis Giromagny"});
  
      // On affiche dans le console le user
  
      for await (const doc of cursor) {
  
        console.log(doc);
  
      }
  
    } finally {

      // Fermer la connexion mongoDB
  
      await client.close();
  
    }
  
  }

  // Run fonction et catch error

  run().catch(console.dir);
