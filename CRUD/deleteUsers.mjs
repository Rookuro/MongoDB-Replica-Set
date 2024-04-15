import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

const client = new MongoClient(uri);

async function run() {

  try {

    const database = client.db("myReplicaSet");

    const usersCollection = database.collection("usersCollection");

    /* Delete the first document in the "movies" collection that matches

    the specified query document */

    const query = { name: "Alexis Giromagny" };

    const result = await usersCollection.deleteOne(query);

    /* Print a message that indicates whether the operation deleted a

    document */

    if (result.deletedCount === 1) {

      console.log("Successfully deleted one document.");

    } else {

      console.log("No documents matched the query. Deleted 0 documents.");

    }

  } finally {

    // Close the connection after the operation completes

    await client.close();

  }

}

// Run the program and print any thrown exceptions

run().catch(console.dir);