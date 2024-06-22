// /src/app/api/auth/route.ts

import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/_utils/mongodb";

// Use 'unknown' for metadata to align with NextAuth logger type
type LogMetadata = unknown;

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
    strategy: "jwt" as SessionStrategy, // Explicitly cast to SessionStrategy type
  },
  debug: true, // Enable debug mode for more detailed logs
  logger: {
    debug: (code: string, metadata: LogMetadata) => {
      console.log("[DEBUG]", code, metadata);
    },
    error: (code: string, metadata: LogMetadata) => {
      console.error("[ERROR]", code, metadata);
    },
    warn: (code: string) => {
      console.warn("[WARN]", code);
    },
  },
  // Temporarily remove custom error page to use default handling
  // pages: {
  //   signIn: "/auth",
  //   // error: "/auth/error",
  // },
};

const handler = NextAuth(authOptions);

// Define GET and POST as standard functions and export them directly

export const GET = async (request: Request) => {
  console.log("GET request received", request);
  return handler(request as any, {} as any);
};

export const POST = async (request: Request) => {
  console.log("POST request received", request);
  try {
    console.log("Request headers:", request.headers);
    const body = await request.json();
    console.log("Request body:", body);
    return handler(request as any, {} as any);
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error;
  }
};
