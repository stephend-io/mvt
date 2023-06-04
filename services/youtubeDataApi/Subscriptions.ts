import { google } from "googleapis";

type partOptions = "contentDetails" | "id" | "snippet" | "status";

export interface subscriptionsGET {
  part: partOptions[];
  channelId?: string;
  forChannelId?: string;
  id?: string[];
  maxResults: number;
  pageToken?: string;
}

export interface subscriptions {
  channelId: string;
  title: string;
}

const subscriptionsArray: subscriptions[] = [];

export const getSubscriptions = async (
  channelId: string,
  token?: string
): Promise<subscriptions[]> => {
  const subscriptionsData = await google.youtube("v3").subscriptions.list({
    key: process.env.YOUTUBE_API_KEY,
    part: ["snippet"],
    forChannelId: channelId,
    maxResults: 50,
    pageToken: token,
  });

  subscriptionsData.data.items?.map((channel) => {
    subscriptionsArray.push({
      channelId: channel.snippet?.channelId!,
      title: channel.snippet?.title!,
    });
  });

  if (subscriptionsData.data.nextPageToken) {
    getSubscriptions(channelId, subscriptionsData.data.nextPageToken);
  }
  return subscriptionsArray;
};

const sampleSubscriptionsData = {
  kind: "youtube#SubscriptionListResponse",
  etag: "oqsEye18oQL_PZiIHjPdvWU9GPU",
  nextPageToken: "CDIQAA",
  pageInfo: {
    totalResults: 150,
    resultsPerPage: 50,
  },
  items: [
    {
      kind: "youtube#subscription",
      etag: "1xTdZ9BMlk0ZLcgbxmnqU94Om1M",
      id: "Dml4FX9QTLW8qYgJTXyYjy0izP8F_Yc08XDJSE72yFI",
      snippet: {
        publishedAt: "2023-01-24T03:59:34.739255Z",
        title: "Max McFarlin",
        description:
          "Food obsessed traveler looking to connect with people and learn about different ways of life all through our shared love of food!\n\nLets connect:\n\nhttps://maxmcfarlin.com\nInstagram: @maxmcfarlin",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC-8WbaljnjGV9F8m-ZauShw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/KWz7k1EjZFijlZArI4c8AbUTYmNjnLpS1m3tSGYVrl9YsfOiwtl4heJEfQTHtzuDEUvbOnv04w=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/KWz7k1EjZFijlZArI4c8AbUTYmNjnLpS1m3tSGYVrl9YsfOiwtl4heJEfQTHtzuDEUvbOnv04w=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/KWz7k1EjZFijlZArI4c8AbUTYmNjnLpS1m3tSGYVrl9YsfOiwtl4heJEfQTHtzuDEUvbOnv04w=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 325,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "MsR-n3i2BxsG5iBkNlUfmLi4lqE",
      id: "Dml4FX9QTLWGLlPbkgt5L2V99Ll2wkmc02zZXsdUtas",
      snippet: {
        publishedAt: "2022-12-05T16:12:35.454891Z",
        title: "CHEF'S LABO 自宅で出来るプロの味",
        description:
          "HI!! My name is Taku!!\nA Japanese chef lives in Australia\n\nChef's Labo (laboratory. I know it's usually written as \"lab\". It's just my thing) is focusing to show you how to cook like a pro at home.\n\nThere are many tips about reasons are shown in the videos for you to become a better cook!!\n\nSo Learn together with me at CHEF'S LABO!!\n\n\n[CHEF'S LABO MUSEUM / Membership]\n\nYou can see my first videos!\nThe videos are in the PLAYLIST tab.\nSo you can watch from there!\n\nEach video has the Side story in the description.\nSo you can see lot more about me!\n\nBut, The side story is open for public!!\nIt's FREE!!\n\nSo you don't have to join the membership if you are only interested in the Side story.\n\nSo have a look!! And then, \nif you feel happy to donate for this channel,\nor got a feeling to buy me a coffee or lunch,\n\nPlease [JOIN] the membership!\nThe videos are my appreciation for it!!\n\n*You can join and leave anytime!!\nNo need to join forever!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC-BoD8Gx4gsPdmUv4NlA8Jw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/foTeVIdLS-jV65ehZztzCwCjTYbwoL_UUQab03Y2F1x3tsDWWwKGVNK9aYuAN9mZ1xhuRMcetJ8=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/foTeVIdLS-jV65ehZztzCwCjTYbwoL_UUQab03Y2F1x3tsDWWwKGVNK9aYuAN9mZ1xhuRMcetJ8=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/foTeVIdLS-jV65ehZztzCwCjTYbwoL_UUQab03Y2F1x3tsDWWwKGVNK9aYuAN9mZ1xhuRMcetJ8=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 88,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "HutsGCVVLEtWWx4-_JmvVOAIxlo",
      id: "Dml4FX9QTLWGLlPbkgt5LxcA-kZi7nuQpDquScuIonE",
      snippet: {
        publishedAt: "2022-12-05T15:59:22.589087Z",
        title: "Solo Travel Japan",
        description:
          "Solo Travel Japan is all about traveling in Japan. I would like to share unique experiences such as traveling by overnight capsule hotel ferry, First Class overnight ferry, etc.\n\nI don’t speak in my videos. I’ll be happy if you feel like you’re the one who’s traveling.\n\nIt’s currently a difficult time for travel lovers, but I believe you will have a great time in Japan when everything gets back normal. Until then, please enjoy my videos!\n\nThanks for watching!\nSTJ",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC-CWBoT-r7VijIr8YZTtzxA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/Wiae-RUD__56zcehfaIEPvO-hecPFk-DJ_3LjTMMrSvkJv5xSLo94qbxNNVPRi4IZ_yjBr4ELg=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/Wiae-RUD__56zcehfaIEPvO-hecPFk-DJ_3LjTMMrSvkJv5xSLo94qbxNNVPRi4IZ_yjBr4ELg=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/Wiae-RUD__56zcehfaIEPvO-hecPFk-DJ_3LjTMMrSvkJv5xSLo94qbxNNVPRi4IZ_yjBr4ELg=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 103,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "8Oh8f82d9s3VzWZYt92RI4CGLfo",
      id: "Dml4FX9QTLXjEmp5aazo-EiOgWOVTHeB_KuLhnDReMI",
      snippet: {
        publishedAt: "2022-12-14T19:05:45.061378Z",
        title: "はいじぃ迷作劇場",
        description: "Introducing Japanese restaurants every day.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC-km1012mEUQQLGxggmrazw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/UmqDMOzC4u2FWAfgyy6kdLSpCjDY5PAmAoymAc2AlAH_4LU3UibVIF2oy97AUK5k71Rixj2eVw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/UmqDMOzC4u2FWAfgyy6kdLSpCjDY5PAmAoymAc2AlAH_4LU3UibVIF2oy97AUK5k71Rixj2eVw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/UmqDMOzC4u2FWAfgyy6kdLSpCjDY5PAmAoymAc2AlAH_4LU3UibVIF2oy97AUK5k71Rixj2eVw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 4120,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "QqyQWiIbxkUVDKfyG_pZNmiwPK0",
      id: "Dml4FX9QTLUJII_iq50wh9LnuG__C5uIYX8eXyJXUGQ",
      snippet: {
        publishedAt: "2022-12-05T15:57:16.180236Z",
        title: "Ramen Culture",
        description:
          "Ramen Culture is dedicated to spreading knowledge and love for good ramen, good food, good people and good stories. We bring videos about cooking recipes, techniques, tools, and stories about people in the food & beverage industry.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC09itcRkU6jdiDfeZKCUs2w",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMr-mvkn4clGwTNQmoYd_vnziRoC--6rtCCC5PjGA=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMr-mvkn4clGwTNQmoYd_vnziRoC--6rtCCC5PjGA=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMr-mvkn4clGwTNQmoYd_vnziRoC--6rtCCC5PjGA=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 11,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "xjTwCy2XMVGz5aIJCNqGaaGRLs8",
      id: "Dml4FX9QTLWGLlPbkgt5L0lxsedM5XKe4Fe7buK0_Do",
      snippet: {
        publishedAt: "2022-12-05T15:53:48.227673Z",
        title: "Mac Address",
        description:
          "The exploration of all things Apple, from iPhones underwater to full iClouds in the sky. We want to be the channel that you come to first for an unexpected viewpoint about the devices you love.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC0KfjyvabuE2J-RBC6ko2Lw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNyhLA9lFBSsAKgn1Tt0T6c3h3NQDb1MOvszhDs=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNyhLA9lFBSsAKgn1Tt0T6c3h3NQDb1MOvszhDs=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNyhLA9lFBSsAKgn1Tt0T6c3h3NQDb1MOvszhDs=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 81,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "NfKiNvrmA1Qv2hVAj0IEyx2e29E",
      id: "Dml4FX9QTLXjEmp5aazo-HuHyUwrs3g1cpbgZpyw3xU",
      snippet: {
        publishedAt: "2022-12-05T16:00:39.466262Z",
        title: "Techquickie",
        description:
          "Ever wanted to learn more about your favorite gadgets or trending topic in tech? With a mix of humor, cynicism, and insight, Techquickie brings you the answers to all your tech questions every Tuesday and Friday.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC0vBXGSyV14uvJ4hECDOl0Q",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/iN4UMsDqwvkFLnLYlLLA4fR-TT1bLRRHcLRKArl25XBxAT4zLItxShuE1UGS76g2tvP5rqC7kQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/iN4UMsDqwvkFLnLYlLLA4fR-TT1bLRRHcLRKArl25XBxAT4zLItxShuE1UGS76g2tvP5rqC7kQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/iN4UMsDqwvkFLnLYlLLA4fR-TT1bLRRHcLRKArl25XBxAT4zLItxShuE1UGS76g2tvP5rqC7kQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 1121,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "iSIf_j36lQiFgIMfDGVmf-RDLR8",
      id: "Dml4FX9QTLUJII_iq50wh7K11BZDu9FxxpFIttiLacQ",
      snippet: {
        publishedAt: "2023-01-27T04:47:43.22273Z",
        title: "ThatDudeCanCook",
        description:
          "I don't want to teach you a recipe, I want to teach you how to cook and hopefully get a few chuckles along the way. My name is Sonny Hurrell and on this channel, I share everything I've learned over my 20 years of worldwide professional cooking experience.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC19OYOBqkgVqgTIQxbsPdlw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN35IMLSFKmkYU2JThat9TT7r0XmZn0BfNDIny88g=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN35IMLSFKmkYU2JThat9TT7r0XmZn0BfNDIny88g=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN35IMLSFKmkYU2JThat9TT7r0XmZn0BfNDIny88g=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 453,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "scSdjDeB2U5I9ET78roPSeMjCos",
      id: "Dml4FX9QTLWGLlPbkgt5Lzv9MBfbpbu45ubNvZ7hLoI",
      snippet: {
        publishedAt: "2022-12-14T19:12:26.73719Z",
        title: "武島たけしの極み飯 / Kiwami-Meshi",
        description:
          'It looks scary, but the contents are ordinary men who like cooking.\n\nI have experience in cooking in Japanese, Western and Chinese.\n\nOn Youtube, we make "delicious and interesting" dishes that we encountered in manga and books.\n\nThe dog that appears occasionally is called monja.\n\n[Instagram]\nhttps://www.instagram.com/kiwamimeshi\n\n[Twitter]\nhttps://twitter.com/kiwamimeshi\n\nMonja (dog) channel\nhttps://www.youtube.com/c/monja-diary\n\n\nFor inquiries, please email us at the following.\nkiwamimeshi@gmail.com',
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC1NciQ9_T2vwtI1oWuQSM-g",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/1zakiyzmSgXIgHNTUNvJQ1Y56EapKNi4XxjyNmoNRewdwdvPL-ZnYEJ69AlUdsUPUmro6pTtiQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/1zakiyzmSgXIgHNTUNvJQ1Y56EapKNi4XxjyNmoNRewdwdvPL-ZnYEJ69AlUdsUPUmro6pTtiQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/1zakiyzmSgXIgHNTUNvJQ1Y56EapKNi4XxjyNmoNRewdwdvPL-ZnYEJ69AlUdsUPUmro6pTtiQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 76,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "lHEyzxRvS44cn6a42UexBXXPdn0",
      id: "Dml4FX9QTLW8qYgJTXyYj74ZedWkvxKp5AQ4xKQXmhg",
      snippet: {
        publishedAt: "2022-12-05T16:08:52.950795Z",
        title: "Tokyo Creative",
        description:
          "Hey there! We're your go-to channel for everything JAPAN related 🇯🇵 🍜\n\nOur goal is to connect Japan with the world and make awesome content about Japanese food, travel, culture and life here!\n\nTokyo Creative is a media company based in the heart of Japan. We are proud to work closely with some of Japan's top international creators on countless projects, ranging from fun videos to government jobs promoting unique local areas across the entire country.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC1TmvgkTb_5jzKcvx6Pt0Dw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNT2zeLQtdHutPQBv5xi2sWg5SnqxaVnQtWLfeg=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNT2zeLQtdHutPQBv5xi2sWg5SnqxaVnQtWLfeg=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNT2zeLQtdHutPQBv5xi2sWg5SnqxaVnQtWLfeg=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 301,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "F70N_KPe8EO6Fhj0R2jNfSfLzaM",
      id: "Dml4FX9QTLW8qYgJTXyYj-C4APF_dYg93z02Nluf2EM",
      snippet: {
        publishedAt: "2022-12-05T16:00:49.233018Z",
        title: "The Action Lab",
        description:
          "The Action Lab is a channel dedicated to performing exciting experiments and answering questions you never thought to ask! I'll put things in my hydraulic press, vacuum chamber and perform countless other experiments just to watch cool phenomenon. I experiment on the world and objects around me. You'll be so amazed that you'll forget you are even learning anything! Please enjoy as I continually answer the \"what would happen if...\" questions you have. Feel free to comment with any scientific questions you have about anything. I have made my career as a PhD in Chemical Engineer and now I want to share how awesome science and experimentation can be! \n\nVisit my Facebook Page:\nhttps://www.facebook.com/TheActionLabOfficial",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC1VLQPn9cYSqx8plbk9RxxQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPhrP71VsJpExMr0K97KIAXkf1NpayEm1z0yLw_KQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPhrP71VsJpExMr0K97KIAXkf1NpayEm1z0yLw_KQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPhrP71VsJpExMr0K97KIAXkf1NpayEm1z0yLw_KQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 816,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "K4m9AGsz6yf4Ya1w6ekVk-h-44I",
      id: "Dml4FX9QTLUJII_iq50wh0d8aTW0Y4-XbBiU74iEo4c",
      snippet: {
        publishedAt: "2022-12-05T16:16:47.969366Z",
        title: "I Will Always Travel for Food",
        description:
          "Based in Tokyo Japan, there is so much good food so it's a waste not to share it with the world. However I will always travel for food so you can expect food from around the world! Subscribe and tag along with me on my food adventures.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC1ks-XGF-UtCndVCU3Yw85A",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMx3KqhsflSkyyzwnvW03ZRBkFjODCbN7MXfWgJ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMx3KqhsflSkyyzwnvW03ZRBkFjODCbN7MXfWgJ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMx3KqhsflSkyyzwnvW03ZRBkFjODCbN7MXfWgJ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 188,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "_bDp712jYGyWqRT-IPi1Yb9jcIU",
      id: "Dml4FX9QTLUJII_iq50wh0wLhP9m73ITMUehPAUXjQ4",
      snippet: {
        publishedAt: "2022-12-05T15:55:47.256336Z",
        title: "NYT Cooking",
        description:
          "All the food that’s fit to eat (yes, it’s an official New York Times production).",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC1rIOwTqDuWkFj87HZYRFOg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPJvFYeTdtzO3dC7AiuGGY2ZlkyrLDPA1kSKpEDAA=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPJvFYeTdtzO3dC7AiuGGY2ZlkyrLDPA1kSKpEDAA=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPJvFYeTdtzO3dC7AiuGGY2ZlkyrLDPA1kSKpEDAA=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 279,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "djiUWacp6NUAQI6JXo-I2ypbq4s",
      id: "Dml4FX9QTLXjEmp5aazo-K2zdgXLQZN3_faOxbh9D14",
      snippet: {
        publishedAt: "2023-01-07T03:54:35.508495Z",
        title: "Geodiode",
        description:
          "Exploring our planet's climate zones, biomes and nation states with beautiful high quality documentaries.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC1raaXFgsFBSFR8qNgchF2g",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMtC7n9KZY_tCy2Vy8H0XM9Al2kgSfp2RDXVTfD=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMtC7n9KZY_tCy2Vy8H0XM9Al2kgSfp2RDXVTfD=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMtC7n9KZY_tCy2Vy8H0XM9Al2kgSfp2RDXVTfD=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 59,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "X5MHNs7q8gF_AGN0OwDnjUYRuWg",
      id: "Dml4FX9QTLXjEmp5aazo-AxsxPst4pxM09ac4gqt4eU",
      snippet: {
        publishedAt: "2023-05-04T12:40:00.839844Z",
        title: "Traversy Media",
        description:
          "Traversy Media features the best online web development and programming tutorials for all of the latest web technologies from the building blocks of HTML, CSS & JavaScript to frontend frameworks like React and Vue to backend technologies like Node.js, Python and PHP",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC29ju8bIPH5as8OGnQzwJyA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNmm74Oc3eOE8_mXJlNFDEnFnTczyOPI5cByniTfA=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNmm74Oc3eOE8_mXJlNFDEnFnTczyOPI5cByniTfA=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNmm74Oc3eOE8_mXJlNFDEnFnTczyOPI5cByniTfA=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 948,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "dtmZIuNhwes5X0r1fN05IzODC3o",
      id: "Dml4FX9QTLXjEmp5aazo-HIF4EHmdhmySKiCZ5GQw5o",
      snippet: {
        publishedAt: "2022-12-05T16:12:20.880091Z",
        title: "CGP Grey",
        description: "",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC2C_jShtL725hvbm1arSV9w",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPk25R4HPrwJDSnTh9DXCAZsuV9i3KlX0ZZT2DuoQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPk25R4HPrwJDSnTh9DXCAZsuV9i3KlX0ZZT2DuoQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPk25R4HPrwJDSnTh9DXCAZsuV9i3KlX0ZZT2DuoQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 178,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "EqBgbNoxgg2khhhdUfkXXY8xQLY",
      id: "Dml4FX9QTLWGLlPbkgt5LwVsL1_TzLm-Cjlq_yMHTV0",
      snippet: {
        publishedAt: "2023-04-11T14:58:54.754785Z",
        title: "Mental Checkpoint",
        description:
          "A deep dive into game design topics with a sprinkle of personal experience",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC2wNnyb3vWhOt0K6LpBrtGg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/HWv8i3Lizhu2_vTT9Z98cR5EAAXP4jskLLYhSTCCvgn-6QYE_CwJ7pPqd7a-JGCfctGa7Lmvtfc=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/HWv8i3Lizhu2_vTT9Z98cR5EAAXP4jskLLYhSTCCvgn-6QYE_CwJ7pPqd7a-JGCfctGa7Lmvtfc=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/HWv8i3Lizhu2_vTT9Z98cR5EAAXP4jskLLYhSTCCvgn-6QYE_CwJ7pPqd7a-JGCfctGa7Lmvtfc=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 24,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "h1h0FSrnmO6O-oFLCHaSUN_XTWc",
      id: "Dml4FX9QTLXjEmp5aazo-OUGp3hIWUfsV4uQQapLAJ8",
      snippet: {
        publishedAt: "2022-12-05T16:17:07.343531Z",
        title: "Josh Turner Guitar",
        description:
          "Welcome to the official Josh Turner Guitar YouTube channel! Josh Turner Guitar is a multi-instrumentalist (acoustic guitar and electric guitar), singer, songwriter, and producer based in Brooklyn, New York. Joshua Lee Turner is best known for his YouTube channel Josh Turner Guitar, where he posts eclectic cover songs and original music since he started the channel in 2007 at age 15. His guitar covers range from rock, R&B, bluegrass, folk, jazz, classical, pop, indie, blues, etc. Josh now tours internationally in support of his own original music, as well as with long-time collaborator Carson McKee, as the folk duo The Other Favorites. In 2020, Josh released Public Life, his second full-length album of original music. Make sure to subscribe and enable all post notifications. For instant updates, check out Josh Turner Guitar’s social media accounts below.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC3Wj9aO8VS5ZuXrtWfJf81w",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqND0aJffoocgW_o7CrsTWx7REwbBZCI9HoKG5EG=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqND0aJffoocgW_o7CrsTWx7REwbBZCI9HoKG5EG=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqND0aJffoocgW_o7CrsTWx7REwbBZCI9HoKG5EG=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 472,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "_lZtv6YxFmLoBoaH8HT2HPRXMIQ",
      id: "Dml4FX9QTLWGLlPbkgt5L_Ue3DanRNieiMG-LvuuEwU",
      snippet: {
        publishedAt: "2022-12-14T19:09:15.931868Z",
        title: "Koh Kentetsu Kitchen【料理研究家コウケンテツ公式チャンネル】",
        description:
          'コウケンテツと申します。 \n大阪府出身、お料理のお仕事しております。\n日本・アジア・ヨーロッパ各地でいろんなもの食べさせてもらったりもしております。\n一男二女の父もさせてもらっております。 \n\nぬるっとゆるっとYoutubeやっていきますー！\n料理や企画のリクエストも受け付けておりますので、コメントお待ちしております！\nぜひチャンネル登録をお願いします！\nーーーーーーーーーーーーーーーーー\nWelcome to "Koh Kentetsu Kitchen"　I\'m a Culinary specialist from Japan.\nPlease enjoy my original food recipes!!!\n◆Instagram\n　https://www.instagram.com/kohkentetsu/ \n◆Twitter\n　https://twitter.com/kohkentetsu14 \n◆Facebook\n　https://www.facebook.com/kohkentetsuofficial/\n◆Contact\n　info@kohkentetsu.com\n◆Directed by\n　Kazuya Eto（kaz.eto）',
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC3p5OTQsMEnmZktWUkw_Y0A",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqONyvspdJMI3Q0A4ZmH0URSYaJ7-JXzG0EsZsNH=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqONyvspdJMI3Q0A4ZmH0URSYaJ7-JXzG0EsZsNH=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqONyvspdJMI3Q0A4ZmH0URSYaJ7-JXzG0EsZsNH=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 429,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "8-1DYaQ45deYwH3DXK1jLoM9CtU",
      id: "Dml4FX9QTLXjEmp5aazo-NulV06BrZQsImEfQewefHM",
      snippet: {
        publishedAt: "2022-12-05T16:16:34.008348Z",
        title: "Good Mythical Morning",
        description:
          "Tune in every Monday-Friday to watch us eat truly unbelievable things, explore surprising new products and trends, compete in original games with celebrity guests, implement serious experiments in hilarious ways, and more.\n\nPick up official GMM and Mythical merch at https://mythical.com\nand https://www.amazon.com/mythical\n\nCheck out Sporked, Mythical's new website dedicated to helping you find the best food on the shelves! - http://www.sporked.com\n\nJoin the Mythical Society: https://www.mythicalsociety.com/\n\nFollow Mythical: \nTikTok: https://TikTok.com/@mythical\nInstagram: https://instagram.com/mythical\nFacebook: https://facebook.com/mythical\nTwitter: https://twitter.com/mythical\nWebsite: https://mythical.com",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC4PooiX37Pld1T8J5SYT-SQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/GxyRPMnHaVK3mWB11flbt_Pc3vFBqdjcY7_Su7vGwJGBnAoTT4fixcEnOJ3wGPd3T4GpVs76QDQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/GxyRPMnHaVK3mWB11flbt_Pc3vFBqdjcY7_Su7vGwJGBnAoTT4fixcEnOJ3wGPd3T4GpVs76QDQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/GxyRPMnHaVK3mWB11flbt_Pc3vFBqdjcY7_Su7vGwJGBnAoTT4fixcEnOJ3wGPd3T4GpVs76QDQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 3256,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "10NX2NW5PRr-poRAfGUo79XUH-c",
      id: "Dml4FX9QTLXjEmp5aazo-K5-7GNZ9ZbDgeHNGB3-y30",
      snippet: {
        publishedAt: "2022-12-05T16:07:26.679227Z",
        title: "Eye Opener",
        description: "Let's Learn Japanese.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC4gRun3y7GRVmc_zEVEXZIQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNIvmjh2TJHVWolj7wCrYVOOM9BUuulbXCM9yqCxQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNIvmjh2TJHVWolj7wCrYVOOM9BUuulbXCM9yqCxQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNIvmjh2TJHVWolj7wCrYVOOM9BUuulbXCM9yqCxQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 171,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "wWWCSuG0OEeTuaqUg4ay3jdjzvM",
      id: "Dml4FX9QTLW8qYgJTXyYj-olCAeWBZJt9kiIQ0syQ30",
      snippet: {
        publishedAt: "2022-12-05T16:12:38.00554Z",
        title: "Chinese Cooking Demystified",
        description:
          "Learn how to cook real deal, authentic Chinese food!  We post recipes every weekend (unless we happen to be travelling) :)\n\nWe're Steph and Chris - a food-obsessed couple that lives in Shenzhen, China.  Steph is from Guangzhou and loves cooking food from throughout China - you'll usually be watching her behind the wok.  Chris is a long-term expat from America that's been living in China and loving it for the last 12 years - you'll be listening to his explanations and recipe details.\n\nThis channel is all about learning how to cook the same taste that you'd get in China. Our goal for each video is to give you a recipe that would at least get you close to what's made by some of our favorite restaurants here.  Because of that, our recipes are no-holds-barred Chinese when it comes to style and ingredients - but feel free to ask for tips about adaptations and sourcing too!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC54SLBnD5k5U3Q6N__UjbAw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNNgWRvVuV6azKEKbpmJH4Uqs7Xf-6_3f-3tLO2jA=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNNgWRvVuV6azKEKbpmJH4Uqs7Xf-6_3f-3tLO2jA=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNNgWRvVuV6azKEKbpmJH4Uqs7Xf-6_3f-3tLO2jA=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 264,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "PAkMddfHAoIiB4EWuRNmc6Mwna0",
      id: "Dml4FX9QTLXjEmp5aazo-COtftN98ZBvTBYopwZgTwQ",
      snippet: {
        publishedAt: "2023-02-24T13:36:50.246301Z",
        title: "Soup Emporium",
        description:
          '"The Internet is, like, a pipe full of Soup" - Sarah Marshall\n“I’m not right, but I\'m not THAT wrong” - Hank Green',
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC60sV1b2e_EQRDnueRxgiIQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/pUrQBMo11KzPsxt0in6WvZ1PUB5hGIapid5QQlWGyE7BL9N8LnoBEjGWp3ILj6Do2dkOFRyWK-o=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/pUrQBMo11KzPsxt0in6WvZ1PUB5hGIapid5QQlWGyE7BL9N8LnoBEjGWp3ILj6Do2dkOFRyWK-o=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/pUrQBMo11KzPsxt0in6WvZ1PUB5hGIapid5QQlWGyE7BL9N8LnoBEjGWp3ILj6Do2dkOFRyWK-o=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 7,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "uQPePfTtog8vCTbDtY35fkz-JyI",
      id: "Dml4FX9QTLXjEmp5aazo-EODtrttQWvYZMSXX2Vw36M",
      snippet: {
        publishedAt: "2022-12-05T15:58:19.209969Z",
        title: "SmarterEveryDay",
        description:
          "I explore the world using science.  That's pretty much all there is to it.  Watch 2 videos. If you learn something AWESOME, please subscribe if you feel like I earned it.\n\nContact: http://www.smartereveryday.com/contact.  I currently get lots of correspondence so please forgive me if I'm unable to reply.  I mean well, but want to focus on being a better Dad.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC6107grRI4m0o2-emgoDnAA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNrQZTd2DCaYqEJKRUZMOzM4HJuq-MZwY9724tA4w=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNrQZTd2DCaYqEJKRUZMOzM4HJuq-MZwY9724tA4w=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNrQZTd2DCaYqEJKRUZMOzM4HJuq-MZwY9724tA4w=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 366,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "AIZwoHyB43v6kpUe_02BddMzT5c",
      id: "Dml4FX9QTLXjEmp5aazo-KgEHcqolfViZKr5Sh_T27M",
      snippet: {
        publishedAt: "2022-12-05T16:08:46.736625Z",
        title: "Today I Found Out",
        description:
          "Brand new videos 7 days a week from TodayIFoundOut.com!  Subscribe and start learning something new and interesting every day. :-)",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC64UiPJwM_e9AqAd7RiD7JA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOeiaiFe1fmbfafTXgPtXGBuiVnrlDVdjVnNTx1fw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOeiaiFe1fmbfafTXgPtXGBuiVnrlDVdjVnNTx1fw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOeiaiFe1fmbfafTXgPtXGBuiVnrlDVdjVnNTx1fw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 2083,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "obJqzuIdkWBgAb1jof2qScSs5rI",
      id: "Dml4FX9QTLXjEmp5aazo-JwFVVPFG6PWCESfaFBbOoU",
      snippet: {
        publishedAt: "2022-12-14T19:09:31.876091Z",
        title: "TabiEats",
        description:
          "Sharing our passion for food and travel with the world is what we love to do. Every week, we take you on a foodcentric journey through Japan and sometimes other parts of the world!\n\nPlease support us by visiting our Patreon page. \nhttps://www.patreon.com/tabieats\n++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n***New videos every week! Don't forget to push that notification bell so you don't miss any of our videos.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC6Je3-ZV_x38NqQAxKiCCyQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPJpDpL-bIxURvLhp9ojoM0NnW-O2NZCHDBxo-z=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPJpDpL-bIxURvLhp9ojoM0NnW-O2NZCHDBxo-z=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPJpDpL-bIxURvLhp9ojoM0NnW-O2NZCHDBxo-z=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 1531,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "8Ycy0CUpniJ16Ds1yIpCmN9pVug",
      id: "Dml4FX9QTLWGLlPbkgt5L5e6Lm_r9EE-MqlhqRVa3j8",
      snippet: {
        publishedAt: "2023-02-25T20:16:12.452114Z",
        title: "lamont archive",
        description: "archiving erobb221 and Brittt (kato_kat)",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC6QBgSmwXE5P-ZhlFlGYOqQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/y_BwucCaJ-6gCKRDBBhPyDg7V-xX-wmVnFVkqXqtuyjrJxkbo4QzNRyAYZWEXugQzu2B49M0uw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/y_BwucCaJ-6gCKRDBBhPyDg7V-xX-wmVnFVkqXqtuyjrJxkbo4QzNRyAYZWEXugQzu2B49M0uw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/y_BwucCaJ-6gCKRDBBhPyDg7V-xX-wmVnFVkqXqtuyjrJxkbo4QzNRyAYZWEXugQzu2B49M0uw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 1096,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "4_A3zUj3ue9kz0Jj5rFtb_cK0Kk",
      id: "Dml4FX9QTLXjEmp5aazo-B1wuF3PqRQvGCAQnK-srxo",
      snippet: {
        publishedAt: "2022-12-05T15:57:44.684518Z",
        title: "Serious Eats",
        description:
          "Serious Eats is a website focused on celebrating and sharing food enthusiasm through blogs and online community. Our unique combination of community and content brings together the distinctive voices of food bloggers, compelling original and acquired food video, and spirited, inclusive, conversations about all things food- and drink-related.\n\nSerious Eats: Videos brings you original how-tos, recipes, behind the scenes videos, and more.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC6S5a3MQtr_PSWZxysXkOCg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOItTwtMkbvZySuZp2LKm1OTh-eYahq28RsYGfO=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOItTwtMkbvZySuZp2LKm1OTh-eYahq28RsYGfO=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOItTwtMkbvZySuZp2LKm1OTh-eYahq28RsYGfO=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 450,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "kPOmQ01xUaCvATC7OAuIycdND_I",
      id: "Dml4FX9QTLXjEmp5aazo-EAQc3p7VEdWW52ykVKkgWU",
      snippet: {
        publishedAt: "2022-12-05T16:09:29.87819Z",
        title: "Vsauce",
        description:
          "Our World is Amazing. \n\nQuestions? Ideas? Tweet me: http://www.twitter.com/tweetsauce\n\nVsauce was created by Michael Stevens in the summer of 2010.\n\nVsauce is...\n\nMichael Stevens: Producer/Host of Vsauce1\nKevin Lieber: Producer/Host of Vsauce2\nJake Roper: Producer/Host of Vsauce3\nEric Langlay: VFX for Vsauce1/2/3\nYou: Thanks for watching!!!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC6nSFpj9HTCZ5t-N3Rm3-HA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNx1IvwpJ-9sFULjVZHecThPUxDKUCgeRVm5vhMtw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNx1IvwpJ-9sFULjVZHecThPUxDKUCgeRVm5vhMtw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNx1IvwpJ-9sFULjVZHecThPUxDKUCgeRVm5vhMtw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 442,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "gmRbKbGukUen0-TefUkrYCCBPHw",
      id: "Dml4FX9QTLXjEmp5aazo-DPcjh4x4VY3oDDjuHkAp_g",
      snippet: {
        publishedAt: "2023-03-22T22:37:43.336666Z",
        title: "Jack Herrington",
        description:
          "Frontend videos from basic to very advanced; tutorials, technology deep dives. You'll love it!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC6vRUjYqDuoUsYsku86Lrsw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPgojODHYSwlbvdaIQ7QwmUVnx1OfyPPSFDtFFOUg=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPgojODHYSwlbvdaIQ7QwmUVnx1OfyPPSFDtFFOUg=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPgojODHYSwlbvdaIQ7QwmUVnx1OfyPPSFDtFFOUg=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 357,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "PspRFWDW90yVRS2FwYYt-1uzuH0",
      id: "Dml4FX9QTLW8qYgJTXyYj45janH-MOU_mefg8RpvFLg",
      snippet: {
        publishedAt: "2023-02-21T19:15:58.275685Z",
        title: "Sean Devine",
        description: "Happy Practicing!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC85Uo0AWyzrYyDu526Hq6ug",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNC0HDIdq9xxvLRx5Xa-w7HyzQfxQPiwS2Zh7bJgw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNC0HDIdq9xxvLRx5Xa-w7HyzQfxQPiwS2Zh7bJgw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNC0HDIdq9xxvLRx5Xa-w7HyzQfxQPiwS2Zh7bJgw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 183,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "T-tJoJ_uz2ewxxmNNA_ClP0W4io",
      id: "Dml4FX9QTLW8qYgJTXyYj8P4aYk7iOzImBJlo32PRsU",
      snippet: {
        publishedAt: "2022-12-05T16:15:49.917655Z",
        title: "Erobb221",
        description: "Yello",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC8rDfqkcikgjKNsBMY8TOkw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOvwGCMde2OfYuneLYwU_7Fs5VziGxojkwrs0f8LQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOvwGCMde2OfYuneLYwU_7Fs5VziGxojkwrs0f8LQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOvwGCMde2OfYuneLYwU_7Fs5VziGxojkwrs0f8LQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 322,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "G8WEjcqVRiTVJHZER7N5jOjT4Hc",
      id: "Dml4FX9QTLXjEmp5aazo-BdiHKcvVLm4v90Hg2pOBW4",
      snippet: {
        publishedAt: "2022-12-05T16:13:10.445985Z",
        title: "Computerphile",
        description:
          "Videos all about computers and computer stuff. Sister channel of Numberphile.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC9-y-6csu5WGm29I7JiwpnA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN8YG6ACSnlzJYYrIIsiyDUmh9M9Wf4PNSOoc4wQw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN8YG6ACSnlzJYYrIIsiyDUmh9M9Wf4PNSOoc4wQw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN8YG6ACSnlzJYYrIIsiyDUmh9M9Wf4PNSOoc4wQw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 775,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "y1LFsUjBFm3gYAQswkYrSBaN-2Y",
      id: "Dml4FX9QTLX9OqrzIKB2VktGStdev4GYUUtFno3yKxA",
      snippet: {
        publishedAt: "2023-01-18T15:21:18.578577Z",
        title: "Sports Explained",
        description: "Sports Explainers.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UC9dPWTGc09DgEPInEKE_WKg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/TPRtIVGeJH619Ztn-ll9r-Hv_Zfz2BxAwWWnyo2wdH436DKhgOIVoCGm3wfiJtAq2_sZUwEOWw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/TPRtIVGeJH619Ztn-ll9r-Hv_Zfz2BxAwWWnyo2wdH436DKhgOIVoCGm3wfiJtAq2_sZUwEOWw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/TPRtIVGeJH619Ztn-ll9r-Hv_Zfz2BxAwWWnyo2wdH436DKhgOIVoCGm3wfiJtAq2_sZUwEOWw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 15,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "HVmVnttpOidxPJ7rEDbTpml1Ho8",
      id: "Dml4FX9QTLW8qYgJTXyYjwzwEorx0RFoHd2hzGyjVpM",
      snippet: {
        publishedAt: "2022-12-05T16:11:10.784729Z",
        title: "ラーメンろたす",
        description:
          "It is a ramen shop running in Japan.\nHow to make ramen is open to the public\nThe business scenery of the people who work at the ramen shop and the secrets of the preparation are disclosed.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCAVmlHjp-0ARZ7JwJOcWvpQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/WfvLXPcVCqyNIZh5EmA2D_b7yHg5q0nchzqxsm74-i6dGP3rydHN7LRwlOeMqOI3FEhCo3Xd=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/WfvLXPcVCqyNIZh5EmA2D_b7yHg5q0nchzqxsm74-i6dGP3rydHN7LRwlOeMqOI3FEhCo3Xd=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/WfvLXPcVCqyNIZh5EmA2D_b7yHg5q0nchzqxsm74-i6dGP3rydHN7LRwlOeMqOI3FEhCo3Xd=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 130,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "2OpIDWqmf4qyQnGH-o0HQBQeE_U",
      id: "Dml4FX9QTLXjEmp5aazo-Dncpl-B002psSbD2mBuI_A",
      snippet: {
        publishedAt: "2022-12-05T15:57:08.649747Z",
        title: "Rambalac",
        description:
          "Just my personal videos filmed generally in Japan.\nFor any business and usage requests use email.\nFor video and live stream discussions https://discord.gg/cbTsSZM\nIf you want to support traveling and equipment personally you can use \nKo-Fi https://ko-fi.com/rambalac\nPatreon https://www.patreon.com/rambalac\n\nI don't use Instagram or Facebook. Anything there has no relation to me.\n\nMy current cameras are Lumix GH6 with 8-18 lens and Sony FX3 with Sony PZ 1635 F4 lens.\nBefore March 2021 videos were filmed with Lumix GH5 generally with 8-18 f2.8-4.\nBefore May 2014 I used Lumix GH3. \nBefore December 2012 any video with 1080 was taken with Lumix GH2 (99.9% 14-140 lens). \nVideos without 1080, except where the camera is explicitly mentioned, were taken with Lumix TZ7 or mobile phone.\nFeel free to comment about any mistakes in my English, Russian or Japanese.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCAcsAE1tpLuP3y7UhxUoWpQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/pAFmiN7PHQx4mk0-hJ85AgM0UIo_0q3jmTk-MLaDWyUyIw_AlnkOnhaxXnrIBE7f-QV--thd6jM=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/pAFmiN7PHQx4mk0-hJ85AgM0UIo_0q3jmTk-MLaDWyUyIw_AlnkOnhaxXnrIBE7f-QV--thd6jM=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/pAFmiN7PHQx4mk0-hJ85AgM0UIo_0q3jmTk-MLaDWyUyIw_AlnkOnhaxXnrIBE7f-QV--thd6jM=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 1325,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "OJlVBGCLlXMzynXRS0LoABqaN74",
      id: "Dml4FX9QTLXjEmp5aazo-Hp9Odeh3aIiosO5w8VZjoM",
      snippet: {
        publishedAt: "2022-12-05T16:09:04.223516Z",
        title: "TokyoStreetView - Japan The Beautiful",
        description:
          "TokyoStreetView comes from this huge passion that some of us have for Japan in order to offer people around the world the chance to enjoy a bias-free experience of Japan.\n\nFor any questions, Inquiries or just want to acquire some of our footage/videos, please do not hesitate to contact us here https://www.tokyostreetview.com/contact-us/.\n\nAnyone is free to embed our videos for personal use only by using YouTube embedded code. In many cases, it is prohibited to re-use/download our videos in any way including but not limited to re-uploaded and/or host/broadcast them elsewhere and/or modify them or for commercial usage.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCAxMEpfzdJ2dkrplSWehgcA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPWMO7_lJV0iVSMufoRwUh7jjVDVyfa-ieLavCvrg=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPWMO7_lJV0iVSMufoRwUh7jjVDVyfa-ieLavCvrg=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPWMO7_lJV0iVSMufoRwUh7jjVDVyfa-ieLavCvrg=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 679,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "nk1fk8BUuZZWw47wgocrNrNTvtA",
      id: "Dml4FX9QTLXjEmp5aazo-OHXxQ08wMvDd3aUaF9MqvU",
      snippet: {
        publishedAt: "2022-12-05T16:16:12.930352Z",
        title: "Flexible Dieting Lifestyle",
        description:
          "Zach Rocheleau is an expert at generating macro friendly recipes that taste great and help you hit your goals. An expert in the nutrition and fitness world, Zach has helped thousands of people lose weight, gain muscle, and prep for fitness and body building competitions all over the world. Learn how to eat the foods you love and enjoy it, instead of fighting to hit your macro goals every single day. Subscribe now.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCBF73y3tK1gYu9p2ag9wJEQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN-1liITK41PQVY2UK3FrpvtJtGurCP_w4m6EiGGA=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN-1liITK41PQVY2UK3FrpvtJtGurCP_w4m6EiGGA=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN-1liITK41PQVY2UK3FrpvtJtGurCP_w4m6EiGGA=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 321,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "iAYoykH7aF3Iw8x4wEIvnlhNe3c",
      id: "Dml4FX9QTLUJII_iq50whxkAmgVZW7zktyMQ2iq1VhM",
      snippet: {
        publishedAt: "2022-12-05T16:08:59.898862Z",
        title: "Tokyo Llama",
        description:
          "Hello!\n\nMy name is Jaya, I live in southern Ibaraki, just an hour out of central Tokyo, with my wife and our twin boys. \n\nIn this channel I'm documenting the process of buying and renovating an abandoned Japanese farmhouse. \n\nI'll also do some videos where I visit other renovations here in Japan, as well as videos on related topics.\n\nI'm originally from Australia, though we lived in London, UK, for about 11 years, until 2017.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCBQ3TEq5SrUuTJuMl1S_4ig",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/CgXh7EgJCHfCWr-8fSVLlK6WjmK8LrT9BySIaVRekzY1x2Jddwi0hzheV_qMe9uriaABXU8R=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/CgXh7EgJCHfCWr-8fSVLlK6WjmK8LrT9BySIaVRekzY1x2Jddwi0hzheV_qMe9uriaABXU8R=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/CgXh7EgJCHfCWr-8fSVLlK6WjmK8LrT9BySIaVRekzY1x2Jddwi0hzheV_qMe9uriaABXU8R=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 47,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "r0RU061qaghX5k9rDE2LHYDasg8",
      id: "Dml4FX9QTLXjEmp5aazo-BS-Gw6ug4Tmxn7EDPa0JS8",
      snippet: {
        publishedAt: "2023-02-05T13:19:55.599115Z",
        title: "Channel Super Fun",
        description:
          "Channel Super Fun is all about the name. Games, toys, and challenges. Expect to find them all here!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCBZiUUYeLfS5rIj4TQvgSvA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN1hJkwZdHsN1IP5GCitoZhHJ3rBddiHO4CV4hTkg=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN1hJkwZdHsN1IP5GCitoZhHJ3rBddiHO4CV4hTkg=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqN1hJkwZdHsN1IP5GCitoZhHJ3rBddiHO4CV4hTkg=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 194,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "AGe5KzwOwo9SfkPhDdTHncFKrnk",
      id: "Dml4FX9QTLXjEmp5aazo-IBj4SgMyzxzXmZV7VJoOCw",
      snippet: {
        publishedAt: "2022-12-05T16:09:08.980101Z",
        title: "Tom Scott",
        description:
          "Hi, I'm Tom Scott. These are some of the things I've made and done. They'll probably come back to haunt me in a few years' time.\n\nContact me: https://www.tomscott.com/contact/\n\n• • •\n\nThis channel is a production of Pad 26 Limited, registered in England and Wales, № 11662641.\nRegistered office: Amelia House, Crescent Road, Worthing, West Sussex, BN11 1QR\n(This address is only for legal documents; no other mail will be forwarded.)",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCBa659QWEk1AI4Tg--mrJ2A",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPSpOhHN46JNazhowO36frdU1RoAeigQAFxTworXQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPSpOhHN46JNazhowO36frdU1RoAeigQAFxTworXQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPSpOhHN46JNazhowO36frdU1RoAeigQAFxTworXQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 698,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "9a8jHgZxM86yV8RTb5fbgG66yi4",
      id: "Dml4FX9QTLWGLlPbkgt5L1oD1_G2Ud1ogR5VpJgDJ6g",
      snippet: {
        publishedAt: "2023-04-26T21:41:11.488463Z",
        title: "erobb221 unmuted VODs (with Chat)",
        description:
          "This channel is unmonetized. Please contact me if you need me to remove a video (Shcrotum#1460 on disc)\n\nI upload erobb221 VODs unmuted with chat overlaid (including deleted streams). Sometimes still needs to be muted/blurred because yt's content ID doesn't like it or if some idiot leaks something\n\nThanks to those that donated through paypal and gifted subs. It helps improve the upload speed and keeps ads out of the recordings for the vodfrogs ❤️ \n\nEric Lamont Robbins Jr., pay me 😡👉 paypal.me/Shcrotum\nGifted Sub Expires: May 19",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCBqT-_0ywiQ9DepT5IhbGxw",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/_HX_bUj1z0l-zZeiHcCF1kMiEd8UKZKAB1_556zXcJ-VgBg42qg13VZ9YCl0rseGz8DK-WvV=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/_HX_bUj1z0l-zZeiHcCF1kMiEd8UKZKAB1_556zXcJ-VgBg42qg13VZ9YCl0rseGz8DK-WvV=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/_HX_bUj1z0l-zZeiHcCF1kMiEd8UKZKAB1_556zXcJ-VgBg42qg13VZ9YCl0rseGz8DK-WvV=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 1051,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "NoZuYD1kkIaYrsEQkktcxgVWFJc",
      id: "Dml4FX9QTLW8qYgJTXyYj0bAJEE2qd8HqK1XGW1IUP4",
      snippet: {
        publishedAt: "2022-12-14T19:13:19.634782Z",
        title: "COCOCOROチャンネル",
        description:
          "料理レシピを美味しく、詳しく、楽しく解説する動画を更新しています！\nチャンネル登録、goodボタン、通知の設定や各種SNSフォロー、よろしくお願いします！\n\n★お仕事依頼/動画についてのお問い合わせ → kuu.cococoro.net@gmail.com\n\nCOCOCORO WEBサイト オンラインレシピ定期更新中！　https://cococoro.net/\n\nCOCOCORO関連商品販売はショップから　https://cococoro.stores.jp/\n\nCOCOCORO COOKING Lab.~ココラボ~ https://community.camp-fire.jp/projects/view/352400\n\nクックパッドでもレシピ公開中！ → https://cookpad.com/kitchen/48429684\n皆様からのつくれぽお待ちしております！\n\nCOCOCORO料理本・キッチングッズ関連\n・料理本「神ダレ∞レシピ」https://youtu.be/vImMKHfT9D0 / https://amzn.to/3ptHU9k\n・料理本「ドヤ飯」 https://youtu.be/JE4MLXse92Q / https://amzn.to/3oC7pFo\n・料理本「レンチンレベチ飯」 https://youtu.be/gG09Q_nI5LE / https://amzn.to/3tnVej0\n・オリジナル木粉配合合成ゴムまな板 https://youtu.be/2_hMvmVT4E8 / https://amzn.to/2YNNuaX\n・オリジナル包丁・砥石『忍』　COCOCORO商店にて販売中！ https://youtu.be/tKhLbhuXuIU\n\nTwitter　https://twitter.com/COCOCORO_Ch\n\n出演\n大西哲也　https://twitter.com/bbq0024\nDムロサキ　https://twitter.com/m_syota_ts\n\n2NDチャンネル（撮影の裏側や雑談、料理だけじゃ無い様々な動画はこちらで！）\nhttps://www.youtube.com/channel/UCwOCF0S_0SKzz6N7NX88Jmw\n\n製品リンクURLはAmazonアソシエイトのリンクを使用しています。",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCBzHLiBZWSn7AmaW0AOAlWg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMke2WyPJdY_HdhRJwJ20QuWaYaHsqn7zwvjS6dhw=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMke2WyPJdY_HdhRJwJ20QuWaYaHsqn7zwvjS6dhw=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMke2WyPJdY_HdhRJwJ20QuWaYaHsqn7zwvjS6dhw=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 811,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "IsWfGV8f1LnRGINNCDm3bXkfRpc",
      id: "Dml4FX9QTLW8qYgJTXyYjy7nR_Z7nSiugbptYExZKXU",
      snippet: {
        publishedAt: "2022-12-14T14:53:57.234308Z",
        title: "Japan by Food",
        description:
          "ByFood makes videos that spotlight Japanese chefs and craftspeople, seasonal food trends, and local Japanese culture (with a few fun food challenges thrown into the mix)!\n\nABOUT BYFOOD:\n\nByFood is Japan’s one-stop food platform. With the most extensive variety of Japanese food experiences on the internet, byFood strives to offer rare experiences and make Japanese food accessible to more people, with options like vegetarian, vegan, gluten-free, Halal, and Kosher experiences. In doing so, byFood brings locals and visitors together through food and celebrates Japanese cuisine.\n\nByFood also gives to children in need through our Food for Happiness Program. And you can help, too! When you book an experience on byFood, a portion of the proceeds go toward NGOs that support children in developing countries, giving them access to necessities like nutritious meals, schools, and housing. \n\nCheck out our links below and subscribe to join the byFood community!",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCCyR9oAyHGSvZnYoGv3Qu1Q",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOJLNL83tzlsFsTX27CwbLwT_aRwEodXmha8kQm=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOJLNL83tzlsFsTX27CwbLwT_aRwEodXmha8kQm=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOJLNL83tzlsFsTX27CwbLwT_aRwEodXmha8kQm=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 226,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "knb9KtyV1rXCcSLmyltDXKEUm_E",
      id: "Dml4FX9QTLUJII_iq50whz0jIjcVdp9SAa2LMXNazfg",
      snippet: {
        publishedAt: "2022-12-14T19:05:38.251068Z",
        title: "へんな魚おじさんの寝言【Weird Fish Dude & Beard Brother】",
        description:
          '愛知県南知多 豊浜漁港の「さかな広場」にて働いている\n通称"へんな魚おじさん"と"ヒゲの兄貴"です！！\n\nきまぐれクックのかねこさんのチャンネルで\n度々登場しておりましたが、ついにチャンネルができました！！\n\nへんな魚はもちろん、いろんな魚を紹介して\n皆さんに魚の美味しさを伝えられるように頑張ります！！\n\n\n☆Twitter ➡︎ https://twitter.com/_Sakana_Ojisan\nお魚クイズや豊浜魚ひろばの情報を発信しています！\n\n☆Instagram ➡︎ https://www.instagram.com/_sakana_ojisan/?hl=ja\n魚ひろばにお越しいただいた方との記念写真を載せています！\n\n☆ヒゲの兄貴のTwitter ➡︎ https://twitter.com/marukan_aichi?s=17\nへんな魚おじさんよりも更新頻度が高く、さかな広場の情報も豊富です！\nさかな広場にお越しになる前に必ずチェックしてください！\n\n☆セカンドチャンネル⬇︎へんな魚おじさんのひとり言\nhttps://www.youtube.com/channel/UCVGyr3a4vK39eQVxWoq70fg\n\n☆へんな魚おじさんのLINEスタンプ発売中!!\nhttps://store.line.me/stickershop/product/10778677\n\n■ファンレター・プレゼントの宛先はこちら\n\n150-0011\n東京都渋谷区東1-26-20\n東京建物東渋谷ビル8F\n「株式会社carry on へんな魚おじさん&ヒゲの兄貴」宛\n※冷蔵・冷凍が必要な、なま物の受付はできません。\n\n■お仕事のご依頼、取材等はこちら\nhenna.sakana.oji3@gmail.com',
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCDJ_L7aJsijdUKXQgy7GXhA",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMSnn393AS5cubuvkrt3rtP7WoB2rRMJOsz_PEY=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMSnn393AS5cubuvkrt3rtP7WoB2rRMJOsz_PEY=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqMSnn393AS5cubuvkrt3rtP7WoB2rRMJOsz_PEY=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 417,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "mcfFlVa0BfOiWKO89s-sXnP3OUA",
      id: "Dml4FX9QTLXjEmp5aazo-GTlxg7AijwnFsMwCYRnuCc",
      snippet: {
        publishedAt: "2022-12-05T15:56:14.057411Z",
        title: "ONLY in JAPAN * John Daub",
        description:
          "My name is John Daub, Creator & Producer of the ONLY in JAPAN series. From food adventures and tech to history and culture, I put all of my 23 years of experience living in Japan into entertaining episodes you'll learn a lot from. Always on the road, I look for stories and ways to change how you think about and see this amazing country. Thank you for subscribing to the new channel. Let's visit every corner of the country together -- Hokkaido, Honshu, Shukoku, Kyushu and Okinawa, and every town in between. \n\nWould you like to work together? \nお問い合わせ Please send all inquires to ▶︎ http://onlyinjapan.tv \n\nOther channels in the Series:\nONLY in JAPAN * GO\nONLY in JAPAN 360\n\nONLY in JAPAN ® is a registered trademark - 2022 All rights reserved.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCDJ_LbyfNiutATmIIJ48HCQ",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPfUqSP68UZE6RP7H71alf5RZXD6EugDQ9bUrn_RQ=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPfUqSP68UZE6RP7H71alf5RZXD6EugDQ9bUrn_RQ=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqPfUqSP68UZE6RP7H71alf5RZXD6EugDQ9bUrn_RQ=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 35,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "-yD-HENtONs9IhKAtGhCsv9-boQ",
      id: "Dml4FX9QTLUJII_iq50wh2ebC4xgyYzi5JgZdQXyEJM",
      snippet: {
        publishedAt: "2022-12-05T16:11:56.067825Z",
        title: "BBC Ideas",
        description:
          "Do you have a curious mind? You’re in the right place.\n\nOur aim at BBC Ideas is to feed your curiosity, to open your mind to new perspectives and to leave you that little bit smarter. Stick around if you want to learn more about science, philosophy, psychology, self-improvement and more. We've also got some incredible animations for you to enjoy, so dive in!\n\nLet us know what you think and make sure to subscribe.\n\nWe work closely with a number of external partners, including The Open University: https://www.bbc.co.uk/ideas/playlists/made-in-partnership-with-the-open-university\n\nYou can also visit our website to see all of our videos: https://www.bbc.com/ideas\nAnd follow BBC Ideas on Twitter: https://twitter.com/bbcideas",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCDYT9mM3L_ByrPYMyl0MGGg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNS7JxtrUZY6iL-ENyDcXrJvszXEiSNNDLanNCi=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNS7JxtrUZY6iL-ENyDcXrJvszXEiSNNDLanNCi=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqNS7JxtrUZY6iL-ENyDcXrJvszXEiSNNDLanNCi=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 373,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "j5BOo58_mD8rrwZ0ppUAnP0EY00",
      id: "Dml4FX9QTLUJII_iq50whyiS672VNtJALHU2xcN5Yho",
      snippet: {
        publishedAt: "2022-12-05T16:17:27.99031Z",
        title: "Kuga's Travel",
        description:
          "Welcome to my channel. \nMy name is Kuga. \nI'm Japanese living in Japan.\nIn this channel, I'll show you the interesting life in JAPAN.\n\nPlease subscribe and hit like button. \nThese factors always give me more motivation to create next postings. \n\nThanks for watching!\n\nContact:\nお仕事や広告掲載のご相談・動画の内容についてのお問い合わせは、\n大変お手数ですが日本国内用チャンネル「Kugaくが」の概要欄に記載のメールアドレスよりお願いいたします。\n(迷惑メール防止のためこちらの海外向けチャンネルではメールアドレスの記載を控えています)\nもし差し支えなければ、日本語で書いていただけると幸いです。",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCDa5_HJ3qPkDtbRmdlqBD3g",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/76IH_Pue_Go7TiY2Uc1OSP00QOJwrd3BVoDrwEUAwyqaZFLYVGu18dJPIBxzzGsnFQ17a59m=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/76IH_Pue_Go7TiY2Uc1OSP00QOJwrd3BVoDrwEUAwyqaZFLYVGu18dJPIBxzzGsnFQ17a59m=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/76IH_Pue_Go7TiY2Uc1OSP00QOJwrd3BVoDrwEUAwyqaZFLYVGu18dJPIBxzzGsnFQ17a59m=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 119,
        newItemCount: 0,
        activityType: "all",
      },
    },
    {
      kind: "youtube#subscription",
      etag: "RuY7ESjty_OQ1oqi5pXrGViL5lI",
      id: "Dml4FX9QTLUJII_iq50whwTnPKVzeURiFNVLPvL2kps",
      snippet: {
        publishedAt: "2022-12-05T15:57:55.736563Z",
        title: "Sky Guitar",
        description:
          "(Classical/Fingerstyle) Guitar Tutorial Channel\n\nSkyGuitar runs a YouTube channel for guitar players of every skill level from beginner to expert. Since these arrangements are done by a professional guitarist and a conductor of classical guitar orchestra, we have solid confidence that most guitar players will love the quality of our guitar tabs and arrangements. \n\nEnjoy playing with SkyGuitar.",
        resourceId: {
          kind: "youtube#channel",
          channelId: "UCDlfXUX_wYgyfiXbfQh96Eg",
        },
        channelId: "UC0Ewj7bDyt_NoMlpq9m2LJQ",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOIvipWL3xTl0lL8FFsuiRs9FjWKfJcM7_qWPixag=s88-c-k-c0x00ffffff-no-rj",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOIvipWL3xTl0lL8FFsuiRs9FjWKfJcM7_qWPixag=s240-c-k-c0x00ffffff-no-rj",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AGIKgqOIvipWL3xTl0lL8FFsuiRs9FjWKfJcM7_qWPixag=s800-c-k-c0x00ffffff-no-rj",
          },
        },
      },
      contentDetails: {
        totalItemCount: 321,
        newItemCount: 0,
        activityType: "all",
      },
    },
  ],
};

const subscriptions = {
  kind: "youtube#subscription",
  etag: "etag",
  id: "string",
  snippet: {
    publishedAt: "datetime",
    channelTitle: "string",
    title: "string",
    description: "string",
    resourceId: {
      kind: "string",
      channelId: "string",
    },
    channelId: "string",
    thumbnails: {
      key: {
        url: "string",
        width: "unsigned integer",
        height: "unsigned integer",
      },
    },
  },
  contentDetails: {
    totalItemCount: "unsigned integer",
    newItemCount: "unsigned integer",
    activityType: "string",
  },
  subscriberSnippet: {
    title: "string",
    description: "string",
    channelId: "string",
    thumbnails: {
      key: {
        url: "string",
        width: "unsigned integer",
        height: "unsigned integer",
      },
    },
  },
};
