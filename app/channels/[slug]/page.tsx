'use client'
import ChannelBox from '@/components/ChannelBox'
import Remote from '@/components/Remote'
import TVPlayer from '@/components/TVPlayer'
import VolumeBar from '@/components/VolumeBar'
import useStore, { useActions } from '@/zustand/store'
// import Head from "next/head";
import { get, set, del } from 'idb-keyval'
import { useEffect } from 'react'

type PageData = {
  currentVideo: number
  totalVideos: number
}

export default function Home({ params }: { params: { slug: string } }) {
  // <Head>
  //   <link rel='stylesheet' href='https://use.typekit.net/qln6ttz.css' />
  // </Head>;

  const { currentChannel } = useStore()
  const { setCurrentVideo, nextVideo, setChannel } = useActions()

  const name = 'kindalikemtv'
  useEffect(() => {
    ;(async () => {
      console.log('changing channel from client')
      setChannel(Number(params.slug))
      console.log(`getting from idb: ${name}-${params.slug}`)
      const channelData = await get(`${name}-${params.slug}`)
      if (channelData) {
        console.log('data found')
        // del(`${name}-${params.slug}`);
        setCurrentVideo(channelData[channelData.videoIndex])
      } else {
        console.log('no data')

        let year: string = ''
        if (params.slug.startsWith('8')) {
          year = '198' + params.slug[1]
        } else if (params.slug.startsWith('9')) {
          year = '199' + params.slug[1]
        } else if (params.slug.startsWith('0')) {
          year = '200' + params.slug[1]
        } else {
          year = '201' + params.slug[1]
        }

        const res = await fetch(`http://localhost:2221/api/channels/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            minYear: year,
          },
        })
        console.log('reaching here')

        const data = await res.json()

        console.log(data)

        setCurrentVideo(data[0])
        await set(`${name}-${params.slug}`, {
          ...data,
          videoIndex: 0,
          total: data.length,
        })
      }
    })()
  }, [])
  // const channelData = window.localStorage.getItem("test-data-");

  return (
    <div className="h-screen w-screen bg-slate-700">
      <TVPlayer />
      <Remote />
      <ChannelBox />
      <VolumeBar />
    </div>
  )
}
