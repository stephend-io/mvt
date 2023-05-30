export default function Home({ params }: { params: { slug: string } }) {
  return <div className='w-screen h-screen bg-slate-700'>{params.slug}</div>;
}
