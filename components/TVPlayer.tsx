"use client";
import useStore, { useActions } from "@/zustand/store";
import { VariantProps, cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import Absolute from "./Absolute";
import { useLayoutEffect, useState } from "react";

import "@/app/styles.scss";
import { SizeShower } from "./SizeShower";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
  loading: () => <Loader />,
});

const TVplayerStyles = cva(
  "absolute transition-all duration-1000 ease-in-out  overflow-clip",
  {
    variants: {
      intent: {
        fullScreen: "top-0 right-0 w-full h-full",
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
        // initial: "top-[8vh] right-1/2 translate-x-1/2 w-1/3 h-1/4",
        // boxMiddle: "",
        // boxMiddle: "",
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

type Props = VariantProps<typeof TVplayerStyles> & {
  videoId: string;
  width: number;
  height: number;
};

const TVPlayer = ({ videoId }: Props) => {
  console.log("TVplayer");
  console.log(videoId);
  const additionalClassNames = "m-0 relative ";
  const actions = useActions();
  const {
    currentVideo,
    volume,
    muted,
    settingsOpen,
    miniVideo,
    playerType: intent,
    playerSizeX,
    playerSizeY,
  } = useStore();

  const no = 3;

  useLayoutEffect(() => {
    actions.setCurrentVideo(testData[no]);
    return () => console.log("useLayoutEffect returned");
  }, [currentVideo]);

  return (
    <div className='h-screen w-screen bg-black flex flex-col justify-center items-center vignette'>
      <div className='absolute z-50 top-0 right-0 bottom-0 left-0  before:block  vignette'></div>
      <SizeShower />
      <div id='ratio2'>
        <div
          className='absolute z-50 top-0 right-0 bottom-0 left-0  before:block  '
          id='vignette'
        ></div>
        <ReactPlayer
          style={{
            transition: "ease-in-out",
            transitionDuration: "500ms",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "medium dashed green",
            backgroundColor: "red",
          }}
          url={`https://www.youtube.com/watch?v=${testData[no].embedId}`}
          width={"100%"}
          height={"100%"}
          volume={muted ? 0 : volume / 100}
          playing={true}
          loop={true}
          controls={false}
          stopOnUnmount={false}
          pip={true}
          playbackRate={1}
        />
      </div>
    </div>
  );
};
export default TVPlayer;
