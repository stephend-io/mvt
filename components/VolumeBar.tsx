"use client";

import { useMuted, useVolume } from "@/zustand/store";
import "@/app/fonts/Pixel.css";
import Mute from "@/public/Mute";
import { twMerge } from "tailwind-merge";
import Icon from "./Icon";
import { useEffect, useState } from "react";

const timeoutDelay = 3000;

const VolumeBar = () => {
  const [hidden, setHidden] = useState(true);
  const [mounted, setMounted] = useState(false);
  const muted = useMuted();
  const volume = useVolume();

  const content: JSX.Element[] = [];
  // I think using the index as a key is koo but let's see
  for (let i = 1; i <= 25; i++) {
    if (i <= volume / 4) content.push(<Whole key={i} />);
    else content.push(<Half key={i} />);
  }

  let timeoutID: NodeJS.Timeout;
  useEffect(() => {
    if (mounted) {
      setHidden(false);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        setHidden(true);
      }, timeoutDelay);
    } else setMounted(true);
    return () => clearTimeout(timeoutID);
  }, [muted, volume]);

  return (
    <div
      id='boom'
      className='absolute bottom-12 right-1/2 translate-x-1/2 text-6xl'
      style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
    >
      {!hidden && (
        <div className='flex flex-col justify-center items-center text-primary '>
          <div className='flex flex-row justify-between items-center w-full '>
            <div className='mb-6 relative'>
              Volume
              <div
                className={`top-0 -right-0.5 text-primary absolute mb-6 ${
                  muted && "ml-8 "
                } blur-sm`}
              >
                Volume
              </div>
            </div>

            {muted ? (
              <div className=' flex flex-row items-center  '>
                <Mute className='fill-primary' />
                <div className={`relative mb-7 ${muted && "ml-8 opacity-60"}`}>
                  {volume}

                  <div
                    className={`top-0 -right-0.5 text-primary absolute mb-6 ${
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
                  className={`top-0 -right-0.5 text-primary absolute mb-6 ${
                    muted && "ml-8 "
                  } blur-sm`}
                >
                  {volume}
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-row mt-4 items-center '>{content}</div>
        </div>
      )}
    </div>
  );
};

// Rqual height
// const Half = () => (
//   <div className='flex '>
//     <div className='w-[0.2rem] h-12 bg-primary m-2' />
//     <div className='absolute w-[0.3rem] h-12 bg-primary m-2 translate-x-[0.1px] blur-[7px]' />
//   </div>
// );

const Half = () => (
  <div className='flex '>
    <div className={twMerge("w-2 h-2 rounded-full bg-primary m-2")} />
    <div
      className={twMerge(
        "absolute w-2 h-2 rounded-full bg-primary m-2 translate-x-[0.1px] blur-[2px]"
      )}
    />
    {/* <div className='absolute w-[0.3rem] h-4 bg-primary m-2 translate-x-[0.1px] blur-[7px]' /> */}
  </div>
);

const Whole = () => (
  <div className='flex'>
    <div className={twMerge("w-4 h-12 bg-primary m-2")} />
    <div
      className={twMerge(
        "absolute w-4 h-14 bg-primary m-2 -translate-y-[3px] blur-[7px]"
      )}
    />
  </div>
);

export default VolumeBar;
