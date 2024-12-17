import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend the NextAuth interfaces for user and session
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

// NextAuth configuration
const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, account }) {
			if (user && account) {
				token.id = `${account.provider}-${account.providerAccountId}`;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
			}
			return session;
		},
	},
	debug: true,
};

// Route handlers for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
