import dotenv from "dotenv";
dotenv.config(); // Load .env variables
import fs from "fs-extra";
import { ObjectId } from "mongodb";
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
		let poems = await fs.readJson(FILE_PATH);

		// ✅ Add `_id` as a MongoDB ObjectId to each poem before inserting
		poems = poems.map((poem: any) => ({
			_id: new ObjectId(), // Generate a fresh MongoDB `_id`
			...poem,
		}));

		// Insert all poems
		console.log(`📤 Inserting ${poems.length} poems into MongoDB...`);
		const result = await collection.insertMany(poems);

		console.log(`✅ Successfully uploaded ${result.insertedCount} poems!`);

		// ✅ Log a few inserted `_id`s to confirm
		const samplePoems = await collection.find().limit(5).toArray();
		console.log(
			"🔍 Sample Inserted Poems:",
			samplePoems.map((p) => ({ _id: p._id, title: p.title }))
		);
	} catch (error) {
		console.error("❌ Error uploading poems:", error);
		process.exit(1);
	}
	process.exit(0);
};

// Run the function
uploadPoems();
