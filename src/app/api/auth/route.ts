import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";
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

// Error handling for the /api/auth/error route
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.url?.includes("/api/auth/error")) {
    const error = req.query.error;
    console.error("NextAuth error:", error);
    res.status(400).json({ message: `Authentication error: ${error}` });
    return;
  }

  try {
    // Call NextAuth with the provided options
    return await NextAuth(req, res, options);
  } catch (error) {
    console.error("Error in NextAuth handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Call NextAuth with the provided options
    return await NextAuth(req, res, options);
  } catch (error) {
    console.error("Error in NextAuth handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
