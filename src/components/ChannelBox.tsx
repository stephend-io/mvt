"use client";
import { useCurrentChannel } from "@/zustand/store";
import "../../app/fonts/Pixel.css";

const ChannelBox = () => {
  const currentChannel = useCurrentChannel();

  return (
    <div className='flex flex-col'>
      <div
        id='boom'
        className='text-green-300 text-8xl absolute top-4 right-4  blur-[4px] translate-x-[2px]'
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {currentChannel}
      </div>
      <div
        id='boom'
        className='text-green-500 text-8xl absolute top-4 right-4 text-["littlebit-dotty-variable", sans-serif] blur-[1px] '
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {currentChannel}
      </div>
    </div>
  );
};
export default ChannelBox;
