"use client";
import useStore, { useActions } from "@/zustand/store";
import { VariantProps, cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import Absolute from "./Absolute";
import { useLayoutEffect, useState } from "react";

import "@/app/styles.scss";
import { SizeShower } from "./SizeShower";

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
  // useLayoutEffect(() => {
  //   console.log("videoId: " + videoId);
  //   actions.setCurrentVideo(videoId);
  // }, []);
  const testData = [
    // Food Insider
    { height: 100, width: 100, embedId: "LkjWw94_Q6k" },
    // Gordon
    { height: 89, width: 100, embedId: "G1cNvPyi-DY" },
    // Nerdwriter
    { height: 80, width: 100, embedId: "R1lcb_7gj5k" },
    // Cooking with Dog
    // { height: 75, width: 100, embedId: "g3HzuEQpyX0" },
    { height: 75, width: 100, embedId: "VavsOZS9RWg" },
    // Smarter Everyday
    { height: 67, width: 100, embedId: "6RbtnBh_0A8" },
    //  Staying at...
    { height: 56, width: 100, embedId: "vk2G0CRMN0Y" },
    // Ichika
    { height: 43, width: 100, embedId: "t1Hb217MmrY" },
  ];
  // <div
  //   className={TVplayerStyles({
  //     className: additionalClassNames,
  //     intent,
  //   })}
  // className='w-full h-full bg-red-400 absolute top-2 right-2'
  // className='w-1/3 h-1/3 bg-red-400 absolute top-2 right-2'
  // >
  {
    /* <div
        className='w-[91%] h-full  absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 z-10 '
        id='vignette'R1lcb_7gj5k
      /> */
  }

  const no = 3;
  // const testStr = `max-xl:pt-[${testData[no].height}%] xl:w-[${Number(
  //   ((testData[no].width / testData[no].height) * 100).toFixed(2)
  // )}vh]`;

  // const [test, setTest] = useState(testStr);
  // const yo = `xl:w-[${Number(
  //   ((testData[no].width / testData[no].height) * 100).toFixed(2)
  // )}vh]`;
  useLayoutEffect(() => {
    actions.setCurrentVideo(testData[no]);
  }, [currentVideo]);

  return (
    <div className='h-screen w-screen bg-black flex flex-col justify-center items-center'>
      <SizeShower />
      <div
        // id='ratio'
        // className={`max-w-screen-lg:pt-[${testData[no].height}%]`}
        // className={`max-w-screen-lg:pt-[75%]`}
        // className={testStr}
        // working but playing around with the box thing
        // className='relative block lg:h-[--playerHeight] lg:w-[--aspectRatio] max-lg:w-[--playerWidth] max-lg:pt-[--playerHeight]'
        className='relative block lg:h-[--playerHeight] lg:w-[--aspectRatio] max-lg:w-[--playerWidth] pt-[--playerHeight]'
        // className='relative w-[90vw] before:block before:pt-[50%] bg-red-500'

        // Food insider
        // className='relative w-[100%] max-h-screen max-w-[100vh] before:block before:pt-[100vw]  bg-red-500  '
        // Cooking with Dog
        // className='relative w-[100%] max-h-screen max-w-[133vh] before:block before:pt-[75%] bg-lime-800'
        // Ichika
        // className='relative  before:block before:w-[100%] before:pt-[43%] bg-lime-800'
        // Gordon
        // className='relative w-[100vw] before:block before:pt-[37.5%] bg-red-500'
        // className='relative w-[100%]  before:block before:pt-[25%] before:pb-[25%]  bg-red-500  '
        // className='relative w-[100%]  before:block before:pt-[25%] before:pb-[25%]  bg-red-500  '
        // _------------------
        // className='relative h-[90vh] before:block w-[75%] bg-red-500 flex flex-col justify-center items-center'
        // className='relative  w-full before:block before:pt-[45%] bg-red-500'
        // className='absolute w-full before:block before:pt-[49%] bg-red-500'
      >
        <div
          // Food insider
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-1/2 translate-x-1/2'
          // Cooking with dog
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[100%] before:block before:pt-[25%] before:pb-[25%] '
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[100%] before:block before:pt-[25%] before:pb-[25%] '
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[100%] before:block  '
          className='absolute z-50 top-0 right-0 bottom-0 left-0  before:block  '
          // Gordon
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[67.5%] before:block before:pt-[25%] before:pb-[25%] translate-x-[24%]'
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[65%] before:block before:pt-[25%] before:pb-[25%] translate-x-[25%]'
          // className='absolute z-50 top-0 right-0 bottom-0 left-0  w-[75%] translate-x-1/2'
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[45%] translate-x-[61.5%]'
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[65%] h-[100%] translate-x-[25%]'
          // className='absolute z-50 top-0 right-0 bottom-0 left-0 w-[65%] translate-x-[27%]'
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
            // maxHeight: "100vh",
          }}
          // url={`https://www.youtube.com/watch?v=${videoId}`}
          url={`https://www.youtube.com/watch?v=${testData[no].embedId}`}
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
