import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb"; // Import MongoDB client for database operations
import clientPromise from "@/app/_utils/mongodb"; // Import clientPromise to connect to MongoDB
import { NextApiRequest, NextApiResponse } from "next";
import { Account, Profile, Session, User } from "next-auth"; // Import necessary types from NextAuth.js
import { JWT } from "next-auth/jwt"; // Import JWT type for the JWT callback

const mockUser = {
  id: "google-115338846542280213252",
  name: "Ruben Aguirre",
  email: "rubenaguirrelizcano@gmail.com",
  image:
    "https://lh3.googleusercontent.com/a/ACg8ocKY5IbX5G27DZsx1-DtZjDzQ-GuW6KWp-jB6nceRlOcRGdhbx7a=s96-c",
  createdAt: "2024-06-24T00:06:34.248Z", // Use the exact date from your database
};

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
    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User;
      token: JWT;
    }): Promise<Session> {
      if (process.env.NODE_ENV === "development") {
        // Return the mock user session in development
        return {
          user: mockUser,
          expires: new Date().toISOString(), // or some future date
        };
      }
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
      if (process.env.NODE_ENV === "development") {
        // Set the token with mock user data in development
        return {
          ...token,
          name: mockUser.name,
          email: mockUser.email,
          picture: mockUser.image,
          sub: mockUser.id,
        };
      }
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
