"use client";

import dynamic from "next/dynamic";
import useStore, {
  useCurrentChannel,
  useDecrementChannel,
  useIncreaseBy,
  useIncrementChannel,
} from "@/zustand/store";
import { Suspense } from "react";
import { useVolume } from "@/zustand/store";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => <div className='h-full w-full bg-black'>test</div>,
});

const Player = () => {
  const { volume, muted, settingsOpen } = useStore();
  return (
    <>
      <div
        className={`w-screen h-screen text-4xl text-pink-300 ${
          settingsOpen && "blur-md"
        }`}
      >
        <div className='w-full h-full absolute z-0'>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            width='100%'
            height='100%'
            volume={muted ? 0 : volume / 100}
          />
        </div>
      </div>
    </>
  );
};
export default Player;
