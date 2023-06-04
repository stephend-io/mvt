// import { google } from "googleapis";
// import { getTimeFROMstring } from "../services/YoutubeServices";
// import simpleWriteFS from "../util/simpleWrite";

// type partOptions = "contentDetails" | "id" | "snippet" | "status";

// export interface videosGET {
//   id?: string[];
//   maxResults: number;
//   pageToken?: string;
//   part: string[];
// }

// const videosArray: videos[] = [];

// export interface videos {
//   duration: number;
//   views: number;
//   channelId: string;
//   channelTitle: string;
//   videoTitle: string;
//   videoId: string;
//   date: number;
//   width: number;
//   height: number;
// }

// export const getChannelIdFromVideo = async (videoIDs: string[]) => {
//   let returnArr: string[] = [];
//   const res = await google.youtube("v3").videos.list({
//     key: process.env.YOUTUBE_API_KEY,
//     part: ["snippet"],
//     id: videoIDs,
//     maxResults: 50,
//   });
//   res.data.items?.map((item) => {
//     item.snippet?.channelId && returnArr.push(item.snippet.channelId);
//   });
//   return returnArr;
// };

// export const getVideos = async (videoIDs: string[]): Promise<videos[]> => {
//   const videos = await google.youtube("v3").videos.list({
//     key: process.env.YOUTUBE_API_KEY,
//     part: ["snippet", "statistics", "contentDetails"],
//     id: videoIDs,
//     maxResults: 50,
//   });
//   // const videos = sampleVideo;
//   videos.data.items?.map((video) => {
//     if (getTimeFROMstring(video.contentDetails?.duration!) <= 60) {
//       console.log(
//         `trying to add youtube short - ${video.snippet
//           ?.title!} - skipping for now`
//       );
//     } else {
//       const width = video.player?.embedHtml;
//       videosArray.push({
//         duration: getTimeFROMstring(video.contentDetails?.duration!),
//         views: parseInt(video.statistics?.viewCount!),
//         channelId: video.snippet?.channelId!,
//         channelTitle: video.snippet?.channelTitle!,
//         videoTitle: video.snippet?.title!,
//         date: Date.parse(video.snippet?.publishedAt!),
//         videoId: video.id!,
//       });
//     }
//   });
//   return videosArray;
// };

