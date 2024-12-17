// src/app/api/mongodb/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";

export async function POST(req: NextRequest) {
	try {
		// Parse the request body
		const body = await req.json();
		const { id, name, email, image } = body;

		// Validate the required fields
		if (!id || !name || !email) {
			return NextResponse.json(
				{ error: "Missing required fields: id, name, or email" },
				{ status: 400 }
			);
		}

		// Connect to MongoDB
		const client = await clientPromise;
		const db = client.db("poetrystream");
		const usersCollection = db.collection("users");

		// Check if the user already exists
		const existingUser = await usersCollection.findOne({ email });
		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists", user: existingUser },
				{ status: 200 }
			);
		}

		// Create and insert the new user
		const newUser = {
			id,
			name,
			email,
			image,
			createdAt: new Date(),
		};

		await usersCollection.insertOne(newUser);

		return NextResponse.json(
			{ message: "User created successfully", user: newUser },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error saving user:", error);
		return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
	}
}
