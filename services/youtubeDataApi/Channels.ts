import { google } from "googleapis";
import { prisma } from "@/lib/prisma";
import { channel } from "diagnostics_channel";
import { validator } from "@/lib/utils";
import {
  getMakeDetailedPlaylistItems,
  getPlaylistChannels,
  getPlaylistItems,
} from "./PlaylistItems";
import { getMakeVideos } from "./Videos";

export type channel = {
  uploadsId: string;
  channelId: string;
  channelName: string;
  thumbnailYtLink: string;
  description: string;
  customUrl: string;
};

export const getChannels = async (channelIDs: string[]): Promise<channel[]> => {
  try {
    validator().channelID(channelIDs);
    const returnArr: channel[] = [];

    const res = await google.youtube("v3").channels.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ["snippet", "contentDetails"],
      id: channelIDs,
      maxResults: 50,
    });

    const channelArray = res.data.items?.map((channel) => channel.id as string);

    if (!channelArray) throw "No Channel Array";

    res.data.items?.map((channel) => {
      // skips pushing existing data to DB
      const data: channel = {
        uploadsId: channel.contentDetails?.relatedPlaylists?.uploads as string,
        channelId: channel.id as string,
        channelName: channel.snippet?.title as string,
        thumbnailYtLink: channel.snippet?.thumbnails?.high?.url as string,
        description: channel.snippet?.description as string,
        customUrl: channel.snippet?.customUrl as string,
      };
      returnArr.push(data);
    });

    return returnArr;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAndMakeChannels = async (channelIDs: string[]) => {
  try {
    validator().channelID(channelIDs);
    const returnArr: channel[] = [];

    console.log("Step 3: writing new channels to DB");
    console.log("------------------------------------------");

    const res = await google.youtube("v3").channels.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ["snippet", "contentDetails"],
      id: channelIDs,
      maxResults: 50,
    });

    const channelIdArray = res.data.items?.map(
      (channel) => channel.id as string
    );

    if (!channelIdArray) throw "No Channel Array";

    const existingChannels = await prisma.ytChannel.findMany({
      select: {
        channelId: true,
      },
      where: {
        channelId: {
          in: channelIdArray,
        },
      },
    });

    const existingChannelIDs = existingChannels?.map((e) => e.channelId);

    res.data.items?.map((channel) => {
      // skips pushing existing data to DB
      if (!existingChannelIDs.includes(channel.id as string)) {
        returnArr.push({
          uploadsId: channel.contentDetails?.relatedPlaylists
            ?.uploads as string,
          channelId: channel.id as string,
          channelName: channel.snippet?.title as string,
          thumbnailYtLink: channel.snippet?.thumbnails?.high?.url as string,
          description: channel.snippet?.description as string,
          customUrl: channel.snippet?.customUrl as string,
        });
      }
    });

    const channelUploadIdArray = channelIdArray?.map((channelId) =>
      channelId.replace(channelId.charAt(1), "U")
    );

    console.log(channelUploadIdArray);

    await prisma.ytChannel
      .createMany({
        data: returnArr,
      })
      .then((data) =>
        console.log("createMany yt Channel done " + JSON.stringify(data))
      );
    await populateChannels(channelUploadIdArray).then((data) =>
      console.log(`done populating channels: ${JSON.stringify(data)}`)
    );

    return returnArr;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export async function populateChannels(uploadsId: string[]) {
  console.log("Step 4: Populating Channels");
  console.log("------------------------------------------");

  const uploads = [...uploadsId];

  while (uploads.length > 0) {
    const currentUpload = uploads.pop() as string;
    console.log(`Working on: ${currentUpload}`);
    console.log("------------------------------------------");

    const channelVideoData = getMakeDetailedPlaylistItems(currentUpload).then(
      async (videoData) => {
        console.log("making: " + JSON.stringify(videoData));
        await prisma.ytVideo.createMany({
          data: videoData,
        });
        console.log("done making" + JSON.stringify(videoData));
      }
    );
  }
}

