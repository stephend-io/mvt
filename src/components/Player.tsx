"use client";

import dynamic from "next/dynamic";
import useStore from "@/zustand/store";
import Loader from "./Loader";
import { useEffect, useState } from "react";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => <Loader />,
});

const Player = () => {
  const { currentVideo, volume, muted, settingsOpen, miniVideo } = useStore();

  // useEffect(() => {
  //   setTimeout(() => setMini(true), 10000);
  // }, []);
  return (
    // <div className='w-full h-full bg-secondary2 flex justify-center items-center'>
    //   <Loader className='' />
    // </div>
    <>
      <div
        className={`w-screen h-screen text-4xl text-pink-300 ${
          settingsOpen && "blur-md"
        }`}
      >
        <div
          className={`${
            miniVideo
              ? "w-80 h-40 top-11 right-11"
              : "w-full h-full top-0 right-0"
          } absolute transition-all duration-1000 ease-in-out`}
        >
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
