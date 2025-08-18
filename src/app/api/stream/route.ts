import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

import * as youtubesearchapi from "youtube-search-api";

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
    const extractedId = data.url.split("?v=")[1];
    const GetVideoDetails = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnail = GetVideoDetails.thumbnail.thumbnails;
    thumbnail.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );
    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        title: GetVideoDetails.title ?? "can't find the image",
        smallImg: (thumbnail>1 ? thumbnail[thumbnail.length-2].url:thumbnail[0].url)??"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fbmw&psig=AOvVaw2tCB9RgQ5dRsuD8Nm6i1sw&ust=1755580933936000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi5y-HOk48DFQAAAAAdAAAAABAK",
        bigImg: thumbnail[thumbnail.length - 1].url ?? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fbmw&psig=AOvVaw2tCB9RgQ5dRsuD8Nm6i1sw&ust=1755580933936000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOi5y-HOk48DFQAAAAAdAAAAABAK",
        type: "Youtube",
      },
    });
    return NextResponse.json(
      {
        message: "Stream Created Successfully",
        id: stream.id,
      },
      {
        status: 201,
      }
    );
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
export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");
  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
  });
  return NextResponse.json({
    streams
  });
}
