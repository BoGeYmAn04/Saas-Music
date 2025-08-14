"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { use } from "react";

export function Apper() {
    const session=useSession();
  return (
    <div>
      <div className="flex justify-between">
        <div>SAASER</div>
        <div>
            {session.data?.user && <button className="btn btn-primary bg-blue-400 m-2 p-2 rounded-xl" onClick={() => signOut()}>Log Out</button>}
            {!session.data?.user && <button className="btn btn-primary bg-blue-400 m-2 p-2 rounded-xl" onClick={() => signIn()}>Sign In</button>}
        </div>
      </div>
    </div>
  );
}
