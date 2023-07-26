'use client'
import useStore, { useActions, useCurrentChannel } from '@/zustand/store'
import '@/app/fonts/Pixel.css'
import { useEffect, useState } from 'react'

const ChannelBox = () => {
  const { currentChannel, muted, volume, inputChannel, mouseDown } = useStore()
  const [hidden, setHidden] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [channelChange, setChannelChange] = useState(false)
  const [isDecade, setIsDecade] = useState(false)
  const actions = useActions()

  const timeoutDelay = 5000
  let timeoutID: NodeJS.Timer

  useEffect(() => {
    console.log('mouseover effect')
    setHidden(false)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      setHidden(true)
    }, 1000)
    return () => clearTimeout(timeoutID)
  }, [mouseDown])

  useEffect(() => {
    if (mounted) {
      setHidden(false)
      clearTimeout(timeoutID)
      console.log(currentChannel)
      if (currentChannel <= 90) {
        setIsDecade(true)
      } else {
        setIsDecade(false)
      }
      timeoutID = setTimeout(() => {
        if (inputChannel) {
          // TLDR: go work on other stuff, but when you have time: convert to a custom hook eventually, as currently, this function call is what controls the state. Changing the channel to an invalid value is still protected in store.actions but all of the complexity being controlled by a hook is ideal
          actions.setChannel(Number(inputChannel))
          // animation only
          setChannelChange(true)
          setTimeout(() => {
            setChannelChange(false)
          }, 200)
          actions.resetInputStack()
        }
        setHidden(true)
      }, timeoutDelay)
    } else setMounted(true)
    return () => clearTimeout(timeoutID)
  }, [muted, volume, currentChannel, inputChannel])

  const returnCH = <div>{inputChannel.padStart(4, '0')}</div>

  return (
    <div className={`flex flex-col ${hidden && 'hidden'}`}>
      <div
        id="boom"
        className={`absolute right-20 top-8 z-50 flex translate-x-[2px] flex-row items-center justify-center text-8xl  text-primary blur-[4px] transition-all ${
          channelChange && 'scale-110 saturate-150'
        }`}
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {inputChannel ? returnCH : String(currentChannel).padStart(2, '0')}
        {isDecade && <div className="self-end text-4xl">s</div>}
      </div>
      <div
        id="boom"
        className={`text-["littlebit-dotty-variable", sans-serif] absolute right-20 top-8 z-50 flex flex-row items-center justify-center text-8xl text-primary blur-[1px] transition-all ${
          channelChange && 'scale-110 saturate-150'
        }
        `}
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {inputChannel ? returnCH : String(currentChannel).padStart(2, '0')}

        {isDecade && <div className="self-end text-4xl">s</div>}
      </div>
    </div>
  )
}
export default ChannelBox
