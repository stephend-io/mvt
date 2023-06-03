"use client";

import useStore from "@/zustand/store";
import { VideoCardParams } from "../../app/page";
import Col from "./Col";
import Row from "./Row";
import { use } from "react";
import dynamic from "next/dynamic";
import Loader from "./Loader";

const getData = async (): Promise<any> => {
  console.log("calling getData");
  const data = await fetch("http://localhost:3001/channel230", {
    next: { revalidate: 10 },
  });
  console.log("fetched data");
  const posts = await data.json();
  console.log("jsonified");

  return posts;
};

const ClientShowcase = () => {
  const { currentVideo, muted, volume } = useStore();
  console.log("Logging from ClientShowcase");
  console.log(currentVideo);

  if (currentVideo) {
    const ReactPlayer = dynamic(() => import("react-player"), {
      ssr: false,
      loading: () => <Loader />,
    });

    return (
      <div className='w-full h-full '>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
          width='100%'
          height='100%'
          volume={muted ? 0 : volume / 100}
          playing={true}
        />
      </div>
    );
  }
  return <></>;
};
export default ClientShowcase;
