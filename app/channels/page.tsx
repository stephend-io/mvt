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
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = async () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/channels/00");
  }, []);

  console.log("index - NEW");
  // const res = await fetch("http://localhost:2221/api/channels/", {
  //   method: "get",
  //   // headers: { "Content-Type": "application/json" },
  //   next: { revalidate: 0 },
  // });
  // const data = await res.json();
  // console.log(data);
  // console.log(data.data);
  return (
    <>
      <div className={`relative w-screen h-screen bg-black text-white`}>
        {/* <Player /> */}
        {/* <TVPlayer videoId={data.data} /> */}
        channel route
        {/* <Remote />
        <ChannelBox />
        <VolumeBar />
        <Modal /> */}
      </div>
    </>
  );
};
export default index;
