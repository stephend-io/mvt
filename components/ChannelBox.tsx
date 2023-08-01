'use client'
import useStore, { useActions, useCurrentChannel } from '@/zustand/store'
import '@/app/fonts/Font.css'
import { useEffect, useState } from 'react'
import Loader from './Loader'

type InputTypes = 'Year' | 'Month' | 'Decade'

const ChannelBox = () => {
  const { currentChannel, muted, volume, inputChannel, mouseDown, isDecade, isMonth } = useStore()
  const [inputType, setInputType] = useState<InputTypes>('Decade')
  const [channelString, setChannelString] = useState('')
  const [inputChannelStr, setInputChannelString] = useState('')
  const [hidden, setHidden] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [channelChange, setChannelChange] = useState(false)
  // const [isDecade, setIsDecade] = useState(false)
  // const [isMonth, setIsMonth] = useState(false)
  const actions = useActions()

  const timeoutDelay = 5000
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
    console.log('mouseover effect')
    setHidden(false)
    actions.setDetailsHidden(false)
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      setHidden(true)

      actions.setDetailsHidden(true)
    }, 3000)
    return () => clearTimeout(timeoutID)
  }, [mouseDown])

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
      actions.setDetailsHidden(false)
      clearTimeout(timeoutID)

      timeoutID = setTimeout(() => {
        if (inputChannel) {
          // TLDR: go work on other stuff, but when you have time: convert to a custom hook eventually, as currently, this function call is what controls the state. Changing the channel to an invalid value is still protected in store.actions but all of the complexity being controlled by a hook is ideal
          actions.setChannel(Number(inputChannel))
          // animation only
          // setChannelChange(true)
          setTimeout(() => {
            setChannelChange(false)
          }, 200)
          actions.resetInputStack()
        }
        setHidden(true)
        actions.setDetailsHidden(true)
      }, timeoutDelay)
    } else setMounted(true)
    return () => clearTimeout(timeoutID)
  }, [muted, volume, currentChannel, inputChannel])

  return (
    <div className={`flex flex-col ${hidden && 'hidden'}`}>
      <div
        // id="boom"
        className={`absolute right-20 top-8 z-50 flex translate-x-[2px] flex-col items-end justify-center text-8xl  text-primary blur-[4px] transition-all ${
          channelChange && 'scale-110 saturate-150'
        } font-pixel`}
        // style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {/* {isMonth ? 
        <div>test</div>
        ? isDecade 
        ? <div></div>
        :{String(currentChannel).padStart(2, '0')}
} */}
        {/* {isMonth ? <div>is Month</div> : isDecade ? <div>isDecade</div> : <div>{String(currentChannel).padStart(2, '0')}</div>} */}
        {/* <div className="text-white">{channelString}</div> */}
        {/* <div>{inputChannel ? inputChannelStr : channelString}</div>
        <div className="flex self-end text-base">
          <div>Month</div>
          <div>Year</div>
          <div>Decade</div>
        </div> */}
        {inputChannel ? (
          <>
            <div>{inputChannelStr}</div>
            <div className="flex self-end text-base">
              {inputType === 'Decade' ? <div>decade</div> : inputType === 'Month' ? <div>month</div> : <div>year</div>}
              {/* {isDecade && <div>decade</div>}
              {isMonth && <div>month</div>}
              {!isDecade && !isMonth && <div>year</div>} */}
              {/* <div className={`${!isDecade && 'text-gray'}`}>Month</div>
              <div className={`${!isDecade && 'text-gray'}`}>Year</div>
              <div className={`${!isDecade && 'text-gray'}`}>Decade</div> */}
            </div>
          </>
        ) : (
          <div>{channelString.padStart(2, '0')}</div>
        )}
      </div>
      <div
        // id="boom"
        className={`text-["littlebit-dotty-variable", sans-serif] absolute right-20 top-8 z-50 flex flex-col items-end justify-center text-8xl text-primary blur-[1px] transition-all ${
          channelChange && 'scale-110 saturate-150'
        } font-pixel
        `}
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {/* {inputChannel ? returnCH : String(currentChannel).padStart(2, '0')}
        {isDecade && <div className="self-end text-4xl">s</div>} */}
        {/* {channelString} */}

        {inputChannel ? (
          <>
            <div>{inputChannelStr}</div>
            <div className="flex self-end text-base">
              {/* {isDecade ? <div>decade</div> : isMonth ? <div>month</div> : <div>year</div>} */}
              {inputType === 'Decade' ? <div>decade</div> : inputType === 'Month' ? <div>month</div> : <div>year</div>}

              {/* <div>Month</div>
              <div>Year</div>
              <div>Decade</div> */}
            </div>
          </>
        ) : (
          <div>{channelString.padStart(2, '0')}</div>
        )}
        {/* {inputChannel && <Loader />} */}
        {/* </div> */}
      </div>
    </div>
  )
}
export default ChannelBox
