import { google } from "googleapis";
import { getPlaylistID, getThumbnailID } from "../services/YoutubeServices";

type partOptions = "contentDetails" | "id" | "snippet" | "status";

export interface playlistsGET {
  part: partOptions[];
  channelId?: string;
  id?: string[];
  maxResults: number;
  pageToken?: string;
}

export interface playlists {
  title: string;
  id: string;
  ChannelId: string;
  thumbnailId: string;
  channelTitle: string;
}

const returnPlaylists: playlists[] = [];

export const getPlaylists = async (
  channelID: string,
  token?: string
): Promise<playlists[]> => {
  try {
    if (channelID.length != 24) {
      throw "invalid channelID length";
    }
    const playlists = await google.youtube("v3").playlists.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ["snippet", "status", "id"],
      channelId: channelID,
      maxResults: 50,
      pageToken: token,
    });
    if (!playlists.data.items?.length) {
      throw "channel has no public playlists";
    }
    playlists.data.items?.map((playlist) => {
      returnPlaylists.push({
        title: playlist.snippet?.title!,
        id: playlist.id!,
        ChannelId: playlist.snippet?.channelId!,
        thumbnailId: getThumbnailID(
          playlist.snippet?.thumbnails?.default?.url!
        ),
        channelTitle: playlist.snippet?.channelTitle!,
        // imageID: getThumbnailID(
        //     playlist.snippet?.thumbnails?.default?.url!
        // ),
      });
    });
    if (playlists.data.nextPageToken) {
      getPlaylists(channelID, playlists.data.nextPageToken);
    }
  } catch (err) {
    throw err;
  }
  return returnPlaylists;
};

const playlistsSample = {
  kind: "youtube#playlistListResponse",
  etag: "n-Dre-sD7HcnioR6xFQWjkblcqE",
  pageInfo: {
    totalResults: 5,
    resultsPerPage: 50,
  },
  items: [
    {
      kind: "youtube#playlist",
      etag: "9mvsrZcVSEBspjg6EYLv-k4w7TY",
      id: "PLlHXceGF5B8DmpWJ_MdFXWrjWtIeWdyul",
      snippet: {
        publishedAt: "2020-05-07T01:32:38Z",
        channelId: "UCNYlXBcX43XtXOxzzKmps2w",
        title: "2000's Cover Songs",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/CPxMCPYtuA0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/CPxMCPYtuA0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/CPxMCPYtuA0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/CPxMCPYtuA0/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/CPxMCPYtuA0/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Kent Nishimura",
        localized: {
          title: "2000's Cover Songs",
          description: "",
        },
      },
      status: {
        privacyStatus: "public",
      },
    },
    {
      kind: "youtube#playlist",
      etag: "wLG5RiFQScei3PaXwR0fpxnHK6o",
      id: "PLlHXceGF5B8DtTcFsUd-QHHjKpsJRvyct",
      snippet: {
        publishedAt: "2020-05-07T01:29:21Z",
        channelId: "UCNYlXBcX43XtXOxzzKmps2w",
        title: "1990's Cover Songs",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/r2TS59wfYbI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/r2TS59wfYbI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/r2TS59wfYbI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/r2TS59wfYbI/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/r2TS59wfYbI/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Kent Nishimura",
        localized: {
          title: "1990's Cover Songs",
          description: "",
        },
      },
      status: {
        privacyStatus: "public",
      },
    },
    {
      kind: "youtube#playlist",
      etag: "26qKyCo-PfRgUbAcUpZaWvJJNLc",
      id: "PLlHXceGF5B8APRTP-dQVktNhOprIG4Y83",
      snippet: {
        publishedAt: "2020-05-07T01:20:22Z",
        channelId: "UCNYlXBcX43XtXOxzzKmps2w",
        title: "1960's Songs Cover",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/XdNgSgGX1VQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/XdNgSgGX1VQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/XdNgSgGX1VQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/XdNgSgGX1VQ/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/XdNgSgGX1VQ/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Kent Nishimura",
        localized: {
          title: "1960's Songs Cover",
          description: "",
        },
      },
      status: {
        privacyStatus: "public",
      },
    },
    {
      kind: "youtube#playlist",
      etag: "gPhat0HdEsM-5PfDd1XGhvHiuPY",
      id: "PLlHXceGF5B8AyM4hKhYLfqKoCVIr6uE4s",
      snippet: {
        publishedAt: "2020-05-07T00:51:26Z",
        channelId: "UCNYlXBcX43XtXOxzzKmps2w",
        title: "1970's Cover Songs",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/2LyhweLk5Vc/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/2LyhweLk5Vc/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/2LyhweLk5Vc/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/2LyhweLk5Vc/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/2LyhweLk5Vc/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Kent Nishimura",
        localized: {
          title: "1970's Cover Songs",
          description: "",
        },
      },
      status: {
        privacyStatus: "public",
      },
    },
    {
      kind: "youtube#playlist",
      etag: "qPVkqwTJu3IHjrAnGV0dQ4HJ2d0",
      id: "PLlHXceGF5B8CMFlKeHmOlTuBZdgZ2chyW",
      snippet: {
        publishedAt: "2020-05-07T00:34:12Z",
        channelId: "UCNYlXBcX43XtXOxzzKmps2w",
        title: "1980's Cover Songs",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/MBWrGR5nuTw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/MBWrGR5nuTw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/MBWrGR5nuTw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
          standard: {
            url: "https://i.ytimg.com/vi/MBWrGR5nuTw/sddefault.jpg",
            width: 640,
            height: 480,
          },
          maxres: {
            url: "https://i.ytimg.com/vi/MBWrGR5nuTw/maxresdefault.jpg",
            width: 1280,
            height: 720,
          },
        },
        channelTitle: "Kent Nishimura",
        localized: {
          title: "1980's Cover Songs",
          description: "",
        },
      },
      status: {
        privacyStatus: "public",
      },
    },
  ],
};

const playlists = {
  kind: "youtube#playlist",
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
    defaultLanguage: "string",
    localized: {
      title: "string",
      description: "string",
    },
  },
  status: {
    privacyStatus: "string",
  },
  contentDetails: {
    itemCount: "unsigned integer",
  },
  player: {
    embedHtml: "string",
  },
  localizations: {
    key: {
      title: "string",
      description: "string",
    },
  },
};
