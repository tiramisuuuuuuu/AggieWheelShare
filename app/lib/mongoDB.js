'use server';

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function createBikeApplication(userToken, description, location, imageUri) {
    try {
      // Connect to the "insertDB" database and access its "haiku" collection
      const database = client.db("AggieWheelShare");
      const collection = database.collection("BikeApplications");
      
      // Create a document to insert
      const doc = {
        userToken: userToken,
        description: description,
        location: location,
        imageUri: imageUri,
      }
      // Insert the defined document into the "haiku" collection
      const result = await collection.insertOne(doc);
      // Print the ID of the inserted document
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
       // Close the MongoDB client connection
      //await client.close();
    }
}

export async function insertBike(bikeApplicationId, location, locDescription, helperImageUri="", bikeLockCode) {
    try {
      // Connect to the "insertDB" database and access its "haiku" collection
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      
      // Create a document to insert
      const doc = {
        bikeApplicationId: bikeApplicationId,
        location: location,
        locDescription: locDescription,
        helperImageUri: helperImageUri,
        bikeLockCode: bikeLockCode
      }
      // Insert the defined document into the "haiku" collection
      const result = await collection.insertOne(doc);
      // Print the ID of the inserted document
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
       // Close the MongoDB client connection
      //await client.close();
    }
}

export async function updateBike(bikeId, newLoc, locDescription, newImageUri="", bikeLockCode) {
    try {
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      // Create a filter for movies with the title "Random Harvest"
      const filter = { _id: bikeId };
      /* Set the upsert option to insert a document if no documents match
      the filter */
      const options = { upsert: false };
      // Specify the update to set a value for the plot field
      const updateDoc = {
        $set: {
            location: newLoc,
            locDescription: locDescription,
            helperImageUri: newImageUri,
            bikeLockCode: bikeLockCode
        },
      };
      // Update the first document that matches the filter
      const result = await collection.updateOne(filter, updateDoc, options);
      
      // Print the number of matching and modified documents
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } finally {
      // Close the connection after the operation completes
      //await client.close();
    }
}

export async function reserveBike(userToken, bikeId) {
    try {
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      // Create a filter for movies with the title "Random Harvest"
      const filter = { _id: bikeId };
      /* Set the upsert option to insert a document if no documents match
      the filter */
      const options = { upsert: false };
      // Specify the update to set a value for the plot field
      const updateDoc = {
        $set: {
            reservedBy: userToken
        },
      };
      // Update the first document that matches the filter
      const result = await collection.updateOne(filter, updateDoc, options);
      
      // Print the number of matching and modified documents
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } finally {
      // Close the connection after the operation completes
      //await client.close();
    }
}