const sampleChannelData = {
  kind: "youtube#channelListResponse",
  etag: "2vBIFv38iuR3dv1vKgA9g4rNnJg",
  pageInfo: {
    totalResults: 1,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: "youtube#channel",
      etag: "VnUb0zFr6m6QapNdhYsBTr_UeaA",
      id: "UCpqH8-BBNTsluhcOzFKWLuw",
      snippet: {
        title: "MATTY MATHESON",
        description:
          "HI I’M MATTY MATHESON WELCOME TO MY YOUTUBE CHANNEL ALL YOU FREAKY DEAKY BABIES!!! \n\nFIND HOME STYLE COOKERY HERE: http://mattymathesonhomestylecookery.abrams.link/\n\nHOME STYLE COOKERY\nWATCH ME MAKE RECIPES FROM THE BOOK!! BONE MARROW TARTINE, 7 LAYER DIP, SHORT RIB QUESOOOO COOK WITH ME!\n\nCOOKIN’ SOMETHIN’\nSOMETIMES YOU THINK OF SOMETHING AND YOU WANNA COOK IT SO YOU GET IN THE KITCHEN AND START COOKIN’ SOMETHIN’ YOU WANT ME TO MAKE A DISH? TELL ME! ILL TRY ANYTHING!!\n\nJUST A DASH\nTHIS IS MY SELF-PRODUCED, SELF-DIRECTED, FULLY MATTY MATHESON-CONCEPTUALIZED SHOW. JUST A DASH IS THE COOKING SHOW I ALWAYS WANTED TO MAKE AND IT'S BETTER THAN I COULD HAVE EVER DREAMED! I NAILED IT!\n\nMATTY AND BENNY EAT OUT AMERICA \nME AND BENNY WILL TAKE YOU FROM OUR BRAINS TO YOUR STOMACHS AND TOGETHER FILL THE PUNCH BOWL OF LIFE WITH LOVE AND LAUGHTER! EAT OUT AMERICA IS THE REALEST, MOST EXPLOSIVE, TASTY, AND EMOTIONALLY WRECKED FOOD SHOW OF ALL TIME! FIND IT ON BENNY’S CHANNEL YOUTUBE.COM/BENNYBLANCO\n",
        customUrl: "@mattymatheson",
        publishedAt: "2006-03-19T23:54:30Z",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqO-Pxq7eV7bSPqVRNmujEc0BRjBt40Le7Ee1-uV=s88-c-k-c0x00ffffff-no-rj",
            width: 88,
            height: 88,
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqO-Pxq7eV7bSPqVRNmujEc0BRjBt40Le7Ee1-uV=s240-c-k-c0x00ffffff-no-rj",
            width: 240,
            height: 240,
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqO-Pxq7eV7bSPqVRNmujEc0BRjBt40Le7Ee1-uV=s800-c-k-c0x00ffffff-no-rj",
            width: 800,
            height: 800,
          },
        },
        localized: {
          title: "MATTY MATHESON",
          description:
            "HI I’M MATTY MATHESON WELCOME TO MY YOUTUBE CHANNEL ALL YOU FREAKY DEAKY BABIES!!! \n\nFIND HOME STYLE COOKERY HERE: http://mattymathesonhomestylecookery.abrams.link/\n\nHOME STYLE COOKERY\nWATCH ME MAKE RECIPES FROM THE BOOK!! BONE MARROW TARTINE, 7 LAYER DIP, SHORT RIB QUESOOOO COOK WITH ME!\n\nCOOKIN’ SOMETHIN’\nSOMETIMES YOU THINK OF SOMETHING AND YOU WANNA COOK IT SO YOU GET IN THE KITCHEN AND START COOKIN’ SOMETHIN’ YOU WANT ME TO MAKE A DISH? TELL ME! ILL TRY ANYTHING!!\n\nJUST A DASH\nTHIS IS MY SELF-PRODUCED, SELF-DIRECTED, FULLY MATTY MATHESON-CONCEPTUALIZED SHOW. JUST A DASH IS THE COOKING SHOW I ALWAYS WANTED TO MAKE AND IT'S BETTER THAN I COULD HAVE EVER DREAMED! I NAILED IT!\n\nMATTY AND BENNY EAT OUT AMERICA \nME AND BENNY WILL TAKE YOU FROM OUR BRAINS TO YOUR STOMACHS AND TOGETHER FILL THE PUNCH BOWL OF LIFE WITH LOVE AND LAUGHTER! EAT OUT AMERICA IS THE REALEST, MOST EXPLOSIVE, TASTY, AND EMOTIONALLY WRECKED FOOD SHOW OF ALL TIME! FIND IT ON BENNY’S CHANNEL YOUTUBE.COM/BENNYBLANCO\n",
        },
        country: "CA",
      },
      contentDetails: {
        relatedPlaylists: {
          likes: "",
          uploads: "UUpqH8-BBNTsluhcOzFKWLuw",
        },
      },
    },
  ],
};

// const channels = {
//   kind: "youtube#channel",
//   etag: "etag",
//   id: "string",
//   snippet: {
//     title: "string",
//     description: "string",
//     customUrl: "string",
//     publishedAt: "datetime",
//     thumbnails: {
//       key: {
//         url: "string",
//         width: "unsigned integer",
//         height: "unsigned integer",
//       },
//     },
//     defaultLanguage: "string",
//     localized: {
//       title: "string",
//       description: "string",
//     },
//     country: "string",
//   },
//   contentDetails: {
//     relatedPlaylists: {
//       likes: "string",
//       favorites: "string",
//       uploads: "string",
//     },
//     statistics: {},
//     viewCount: "unsigned long",
//     subscriberCount: "unsigned long", // this value is rounded to three significant figures
//     hiddenSubscriberCount: "boolean",
//     videoCount: "unsigned long",
//   },
//   topicDetails: {
//     topicIds: ["string"],
//     topicCategories: ["string"],
//   },
//   status: {
//     privacyStatus: "string",
//     isLinked: "boolean",
//     longUploadsStatus: "string",
//     madeForKids: "boolean",
//     selfDeclaredMadeForKids: "boolean",
//   },
//   brandingSettings: {
//     channel: {
//       title: "string",
//       description: "string",
//       keywords: "string",
//       trackingAnalyticsAccountId: "string",
//       moderateComments: "boolean",
//       unsubscribedTrailer: "string",
//       defaultLanguage: "string",
//       country: "string",
//     },
//     watch: {
//       textColor: "string",
//       backgroundColor: "string",
//       featuredPlaylistId: "string",
//     },
//   },
//     overallGoodStanding: "boolean",
//     communityGuidelinesGoodStanding: "boolean",
//     copyrightStrikesGoodStanding: "boolean",
//     contentIdClaimsGoodStanding: "boolean",
//   },
//   contentOwnerDetails: {
//     contentOwner: "string",
//     timeLinked: "datetime",
//   },
//   localizations: {
//     key: {
//       title: "string",
//       description: "string",
//     },
//   },
// ;
