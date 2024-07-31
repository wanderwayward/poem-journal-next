import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoClient } from "mongodb";
import clientPromise from "@/app/_utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Cookies from "js-cookie";

// Extend the session and token types to include the id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

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
        const client: MongoClient = await clientPromise;
        const db = client.db("poetrystream");
        const usersCollection = db.collection("users");

        // Create index on the userId field in the poems collection if not exists
        const poemsCollection = db.collection("poems");
        await poemsCollection.createIndex({ userId: 1 });

        const existingUser = await usersCollection.findOne({
          email: user.email,
        });

        if (!existingUser) {
          const newUser = {
            id: `${account?.provider}-${account?.providerAccountId}`,
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
          };

          await usersCollection.insertOne(newUser);
          console.log("New user created:", newUser);
        } else {
          console.log("User already exists:", existingUser);
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        console.log("Redirect callback triggered");

        // Retrieve callbackUrl from the cookie
        const callbackUrl = Cookies.get("callbackUrl");
        console.log("Extracted callbackUrl from cookie:", callbackUrl);

        // If callbackUrl exists and is valid, use it for redirection
        if (callbackUrl) {
          const validCallbackUrl = new URL(callbackUrl, baseUrl).href;
          Cookies.remove("callbackUrl"); // Clear the cookie after using it
          return validCallbackUrl.startsWith(baseUrl)
            ? validCallbackUrl
            : baseUrl;
        }

        console.log("No valid callbackUrl found, redirecting to baseUrl");
        return baseUrl;
      } catch (error) {
        console.error("Error in redirect callback:", error);
        return baseUrl;
      }
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id;
      }
      console.log("Session callback:", session);
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }): Promise<JWT> {
      if (user && account) {
        token.id = `${account.provider}-${account.providerAccountId}`;
      }
      console.log("JWT callback:", token);
      return token;
    },
  },
  debug: true,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, options);
}
