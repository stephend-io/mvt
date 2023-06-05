import { getAndMakeChannels } from "@/services/youtubeDataApi/Channels";
import { getPlaylistChannels } from "@/services/youtubeDataApi/PlaylistItems";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const channelIdArraySchema = z
  .array(z.string().length(24).startsWith("UC"))
  .max(50);

export async function POST(request: NextRequest) {
  try {
    const { channelIDs } = await request.json();
    const playlistChannels = await getAndMakeChannels(
      channelIdArraySchema.parse(channelIDs)
    );

    console.log(playlistChannels);

    return new Response(JSON.stringify(playlistChannels), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
