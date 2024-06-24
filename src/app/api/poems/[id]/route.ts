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
