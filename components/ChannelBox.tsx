'use client'
import useStore, { useActions, useCurrentChannel } from '@/zustand/store'
import '@/app/fonts/Font.css'
import { useEffect, useState } from 'react'
import Loader from './Loader'

type InputTypes = 'Year' | 'Month' | 'Decade'

const ChannelBox = () => {
  const { currentChannel, muted, volume, inputChannel, mouseDown, isDecade, isMonth, detailsHidden } = useStore()
  const [inputType, setInputType] = useState<InputTypes>('Decade')
  const [channelString, setChannelString] = useState('')
  const [inputChannelStr, setInputChannelString] = useState('')
  const [hidden, setHidden] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [channelChange, setChannelChange] = useState(false)
  const actions = useActions()

  const timeoutDelay = 3000
  let timeoutID: NodeJS.Timer

  useEffect(() => {
    const inputChannelLength = String(inputChannel).length
    if (inputChannelLength <= 2) {
      setInputChannelString(String(inputChannel).padStart(2, '0'))
      setInputType('Decade')
    } else if (inputChannelLength <= 4) {
      setInputChannelString(String(inputChannel).padStart(4, '0'))
      setInputType('Year')
    } else if (inputChannelLength <= 4) {
    } else {
      const temp = String(inputChannel).padStart(6, '0')
      setInputChannelString(temp.slice(0, 2) + '-' + temp.slice(2, 6))
      setInputType('Month')
    }
  }, [inputChannel])

  useEffect(() => {
    if (isDecade) {
      setChannelString(String(currentChannel))
    } else if (isMonth) {
      const formattedChannel = String(currentChannel).padStart(6, '0')
      setChannelString(formattedChannel.slice(0, 2) + '-' + formattedChannel.slice(2, 6))
    } else {
      setChannelString(String(currentChannel))
    }
  }, [currentChannel])

  useEffect(() => {
    if (mounted) {
      setHidden(false)
      clearTimeout(timeoutID)

      timeoutID = setTimeout(() => {
        if (inputChannel) {
          actions.setChannel(Number(inputChannel))

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

  return (
    <div className={`flex flex-col ${detailsHidden && 'hidden'}`}>
      <div
        className={`absolute right-8 top-8 z-50 flex translate-x-[2px] flex-col items-end justify-center text-right ${
          isMonth ? 'text-4xl lg:text-8xl ' : 'text-8xl '
        } text-primary blur-[4px] transition-all ${channelChange && 'scale-110 saturate-150'} font-pixel`}
      >
        {inputChannel ? (
          <>
            <div>{inputChannelStr}</div>
            <div className="flex self-end text-base">{inputType === 'Decade' ? <div>decade</div> : inputType === 'Month' ? <div>month</div> : <div>year</div>}</div>
          </>
        ) : (
          <div>{channelString.padStart(2, '0')}</div>
        )}
      </div>
      <div
        className={`text-["littlebit-dotty-variable", sans-serif] absolute right-8 top-8 z-50 flex flex-col items-end justify-center text-right ${
          isMonth ? 'text-md text-4xl lg:text-8xl ' : 'text-8xl '
        } text-primary blur-[1px] transition-all ${channelChange && 'scale-110 saturate-150'} font-pixel
        `}
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {inputChannel ? (
          <>
            <div>{inputChannelStr}</div>
            <div className="flex self-end text-base">{inputType === 'Decade' ? <div>decade</div> : inputType === 'Month' ? <div>month</div> : <div>year</div>}</div>
          </>
        ) : (
          <div>{channelString.padStart(2, '0')}</div>
        )}
      </div>
    </div>
  )
}
export default ChannelBox
