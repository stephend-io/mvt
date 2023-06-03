import Absolute from "@/components/Absolute";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Row from "@/components/Row";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "..//app/fonts/Pixel.css";

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

export default function Home() {
  return (
    <div className='w-screen h-screen bg-slate-700'>
      {/* <Link href={"/channels"}>wrong page</Link> */}
      <Navbar />
      <Button>test</Button>
    </div>
  );
}
