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
import { prisma } from "@/lib/prisma";

function randomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

const index = async () => {
  // const data = await prisma?.tvChannel.findFirst({
  //   select: {
  //     channels: true,
  //   },
  //   where: {
  //     channelId: 1,
  //   },
  // });

  // const getRandomChannel = await prisma?.ytChannel.findUnique({
  //   where: {
  //     channelId: data?.channels[randomNumber(data?.channels.length)],
  //   },
  // });
  // const getVideo = await prisma.ytVideo.findFirst({});

  // console.log(data);
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
