"use client";
import useStore, { useActions } from "@/zustand/store";
import { VariantProps, cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import Absolute from "./Absolute";
import { useLayoutEffect, useState } from "react";

import "@/app/styles.scss";

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
};

const TVPlayer = ({ videoId }: Props) => {
  console.log("TVplayer");
  console.log(videoId);
  const additionalClassNames = "";
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
  useLayoutEffect(() => {
    console.log("videoId: " + videoId);
    actions.setCurrentVideo(videoId);
  }, []);
  const testData = [{ height: 100, width: 100, embedId: "LkjWw94_Q6k" }];
  return (
    <div
      className={TVplayerStyles({
        className: additionalClassNames,
        intent,
      })}
      // className='w-full h-full bg-red-400 absolute top-2 right-2'
      // className='w-1/3 h-1/3 bg-red-400 absolute top-2 right-2'
    >
      {/* <div
        className='w-[91%] h-full  absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 z-10 '
        id='vignette'
      /> */}
      <div
        className='relative  w-full before:block before:pt-[50%] bg-red-500'
        id=''
      >
        <div
          className='absolute z-50 top-0 right-0 bottom-0 left-0 w-1/2 translate-x-1/2'
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
          }}
          // url={`https://www.youtube.com/watch?v=${videoId}`}
          url={`https://www.youtube.com/watch?v=LkjWw94_Q6k`}
          // width={playerSizeX + "%"}
          // height={playerSizeY + "%"}
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
