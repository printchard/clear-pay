import NextAuth, { DefaultSession } from "next-auth";
import { authConfig } from "./authConfig";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
