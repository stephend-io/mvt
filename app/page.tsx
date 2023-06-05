import Absolute from "@/components/Absolute";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Row from "@/components/Row";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "..//app/fonts/Pixel.css";
import Buttonify from "@/components/Buttonify";
import ClientShowcase from "@/components/ClientShowcase";
import { getAndMakeChannels } from "@/services/youtubeDataApi/Channels";

const testData = [
  {
    title: "The Alps Series",
    id: "PLWLHJzWYH_Ec0T5aG1ESBcpgvgtvnrZsm",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "jpPdAjJ6NB0",
    channelTitle: "Sorted Food",
  },
  {
    title: "The 10 Minute Burger Challenge",
    id: "PLWLHJzWYH_EcIoiOFDSIPBrvLiV6uEY_Q",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "Yh8EVPj6jQY",
    channelTitle: "Sorted Food",
  },
  {
    title: "Visit The USA 2022",
    id: "PLWLHJzWYH_EfqH7qo3ooAFrUE_g7Lplph",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "BMe_wrHgbQ4",
    channelTitle: "Sorted Food",
  },
  {
    title: "Big Christmas Bash Documentary Series",
    id: "PLWLHJzWYH_Ed8V2laFNb0RsX2LpjTKeFd",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "5BvbubDL-Bk",
    channelTitle: "Sorted Food",
  },
  {
    title: "Shorts",
    id: "PLWLHJzWYH_EfVbUZpCQaFrwwp4-FUlyVd",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "zhv1ogB5mqo",
    channelTitle: "Sorted Food",
  },
  {
    title: "A-Z Global Cooking Challenges",
    id: "PLWLHJzWYH_EfJ4BltHGkQCZ7S8a2Jf90A",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "Lg-Fq1Bp3L8",
    channelTitle: "Sorted Food",
  },
  {
    title: "Menus that Made History",
    id: "PLWLHJzWYH_EfSs1LEkdkggGoO-4bhe2PN",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "yw9pPCjoNu4",
    channelTitle: "Sorted Food",
  },
  {
    title: "2022 (In Chronological Order)",
    id: "PLWLHJzWYH_EedoOt7p5hj152b_pawCIZg",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "BY9JqsgNLP8",
    channelTitle: "Sorted Food",
  },
  {
    title: "CHEF SKILLS CHALLENGE 2021",
    id: "PLWLHJzWYH_Ed2XFIQWGHzBj3BZITDrAih",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "GrKtkZo3hXo",
    channelTitle: "Sorted Food",
  },
  {
    title: "The Ultimate Chef Skills Challenge",
    id: "PLWLHJzWYH_Ef_d_pwmajniV-r-rNA9j0c",
    ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
    thumbnailId: "GrKtkZo3hXo",
    channelTitle: "Sorted Food",
  },
  // {
  //   title: "Reviewing Restaurant DIY Food Kits",
  //   id: "PLWLHJzWYH_Ed-5kG9-acUsjUdSp9-yjiH",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "17DnI1RfGAk",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "FridgeCam: 2021 (In Chronological Order)",
  //   id: "PLWLHJzWYH_Ec6-lPJWRc_0Hhbppaq-MZO",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "17DnI1RfGAk",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "WELCOME TO SORTEDFOOD!!",
  //   id: "PLWLHJzWYH_EfgEGISdXMFSz0lJcXtRWjk",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "GrKtkZo3hXo",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Chef vs Chef",
  //   id: "PLWLHJzWYH_EduWzL0XsijFV82Lrfm3XMI",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "O9YIVbnyRfs",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Battle",
  //   id: "PLWLHJzWYH_EeWDw6k9z-PGhEdOfAx31jz",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "oCqnSN1ocOY",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Normals Battle",
  //   id: "PLWLHJzWYH_EdOkQFERggocvGF72JZTBQN",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "WeSPeWN7QAA",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Reviewing Food Trends",
  //   id: "PLWLHJzWYH_EfGlj7NFbIrUeGW-iAJ_BEW",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "VSAvlDoXN2o",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Pick The Premium",
  //   id: "PLWLHJzWYH_Edm2V-iIWoIkdtOnjOog5tZ",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "JtjVOp_HFy4",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Like A Chef",
  //   id: "PLWLHJzWYH_EdqfMbNDkuhv62GnU_w0CgC",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "sUiFLt__KOo",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Think Like A Chef",
  //   id: "PLWLHJzWYH_EcZJkAZnww5VIkbHZfrUnK_",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "jiPC3AU31b8",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Reviewing Tinned Foods",
  //   id: "PLWLHJzWYH_Edwd5nXA1QjpKUpcPyFfDbJ",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "JTLNG5SPKCk",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Dubai Food Marathon",
  //   id: "PLWLHJzWYH_EeTq_nf7gKdL6not9z9Vjld",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "v92nrfDAdCU",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Taste Testing PRETENTIOUS Ingredients (In Chronological Order)",
  //   id: "PLWLHJzWYH_EfuoNP260kg2TMxMzS1iJFP",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "zmgYje-TAXY",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Recreating Famous Signature Dishes!! (in chronological order)",
  //   id: "PLWLHJzWYH_EfLlI1UJaa_Uz4N3IPTesnv",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "_7xhP59dzQA",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "Self-Isolation Improvements At Home",
  //   id: "PLWLHJzWYH_Ef9XqjaI64eVpSJoxR9e5mb",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "x5kjO-rTocs",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: No Regrets",
  //   id: "PLWLHJzWYH_EfASMEDlC9GtxA6i-gKv9z5",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "Ez83qtGDZcs",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Off Script",
  //   id: "PLWLHJzWYH_EfKDvSOpJ9kS1Z2Y7zn1EzW",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "lb-garXqtAI",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Get Messy",
  //   id: "PLWLHJzWYH_Edzby94nnaFGqFtSOlnK4-w",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "dP_ISnD5Py0",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Ain't Satisfied",
  //   id: "PLWLHJzWYH_EcT_WazsoSb9rm32pE3N9Z-",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "W1JJDgYqZuk",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Slurp",
  //   id: "PLWLHJzWYH_EfI1M7JvEnMkTTpGvwM3BiW",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "o1XDPDav4Jc",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Cult Follow",
  //   id: "PLWLHJzWYH_EfbB6i_q0FMfT1Y8jcZXsnB",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "Oyg5iFddsJI",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Dig Deep",
  //   id: "PLWLHJzWYH_EfZrOxKHxVUIaN-jlQz-5lj",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "f3KnUxhCo3s",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Drippin'",
  //   id: "PLWLHJzWYH_EdM4tv7QM5ynBiKwcxvsNx-",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "V3o4c4sL9mk",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Wild Ones",
  //   id: "PLWLHJzWYH_EdRlBoGgqxpP1bqCyQk9Koe",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "s2i82up9E1w",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: It's a Breeze",
  //   id: "PLWLHJzWYH_EfVjboxkUoJr0GkDZd8Eoft",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "VeszfFvSJQY",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: My Remedy",
  //   id: "PLWLHJzWYH_Ec5DNfyzoolx85Dww2Tfdj9",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "OddoqwR1QPk",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Baby Let Me Bake",
  //   id: "PLWLHJzWYH_Edl6tcKXBF-0ThNuQyq0liW",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "CUhj7mamJAo",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Last Memories",
  //   id: "PLWLHJzWYH_EfpU01tDDsA4dMfq9CfWyTo",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "xu3KrAykHdQ",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Mama Knows Best",
  //   id: "PLWLHJzWYH_Ed5REXX7q9KvAlp4hXm4E-Q",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "ABfQuZqq8wg",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Out of the Smoke",
  //   id: "PLWLHJzWYH_EduIqSX4WBwjdk1wpOZaldb",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "UXb3-ifcZkw",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Hand It Down",
  //   id: "PLWLHJzWYH_EeZ0oncpIdstb5FNA0qlpHE",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "vHAXp39WjZM",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Morning Sun",
  //   id: "PLWLHJzWYH_EdGI_781pnhLGneCCmxiIcS",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "zBqW6yKz8WA",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Got You Covered",
  //   id: "PLWLHJzWYH_Ed_qWNy-pPuVMedNJ3eRsuu",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "eLHI6r04gzw",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Dive In",
  //   id: "PLWLHJzWYH_EcYGu2bldCczzae9WTan-oy",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "qEY3XLkgbv0",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Finding Home",
  //   id: "PLWLHJzWYH_Edb6_xkKVmF2FsdlfA9NLrQ",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "ToRAFnMeRvA",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Lifted",
  //   id: "PLWLHJzWYH_Efom-Il0991jMjA9rkFF3N4",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "m3YjL49QcyM",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Crunch Time",
  //   id: "PLWLHJzWYH_Ef2GLJcpcb7wRlvT5x6KeXc",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "uRJ7-ms5FZY",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Feel the Heat",
  //   id: "PLWLHJzWYH_EcYsj4PWXUWEtu0NMv648v6",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "x2yWj9ci-h8",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Down 'n' Dirty",
  //   id: "PLWLHJzWYH_Efhw3sRx2LwlPYSgcjvZh2O",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "18EpSFVSqNY",
  //   channelTitle: "Sorted Food",
  // },
  // {
  //   title: "To the Beat: Ready to Go",
  //   id: "PLWLHJzWYH_EeyIp-BifYBgKhdauGDM8Yj",
  //   ChannelId: "UCfyehHM_eo4g5JUyWmms2LA",
  //   thumbnailId: "90wem0lBRUQ",
  //   channelTitle: "Sorted Food",
  // },
];

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
  // const testArr: string[] = [
  //   "UCDq5v10l4wkV5-ZBIJJFbzQ",
  //   "UCfyehHM_eo4g5JUyWmms2LA",
  //   "UCimiUgDLbi6P17BdaCZpVbg",
  //   "UCpqH8-BBNTsluhcOzFKWLuw",
  // ];
  // console.log("making channels");
  // await makeChannels(testArr);
  return (
    <div className='w-screen h-screen bg-slate-700'>
      {/* <Link href={"/channels"}>wrong page</Link> */}
      <div className='flex flex-wrap'>
        {testData.map((data) => {
          // console.log(data);
          return (
            <div className='w-48 h-36 relative hover:scale-150 hover:bg-red-[rgba(255,255,255,0.3)] hover:opacity-50 transition-all  '>
              <VideoCard {...data} />
              <Buttonify {...data} />
            </div>
          );
        })}
      </div>

      <ClientShowcase />
    </div>
  );
}
