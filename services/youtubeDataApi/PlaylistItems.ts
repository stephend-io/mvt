import {
  convertISO8601ToMilliseconds,
  getTimeFromTimeString,
} from "@/lib/utils";
import { google } from "googleapis";
import { getMakeVideos, videos } from "./Videos";

// put in by default for standard get
// type partOptions = "contentDetails" | "id" | "snippet" | "status";
// part: partOptions[];
// set to max of 50, little/no upside to lowering
// maxResults: number;

export interface playlistItemsGET {
  pageToken: string;
  playlistId: string;
}

export interface playlistItem {
  videoId: string;
  title: string;
  channelId: string;
  date: string;
}

const playlistChannelIDs: string[] = [];

export const getPlaylistChannels = async (
  playlistId: string,
  pageToken?: string
) => {
  const playlistData = await google.youtube("v3").playlistItems.list({
    key: process.env.YOUTUBE_API_KEY,
    part: ["snippet", "contentDetails"],
    maxResults: 50,
    playlistId,
    pageToken,
  });

  if (!playlistData.data.items) throw "No Playlist Items";

  playlistData.data.items?.map((video) =>
    playlistChannelIDs.push(video.snippet?.videoOwnerChannelId as string)
  );

  if (playlistData.data.nextPageToken) {
    await getPlaylistChannels(playlistId, playlistData.data.nextPageToken);
  }

  return playlistChannelIDs;
};

const playlistItems: playlistItem[] = [];

let count = 0;
// only returns simple data, does not conform to ytVideos type
export const getPlaylistItems = async (
  playlistId: string,
  pageToken?: string
) => {
  try {
    const playlistData = await google.youtube("v3").playlistItems.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ["snippet", "contentDetails"],
      maxResults: 50,
      playlistId,
      pageToken,
    });

    if (!playlistData.data.items) throw "No Playlist Items";
    console.log(playlistData);
    count++;

    playlistData.data.items?.map((video) =>
      playlistItems.push({
        videoId: video.contentDetails?.videoId as string,
        title: video.snippet?.videoOwnerChannelTitle as string,
        channelId: video.snippet?.videoOwnerChannelId as string,
        date: video.snippet?.publishedAt as string,
      })
    );

    if (playlistData.data.nextPageToken) {
      getPlaylistItems(playlistId, playlistData.data.nextPageToken);
    }

    return playlistItems;
  } catch (err) {
    console.error(err);
    throw "Are you sure that the playlist is public/unlisted?";
  }
};

const returnArr: videos[] = [];

export const getMakeDetailedPlaylistItems = async (
  playlistId: string
): Promise<videos[]> => {
  try {
    const playlistData = await getPlaylistItems(playlistId);
    const playlistIds = playlistData.map((video) => video.videoId);

    while (playlistIds.length > 0) {
      console.log("before splice of: " + playlistId);
      console.log("videos left: " + playlistIds.length);
      const fetchingArr = playlistIds.splice(0, 50);
      console.log("------------------------------------------");
      console.log("after plice");
      console.log("videos left: " + playlistIds.length);
      console.log("------------------------------------------");

      await getMakeVideos(fetchingArr).then((data) => returnArr.push(...data));
    }
    return returnArr;
  } catch (err) {
    throw err;
  }
};

