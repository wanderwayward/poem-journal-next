import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";

export async function GET(req: Request) {
	try {
		const url = new URL(req.url);
		const searchQuery = url.searchParams.get("q");

		if (!searchQuery) {
			return NextResponse.json(
				{ status: "error", message: "No search query provided" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("poetrystream");
		const poemsCollection = db.collection("poems");

		// 🔍 Search MongoDB for poems matching title or author
		const poems = await poemsCollection
			.find({
				$or: [
					{ title: { $regex: searchQuery, $options: "i" } },
					{ author: { $regex: searchQuery, $options: "i" } },
				],
			})
			.limit(10) // Limit to 10 results
			.toArray();

		// ✅ Only return MongoDB results
		return NextResponse.json({ status: "success", data: poems });
	} catch (error) {
		console.error("Error searching poems:", error);
		return NextResponse.json(
			{
				status: "error",
				message: "Failed to search poems",
				error: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}
