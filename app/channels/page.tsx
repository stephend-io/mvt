// "use client";
import ChannelBox from "@/components/ChannelBox";
// import Player from "@/components/Player";
import Remote from "@/components/Remote";
import "../fonts/Font.css";
import "../fonts/FontTwo.css";
import VolumeBar from "@/components/VolumeBar";
import Modal from "@/components/Modal";
import Absolute from "@/components/Absolute";
import Button from "@/components/Button";
import TVPlayer from "@/components/TVPlayer";

const index = () => {
  return (
    <>
      <div className={`relative w-screen h-screen bg-black`}>
        {/* <Player /> */}
        <TVPlayer />
        <Remote />
        <ChannelBox />
        <VolumeBar />
        <Modal />
      </div>
    </>
  );
};
export default index;
