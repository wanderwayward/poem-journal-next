import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.pathname.split("/").pop(); // Extract the userId from the URL

    if (!userId) {
      return NextResponse.json(
        { status: "error", message: "No user ID provided" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("poetrystream");
    const poemsCollection = db.collection("poems");

    const poems = await poemsCollection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    return NextResponse.json({ status: "success", data: poems });
  } catch (error) {
    console.error("Error fetching poems:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to fetch poems",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
