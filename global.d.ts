// src/global.d.ts

import { MongoClient } from "mongodb";

// Extend the NodeJS global object to include the _mongoClientPromise property
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Export an empty object to ensure this file is treated as a module
export {};
