import { MongoClient } from 'mongodb';


const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2';

// Replace the uri string with your MongoDB deployment's connection string.

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2";

// Create a new client and connect to MongoDB

const client = new MongoClient(uri);


async function run() {

    try {
  
      // Get the database and collection on which to run the operation
  
      const database = client.db("myReplicaSet");
  
      const usersCollection = database.collection("usersCollection");    
  
      // Execute query 
  
      const cursor = usersCollection.find();
  
      // Console log returned documents
  
      for await (const doc of cursor) {
  
        console.log(doc);
  
      }
  
    } finally {
  
      await client.close();
  
    }
  
  }
  
  run().catch(console.dir);