// const sampleVideo = {
//   data: {
//     kind: "youtube#videoListResponse",
//     etag: "Uk_h7GffTlBRAQA1Q4H-mp3X_Lo",
//     items: [
//       {
//         kind: "youtube#video",
//         etag: "b4SMB2hKvp54hbNF-8T_yxhxuxA",
//         id: "XyVdwa0GMr4",
//         snippet: {
//           publishedAt: "2023-05-05T15:00:32Z",
//           channelId: "UCfyehHM_eo4g5JUyWmms2LA",
//           title: "Unmissable Food Trends we loved in April 2023",
//           description:
//             "It's Friday so we're grabbing a beer and chatting about all things food we loved in April! \n\nCheck out what we loved in April-\nBest Ever Food Review Show: https://bit.ly/41afPa7 \nFat Hippo: https://fathippo.co.uk/ \nEmma Stephenson Tik Tok: https://bit.ly/3p1YimT \nBethnal Green Fish: https://bit.ly/418hYD5 \n\nWanna become an awesome home cook? Sign up to our Sidekick app and be the hero of your kitchen: https://bit.ly/3tfFgsR\n\n- Discover Smarter Recipe Packs - 3x delicious recipes, 1x simple shopping list\n- Cut out food waste - share ingredients across recipes so nothing gets wasted\n- Smash your cooking - plan, shop and cook like a chef, no effort required\n- Start your 1 month free trial today: https://bit.ly/3tfFgsR\n\n#sortedfood #foodtrends #tiktok",
//           thumbnails: {
//             default: {
//               url: "https://i.ytimg.com/vi/XyVdwa0GMr4/default.jpg",
//               width: 120,
//               height: 90,
//             },
//             medium: {
//               url: "https://i.ytimg.com/vi/XyVdwa0GMr4/mqdefault.jpg",
//               width: 320,
//               height: 180,
//             },
//             high: {
//               url: "https://i.ytimg.com/vi/XyVdwa0GMr4/hqdefault.jpg",
//               width: 480,
//               height: 360,
//             },
//             standard: {
//               url: "https://i.ytimg.com/vi/XyVdwa0GMr4/sddefault.jpg",
//               width: 640,
//               height: 480,
//             },
//             maxres: {
//               url: "https://i.ytimg.com/vi/XyVdwa0GMr4/maxresdefault.jpg",
//               width: 1280,
//               height: 720,
//             },
//           },
//           channelTitle: "Sorted Food",
//           tags: [
//             "sorted food",
//             "food trends",
//             "taste test",
//             "chefs review",
//             "sortedfood food trends",
//             "taste testing",
//             "food trends sorted",
//             "kitchen gadgets",
//             "tik tok",
//             "gadget review",
//             "sortedfood gadgets",
//             "sortedfood taste testing",
//             "food review",
//             "the fridgecam show",
//             "food challenge",
//             "weird food",
//             "food trends 2023",
//             "2023 food trends",
//             "top 10",
//             "stuff we love in",
//             "stuff we love in april",
//             "food trends sortedfood",
//             "april food trends",
//             "podcast",
//             "podcast sortedfood",
//             "food podcast",
//             "top food trends 2023",
//           ],
//           categoryId: "26",
//           liveBroadcastContent: "none",
//           defaultLanguage: "en-GB",
//           localized: {
//             title: "Unmissable Food Trends we loved in April 2023",
//             description:
//               "It's Friday so we're grabbing a beer and chatting about all things food we loved in April! \n\nCheck out what we loved in April-\nBest Ever Food Review Show: https://bit.ly/41afPa7 \nFat Hippo: https://fathippo.co.uk/ \nEmma Stephenson Tik Tok: https://bit.ly/3p1YimT \nBethnal Green Fish: https://bit.ly/418hYD5 \n\nWanna become an awesome home cook? Sign up to our Sidekick app and be the hero of your kitchen: https://bit.ly/3tfFgsR\n\n- Discover Smarter Recipe Packs - 3x delicious recipes, 1x simple shopping list\n- Cut out food waste - share ingredients across recipes so nothing gets wasted\n- Smash your cooking - plan, shop and cook like a chef, no effort required\n- Start your 1 month free trial today: https://bit.ly/3tfFgsR\n\n#sortedfood #foodtrends #tiktok",
//           },
//           defaultAudioLanguage: "en-GB",
//         },
//         contentDetails: {
//           duration: "PT25M4S",
//           dimension: "2d",
//           definition: "hd",
//           caption: "false",
//           licensedContent: true,
//           contentRating: {},
//           projection: "rectangular",
//         },
//         statistics: {
//           viewCount: "101126",
//           likeCount: "7746",
//           favoriteCount: "0",
//           commentCount: "783",
//         },
//       },
//     ],
//     pageInfo: {
//       totalResults: 1,
//       resultsPerPage: 1,
//     },
//   },
// };

// const videoArray: videos[] = [];

