"use client";
import useStore, { useCurrentChannel } from "@/zustand/store";
import "../../app/fonts/Pixel.css";
import { useEffect, useState } from "react";

const ChannelBox = () => {
  const { currentChannel, muted, volume } = useStore();
  const [hidden, setHidden] = useState(true);
  const [mounted, setMounted] = useState(false);

  const timeoutDelay = 5000;
  let timeoutID: NodeJS.Timer;

  useEffect(() => {
    if (mounted) {
      setHidden(false);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        setHidden(true);
      }, timeoutDelay);
    } else setMounted(true);
    return () => clearTimeout(timeoutID);
  }, [muted, volume, currentChannel]);

  return (
    <div className={`flex flex-col ${hidden && "hidden"}`}>
      <div
        id='boom'
        className='text-primary text-8xl absolute top-4 right-4  blur-[4px] translate-x-[2px]'
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {currentChannel}
      </div>
      <div
        id='boom'
        className='text-primary text-8xl absolute top-4 right-4 text-["littlebit-dotty-variable", sans-serif] blur-[1px] '
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {currentChannel}
      </div>
    </div>
  );
};
export default ChannelBox;
