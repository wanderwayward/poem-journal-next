import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("admin");
    await db.command({ ping: 1 });

    return NextResponse.json({
      status: "success",
      message: "Connected to MongoDB",
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    if (error instanceof Error) {
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to MongoDB",
        error: error.message,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to MongoDB",
        error: String(error),
      });
    }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON body
    console.log("Incoming request body:", body);

    const client = await clientPromise;
    const db = client.db("poetrystream");
    const poemsCollection = db.collection("poems");

    const result = await poemsCollection.insertOne(body);
    console.log("Insert result:", result);
    return NextResponse.json({
      success: true,
      data: { id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating poem:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to create poem",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
