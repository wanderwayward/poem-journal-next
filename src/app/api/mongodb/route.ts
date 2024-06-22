// src/app/api/mongodb/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/app/_utils/mongodb";

export async function GET() {
  try {
    // Await the MongoDB client connection promise
    const client = await clientPromise;
    // Check if the client is connected
    const db = client.db("admin"); // 'admin' is used for a quick ping without specifying a specific database
    await db.command({ ping: 1 });

    // Respond with a success message if connected
    return NextResponse.json({
      status: "success",
      message: "Connected to MongoDB",
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);

    // Check if the error is an instance of Error
    if (error instanceof Error) {
      // Respond with the error message if it's an Error instance
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to MongoDB",
        error: error.message,
      });
    } else {
      // Handle unknown error types
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to MongoDB",
        error: String(error),
      });
    }
  }
}
