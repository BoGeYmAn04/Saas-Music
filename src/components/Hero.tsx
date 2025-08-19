"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export function Hero() {
  return (
    <div className="mt-40 py-10 px-50 flex flex-col items-center justify-center">
        <div className="bg-orange-400 mb-5 mx-95 rounded-lg bg-opacity-10 flex justify-center items-center space-x-1"> 
            <Image className="m-1" src="/play.png" alt="Description" width={20} height={20} />
            <h1 className="text-black text-center font-semibold px-2">50M+ songs available</h1>
        </div>
      <h1 className="text-7xl font-bold text-center text-white">
        Your Music, Your Way with
      </h1>
      <h1 className="text-7xl font-bold text-center text-orange-500 m-4">
        SoundWave
      </h1>
      <h1 className="text-[#FFFFF7] text-2xl text-center py-7 px-20 opacity-50">
        Stream millions of songs, discover new artists, and create the perfect
        playlist for every moment. Experience music like never before with
        <br />
        crystal-clear audio quality.
      </h1>
      <Button className="text-black bg-amber-50 hover:bg-orange-400" onClick={()=>signIn()}>Get Started</Button>
      <h1 className="text-4xl text-white font-bold mt-50 text-center">Everything You Need for Music</h1>
      <h1 className="text-2xl text-[#FFFFF7] text-center m-4 p-2 opacity-50">Premium features designed to enhance your listening experience.</h1>
    </div>
  );
}
