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

    // variable filtre pour choisir le user qu'on veut modifier

    const filter = { name: "Alexis Giromagny" };

    // Spécifier le valeur à mettre à jour

    const updateDoc = {
      $set: {
        name: "Bernard Giromagny",
      },
    };

    // Mettre à jour

    const result = await usersCollection.updateOne(filter, updateDoc);

    // Afficher le résultat qu'on a choisi et afficher la valeur modifier

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } finally {
    // Fermer la connexion mongoDB

    await client.close();
  }
}

// Run fonction et catch error

run().catch(console.dir);
