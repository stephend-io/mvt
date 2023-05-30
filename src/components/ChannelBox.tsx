"use client";
import { useCurrentChannel } from "@/zustand/store";
import "../../app/fonts/Pixel.css";

const ChannelBox = () => {
  const currentChannel = useCurrentChannel();

  return (
    <div className='flex flex-col'>
      <div
        className='text-green-500 text-8xl absolute top-4 right-4 text-["littlebit-dotty-variable", sans-serif]'
        style={{ fontVariationSettings: `"BLOC" 200, "OPEN" 700` }}
      >
        {/* {currentChannel} */}1 2 3 4 5 6 7 8 9 10 11 12 13 14
      </div>
      <div>testhello is this workig</div>
    </div>
  );
};
export default ChannelBox;
