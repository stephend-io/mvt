import Absolute from "@/components/Absolute";
import Button from "@/components/Button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='w-screen h-screen bg-slate-700'>
      <Link href={"/channels"}>wrong page</Link>
    </div>
  );
}
function localFont(arg0: { src: string; display: string }) {
  throw new Error("Function not implemented.");
}
