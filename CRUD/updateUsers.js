import { MongoClient } from 'mongodb';

// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Create a new client and connect to MongoDB

const client = new MongoClient(uri);


async function run() {

    try {
  
      const database = client.db("myReplicaSet");
  
      const usersCollection = database.collection("usersCollection");
  
      // Create a filter for movies with the title "Random Harvest"
  
      const filter = { name: "Alexis Giromagny" };
  
      /* Set the upsert option to insert a document if no documents match
  
      the filter */
  
  
      // Specify the update to set a value for the plot field
  
      const updateDoc = {
  
        $set: {
  
          name: "Bernard Giromagny"
  
        },
  
      };
  
      // Update the first document that matches the filter
  
      const result = await usersCollection.updateOne(filter, updateDoc);
  
      
  
      // Print the number of matching and modified documents
  
      console.log(
  
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
  
      );
  
    } finally {
  
      // Close the connection after the operation completes
  
      await client.close();
  
    }
  
  }
  
  // Run the program and print any thrown errors
  
  run().catch(console.dir);
