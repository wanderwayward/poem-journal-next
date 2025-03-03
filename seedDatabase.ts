// import dotenv from "dotenv";
// dotenv.config({ path: "./.env.local" }); // Explicitly load .env.local

import fs from "fs-extra";
import clientPromise from "@/app/_utils/mongodb";

console.log("MongoDB URI (from env):", process.env.MONGODB_URI); // Debug check

const DATABASE_NAME = "poetrystream";
const COLLECTION_NAME = "poems";
const FILE_PATH = "./ConvertedPoems.json"; // Ensure this is the correct path

const uploadPoems = async () => {
	try {
		console.log("🚀 Connecting to MongoDB...");

		if (!process.env.MONGODB_URI) {
			throw new Error("❌ MONGODB_URI is still undefined! Check .env.local");
		}

		const client = await clientPromise;
		const db = client.db(DATABASE_NAME);
		const collection = db.collection(COLLECTION_NAME);

		// Read JSON file
		console.log("📂 Reading ConvertedPoems.json...");
		const poems = await fs.readJson(FILE_PATH);

		// Insert all poems in one go
		console.log(`📤 Inserting ${poems.length} poems into MongoDB...`);
		await collection.insertMany(poems);

		console.log("✅ Successfully uploaded poems!");
	} catch (error) {
		console.error("❌ Error uploading poems:", error);
		process.exit(1);
	}
	process.exit(0);
};

// Run the function
uploadPoems();
