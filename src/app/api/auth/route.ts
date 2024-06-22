import NextAuth, { SessionStrategy } from "next-auth"; // Import the SessionStrategy type
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
    strategy: "jwt" as SessionStrategy, // Ensure the strategy is typed correctly
  },
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
