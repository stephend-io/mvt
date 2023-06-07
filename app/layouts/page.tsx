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
import "@/app/styles.scss";
import Loading from "../../public/Loading.jpg";
import { FloatingRight, FloatingLeft } from "@/components/FloatingDirection";

export type VideoCardParams = {
  title: string;
  id: string;
  ChannelId: string;
  thumbnailId: string;
  channelTitle: string;
};
const VideoCard = ({ thumbnailId }: VideoCardParams) => {
  return (
    <button
      style={{
        background: `url("https://i.ytimg.com/vi/${thumbnailId}/hqdefault.jpg")`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
      className='w-full h-full bg-red-400'
    ></button>
  );
};

export default async function Home() {
  const dataList = [
    "https://img.youtube.com/vi/--2YbfVnUsQ/maxresdefault.jpg",
    "https://img.youtube.com/vi/3mtPLhZvdAo/maxresdefault.jpg",
    "https://img.youtube.com/vi/X7COhsO86ao/maxresdefault.jpg",
    "https://img.youtube.com/vi/VYzl0p53KF4/maxresdefault.jpg",
    "https://img.youtube.com/vi/0lPIPCGPNWg/maxresdefault.jpg",
    "https://img.youtube.com/vi/-LicMzrx1As/maxresdefault.jpg",
    "https://img.youtube.com/vi/-JLCyUzLW_8/maxresdefault.jpg",
    "https://img.youtube.com/vi/-KqF6qjcOZw/maxresdefault.jpg",
    "https://img.youtube.com/vi/-LOaun3btv8/maxresdefault.jpg",
    "https://img.youtube.com/vi/-LWzeMGSRM4/maxresdefault.jpg",
    "https://img.youtube.com/vi/-JNP-GqhwlU/maxresdefault.jpg",
    "https://img.youtube.com/vi/-KwkgSGX13o/maxresdefault.jpg",
    "https://img.youtube.com/vi/-JlxuQ7tPgQ/maxresdefault.jpg",
    "https://img.youtube.com/vi/QDilzaZWAf0/maxresdefault.jpg",
  ];

  return (
    <div className='w-screen h-screen relative '>
      <WindowEventAdder totalItems={dataList.length} />
      {/* <div className='h-[100vh] w-screen absolute z-10' id='vignette'></div> */}
      {/* <div className='h-[100vh] w-screen absolute z-0 '>
        <Icon
          icon='PictureError'
          defaultHovers={false}
          className='group-hover:scale-125 group-hover:-translate-x-1 group-active:saturate-200   transition-all hover:saturate-50 '
        />
      </div> 
      {/* <Link href={"/channels"}>wrong page</Link> */}

      <div
        className='bg-gray-800 w-full flex flex-col md:flex-col lg:flex-row justify-center  items-center h-screen '
        id='carousel'
      >
        <SizeShower />
        <div className='w-[95%] lg:w-[60%] h-full flex-wrap flex flex-row bg-red-700 mt-4 overflow-scroll'>
          {dataList &&
            dataList.map((data, index) => {
              return (
                <div
                  className='transition-all relative overflow-visible md:w-1/2   w-full aspect-video'
                  key={index}
                  id={String(index)}
                >
                  <ButtonifyTest
                    imgSrc={data}
                    num={index}
                    totalItems={dataList.length}
                  />
                  <img
                    src={data}
                    className='w-full h-full rounded-md opacity-90'
                  />
                </div>
              );
            })}
          {/* <div className='relative bg-slate-600 rounded-md lg:w-[30%] lg:h-[calc(33.33%-0.5rem)] w-full md:w-[calc(50%-1rem)] lg:min-w-[30rem] min-h-[10rem]'>
            <ButtonifyTest num={dataList.length} totalItems={dataList.length} />
            +
          </div> */}
        </div>
        <div className='lg:w-[40%] h-1/4 w-full  bg-slate-200 flex flex-col justify-between '>
          <div className='absolute w-[40%] h-full max-h-[50vh] top-0 right-0 flex flex-row justify-center'>
            <Image
              src={Loading}
              className=' bg-red-800 w-[30vw] h-[25vw] mt-4'
              alt={"test"}
            />
          </div>
          {/* <div className='absolute w-[40%] h-full max-h-[50vh] top-0 right-0 flex flex-row justify-center'>
            <Image
              src={Loading}
              className=' bg-red-800 w-[30vw] h-[20vw] mt-4'
              alt={"test"}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
