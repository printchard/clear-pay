import { db } from "@/app/db/db";
import { users } from "@/app/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { AuthOptions as NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .limit(1);
        if (!user) {
          console.error("No user found");
          return null;
        }

        if (await bcrypt.compare(credentials.password, user[0].password)) {
          return user[0];
        }

        console.error("Invalid credentials");

        return null;
      },
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};
