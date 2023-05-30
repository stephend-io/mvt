import Head from "next/head";

export default function Home({ params }: { params: { slug: string } }) {
  <Head>
    <link rel='stylesheet' href='https://use.typekit.net/qln6ttz.css' />
  </Head>;
  return <div className='w-screen h-screen bg-slate-700'>{params.slug}</div>;
}
