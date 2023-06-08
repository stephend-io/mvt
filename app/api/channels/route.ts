import { getPlaylistChannels } from "@/services/youtubeDataApi/PlaylistItems";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const channelIdArraySchema = z
  .array(z.string().length(24).startsWith("UC"))
  .max(50);

export async function GET(request: NextRequest) {
  console.log("GET");
  const data = await getRandomVideos();
  console.log("GET" + data);
  return NextResponse.json({ data });
}

export async function getRandomVideos(
  channelId: string = "UC19OYOBqkgVqgTIQxbsPdlw",
  no: number = 1,
  date: Date = new Date("2022-01-01")
) {
  console.log("getRandomVideos called");
  const data =
    (await prisma.$queryRaw`SELECT "embedId" FROM "ytVideo" WHERE "channelId" = ${channelId} AND "dateUploaded" > ${date} ORDER BY random() LIMIT ${no}`) as {
      embedId: string;
    }[];
  // return data[0].embedId;
  return data;
}
