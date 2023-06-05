//  import { getChannels } from "../model/channels";
//  import { getPlaylists, playlists } from "../model/playlists";
//  import { getSubscriptions, subscriptions } from "../model/subscriptions";
//  import { getVideosData, videos } from "../model/videos";

//  const sync = require("../model/sync");

//  test("playlistIngress works on valid input", () => {
//      expect(playlistIngress().toBe())
//  })

//  test("playlistIngress does not call create channel when all channels in playlist are present in DB", () => {
//      expect(playlistIngress().toBe())
//  })

//  test("playlistIngress' prisma.createMany works when only one id is passed", async () => {
//      const channelID = await getVideosData("JT4xW7zIAbQ")
//      const res = await sync.makeChannels(["UCZhtK40axOw7MGLTfwQ1yVA"]);
//      return expect(res).toBe(true);
//  });

//  test("getVideosData does not return youtube shorts", async () => {
//       const res = await getVideosData(["JT4xW7zIAbQ"]);
//      const res = await getVideosData(["bGqd9Mx1sPA"]);
//      return expect(res).toEqual([]);
//  });

//  test("getVideosData successfully filters out youtube shorts", async () => {       const res = await getVideosData(["JT4xW7zIAbQ"]);
//      const res = await getVideosData([
//          "bGqd9Mx1sPA",
//          "Z5NoQg8LdDk",
//          "Mtd24QIBJ5Y",
//          "8eN3ESdo6yQ",
//      ]);
//      return expect(res.length).toEqual(2);
//  });

//  describe("getVideosData", () => {
//  res moved inside function, surely this doesnt mess with any of the code
//  const res: videos[] = [];
//      beforeAll(async () => {
//          const videos = await getVideosData([
//              "bGqd9Mx1sPA",
//              "Z5NoQg8LdDk",
//              "Mtd24QIBJ5Y",
//              "8eN3ESdo6yQ",
//          ]);
//          videos.map((video) => res.push(video));
//      });

//      it("should successfully filter out youtube shorts", () => {
//          expect(res.length).toEqual(2);
//      });
//      it("has values in all returned values", () => {
//          expect(res).toBeDefined();
//      });

//      it("video 1 has expected params", () => {
//          expect(res[0]).toHaveProperty("duration");
//          expect(res[0]).toHaveProperty("views");
//          expect(res[0]).toHaveProperty("channelId");
//          expect(res[0]).toHaveProperty("channelTitle");
//          expect(res[0]).toHaveProperty("videoTitle");
//          expect(res[0]).toHaveProperty("videoId");
//          expect(res[0]).toHaveProperty("date");
//      });
//      it("video 2 has expected params", () => {
//          expect(res[1]).toHaveProperty("duration");
//          expect(res[1]).toHaveProperty("views");
//          expect(res[1]).toHaveProperty("channelId");
//          expect(res[1]).toHaveProperty("channelTitle");
//          expect(res[1]).toHaveProperty("videoTitle");
//          expect(res[1]).toHaveProperty("videoId");
//          expect(res[1]).toHaveProperty("date");
//      });
//  });

//  describe("getPlaylists", () => {
//      const res: playlists[] = [];
//      beforeAll(async () => {
//          const playlists = await getPlaylists("UCDe08Fs0s0YKJuk5h45csAQ");
//          playlists.map((playlist) => res.push(playlist));
//      });

//      it("should get playlist details from valid input", () => {
//           console.log(res);
//          expect(res).toBeDefined();
//      });
//      it("should filter out incorrect channelID length instantly", async () => {
//          try {
//              await getPlaylists("invalidInput");
//          } catch (err) {
//              expect(err).toMatch("invalid channelID length");
//          }
//      });
//     it("should filter out incorrect channelID after calling", async () => {
//         try {
//             await getPlaylists("IIIIIIIIIIIIIIIIIIIIIIII");
//         } catch (err: any) {
//             expect(err).toMatch("invalid channelID");
//         }
//     });

//     it("should properly specify if channel has no playlists", async () => {
//         try {
//             const res = await getPlaylists("UClX6wMJfHCbw09foCNITTkw");
//             console.log(res);
//         } catch (err: any) {
//             expect(err).toMatch("channel has no public playlists");
//         }
//     });

//      it("should properly handle when playlist is incorrectly formmatted", () => {
//           incorrect channelID below
//          expect(
//              async () => await getPlaylists("UCDe08Fs0s0YKJuk5h45csAW")
//          ).toThrowError("invalid");
//      });
//      it("should be able to handle user passing in a VALID playlistId", () => {
//          expect().toBe();
//      });
//      it("should be able to handle user passing in an INVALID playlistId", () => {
//          expect().toBe();
//      });
//      it("should return the expected parameters (playlist1)", () => {
//          expect().toBe();
//      });
//      it("should return the expected parameters (playlist2)", () => {
//          expect().toBe();
//      });
// });
//  describe("getSubscriptions", () => {
//      const res: subscriptions[] = [];
//      beforeAll(async () => {
//          const videos = await getSubscriptions("");
//          videos.map((video) => res.push(video));
//      });

//      it("should successfully filter out youtube shorts", () => {
//          expect(res.length).toEqual(2);
//      });
//      it("has values in all returned values", () => {
//          expect(res).toBeDefined();
//      });

//      it("video 1 has expected params", () => {
//          expect(res[0]).toHaveProperty("duration");
//          expect(res[0]).toHaveProperty("views");
//          expect(res[0]).toHaveProperty("channelId");
//          expect(res[0]).toHaveProperty("channelTitle");
//          expect(res[0]).toHaveProperty("videoTitle");
//          expect(res[0]).toHaveProperty("videoId");
//          expect(res[0]).toHaveProperty("date");
//      });
//      it("video 2 has expected params", () => {
//          expect(res[1]).toHaveProperty("duration");
//          expect(res[1]).toHaveProperty("views");
//          expect(res[1]).toHaveProperty("channelId");
//          expect(res[1]).toHaveProperty("channelTitle");
//          expect(res[1]).toHaveProperty("videoTitle");
//          expect(res[1]).toHaveProperty("videoId");
//          expect(res[1]).toHaveProperty("date");
//      });
//  });

//  describe("getChannels", () => {});
//  describe("writeChannel", () => {});
//  describe("readVideo", () => {});
//  describe("writeVideo", () => {});
//  describe("readVideo", () => {});
