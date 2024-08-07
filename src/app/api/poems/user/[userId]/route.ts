import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/_utils/mongodb";

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
    const userPoemsCollection = db.collection("userPoems");
    const poemsCollection = db.collection("poems");

    // Fetch all user-specific poems using the userId
    const userPoems = await userPoemsCollection.find({ userId }).toArray();

    if (userPoems.length === 0) {
      return NextResponse.json(
        { status: "error", message: "No user-specific poems found" },
        { status: 404 }
      );
    }

    // Extract poem IDs from the user-specific poems
    const poemIds = userPoems.map((userPoem) => new ObjectId(userPoem.poemId));

    // Fetch the corresponding poems from the poems collection
    const poems = await poemsCollection
      .find({ _id: { $in: poemIds } })
      .toArray();

    // Combine data from both collections
    const combinedData = userPoems.map((userPoem) => {
      const poem = poems.find((p) => p._id.equals(userPoem.poemId));
      return {
        ...poem,
        status: userPoem.status,
        userId: userPoem.userId,
      };
    });

    return NextResponse.json({ status: "success", data: combinedData });
  } catch (error) {
    console.error("Error fetching poems:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch poems",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