// const sampleVideosData = {
//   kind: "youtube#videoListResponse",
//   etag: "fb9iz5o719MA9V3qJ311lbGqdSI",
//   items: [
//     {
//       kind: "youtube#video",
//       etag: "uvvifO3erwZNKwYGxHqJSQqHtec",
//       id: "XyVdwa0GMr4",
//       snippet: {
//         publishedAt: "2023-05-05T15:00:32Z",
//         channelId: "UCfyehHM_eo4g5JUyWmms2LA",
//         title: "Unmissable Food Trends we loved in April 2023",
//         description:
//           "It's Friday so we're grabbing a beer and chatting about all things food we loved in April! \n\nCheck out what we loved in April-\nBest Ever Food Review Show: https://bit.ly/41afPa7 \nFat Hippo: https://fathippo.co.uk/ \nEmma Stephenson Tik Tok: https://bit.ly/3p1YimT \nBethnal Green Fish: https://bit.ly/418hYD5 \n\nWanna become an awesome home cook? Sign up to our Sidekick app and be the hero of your kitchen: https://bit.ly/3tfFgsR\n\n- Discover Smarter Recipe Packs - 3x delicious recipes, 1x simple shopping list\n- Cut out food waste - share ingredients across recipes so nothing gets wasted\n- Smash your cooking - plan, shop and cook like a chef, no effort required\n- Start your 1 month free trial today: https://bit.ly/3tfFgsR\n\n#sortedfood #foodtrends #tiktok",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/XyVdwa0GMr4/default.jpg",
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: "https://i.ytimg.com/vi/XyVdwa0GMr4/mqdefault.jpg",
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: "https://i.ytimg.com/vi/XyVdwa0GMr4/hqdefault.jpg",
//             width: 480,
//             height: 360,
//           },
//           standard: {
//             url: "https://i.ytimg.com/vi/XyVdwa0GMr4/sddefault.jpg",
//             width: 640,
//             height: 480,
//           },
//           maxres: {
//             url: "https://i.ytimg.com/vi/XyVdwa0GMr4/maxresdefault.jpg",
//             width: 1280,
//             height: 720,
//           },
//         },
//         channelTitle: "Sorted Food",
//         tags: [
//           "sorted food",
//           "food trends",
//           "taste test",
//           "chefs review",
//           "sortedfood food trends",
//           "taste testing",
//           "food trends sorted",
//           "kitchen gadgets",
//           "tik tok",
//           "gadget review",
//           "sortedfood gadgets",
//           "sortedfood taste testing",
//           "food review",
//           "the fridgecam show",
//           "food challenge",
//           "weird food",
//           "food trends 2023",
//           "2023 food trends",
//           "top 10",
//           "stuff we love in",
//           "stuff we love in april",
//           "food trends sortedfood",
//           "april food trends",
//           "podcast",
//           "podcast sortedfood",
//           "food podcast",
//           "top food trends 2023",
//         ],
//         categoryId: "26",
//         liveBroadcastContent: "none",
//         defaultLanguage: "en-GB",
//         localized: {
//           title: "Unmissable Food Trends we loved in April 2023",
//           description:
//             "It's Friday so we're grabbing a beer and chatting about all things food we loved in April! \n\nCheck out what we loved in April-\nBest Ever Food Review Show: https://bit.ly/41afPa7 \nFat Hippo: https://fathippo.co.uk/ \nEmma Stephenson Tik Tok: https://bit.ly/3p1YimT \nBethnal Green Fish: https://bit.ly/418hYD5 \n\nWanna become an awesome home cook? Sign up to our Sidekick app and be the hero of your kitchen: https://bit.ly/3tfFgsR\n\n- Discover Smarter Recipe Packs - 3x delicious recipes, 1x simple shopping list\n- Cut out food waste - share ingredients across recipes so nothing gets wasted\n- Smash your cooking - plan, shop and cook like a chef, no effort required\n- Start your 1 month free trial today: https://bit.ly/3tfFgsR\n\n#sortedfood #foodtrends #tiktok",
//         },
//         defaultAudioLanguage: "en-GB",
//       },
//       contentDetails: {
//         duration: "PT25M4S",
//         dimension: "2d",
//         definition: "hd",
//         caption: "false",
//         licensedContent: true,
//         contentRating: {},
//         projection: "rectangular",
//       },
//     },
//   ],
//   pageInfo: {
//     totalResults: 1,
//     resultsPerPage: 1,
//   },
// };
// const videos = {
//   kind: "youtube#video",
//   etag: "etag",
//   id: "string",
//   snippet: {
//     publishedAt: "datetime",
//     channelId: "string",
//     title: "string",
//     description: "string",
//     thumbnails: {
//       key: {
//         url: "string",
//         width: "unsigned integer",
//         height: "unsigned integer",
//       },
//     },
//     channelTitle: "string",
//     tags: ["string"],
//     categoryId: "string",
//     liveBroadcastContent: "string",
//     defaultLanguage: "string",
//     localized: {
//       title: "string",
//       description: "string",
//     },
//     defaultAudioLanguage: "string",
//   },
//   contentDetails: {
//     duration: "string",
//     dimension: "string",
//     definition: "string",
//     caption: "string",
//     licensedContent: "boolean",
//     regionRestriction: {
//       allowed: ["string"],
//       blocked: ["string"],
//     },
//     contentRating: {
//       acbRating: "string",
//       agcomRating: "string",
//       anatelRating: "string",
//       bbfcRating: "string",
//       bfvcRating: "string",
//       bmukkRating: "string",
//       catvRating: "string",
//       catvfrRating: "string",
//       cbfcRating: "string",
//       cccRating: "string",
//       cceRating: "string",
//       chfilmRating: "string",
//       chvrsRating: "string",
//       cicfRating: "string",
//       cnaRating: "string",
//       cncRating: "string",
//       csaRating: "string",
//       cscfRating: "string",
//       czfilmRating: "string",
//       djctqRating: "string",
//       djctqRatingReasons: [, "string"],
//       ecbmctRating: "string",
//       eefilmRating: "string",
//       egfilmRating: "string",
//       eirinRating: "string",
//       fcbmRating: "string",
//       fcoRating: "string",
//       fmocRating: "string",
//       fpbRating: "string",
//       fpbRatingReasons: [, "string"],
//       fskRating: "string",
//       grfilmRating: "string",
//       icaaRating: "string",
//       ifcoRating: "string",
//       ilfilmRating: "string",
//       incaaRating: "string",
//       kfcbRating: "string",
//       kijkwijzerRating: "string",
//       kmrbRating: "string",
//       lsfRating: "string",
//       mccaaRating: "string",
//       mccypRating: "string",
//       mcstRating: "string",
//       mdaRating: "string",
//       medietilsynetRating: "string",
//       mekuRating: "string",
//       mibacRating: "string",
//       mocRating: "string",
//       moctwRating: "string",
//       mpaaRating: "string",
//       mpaatRating: "string",
//       mtrcbRating: "string",
//       nbcRating: "string",
//       nbcplRating: "string",
//       nfrcRating: "string",
//       nfvcbRating: "string",
//       nkclvRating: "string",
//       oflcRating: "string",
//       pefilmRating: "string",
//       rcnofRating: "string",
//       resorteviolenciaRating: "string",
//       rtcRating: "string",
//       rteRating: "string",
//       russiaRating: "string",
//       skfilmRating: "string",
//       smaisRating: "string",
//       smsaRating: "string",
//       tvpgRating: "string",
//       ytRating: "string",
//     },
//     projection: "string",
//     hasCustomThumbnail: "boolean",
//   },
//   status: {
//     uploadStatus: "string",
//     failureReason: "string",
//     rejectionReason: "string",
//     privacyStatus: "string",
//     publishAt: "datetime",
//     license: "string",
//     embeddable: "boolean",
//     publicStatsViewable: "boolean",
//     madeForKids: "boolean",
//     selfDeclaredMadeForKids: "boolean",
//   },
//   statistics: {
//     viewCount: "string",
//     likeCount: "string",
//     dislikeCount: "string",
//     favoriteCount: "string",
//     commentCount: "string",
//   },
//   player: {
//     embedHtml: "string",
//     embedHeight: "long",
//     embedWidth: "long",
//   },
//   topicDetails: {
//     topicIds: ["string"],
//     relevantTopicIds: ["string"],
//     topicCategories: ["string"],
//   },
//   recordingDetails: {
//     recordingDate: "datetime",
//   },
//   fileDetails: {
//     fileName: "string",
//     fileSize: "unsigned long",
//     fileType: "string",
//     container: "string",
//     videoStreams: [
//       {
//         widthPixels: "unsigned integer",
//         heightPixels: "unsigned integer",
//         frameRateFps: "double",
//         aspectRatio: "double",
//         codec: "string",
//         bitrateBps: "unsigned long",
//         rotation: "string",
//         vendor: "string",
//       },
//     ],
//     audioStreams: [
//       {
//         channelCount: "unsigned integer",
//         codec: "string",
//         bitrateBps: "unsigned long",
//         vendor: "string",
//       },
//     ],
//     durationMs: "unsigned long",
//     bitrateBps: "unsigned long",
//     creationTime: "string",
//   },
//   processingDetails: {
//     processingStatus: "string",
//     processingProgress: {
//       partsTotal: "unsigned long",
//       partsProcessed: "unsigned long",
//       timeLeftMs: "unsigned long",
//     },
//     processingFailureReason: "string",
//     fileDetailsAvailability: "string",
//     processingIssuesAvailability: "string",
//     tagSuggestionsAvailability: "string",
//     editorSuggestionsAvailability: "string",
//     thumbnailsAvailability: "string",
//   },
//   suggestions: {
//     processingErrors: ["string"],
//     processingWarnings: ["string"],
//     processingHints: ["string"],
//     tagSuggestions: [
//       {
//         tag: "string",
//         categoryRestricts: ["string"],
//       },
//     ],
//     editorSuggestions: ["string"],
//   },
//   liveStreamingDetails: {
//     actualStartTime: "datetime",
//     actualEndTime: "datetime",
//     scheduledStartTime: "datetime",
//     scheduledEndTime: "datetime",
//     concurrentViewers: "unsigned long",
//     activeLiveChatId: "string",
//   },
//   localizations: {
//     key: {
//       title: "string",
//       description: "string",
//     },
//   },
// };
