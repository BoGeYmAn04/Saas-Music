import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

const YTregex = new RegExp(
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
);
const createStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = createStreamSchema.parse(await req.json());
    const isYt = YTregex.test(data.url);
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Invalid URL Format",
        },
        {
          status: 411,
        }
      );
    }
    const extractedId=data.url.split("?v=")[1];
    prismaClient.stream.create({
      userId: data.creatorId,
      url: data.url,
      extractedId,
      type: "Youtube"
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error While Creating A Stream",
      },
      {
        status: 411,
      }
    );
  }
}
export async function GET(req:NextRequest) {
    
}
