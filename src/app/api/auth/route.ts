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

// Handle errors explicitly at /api/auth/error
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.url?.includes("/api/auth/error")) {
    const error = req.query.error;
    console.error("NextAuth error:", error);
    res.status(400).json({ message: `Authentication error: ${error}` });
    return;
  }

  // Handle the GET request normally
  return NextAuth(req, res, options);
}

// Export the NextAuth handler directly with the configured options for POST
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  // Handle the POST request normally
  return NextAuth(req, res, options);
}
