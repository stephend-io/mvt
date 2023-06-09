import Absolute from "@/components/Absolute";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Row from "@/components/Row";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "@/app/fonts/Pixel.css";
import Buttonify, {
  ButtonifyTest,
  WindowEventAdder,
} from "@/components/Buttonify";
import ClientShowcase from "@/components/ClientShowcase";
import { prisma } from "@/lib/prisma";
import { SizeShower } from "@/components/SizeShower";
import "./styles.scss";
import { FloatingRight, FloatingLeft } from "@/components/FloatingDirection";
import TVPlayer from "@/components/TVPlayer";
import Remote from "@/components/Remote";
import ChannelBox from "@/components/ChannelBox";
import VolumeBar from "@/components/VolumeBar";

export const Page = async () => {
  const res = await fetch("http://localhost:3000/api/channels/");
  const testData = await res.json();

  // const testData = [
  //   { embedId: "CfUDAWZGBvo", width: 100, height: 56 },
  //   { embedId: "Q93VZdVDYPE", width: 100, height: 56 },
  //   { embedId: "-IeMN3eA9AY", width: 100, height: 56 },
  //   { embedId: "0VLras4mZ84", width: 100, height: 56 },
  //   { embedId: "2MxyydicOY4", width: 100, height: 56 },
  //   { embedId: "5ztU_jJyr2c", width: 100, height: 56 },
  //   { embedId: "2LyhweLk5Vc", width: 100, height: 56 },
  //   { embedId: "gShjHRGfkSQ", width: 100, height: 56 },
  //   { embedId: "ws6dFb69t7U", width: 100, height: 56 },
  //   { embedId: "lH5TRnY8JHw", width: 100, height: 56 },
  // ];
  return (
    <div className='h-screen w-screen bg-slate-800 flex flex-col justify-center '>
      <TVPlayer videos={testData.data} />
      <Remote />
      <ChannelBox />
      <VolumeBar />
    </div>
  );
};

export default Page;
