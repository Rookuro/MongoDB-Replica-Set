import { MongoClient } from "mongodb";

// URI de connexion à la base de données.

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Créer un nouveau client en passant l'URI en paramètre

const client = new MongoClient(uri);

async function run() {
  try {
    // Connexion à "myReplicaSet" DB et la collection "usersCollection"

    const database = client.db("myReplicaSet");

    const usersCollection = database.collection("usersCollection");

    //Une variable qui contient le name et la valeur

    const query = { name: "Alexis Giromagny" };

    //On passe en paramètre la valeur query pour supprimer le user

    const result = await usersCollection.deleteOne(query);

    //Si on supprime un compte on execute la condition au sinon on fait le else

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // Fermer la connexion mongoDB

    await client.close();
  }
}

// Run fonction et catch error

run().catch(console.dir);
