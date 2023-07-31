'use client'

import ChannelBox from '@/components/ChannelBox'
import Remote from '@/components/Remote'
import Settings from '@/components/Settings'
import TVPlayer from '@/components/TVPlayer'
import VolumeBar from '@/components/VolumeBar'
import { useActions } from '@/zustand/store'
import { useEffect } from 'react'

const Page = async () => {
  const actions = useActions()
  useEffect(() => {
    ;(async () => {
      // await fetch('http://localhost:2221/api/test/')
      console.log(actions.newMonthChannel('031998'))
    })()
  }, [])
  return <div className="relative flex h-screen w-screen flex-col bg-slate-800">test page</div>
}
export default Page
