// "use client";
import ChannelBox from "@/components/ChannelBox";
import Player from "@/components/Player";
import Remote from "@/components/Remote";
import "../fonts/Font.css";
import "../fonts/FontTwo.css";

import Head from "next/head";

// <link rel='stylesheet' href='https://use.typekit.net/qln6ttz.css' />

const index = () => {
  return (
    <>
      <div className={`w-screen h-screen bg-lime-300 text-4xl text-pink-300 `}>
        <Player />
        <Remote />
        <ChannelBox />
      </div>
    </>
  );
};
export default index;
function localFont(arg0: { src: string; display: string }) {
  throw new Error("Function not implemented.");
}
