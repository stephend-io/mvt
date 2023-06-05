import { populateChannels } from "@/services/youtubeDataApi/Channels";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { uploadId } = await request.json();
    await populateChannels([uploadId]);
    return new Response("finished!", {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  const data = {
    embedId: "PBwDOskRZRg",
    dateUploaded: "2023-02-27T09:05:41Z",
    width: 100,
    height: 56,
    title:
      "Sushi, Fish, and Misshapen Fingers: The Tale of a Michelin Guide Chef",
    views: 1865881,
    thumbnailId: "PBwDOskRZRg",
    viewCommentRatio: 0.36,
    viewLikeRatio: 88.3,
    likes: 16500,
    commentCount: 682,
    categoryId: 19,
    duration: 3057000,
    channelId: "UCdfhVbZsOMwRn4A0LO5k0ww",
    channelTitle: "Japanese food craftsman",
  };
  console.log("trying test");
  await prisma?.ytVideo.create({ data });
  console.log("test done");
  return new Response("Yay!", { status: 200 });
}