const sampleData = {
  kind: "youtube#playlistItemListResponse",
  etag: "J5MScxZAJ_XjwNTXEWUNNMZQBw4",
  nextPageToken: "EAAaBlBUOkNBVQ",
  items: [
    {
      kind: "youtube#playlistItem",
      etag: "NqAq86TNxvYo85I55__DGu3lhQ8",
      id: "UExjeDVqZkZxeXNFOG02ak1TYU55OFc5NE1Ia253a2Z0VC41NkI0NEY2RDEwNTU3Q0M2",
      snippet: {
        publishedAt: "2023-05-02T23:53:16Z",
        channelId: "UClX6wMJfHCbw09foCNITTkw",
        title: "Authentic Chicken Adobo | Cookin' Somethin' w/ Matty Matheson",
        description:
          "“Thanks to Bespoke Post for sponsoring this video! Head to https://www.bespokepost.com/matty20 and use code MATTY20 to grab your “box of awesome” and get 20% off your first box.”\n\nTHIS IS FOR YOU DANIELLE AND JACKIE! YOU LIFT ME UP AND I LIFT YOU UP WITH PORK AND CHICKEN ADOBO! MAYBE YOUR GRANDMA MADE IT DIFFERENT BUT THIS IS HOW MAMA TOLD ME TO DO IT AND I LOVE IT THANK YOU\n\nJOIN THIS CHANNEL TO GET ACCCESS TO PERKS:\nhttps://www.youtube.com/channel/UCpqH8-BBNTsluhcOzFKWLuw/join\n\nINGREDIENTS\n3 pounds bone-in, skin-on chicken thighs and drumsticks \n1 ½ pounds pork belly, cut into 1-inch cubes\n3/4 cup soy sauce\n3/4 cup vinegar\nWater, as needed\n3 dry bay leaves\n1 teaspoon whole black peppercorns \n10 garlic cloves, crushed\nTKTK neutral oil\n1-2 teaspoons sugar, optional \nCalamansi, optional\n\nGARLIC RICE INGREDIENTS\n10 garlic cloves, minced\n2 tablespoons neutral oil\n2 cups day-old rice\nKosher salt \n\nFOR SERVING\nSpicy Filipino vinegar\nShrimp paste\n\nCOOKING METHOD\n1. In a large ziplock bag, add chicken, pork belly, soy sauce, vinegar, and enough water to just cover the meat. Gently shake to combine and marinate for 6 hours, or overnight. \n2. In a large Dutch oven over medium-high heat, add a touch of oil and marinated pork belly (reserve marinade). Cook until the fat from the pork renders and for the pork to begin to crisp.\n3. Then add chicken and cook until chicken is golden brown on all sides. Add garlic and lightly brown, then add peppercorns, bay leaves, and reserved marinade. \n4. Add more water if needed. Bring to a boil, then reduce to a simmer and cook for 30-45 minutes. \n5. Taste and adjust with more vinegar, soy, and sugar (if desired). Continue cooking until the chicken is juicy and falling off the bone. \n6. While the chicken is cooking, make the garlic rice. In a large, deep pan on medium heat, add oil and garlic. Cook until garlic is golden brown, then add rice. Cook for 3-4 minutes, stirring to incorporate garlic and oil into the rice. \n7. Serve adobo with garlic rice, spicy vinegar, and shrimp paste.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/QyCxOqsXgh4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/QyCxOqsXgh4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/QyCxOqsXgh4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/QyCxOqsXgh4/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/QyCxOqsXgh4/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "test",
        playlistId: "PLcx5jfFqysE8m6jMSaNy8W94MHknwkftT",
        position: 0,
        resourceId: {
          kind: "youtube#video",
          videoId: "QyCxOqsXgh4",
        },
        videoOwnerChannelTitle: "MATTY MATHESON",
        videoOwnerChannelId: "UCpqH8-BBNTsluhcOzFKWLuw",
      },
      contentDetails: {
        videoId: "QyCxOqsXgh4",
        videoPublishedAt: "2023-04-02T15:00:16Z",
      },
    },
  ],
  pageInfo: {
    totalResults: 39,
    resultsPerPage: 5,
  },
};

const data = {
  kind: "youtube#playlistItem",
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
    videoOwnerChannelTitle: "string",
    videoOwnerChannelId: "string",
    playlistId: "string",
    position: "unsigned integer",
    resourceId: {
      kind: "string",
      videoId: "string",
    },
  },
  contentDetails: {
    videoId: "string",
    startAt: "string",
    endAt: "string",
    note: "string",
    videoPublishedAt: "datetime",
  },
  status: {
    privacyStatus: "string",
  },
};
