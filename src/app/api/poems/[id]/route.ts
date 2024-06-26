import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";
import { ObjectId } from "mongodb";

// Existing GET handler
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

// New PUT handler
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
    console.log("Incoming update request body:", body);

    const client = await clientPromise;
    const db = client.db("poetrystream");
    const poemsCollection = db.collection("poems");

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

    const result = await poemsCollection.deleteOne({ _id: new ObjectId(id) });

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
