"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  const session = useSession();
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className=" flex justify-between px-40 py-4 bg-black border-b-1 border-b-orange-500 border-opacity-50">
        <div className="flex gap-4">
          <div>
            <Image src="/SoundWave.png" alt="Logo" width={50} height={50} />
          </div>
          <div className="pt-1.5">
            <h1 className="text-2xl font-bold text-white">SoundWave</h1>
          </div>
        </div>
        <div>
          {session.data?.user && (
            <Button
              className="btn btn-primary bg-white m-2 p-2 rounded-xl hover:bg-orange-400 cursor-pointer"
              onClick={() => signOut()}
            >
              Log Out
            </Button>
          )}
          {!session.data?.user && (
            <Button
              className="btn btn-primary bg-orange-400 m-2 p-2 rounded-xl hover:bg-white cursor-pointer"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
