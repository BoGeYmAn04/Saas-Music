import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
const createStreamSchema= z.object({
    creatorId: z.string(),
    url : z.string()
})

export async function POST(req: NextRequest){
    try{
        const data= createStreamSchema.parse(await req.json());
        prismaClient.stream.create({
            userId : data.creatorId,
            url    : data.url
        })
    }catch(e){
        return NextResponse.json({
            message: "Error While Creating A Stream"
        },{
            status: 411
        })
    }
}