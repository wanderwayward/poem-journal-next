// /src/app/api/auth/route.ts
import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/_utils/mongodb";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    signIn: "/auth",
    error: "/auth/error", // Custom error page
  },
  debug: true, // Enable debug mode for more detailed logs
  logger: {
    debug: (code: any, metadata: any) => {
      console.log("[DEBUG]", code, metadata);
    },
    error: (code: any, metadata: any) => {
      console.error("[ERROR]", code, metadata);
    },
    warn: (code: any) => {
      console.warn("[WARN]", code);
    },
  },
};

const handler = NextAuth(authOptions);

export async function GET(request: Request) {
  console.log("GET request received");
  return handler(request as any, {} as any);
}

export async function POST(request: Request) {
  console.log("POST request received");
  try {
    return handler(request as any, {} as any);
  } catch (error) {
    console.error("Error during POST request:", error);
    throw error;
  }
}
