import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(account)
    {
      if(!account.user.email) return false;
      try{
        await prismaClient.user.create({
          data:{
            email : account.user.email,
            provider: "GOOGLE",
          
          }
        })
      } catch(error){
        return false;
      }
      return true;
    }
  }
});

export { handler as GET, handler as POST };
