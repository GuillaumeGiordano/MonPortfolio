require("dotenv").config();

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDB } from "@util/database";
import bcrypt from "bcrypt";
import User from "@models/user";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentieals",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }

          console.log("User:", user);

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.user.role = token.role;

      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
