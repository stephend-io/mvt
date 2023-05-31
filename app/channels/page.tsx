// "use client";
import ChannelBox from "@/components/ChannelBox";
import Player from "@/components/Player";
import Remote from "@/components/Remote";
import "../fonts/Font.css";
import "../fonts/FontTwo.css";
import VolumeBar from "@/components/VolumeBar";

const index = () => {
  return (
    <>
      <div className={`w-screen h-screen bg-lime-300 text-4xl text-pink-300 `}>
        <Player />
        <Remote />
        <ChannelBox />
        <VolumeBar />
      </div>
    </>
  );
};
export default index;
