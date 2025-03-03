import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split("/").pop(); // Extract the id from the URL

		if (!id) {
			return NextResponse.json(
				{ status: "error", message: "No ID provided" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("poetrystream");
		const poemsCollection = db.collection("poems");

		// Fetch the poem data from the poems collection
		const poem = await poemsCollection.findOne({ _id: new ObjectId(id) });

		if (!poem) {
			return NextResponse.json(
				{ status: "error", message: "Poem not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ status: "success", data: poem });
	} catch (error) {
		console.error("Error fetching poem:", error);
		return NextResponse.json({
			status: "error",
			message: "Failed to fetch poem",
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function PUT(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split("/").pop(); // Extract the id from the URL

		if (!id) {
			return NextResponse.json(
				{ status: "error", message: "No ID provided" },
				{ status: 400 }
			);
		}

		const body = await req.json(); // Parse JSON body

		const client = await clientPromise;
		const db = client.db("poetrystream");
		const poemsCollection = db.collection("poems");
		const userPoemsCollection = db.collection("userPoems");

		// Ensure the poem exists in userPoems before allowing updates
		const userPoem = await userPoemsCollection.findOne({
			poemId: new ObjectId(id),
		});

		if (!userPoem) {
			return NextResponse.json(
				{ status: "error", message: "You can only update your saved poems." },
				{ status: 403 }
			);
		}

		const result = await poemsCollection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: body }
		);

		if (result.modifiedCount === 0) {
			return NextResponse.json(
				{ status: "error", message: "Failed to update poem" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: "success",
			message: "Poem updated successfully",
			data: { id },
		});
	} catch (error) {
		console.error("Error updating poem:", error);
		return NextResponse.json({
			status: "error",
			message: "Failed to update poem",
			error: error instanceof Error ? error.message : String(error),
		});
	}
}

export async function DELETE(req: Request) {
	try {
		const url = new URL(req.url);
		const id = url.pathname.split("/").pop(); // Extract the id from the URL

		if (!id) {
			return NextResponse.json(
				{ status: "error", message: "No ID provided" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("poetrystream");
		const poemsCollection = db.collection("poems");
		const userPoemsCollection = db.collection("userPoems");

		// Ensure the poem exists in userPoems before allowing deletion
		const userPoem = await userPoemsCollection.findOne({
			poemId: new ObjectId(id),
		});

		if (!userPoem) {
			return NextResponse.json(
				{ status: "error", message: "You can only delete your saved poems." },
				{ status: 403 }
			);
		}

		const result = await userPoemsCollection.deleteOne({
			poemId: new ObjectId(id),
		});

		if (result.deletedCount === 0) {
			return NextResponse.json(
				{ status: "error", message: "Poem not found or already deleted" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			status: "success",
			message: "Poem deleted successfully",
			data: { id },
		});
	} catch (error) {
		console.error("Error deleting poem:", error);
		return NextResponse.json({
			status: "error",
			message: "Failed to delete poem",
			error: error instanceof Error ? error.message : String(error),
		});
	}
}
