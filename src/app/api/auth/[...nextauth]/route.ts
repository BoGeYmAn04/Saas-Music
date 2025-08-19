import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Provider as ProviderEnum } from "@prisma/client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user?.email;
      if (!email) return false;

      try {
        await prismaClient.user.upsert({
          where: { email },
          create: { email, provider: ProviderEnum.GOOGLE },
          update: {}, // nothing to update on repeat sign-ins
        });
        return true;
      } catch (e) {
        console.error("signIn upsert failed:", e);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
