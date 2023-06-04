"use client";

import useStore, { useActions } from "@/zustand/store";
import { VideoCardParams } from "../../app/page";
import { useState } from "react";

const Buttonify = (video: VideoCardParams) => {
  const actions = useActions();
  return (
    <button
      className='absolute top-0 left-0 w-full h-full bg-lime-400 opacity-20'
      onClick={async () => {
        await fetch("http://localhost:3001/channel230").then(async (res) => {
          const data = (await res.json()) as any;
          console.log(data.content[0].videoId);
          actions.setCurrentVideo(data.content[0].videoId);
        });
      }}
    ></button>
  );
};
export default Buttonify;
