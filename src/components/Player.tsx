"use client";

import dynamic from "next/dynamic";
import useStore from "@/zustand/store";
import Loader from "./Loader";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => <Loader />,
});

const Player = () => {
  const { volume, muted, settingsOpen } = useStore();
  return (
    <div className='w-full h-full bg-secondary2 flex justify-center items-center'>
      <Loader className='' />
    </div>
    // <>
    //   <div
    //     className={`w-screen h-screen text-4xl text-pink-300 ${
    //       settingsOpen && "blur-md"
    //     }`}
    //   >
    //     <div className='w-full h-full absolute z-0'>
    //       <ReactPlayer
    //         url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
    //         width='100%'
    //         height='100%'
    //         volume={muted ? 0 : volume / 100}
    //       />
    //     </div>
    //   </div>
    // </>
  );
};
export default Player;
