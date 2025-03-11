import { db } from "@/app/db/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        console.log(credentials);
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

        console.log(user);
        if (await bcrypt.compare(credentials.password, user[0].password))
          return user[0];

        console.error("Invalid credentials");

        return null;
      },
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
});

export { handler as GET, handler as POST };
