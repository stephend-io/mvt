"use client";

import { useVolume } from "@/zustand/store";
import "../../app/fonts/Pixel.css";

const VolumeBar = () => {
  const volume = useVolume();
  const content: JSX.Element[] = [];
  for (let i = 0; i < 25; i++) {
    if (i <= volume / 4) content.push(<Whole />);
    else content.push(<Half />);
  }
  console.log(volume);
  console.log(content);
  return (
    <div
      id='boom'
      className='absolute bottom-8 w-full text-6xl'
      style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
    >
      <div className='flex flex-col justify-center items-center '>
        <>Volume</>
        <div className='flex flex-row '>{content}</div>
        <>{volume}</>
      </div>
    </div>
  );
};

const Half = () => <div className='w-[0.2rem] h-12 bg-green-500 m-2' />;
const Whole = () => <div className='w-4 h-12 bg-green-500 m-2' />;

export default VolumeBar;
