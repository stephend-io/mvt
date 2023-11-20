import { convertISO8601ToMilliseconds, getTimeFromTimeString, validator } from '@/lib/utils'
// import { channel } from '@/services/youtubeDataApi/Channels'
// import { getMakeDetailedPlaylistItems, getPlaylistChannels, getPlaylistItems } from '@/services/youtubeDataApi/PlaylistItems'
// import { getMakeVideos, videos } from '@/services/youtubeDataApi/Videos'
// import { google } from 'googleapis'
// import { NextRequest, NextResponse } from 'next/server'
// import { z } from 'zod'
// import { prisma } from '@/lib/prisma'

// const playlistIdSchema = z.string().length(34)
// export type playlistIdType = z.infer<typeof playlistIdSchema> // string

// async function getMakeFetchPlaylistChannels(playlistId: string) {
//   const newChannels: channel[] = []
//   const videosArray: videos[] = []

//   const channelIds = await getPlaylistChannels(playlistId)

//   validator().channelID(channelIds)

//   const res = await google.youtube('v3').channels.list({
//     key: process.env.YOUTUBE_API_KEY,
//     part: ['snippet', 'contentDetails'],
//     id: channelIds,
//     maxResults: 50,
//   })

//   const channelIdArray = res.data.items?.map((channel) => channel.id as string)

//   if (!channelIdArray) throw 'No Channel Array'

//   // const existingChannels = await prisma.ytChannel.findMany({
//   //   select: {
//   //     channelId: true,
//   //   },
//   //   where: {
//   //     channelId: {
//   //       in: channelIdArray,
//   //     },
//   //   },
//   // });

//   // const existingChannelIDs = existingChannels?.map((e) => e.channelId);
//   // console.log("Existing Channels: " + existingChannelIDs);

//   // res.data.items?.map((channel) => {
//   //   if (!existingChannelIDs.includes(channel.id as string)) {
//   //     newChannels.push({
//   //       uploadsId: channel.contentDetails?.relatedPlaylists?.uploads as string,
//   //       channelId: channel.id as string,
//   //       channelName: channel.snippet?.title as string,
//   //       thumbnailYtLink: channel.snippet?.thumbnails?.high?.url as string,
//   //       description: channel.snippet?.description as string,
//   //       customUrl: channel.snippet?.customUrl as string,
//   //     });
//   //   }
//   // });

//   // const channelUploadIdArray = channelIdArray?.map((channelId) =>
//   //   channelId.replace(channelId.charAt(1), "U")
//   // );

//   // if (newChannels.length) {
//   //   await prisma.ytChannel
//   //     .createMany({
//   //       data: newChannels,
//   //     })
//   //     .then((data) => console.log("createMany yt Channel done "));
//   // }
//   // console.log("-------------------------------------");
//   // console.log("starting to get items");
//   // console.log("-------------------------------------");

//   // let currentIndex = 0;
//   // channelUploadIdArray.map(async (uploadId) => {
//   //   const uploads = await getPlaylistItems(uploadId);

//   //   console.log("-------------------------------------");
//   //   console.log(`There are: ${uploads.length} uploads`);
//   //   console.log("-------------------------------------");

//   //   const uploadIds = uploads.map((upload) => upload.videoId);
//   //   console.log("-------------------------------------");
//   //   console.log("1111111111111111111");
//   //   console.log(`uploadNos = ${uploadIds}`);
//   //   console.log("getting and making videos");
//   //   console.log("-------------------------------------");
//   //   for (let i = 0; i < uploadIds.length / 50; i++) {
//   //     const detailedVideos = await getMakeVideos(
//   //       uploadIds.slice(i * 50, (i + 1) * 50)
//   //     );
//   //     console.log("-------------------------------------");
//   //     console.log("----------------got detailed videos-----------------");
//   //     console.log("-------------------------------------");

//   //     await prisma.ytVideo.createMany({
//   //       data: detailedVideos,
//   //       skipDuplicates: true,
//   //     });
//   //     // const channelData = await getMakeDetailedPlaylistItems(uploadId);
//   //   }
//   // });

//   // await prisma.ytVideo.createMany({
//   //   data: videosArray,
//   // });

//   return channelIds
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { playlistId, channelName } = await request.json()
//     const playlistChannels = await getMakeFetchPlaylistChannels(playlistIdSchema.parse(playlistId))

//     const TvChannelId = await makeTvChannel(playlistChannels, channelName)

//     if (playlistChannels)
//       return new Response(JSON.stringify(TvChannelId), {
//         status: 200,
//       })
//     else throw 'Error Getting / Making / Fetching playlist channels'
//   } catch (err) {
//     console.error(err)
//     return new Response('Something went wrong', {
//       status: 500,
//     })
//   }
// }

// const testPlaylistRecursion = 'PLnQ_7AffD8eUuBY0Z52NBlZgfFJsgg_mt'
// export async function GET(request: NextRequest) {
//   try {
//     const data = await getPlaylistChannels(testPlaylistRecursion)

//     console.log('No coming out: ' + data.length)
//     console.log(data)
//     return new Response(JSON.stringify(data), {
//       status: 200,
//     })
//   } catch (err) {
//     return new Response('Something went wrong', {
//       status: 500,
//     })
//   }
// }
// async function makeTvChannel(channelIds: string[], channelName: string) {
//   console.log('Making Tv Channel: ' + channelName)
//   const { channelId } = await prisma.tvChannel.create({
//     select: {
//       channelId: true,
//     },
//     data: {
//       channelName: channelName,
//       channels: channelIds,
//     },
//   })
//   return channelId
// }

// function getChannelVideos(filters?: string[]) {
//   throw new Error('Function not implemented.')
// }
