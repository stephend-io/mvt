"use client";

import dynamic from "next/dynamic";
import {
  useCurrentChannel,
  useDecrement,
  useIncreaseBy,
  useIncrement,
} from "@/zustand/store";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Player = () => {
  const currentChannel = useCurrentChannel();
  return (
    <>
      <div className='w-screen h-screen bg-lime-300 text-4xl text-pink-300'>
        <div className='w-full h-full absolute z-0'>
          <ReactPlayer
            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
            width='100%'
            height='100%'
          />
        </div>
      </div>
    </>
  );
};
export default Player;