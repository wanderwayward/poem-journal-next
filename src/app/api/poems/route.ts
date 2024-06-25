import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("poetrystream");
    const poemsCollection = db.collection("poems");

    const poems = await poemsCollection.find({}).toArray();

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
