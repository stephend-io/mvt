import { getAndMakeChannels } from "@/services/youtubeDataApi/Channels";
import { getPlaylistChannels, getPlaylistItems } from "@/services/youtubeDataApi/PlaylistItems";
import { getMakeVideos } from "@/services/youtubeDataApi/Videos";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const playlistIdSchema = z.string().length(34);
export type playlistIdType = z.infer<typeof playlistIdSchema>; // string

async function getMakeFetchPlaylistChannels(playlistId: string) {
  // Steps:
  // get ChannelIDs
  // check ChannelIDs in DB
  // write new CHannelIDs in DB
  console.log("Step 1: getChannelIDs");
  console.log(playlistId);
  console.log("------------------------------------------");
  const channelIds = await getPlaylistChannels(playlistId);
  console.log("Step 2: getAndMakeChannels");
  console.log(playlistId);
  console.log("------------------------------------------");
  const channels = await getAndMakeChannels(channelIds);
  // get ALL videos from channel by using the uploadsID
  // fetch videoData for each video
  // write videoData

  // const videos = await getMakeVideos(
  //   channels.map((channel) => channel.channelId)
  // );
  // if (videos) return true;
  // console.log(channels);
  if (channels) return true;
}

export async function POST(request: NextRequest) {
  try {
    const { playlistId, channelName } = await request.json();
    const playlistChannels = await getMakeFetchPlaylistChannels(playlistIdSchema.parse(playlistId));

    if (playlistChannels)
      return new Response(JSON.stringify(playlistChannels), {
        status: 200,
      });
    else throw "Error Getting / Making / Fetching playlist channels";
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  try {
    // const res = await request.json();
    // console.log(res);
    // const stringSchema = z.string(res);
    // const playlistChannels = await getPlaylistChannels(stringSchema.parse(res));

    // console.log(playlistChannels);
    return NextResponse.json("yo");
  } catch (err) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
