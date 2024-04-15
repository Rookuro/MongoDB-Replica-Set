import { MongoClient } from 'mongodb';


const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';

// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Create a new client and connect to MongoDB

const client = new MongoClient(uri);


async function run() {

    try {
  
      // Connect to the "insertDB" database and access its "haiku" collection
  
      const database = client.db("myReplicaSet");
  
      const usersCollection = database.collection("usersCollection");
  
      
  
      // Create a document to insert
  
      const user = {
  
        name: "Alexis Giromagny",
        age: 26,
        email: "alexis.giromagny13@gmail.com",
        createdAt: "2023-11-24T08:46:21.163Z"
  
      }
  
      // Insert the defined document into the "haiku" collection
  
      const result = await usersCollection.insertOne(user);
  
      // Print the ID of the inserted document
  
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
  
    } finally {
  
       // Close the MongoDB client connection
  
      await client.close();
  
    }
  
  }
  
  // Run the function and handle any errors
  
  run().catch(console.dir);
