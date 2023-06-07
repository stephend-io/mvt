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

export const Navbar = () => {
  return (
    <div>
      <Row className=' justify-between px-8 py-2' intent={"fullW"}>
        <div className='flex justify-center items-center group text-xl  '>
          <Icon
            icon='TV'
            defaultHovers={false}
            size={"s"}
            className='group-hover:scale-125 group-hover:-translate-x-1 group-active:saturate-200   transition-all hover:saturate-50 '
          />
          <div
            id='boom'
            className={`absolute left-16 mb-2 text-primary  blur-[2px] group-hover:scale-125 transition-all group-hover:translate-x-5 group-hover:saturate-[0.75] group-active:saturate-100 group-active:scale-[1.3]`}
            style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
          >
            kindalikeTV
          </div>
          <button
            id='boom'
            className={`mb-2 text-primary text-xl  text-["littlebit-dotty-variable", sans-serif] blur-[0.5px] group-hover:scale-125 transition-all group-hover:translate-x-5 group-hover:saturate-[0.75] group-active:saturate-100 group-active:scale-[1.3]`}
            style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
          >
            kindalikeTV
          </button>
        </div>
        <div className='max-w-1/2 '>
          <Button
            children={
              <div className='relative group transition-all'>
                <div
                  id='boom'
                  // className={`text-xl mx-4 text-["littlebit-dotty-variable", sans-serif]`}

                  className={`text-primary text-xl mx-4 font-["littlebit-dotty-variable", sans-serif] blur-[0.5px] group-hover:scale-125 group-hover:opacity-80 active:saturate-200 transition-all duration-200 group-active:opacity-100 `}
                  style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
                >
                  stephendio
                </div>
                <div
                  id='boom'
                  className={`absolute top-0 left-0 text-primary text-xl mx-4 font-["littlebit-dotty-variable", sans-serif] blur-sm transition-all duration-200 active:opacity-100 group-hover:opacity-80 group-active:opacity-100  group-hover:scale-125`}
                  style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
                >
                  stephendio
                </div>
              </div>
            }
          />
          <Button
            id='boom'
            children={
              <div className='relative group '>
                <div
                  id='boom'
                  className={`text-primary text-xl mx-4 font-["littlebit-dotty-variable", sans-serif] blur-[0.5px] group-hover:scale-125 group-hover:opacity-80 active:saturate-200 transition-all duration-200 active:opacity-100 hover:opacity-80 group-active:opacity-100 `}
                  style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
                >
                  player
                </div>
                <div
                  id='boom'
                  className={`absolute top-0  right-0 text-primary text-xl mx-4 font-["littlebit-dotty-variable", sans-serif] blur-sm group-hover:scale-125 group-hover:opacity-80 active:saturate-200 transition-all duration-200 active:opacity-100 hover:opacity-80 group-active:opacity-100 `}
                  style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
                >
                  player
                </div>
              </div>
            }
          />
        </div>
      </Row>
    </div>
  );
};

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
  // const testData = await prisma.tvChannel.findMany({
  //   select: {
  //     channelName: true,
  //     channelId: true,
  //   },
  // });
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
    <div className='w-screen h-screen '>
      <WindowEventAdder totalItems={dataList.length} />
      {/* <div className='h-[100vh] w-screen absolute z-50' id='vignette'></div> */}

      {/* <div className='h-[100vh] w-screen absolute z-0 '>
        <Icon
          icon='PictureError'
          defaultHovers={false}
          className='group-hover:scale-125 group-hover:-translate-x-1 group-active:saturate-200   transition-all hover:saturate-50 '
        />
      </div> */}

      <SizeShower />
      {/* <Link href={"/channels"}>wrong page</Link> */}

      <div className='bg-gray-800 w-full lg:h-[100%] lg:flex flex-col justify-center overflow-scroll '>
        {/* <div className='bg-gray-800 w-full lg:h-[87%] lg:flex flex-col justify-center overflow-scroll '> */}
        <div className='w-full flex-wrap  md:justify-center md:w-[98%] md:mt-4 md:m-2 md:gap-4 lg:w-[calc(100% - 4rem)] lg:h-[93%] lg:ml-16 flex flex-row lg:flex-col md:flex-wrap lg:gap-2 lg:mt-4'>
          {dataList &&
            dataList.map((data, index) => {
              return (
                <div
                  className='transition-all hover:shadow-3xl relative hover:z-10 hover:scale-[1.15] bg-slate-600 rounded-md lg:w-[30%] lg:h-[calc(33.33%-0.5rem)] w-full md:w-[calc(50%-1rem)] lg:min-w-[30rem] min-h-[10rem] overflow-clip'
                  key={index}
                >
                  <ButtonifyTest num={index} totalItems={dataList.length} />
                  <img src={data} />
                </div>
              );
            })}
          <div className='relative bg-slate-600 rounded-md lg:w-[30%] lg:h-[calc(33.33%-0.5rem)] w-full md:w-[calc(50%-1rem)] lg:min-w-[30rem] min-h-[10rem]'>
            <ButtonifyTest num={dataList.length} totalItems={dataList.length} />
            +
          </div>
        </div>
      </div>
    </div>
  );
}
