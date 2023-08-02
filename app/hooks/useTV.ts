// import useStore, { useActions, useCurrentChannel } from "@/zustand/store";
// import { get, set } from "idb-keyval";
// import { useEffect, useState } from "react";

// type MusicVideo = {
//   artist: string;
//   title: string;
//   links: {
//     id: string;
//     width: number;
//     height: number;
//   }[];
// };

// type Props = {
//   channel: number
// }
// export default function useTV({channel}: Prop) {
//   const { currentVideo, currentChannel: channel } = useStore();
//   console.log("useTV called with new channel: " + channel);

//   const [channelData, setChannelData] = useState();
//   const actions = useActions();

//   useEffect(() => {
//     (async () => {
//         const res =
//     })()
//     return () => {
//       console.log("useTV useEffect unmounted");
//     };
//   }, []);
//   async function nextVideo() {
//     const currChannel = (await get("kindalikemtv-" + channel)) as {
//       currVideo: number;
//       totalVids: number;
//     };
//     if (!currChannel) {
//       const newChannelData = { currVideo: 0, totalVids: 240 };
//       actions.setCurrentVideo(videos[0].links[0]);
//       await set("kindalikemtv-" + channel, newChannelData);
//     }
//     if (currChannel.currVideo + 1 <= currChannel.totalVids) {
//       const currChannelData = (await get(
//         "kindalikemtv-" + channel + "-data"
//       )) as MusicVideoType[];
//       actions.setCurrentVideo(currChannelData[currChannel.currVideo].links[0]);
//       const newChannelData = {
//         ...currChannel,
//         currVideo: currChannel.currVideo + 1,
//       };
//       await set("kindalikemtv-" + channel, newChannelData);
//     }
//   }
//   return { currentVideo, nextVideo };
// }
