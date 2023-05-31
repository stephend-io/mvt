"use client";

import { useMuted, useVolume } from "@/zustand/store";
import "../../app/fonts/Pixel.css";
import Mute from "../../public/Mute";
import Icon from "./Icon";

const VolumeBar = () => {
  const muted = useMuted();
  const volume = useVolume();
  const content: JSX.Element[] = [];
  for (let i = 1; i <= 25; i++) {
    if (i <= volume / 4) content.push(<Whole />);
    else content.push(<Half />);
  }
  return (
    <div
      id='boom'
      className='absolute bottom-12 right-1/2 translate-x-1/2 text-6xl '
      style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
    >
      <div className='flex flex-col justify-center items-center text-green-500 '>
        <div className='flex flex-row justify-between items-center w-full '>
          <div className='mb-6 relative'>
            Volume
            <div
              className={`top-0 -right-0.5 text-green-500 absolute mb-6 ${
                muted && "ml-8 "
              } blur-sm`}
            >
              Volume
            </div>
          </div>

          {muted ? (
            <div className=' flex flex-row items-center  '>
              <Mute className='fill-green-500' />
              <div className={`relative mb-7 ${muted && "ml-8 opacity-30"}`}>
                {volume}

                <div
                  className={`top-0 -right-0.5 text-green-500 absolute mb-6 ${
                    muted && "ml-8 "
                  } blur-sm`}
                >
                  {volume}
                </div>
              </div>
            </div>
          ) : (
            <div className='mb-7 relative'>
              {volume}

              <div
                className={`top-0 -right-0.5 text-green-500 absolute mb-6 ${
                  muted && "ml-8 "
                } blur-sm`}
              >
                {volume}
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-row mt-4 items-center'>{content}</div>
      </div>
    </div>
  );
};

// Rqual height
// const Half = () => (
//   <div className='flex '>
//     <div className='w-[0.2rem] h-12 bg-green-500 m-2' />
//     <div className='absolute w-[0.3rem] h-12 bg-green-500 m-2 translate-x-[0.1px] blur-[7px]' />
//   </div>
// );

const Half = () => (
  <div className='flex '>
    <div className='w-2 h-2 rounded-full bg-green-500 m-2' />
    <div className='absolute w-2 h-2 rounded-full bg-green-500 m-2 translate-x-[0.1px] blur-[2px]' />
    {/* <div className='absolute w-[0.3rem] h-4 bg-green-500 m-2 translate-x-[0.1px] blur-[7px]' /> */}
  </div>
);

const Whole = () => (
  <div className='flex'>
    <div className='w-4 h-12 bg-green-500 m-2' />
    <div className='absolute w-4 h-14 bg-green-500 m-2 -translate-y-[3px] blur-[7px]' />
  </div>
);

export default VolumeBar;
