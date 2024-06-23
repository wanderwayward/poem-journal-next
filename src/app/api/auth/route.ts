import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";
import { Account, Profile, Session, User } from "next-auth";

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
      email,
      credentials,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, unknown>;
    }) {
      console.log("User signed in:", user);
      console.log("Account:", account);
      console.log("Profile:", profile);
      console.log("Email:", email);
      return true;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log("Redirecting to:", url);
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
    }) {
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
    }) {
      console.log("JWT callback:", token);
      return token;
    },
  },
  debug: true,
};

// Wrap the NextAuth handler in a try-catch block to log errors
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Call NextAuth with the provided options
    return await NextAuth(req, res, options);
  } catch (error) {
    console.error("Error in NextAuth handler:", error);
    // Optionally, send a custom error response
    res.status(500).json({ error: "Internal Server Error" });
  }
}
