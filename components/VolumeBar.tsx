'use client'

// import { useMuted, useVolume } from "@/zustand/store";
import '@/app/fonts/Pixel.css'
import Mute from '@/public/Mute'
import { twMerge } from 'tailwind-merge'
import Icon from './Icon'
import { useEffect, useState } from 'react'
import useStore from '@/zustand/store'

const timeoutDelay = 3000

const VolumeBar = () => {
  const { volume, muted } = useStore()
  const [hidden, setHidden] = useState(true)
  const [mounted, setMounted] = useState(false)
  // const muted = useMuted();
  // const volume = useVolume();

  const content: JSX.Element[] = []
  // I think using the index as a key is koo but let's see
  for (let i = 1; i <= 25; i++) {
    if (i <= volume / 4) content.push(<Whole key={i} />)
    else content.push(<Half key={i} />)
  }

  let timeoutID: NodeJS.Timeout
  useEffect(() => {
    if (mounted) {
      setHidden(false)
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        setHidden(true)
      }, timeoutDelay)
    } else setMounted(true)
    return () => clearTimeout(timeoutID)
  }, [muted, volume])

  return (
    <div className="absolute bottom-12 right-1/2 translate-x-1/2 font-pixel text-xl uppercase md:text-6xl">
      {!hidden && (
        <div className="flex flex-col items-center justify-center text-primary ">
          <div className="flex w-1/2 flex-row items-center justify-between  md:w-full">
            <div className="relative md:mb-6">
              Volume
              <div className={`absolute -right-0.5 top-0 text-primary md:mb-6 ${muted && 'ml-8 '} blur-sm`}>Volume</div>
            </div>

            {muted ? (
              <div className=" flex flex-row items-center  ">
                <Mute className="fill-primary" />
                <div className={`relative md:mb-7 ${muted && 'ml-8 opacity-60'}`}>
                  {volume}

                  <div className={`absolute -right-0.5 top-0 text-primary md:mb-6 ${muted && 'ml-8 '} blur-sm`}>{volume}</div>
                </div>
              </div>
            ) : (
              <div className="relative md:mb-7">
                {volume}

                <div className={`absolute -right-0.5 top-0 text-primary md:mb-6 ${muted && 'ml-8 '} blur-sm`}>{volume}</div>
              </div>
            )}
          </div>
          <div className=" flex flex-row items-center md:mt-4 ">{content}</div>
        </div>
      )}
    </div>
  )
}

// Rqual height
// const Half = () => (
//   <div className='flex '>
//     <div className='w-[0.2rem] h-12 bg-primary m-2' />
//     <div className='absolute w-[0.3rem] h-12 bg-primary m-2 translate-x-[0.1px] blur-[7px]' />
//   </div
// );

const Half = () => (
  <div className="flex ">
    <div className={twMerge('m-1 h-1 w-1  rounded-full bg-primary md:m-2 md:h-2 md:w-2')} />
    <div className={twMerge('absolute m-1 h-1  w-1 translate-x-[0.1px] rounded-full bg-primary blur-[2px] md:m-2 md:h-2 md:w-2')} />
    {/* <div className='absolute w-[0.3rem] h-4 bg-primary m-2 translate-x-[0.1px] blur-[7px]' /> */}
  </div>
)

const Whole = () => (
  <div className="flex">
    <div className={twMerge('m-1 h-4 w-2 bg-primary md:m-2 md:h-12 md:w-4')} />
    <div className={twMerge('absolute m-1 h-4 w-2 -translate-y-[3px] bg-primary blur-[7px] md:m-2 md:h-14 md:w-4')} />
  </div>
)

export default VolumeBar
