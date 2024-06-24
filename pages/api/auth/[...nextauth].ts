import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb"; // Import MongoDB client for database operations
import clientPromise from "@/app/_utils/mongodb"; // Import clientPromise to connect to MongoDB
import { NextApiRequest, NextApiResponse } from "next";
import { Account, Profile, Session, User } from "next-auth"; // Import necessary types from NextAuth.js
import { JWT } from "next-auth/jwt"; // Import JWT type for the JWT callback

// Define the options for NextAuth with proper types
const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> {
      try {
        // Connect to the MongoDB client
        const client: MongoClient = await clientPromise;
        const db = client.db("poetrystream"); // Replace with your actual database name
        const usersCollection = db.collection("users"); // Define the collection to store users

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          // If user does not exist, create a new user
          const newUser = {
            id: `${account?.provider}-${account?.providerAccountId}`,
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
          };

          await usersCollection.insertOne(newUser); // Insert the new user document
          console.log("New user created:", newUser);
        } else {
          console.log("User already exists:", existingUser);
        }

        return true; // Continue with the sign-in process
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Reject the sign-in process
      }
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log("Redirecting to:", url);

      if (url === `${baseUrl}/auth/`) {
        return baseUrl;
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }): Promise<Session> {
      console.log("Session callback:", session);
      return session;
    },
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }): Promise<JWT> {
      console.log("JWT callback:", token);
      return token;
    },
  },
  debug: true,
};

// Default export for NextAuth.js API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, options);
}
