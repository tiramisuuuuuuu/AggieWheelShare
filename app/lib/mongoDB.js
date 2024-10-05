'use server';

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

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
      const database = client.db("AggieWheelShare");
      const collection = database.collection("BikeApplications");
      
      const doc = {
        userToken: userToken,
        description: description,
        location: location,
        imageUri: imageUri,
        completed: "false",
      }
      const result = await collection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    } finally {
      return true;
    }
}

export async function findBikeApplications(userToken) {
  let response = [];
  try {
    const database = client.db("AggieWheelShare");
    const collection = database.collection("BikeApplications");
    const query = { userToken: userToken, completed: "false" };
    const options = {};
    const cursor = collection.find(query, options);
    if ((await collection.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {
      console.dir(doc);
      let myObjectId = new ObjectId(doc._id);
      let myObjectIdString = myObjectId.toString();
      let temp = doc;
      temp._id = myObjectIdString;
      response.push(temp);
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    return response;
  }
}

export async function findBikeApplicationById(id) {
  let response = {};
  try {
    const database = client.db("AggieWheelShare");
    const collection = database.collection("BikeApplications");
    var o_id = new ObjectId(id);
    const query = { _id: o_id };
    const options = {};
    const cursor = collection.find(query, options);
    if ((await collection.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {
      console.log("Found document ", doc);
      let myObjectId = new ObjectId(doc._id);
      let myObjectIdString = myObjectId.toString();
      response = doc;
      response._id = myObjectIdString;
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    return response;
  }
}

export async function insertBike(bikeApplicationId, location, locDescription, helperImageUri="", bikeLockCode) {
  let response = true;
  try {
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      
      const doc = {
        bikeApplicationId: bikeApplicationId,
        location: location,
        locDescription: locDescription,
        helperImageUri: helperImageUri,
        bikeLockCode: bikeLockCode,
        reserved: "false",
      }
      const result = await collection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      response = false;
    } finally {
      return response;
    }
}

export async function closeBikeApplication(appId) {
  try {
    const database = client.db("AggieWheelShare");
    const collection = database.collection("BikeApplications");
    var o_id = new ObjectId(appId);
    const filter = { _id: o_id };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        completed: "true",
      },
    };
    const result = await collection.updateOne(filter, updateDoc, options);
    
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally { return }
}

export async function getBikeAppIds() {
  let response = {available: [], reserved: []};
  try {
    const database = client.db("AggieWheelShare");
    const collection = database.collection("Bikes");
    
    const cursor = collection.find();
    if ((await collection.countDocuments()) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {
      console.dir(doc);
      let bikeApplicationId = doc.bikeApplicationId;
      if (doc.reserved == "false") {
        response.available.push(bikeApplicationId);
      } else {
        response.reserved.push(bikeApplicationId);
      }
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    return response;
  }
}

export async function findBikes(userToken) {
  let response = [];
  try {
    const database = client.db("AggieWheelShare");
    const collection = database.collection("Bikes");
    const query = { reserved: userToken };
    const options = {};
    const cursor = collection.find(query, options);
    if ((await collection.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {
      console.dir(doc);
      let myObjectId = new ObjectId(doc._id);
      let myObjectIdString = myObjectId.toString();
      let temp = doc;
      temp._id = myObjectIdString;
      response.push(temp);
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    return response;
  }
}

export async function updateBike(bikeId, newLoc, locDescription, newImageUri="", bikeLockCode) {
  let response = true;
    try {
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      var o_id = new ObjectId(bikeId);
      const filter = { _id: o_id };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
            location: newLoc,
            locDescription: locDescription,
            helperImageUri: newImageUri,
            bikeLockCode: bikeLockCode,
            reserved: "false",
        },
      };
      const result = await collection.updateOne(filter, updateDoc, options);
      
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      response = false;
    } finally {
      return response;
    }
}

export async function findBikeById(id) {
  let response = {};
  try {
    const database = client.db("AggieWheelShare");
    const collection = database.collection("Bikes");
    var o_id = new ObjectId(id);
    const query = { _id: o_id };
    const options = {};
    const cursor = collection.find(query, options);
    if ((await collection.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }
    for await (const doc of cursor) {
      console.log("Found document ", doc);
      let myObjectId = new ObjectId(doc._id);
      let myObjectIdString = myObjectId.toString();
      response = doc;
      response._id = myObjectIdString;
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    return response;
  }
}

export async function reserveBike(userToken, appId) {
  let response = true;
    try {
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      const filter = { bikeApplicationId: appId, reserved: "false" };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
            reserved: userToken
        },
      };
      const result = await collection.updateOne(filter, updateDoc, options);
      
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );

      if (result.modifiedCount == 0) { response = false }
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      response = false;
    } finally {
      return response;
    }
}

export async function unreserveBike(bikeId) {
  let response = true;
    try {
      const database = client.db("AggieWheelShare");
      const collection = database.collection("Bikes");
      var o_id = new ObjectId(bikeId);
      const filter = { _id: o_id };
      const options = { upsert: false };
      const updateDoc = {
        $set: {
            reserved: "false"
        },
      };
      const result = await collection.updateOne(filter, updateDoc, options);
      
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );

      if (result.modifiedCount == 0) { response = false }
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      response = false;
    } finally {
      return response;
    }
}