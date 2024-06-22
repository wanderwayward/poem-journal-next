import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/app/_utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
    strategy: "jwt", // Ensure this matches the type expected by NextAuth
  },
  pages: {
    signIn: "/auth",
  },
};

// Use the correct method to handle requests
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request method:", req.method);
  console.log("Request URL:", req.url);
  return NextAuth(req, res, authOptions);
};

// Export the handlers explicitly for Next.js
export { handler as GET, handler as POST };
