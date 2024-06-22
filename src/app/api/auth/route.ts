import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/_utils/mongodb";
import { NextResponse } from "next/server";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly type the strategy
  },
  pages: {
    signIn: "/auth",
  },
};

const handler = NextAuth(authOptions);

// Add basic logging for GET and POST requests
export async function GET(request: Request) {
  console.log("GET request received");
  return NextResponse.json({ message: "GET request received" });
}

export async function POST(request: Request) {
  console.log("POST request received");
  return handler(request as any, {} as any);
}
