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

        console.log(user);
        if (user && bcrypt.compareSync(credentials.email, user[0].password))
          return user[0];

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
