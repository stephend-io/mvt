import { getPlaylistChannels } from "@/services/youtubeDataApi/PlaylistItems";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const channelIdArraySchema = z
  .array(z.string().length(24).startsWith("UC"))
  .max(50);

export async function GET(request: NextRequest) {
  console.log("CALLING---------------- GET");
  const data = await getRandomVideos();
  console.log("GET" + data);
  return NextResponse.json({ data });
}

export async function getRandomVideos(
  channelId: string = "UC19OYOBqkgVqgTIQxbsPdlw",
  no: number = 1,
  date: Date = new Date("2022-01-01")
) {
  const data =
    // as {
    //   embedId: string;
    //   width: number;
    //   height: number;
    // }[];

    console.log("getRandomVideos called");
  console.log("-----------------------------------------------");
  console.log(data);
  return data;
}
