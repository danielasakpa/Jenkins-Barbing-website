import { NextAuthOptions, User } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const dbUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (dbUser && dbUser.password) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            dbUser.password
          );

          if (isValidPassword) {
            const { password, ...dbUserWithoutPassword } = dbUser;
            return {
              ...dbUserWithoutPassword,
              isAdmin: dbUser.isAdmin,
            } as User;
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });
        if (dbUser) {
          // Update the existing user with Google ID if not present
          if (!dbUser.googleId) {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { googleId: account.providerAccountId },
            });
          }
        } else {
          // Create a new user if they don't exist
          await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              googleId: account.providerAccountId,
              isAdmin: false,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
          token.isAdmin = dbUser?.isAdmin || false;
        } else {
          token.isAdmin = user.isAdmin || false;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
