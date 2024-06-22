// src/app/_utils/mongodb.ts

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, reuse the client connection to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri); // Remove deprecated options
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new client for each instance
  client = new MongoClient(uri); // Remove deprecated options
  clientPromise = client.connect();
}

export default clientPromise;
