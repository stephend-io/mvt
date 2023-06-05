import { google } from "googleapis";
import {
  convertISO8601ToMilliseconds,
  getTimeFromTimeString,
  simpleWriteFS,
} from "@/lib/utils";

type partOptions = "contentDetails" | "id" | "snippet" | "status";

export interface videos {
  width: number;
  height: number;
  embedId: string;
  title: string;
  dateUploaded: Date;
  views: number;
  thumbnailId: string;
  duration: number;
  channelId: string;
  channelTitle: string;
  viewLikeRatio: number;
  viewCommentRatio: number;
  likes: number;
  commentCount: number;
  categoryId: number;
}

export const getChannelIdFromVideo = async (videoIDs: string[]) => {
  let returnArr: string[] = [];
  const res = await google.youtube("v3").videos.list({
    key: process.env.YOUTUBE_API_KEY,
    part: ["snippet", "status", "contentDetails", "player", "statistics"],
    id: videoIDs,
    maxResults: 50,
  });
  res.data.items?.map((item) => {
    returnArr.push(item.snippet?.channelId as string);
  });
  return returnArr;
};

const videosArray: videos[] = [];

export const getMakeVideos = async (videoIDs: string[]): Promise<videos[]> => {
  const videos = await google.youtube("v3").videos.list({
    key: process.env.YOUTUBE_API_KEY,
    part: ["snippet", "statistics", "contentDetails", "player", "status"],
    id: videoIDs,
    maxResults: 50,
    maxHeight: 100,
    maxWidth: 100,
  });
  simpleWriteFS(videos);
  // const videos = sampleVideo;
  videos.data.items?.map((video) => {
    if (
      !video.status?.embeddable ||
      !(video.status?.privacyStatus === "public")
    ) {
      console.log(
        `video ${video.snippet?.title} by ${video.snippet?.channelTitle} is not embeddable`
      );
      return;
    }
    if (getTimeFromTimeString(video.contentDetails?.duration!) <= 60) {
      console.log(
        `trying to add youtube short - ${
          video.snippet?.title as string
        } - skipping for now`
      );
    } else {
      console.log("valid data for: " + video.snippet?.title);
      videosArray.push({
        dateUploaded: new Date(video.snippet?.publishedAt as string),
        width: Number(video.player?.embedWidth),
        height: Number(video.player?.embedHeight),
        embedId: video.id as string,
        title: video.snippet?.title as string,
        views: Number(video.statistics?.viewCount),
        thumbnailId: video.snippet as string,
        viewCommentRatio:
          Number(video.statistics?.commentCount) /
          Number(video.statistics?.viewCount),
        viewLikeRatio:
          Number(video.statistics?.likeCount) /
          Number(video.statistics?.viewCount),
        likes: Number(video.statistics?.likeCount),
        commentCount: Number(video.statistics?.commentCount),
        categoryId: Number(video.snippet?.categoryId),
        duration: convertISO8601ToMilliseconds(
          video.contentDetails?.duration as string
        ),
        channelId: video.snippet?.channelId as string,
        channelTitle: video.snippet?.channelTitle as string,
      });
    }
  });
  return videosArray;
};
const yo = {
  kind: "youtube#videoListResponse",
  etag: "6lgkG5_lU9LmEngv3LXr-gMc4SM",
  items: [
    {
      kind: "youtube#video",
      etag: "Er5aclWtWYWkG3Lix5_ojFlfi_U",
      id: "J2RbSZob6ag",
      snippet: {
        publishedAt: "2023-03-16T18:00:13Z",
        channelId: "UC9_p50tH3WmMslWRWKnM7dQ",
        title: "Steak Diane with lemony asparagus",
        description:
          "Thanks to Made In for sponsoring! You can get my favorite cookware from Made In today with a 15% off discount using my link: https://madein.cc/adamragusea\n\n****RECIPE, SERVES TWO***\n\n2 steaks about 1/2 lb (227g), tenderloin or strip would be good\n1/2 lb (227g) mushrooms\n1 shallot\n3-4 cloves garlic\n1 lb (454g) asparagus\n1 lemon\nfresh parsley for garnish\nstock (about a cup)\ncognac or other brown liquor (can skip)\ncream\ntomato paste\nmustard\nWorcestershire sauce\noil\nsalt\npepper\n\nTrim the mushrooms, slice them and reserve for later. \n\nPeel and finely chop the shallot and garlic. Trim the woody ends off the asparagus. Put half the shallot and garlic on a sheet pan along with the asparagus and toss to coat everything in oil, salt and pepper. Reserve for later.\n\nTrim anything inedible off of the steaks — they'll be covered in sauce so you won't be able to eat around big chunks of fat or connective tissue. Coat with oil, salt and pepper.\n\nPut the steaks in a very hot pan, along with any large trimmings you might want to use to flavor the sauce. Sear the steaks as well as you can, being careful to keep the heat from getting too hot and burning the brown stuff on the bottom of the pan. \n\nWhen pink juice starts to push to the surface, that's a good sign the steaks are approaching medium rare — when in doubt, pull the steaks out, because they're going to cook a little more later inside the sauce. Scraps can stay in the pan at this point to help flavor the sauce.\n\nWith the steaks out, put in the mushrooms with a little more oil if they need it to brown. As soon as you have some color on the mushrooms, stir in the remaining shallot and garlic along with a squeeze of tomato paste. \n\nWhen everything in the pan is brown, deglaze with cognac (turn off the flame if using a gas stove so as to not ignite the alcohol). Reduce the cognac until almost dry. Pour in the stock, along with a squeeze of mustard and a splash of Worcestershire sauce. Reduce until almost dry. \n\nThis is would be a good time to put the asparagus under a broiler/grill at maximum heat — they'll only take a few minutes to brown and go tender.\n\nOnce the sauce has reduced to a sticky glaze, take out any beef scraps you may have left in the pan.\n\nStir in as much cream as you want to finish the sauce — it'll have to simmer for a few minutes before it fully thickens. Taste for seasoning — it should be a little too salty/strong on its own. Consider adding salt, pepper, Worcestershire or a little lemon juice.\n\nReturn the steaks to the pan along with any resting juices, coat them in the sauce and let them reheat for a couple minutes. Stir in fresh parsley at the last second. Serve smothered in sauce alongside the asparagus.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/J2RbSZob6ag/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/J2RbSZob6ag/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/J2RbSZob6ag/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/J2RbSZob6ag/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/J2RbSZob6ag/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Adam Ragusea",
        categoryId: "26",
        liveBroadcastContent: "none",
        defaultLanguage: "en",
        localized: {
          title: "Steak Diane with lemony asparagus",
          description:
            "Thanks to Made In for sponsoring! You can get my favorite cookware from Made In today with a 15% off discount using my link: https://madein.cc/adamragusea\n\n****RECIPE, SERVES TWO***\n\n2 steaks about 1/2 lb (227g), tenderloin or strip would be good\n1/2 lb (227g) mushrooms\n1 shallot\n3-4 cloves garlic\n1 lb (454g) asparagus\n1 lemon\nfresh parsley for garnish\nstock (about a cup)\ncognac or other brown liquor (can skip)\ncream\ntomato paste\nmustard\nWorcestershire sauce\noil\nsalt\npepper\n\nTrim the mushrooms, slice them and reserve for later. \n\nPeel and finely chop the shallot and garlic. Trim the woody ends off the asparagus. Put half the shallot and garlic on a sheet pan along with the asparagus and toss to coat everything in oil, salt and pepper. Reserve for later.\n\nTrim anything inedible off of the steaks — they'll be covered in sauce so you won't be able to eat around big chunks of fat or connective tissue. Coat with oil, salt and pepper.\n\nPut the steaks in a very hot pan, along with any large trimmings you might want to use to flavor the sauce. Sear the steaks as well as you can, being careful to keep the heat from getting too hot and burning the brown stuff on the bottom of the pan. \n\nWhen pink juice starts to push to the surface, that's a good sign the steaks are approaching medium rare — when in doubt, pull the steaks out, because they're going to cook a little more later inside the sauce. Scraps can stay in the pan at this point to help flavor the sauce.\n\nWith the steaks out, put in the mushrooms with a little more oil if they need it to brown. As soon as you have some color on the mushrooms, stir in the remaining shallot and garlic along with a squeeze of tomato paste. \n\nWhen everything in the pan is brown, deglaze with cognac (turn off the flame if using a gas stove so as to not ignite the alcohol). Reduce the cognac until almost dry. Pour in the stock, along with a squeeze of mustard and a splash of Worcestershire sauce. Reduce until almost dry. \n\nThis is would be a good time to put the asparagus under a broiler/grill at maximum heat — they'll only take a few minutes to brown and go tender.\n\nOnce the sauce has reduced to a sticky glaze, take out any beef scraps you may have left in the pan.\n\nStir in as much cream as you want to finish the sauce — it'll have to simmer for a few minutes before it fully thickens. Taste for seasoning — it should be a little too salty/strong on its own. Consider adding salt, pepper, Worcestershire or a little lemon juice.\n\nReturn the steaks to the pan along with any resting juices, coat them in the sauce and let them reheat for a couple minutes. Stir in fresh parsley at the last second. Serve smothered in sauce alongside the asparagus.",
        },
        defaultAudioLanguage: "en-US",
      },
      contentDetails: {
        duration: "PT7M14S",
        dimension: "2d",
        definition: "hd",
        caption: "true",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      status: {
        uploadStatus: "processed",
        privacyStatus: "public",
        license: "youtube",
        embeddable: true,
        publicStatsViewable: true,
        madeForKids: false,
      },
      player: {
        embedHtml:
          '\u003ciframe width="480" height="270" src="//www.youtube.com/embed/J2RbSZob6ag" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen\u003e\u003c/iframe\u003e',
      },
    },
  ],
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
};
const sampleVideosData = {
  kind: "youtube#videoListResponse",
  etag: "fb9iz5o719MA9V3qJ311lbGqdSI",
  items: [
    {
      kind: "youtube#video",
      etag: "uvvifO3erwZNKwYGxHqJSQqHtec",
      id: "XyVdwa0GMr4",
      snippet: {
        publishedAt: "2023-05-05T15:00:32Z",
        channelId: "UCfyehHM_eo4g5JUyWmms2LA",
        title: "Unmissable Food Trends we loved in April 2023",
        description:
          "It's Friday so we're grabbing a beer and chatting about all things food we loved in April! \n\nCheck out what we loved in April-\nBest Ever Food Review Show: https://bit.ly/41afPa7 \nFat Hippo: https://fathippo.co.uk/ \nEmma Stephenson Tik Tok: https://bit.ly/3p1YimT \nBethnal Green Fish: https://bit.ly/418hYD5 \n\nWanna become an awesome home cook? Sign up to our Sidekick app and be the hero of your kitchen: https://bit.ly/3tfFgsR\n\n- Discover Smarter Recipe Packs - 3x delicious recipes, 1x simple shopping list\n- Cut out food waste - share ingredients across recipes so nothing gets wasted\n- Smash your cooking - plan, shop and cook like a chef, no effort required\n- Start your 1 month free trial today: https://bit.ly/3tfFgsR\n\n#sortedfood #foodtrends #tiktok",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/XyVdwa0GMr4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/XyVdwa0GMr4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/XyVdwa0GMr4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/XyVdwa0GMr4/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/XyVdwa0GMr4/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Sorted Food",
        tags: [
          "sorted food",
          "food trends",
          "taste test",
          "chefs review",
          "sortedfood food trends",
          "taste testing",
          "food trends sorted",
          "kitchen gadgets",
          "tik tok",
          "gadget review",
          "sortedfood gadgets",
          "sortedfood taste testing",
          "food review",
          "the fridgecam show",
          "food challenge",
          "weird food",
          "food trends 2023",
          "2023 food trends",
          "top 10",
          "stuff we love in",
          "stuff we love in april",
          "food trends sortedfood",
          "april food trends",
          "podcast",
          "podcast sortedfood",
          "food podcast",
          "top food trends 2023",
        ],
        categoryId: "26",
        liveBroadcastContent: "none",
        defaultLanguage: "en-GB",
        localized: {
          title: "Unmissable Food Trends we loved in April 2023",
          description:
            "It's Friday so we're grabbing a beer and chatting about all things food we loved in April! \n\nCheck out what we loved in April-\nBest Ever Food Review Show: https://bit.ly/41afPa7 \nFat Hippo: https://fathippo.co.uk/ \nEmma Stephenson Tik Tok: https://bit.ly/3p1YimT \nBethnal Green Fish: https://bit.ly/418hYD5 \n\nWanna become an awesome home cook? Sign up to our Sidekick app and be the hero of your kitchen: https://bit.ly/3tfFgsR\n\n- Discover Smarter Recipe Packs - 3x delicious recipes, 1x simple shopping list\n- Cut out food waste - share ingredients across recipes so nothing gets wasted\n- Smash your cooking - plan, shop and cook like a chef, no effort required\n- Start your 1 month free trial today: https://bit.ly/3tfFgsR\n\n#sortedfood #foodtrends #tiktok",
        },
        defaultAudioLanguage: "en-GB",
      },
      contentDetails: {
        duration: "PT25M4S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
    },
  ],
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 1,
  },
};
const videos = {
  kind: "youtube#video",
  etag: "etag",
  id: "string",
  snippet: {
    publishedAt: "datetime",
    channelId: "string",
    title: "string",
    description: "string",
    thumbnails: {
      key: {
        url: "string",
        width: "unsigned integer",
        height: "unsigned integer",
      },
    },
    channelTitle: "string",
    tags: ["string"],
    categoryId: "string",
    liveBroadcastContent: "string",
    defaultLanguage: "string",
    localized: {
      title: "string",
      description: "string",
    },
    defaultAudioLanguage: "string",
  },
  contentDetails: {
    duration: "string",
    dimension: "string",
    definition: "string",
    caption: "string",
    licensedContent: "boolean",
    regionRestriction: {
      allowed: ["string"],
      blocked: ["string"],
    },
    contentRating: {
      acbRating: "string",
      agcomRating: "string",
      anatelRating: "string",
      bbfcRating: "string",
      bfvcRating: "string",
      bmukkRating: "string",
      catvRating: "string",
      catvfrRating: "string",
      cbfcRating: "string",
      cccRating: "string",
      cceRating: "string",
      chfilmRating: "string",
      chvrsRating: "string",
      cicfRating: "string",
      cnaRating: "string",
      cncRating: "string",
      csaRating: "string",
      cscfRating: "string",
      czfilmRating: "string",
      djctqRating: "string",
      djctqRatingReasons: [, "string"],
      ecbmctRating: "string",
      eefilmRating: "string",
      egfilmRating: "string",
      eirinRating: "string",
      fcbmRating: "string",
      fcoRating: "string",
      fmocRating: "string",
      fpbRating: "string",
      fpbRatingReasons: [, "string"],
      fskRating: "string",
      grfilmRating: "string",
      icaaRating: "string",
      ifcoRating: "string",
      ilfilmRating: "string",
      incaaRating: "string",
      kfcbRating: "string",
      kijkwijzerRating: "string",
      kmrbRating: "string",
      lsfRating: "string",
      mccaaRating: "string",
      mccypRating: "string",
      mcstRating: "string",
      mdaRating: "string",
      medietilsynetRating: "string",
      mekuRating: "string",
      mibacRating: "string",
      mocRating: "string",
      moctwRating: "string",
      mpaaRating: "string",
      mpaatRating: "string",
      mtrcbRating: "string",
      nbcRating: "string",
      nbcplRating: "string",
      nfrcRating: "string",
      nfvcbRating: "string",
      nkclvRating: "string",
      oflcRating: "string",
      pefilmRating: "string",
      rcnofRating: "string",
      resorteviolenciaRating: "string",
      rtcRating: "string",
      rteRating: "string",
      russiaRating: "string",
      skfilmRating: "string",
      smaisRating: "string",
      smsaRating: "string",
      tvpgRating: "string",
      ytRating: "string",
    },
    projection: "string",
    hasCustomThumbnail: "boolean",
  },
  status: {
    uploadStatus: "string",
    failureReason: "string",
    rejectionReason: "string",
    privacyStatus: "string",
    publishAt: "datetime",
    license: "string",
    embeddable: "boolean",
    publicStatsViewable: "boolean",
    madeForKids: "boolean",
    selfDeclaredMadeForKids: "boolean",
  },
  statistics: {
    viewCount: "string",
    likeCount: "string",
    dislikeCount: "string",
    favoriteCount: "string",
    commentCount: "string",
  },
  player: {
    embedHtml: "string",
    embedHeight: "long",
    embedWidth: "long",
  },
  topicDetails: {
    topicIds: ["string"],
    relevantTopicIds: ["string"],
    topicCategories: ["string"],
  },
  recordingDetails: {
    recordingDate: "datetime",
  },
  fileDetails: {
    fileName: "string",
    fileSize: "unsigned long",
    fileType: "string",
    container: "string",
    videoStreams: [
      {
        widthPixels: "unsigned integer",
        heightPixels: "unsigned integer",
        frameRateFps: "double",
        aspectRatio: "double",
        codec: "string",
        bitrateBps: "unsigned long",
        rotation: "string",
        vendor: "string",
      },
    ],
    audioStreams: [
      {
        channelCount: "unsigned integer",
        codec: "string",
        bitrateBps: "unsigned long",
        vendor: "string",
      },
    ],
    durationMs: "unsigned long",
    bitrateBps: "unsigned long",
    creationTime: "string",
  },
  processingDetails: {
    processingStatus: "string",
    processingProgress: {
      partsTotal: "unsigned long",
      partsProcessed: "unsigned long",
      timeLeftMs: "unsigned long",
    },
    processingFailureReason: "string",
    fileDetailsAvailability: "string",
    processingIssuesAvailability: "string",
    tagSuggestionsAvailability: "string",
    editorSuggestionsAvailability: "string",
    thumbnailsAvailability: "string",
  },
  suggestions: {
    processingErrors: ["string"],
    processingWarnings: ["string"],
    processingHints: ["string"],
    tagSuggestions: [
      {
        tag: "string",
        categoryRestricts: ["string"],
      },
    ],
    editorSuggestions: ["string"],
  },
  liveStreamingDetails: {
    actualStartTime: "datetime",
    actualEndTime: "datetime",
    scheduledStartTime: "datetime",
    scheduledEndTime: "datetime",
    concurrentViewers: "unsigned long",
    activeLiveChatId: "string",
  },
  localizations: {
    key: {
      title: "string",
      description: "string",
    },
  },
};
