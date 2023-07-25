"use client";
import useStore, { useActions } from "@/zustand/store";
import { VariantProps, cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import { useEffect, useLayoutEffect, useState } from "react";
import { get, set } from "idb-keyval";

import "@/app/styles.scss";
import { SizeShower } from "./SizeShower";
// import useTV from "@/app/hooks/useTV";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
  loading: () => <Loader />,
});

const TVplayerStyles = cva(
  "absolute transition-all duration-1000 ease-in-out  overflow-clip",
  {
    variants: {
      intent: {
        // fullScreen: "top-0 right-0 w-full h-full",
        fullScreen:
          "h-full w-full bg-black flex flex-col justify-center items-center ",
        semiFullScreen:
          "max-w-[95vw] max-h-[98vh] top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 ",
        mini: "top-2 right-2 h-1/3 w-1/3",
        leftQuarter: "top-0 left-2 w-2/3 h-full",
        rightQuarter: "top-0 right-2 w-2/3 h-full",
        middleQuarter:
          "top-1/2  -translate-y-1/2 translate-x-1/2 right-1/2  w-2/3 h-full",
        boxMiddle:
          "top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-2/3 h-2/3",
        initial:
          "top-[5vh] right-1/2 translate-y-1/2 translate-x-1/2 w-full h-full bg-red-500",
      },
      shape: {
        default: "",
        roundedSm: "rounded-sm",
        roundedMd: "rounded-md",
        roundedLg: "rounded-lg",
        roundedXl: "rounded-xl",
      },
    },
    defaultVariants: {
      intent: "fullScreen",
      // shape: "roundedXl",
    },
  }
);

export type MusicVideo = {
  artist: string;
  title: string;
  links: {
    id: string;
    width: number;
    height: number;
  }[];
};

// type Props = VariantProps<typeof TVplayerStyles> & {
//   videos: { embedId: string; width: number; height: number }[];
// };

const TVPlayer = () => {
  const { currentVideo, currentChannel, muted, volume} = useStore();
  const actions = useActions();
  const [videoNo, setVideoNo] = useState(0);

    useEffect(() => {
     console.log('Playing: ' + currentVideo) 
    }, [currentVideo])

  // useLayoutEffect(() => {
  //   actions.setCurrentVideo(videos[9].links[0]);
  //   return () => console.log("useLayoutEffect returned");
  // }, [currentVideo]);

  // async function nextVideo() {
  //   const currChannel = (await get("kindalikemtv-" + channel)) as {
  //     currVideo: number;
  //     totalVids: number;
  //   };
  //   if (!currChannel) {
  //     const newChannelData = { currVideo: 0, totalVids: 240 };
  //     actions.setCurrentVideo(videos[0].links[0]);
  //     await set("kindalikemtv-" + channel, newChannelData);
  //   }
  //   if (currChannel.currVideo + 1 <= currChannel.totalVids) {
  //     const currChannelData = (await get(
  //       "kindalikemtv-" + channel + "-data"
  //     )) as MvData;
  //     actions.setCurrentVideo(
  //       currChannelData.videos[currChannel.currVideo].links[0]
  //     );
  //     const newChannelData = {
  //       ...currChannel,
  //       currVideo: currChannel.currVideo + 1,
  //     };
  //     await set("kindalikemtv-" + channel, newChannelData);
  //   }
  // }
  console.log("rerendered tvplayer");
  console.log(currentVideo);

  return (
    // <div className={TVplayerStyles({ intent })}>
    <div className='h-full w-full bg-black flex flex-col justify-center items-center ' onMouseOver={() => actions.toggleMouseDown()}>
      <div className='h-screen w-screen absolute top-0 right-0 vignette' />
      <SizeShower />
      <div id='ratio2'>
        <div
          className='absolute z-50 top-0 right-0 bottom-0 left-0  before:block'
          id='vignette'
        ></div>
        <div className='absolute bottom-12 right-12 text-white flex flex-col gap-1 z-50 font-black'>
          <div>{currentVideo.title}</div>
          <div>{currentVideo.artist}</div>
        </div>
        <ReactPlayer
          style={{
            transition: "ease-in-out",
            transitionDuration: "500ms",
            position: "absolute",
            zIndex: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "medium dashed green",
          }}
          url={`https://www.youtube.com/watch?v=${currentVideo.links[0].id}`}
          width={"100%"}
          height={"100%"}
          volume={muted ? 0 : volume / 100}
          playing={true}
          loop={true}
          controls={false}
          stopOnUnmount={false}
          pip={true}
          playbackRate={1}
          onEnded={actions.nextVideo}
        />
      </div>
    </div>
  );
};
export default TVPlayer;
