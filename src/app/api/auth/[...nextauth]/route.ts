// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "@/app/_utils/mongodb";

// const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // Add more providers if needed, e.g., GitHubProvider, FacebookProvider, etc.
//   ],
//   adapter: MongoDBAdapter(clientPromise),
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt", // Use JWT strategy for session management
//   },
//   pages: {
//     signIn: "/auth/signin", // Specify custom sign-in page if you have one
//   },
// };

// // Export the NextAuth handler with the configuration
// export default NextAuth(authOptions);
