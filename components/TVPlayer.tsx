'use client'
import useStore, { useActions } from '@/zustand/store'
import { VariantProps, cva } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import Loader from './Loader'
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'

import '@/app/fonts/Font.css'
import { get, set } from 'idb-keyval'

import '@/app/styles.scss'
import { SizeShower } from './SizeShower'
import Row from './Row'
import Col from './Col'
import { CLIENT_STATIC_FILES_RUNTIME, CLIENT_STATIC_FILES_RUNTIME_WEBPACK } from 'next/dist/shared/lib/constants'
import QuickSettings from './QuickSettings'
// import useTV from "@/app/hooks/useTV";

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
  loading: () => <Loader />,
})

export type MusicVideo = {
  artist: string
  title: string
  rank: number
  links: {
    id: string
    width: number
    height: number
  }[]
}

const TVPlayer = () => {
  const { currentChannelVideoIndex, mouseDown, currentVideo, muted, volume, detailsHidden, isDecade, isMonth, currentChannel } = useStore()
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    if (currentVideo.title === 'NO-SONG') {
      setShowPlayer(false)
    } else {
      setShowPlayer(true)
    }
  }, [currentVideo])

  const actions = useActions()

  // read from local settings eventually
  const detailFade = true

  const [hideText, setHideText] = useState(false)

  useEffect(() => {
    setHideText(detailsHidden)
  }, [detailsHidden, currentVideo])

  // Timeout used to prevent too many callback invocations
  let mouseHoverDebounce: NodeJS.Timer
  let hideMouseTimeout: NodeJS.Timer
  useEffect(() => {
    actions.setDetailsHidden(false)

    function mouseHoverCallback() {
      // resets both timeouts when mouse is hovered
      clearTimeout(mouseHoverDebounce)
      clearTimeout(hideMouseTimeout)

      // actual call hidden behind a debounce
      mouseHoverDebounce = setTimeout(() => {
        // shows details on hover
        actions.setDetailsHidden(false)

        // delay to hide details
        hideMouseTimeout = setTimeout(() => {
          actions.setDetailsHidden(true)
        }, 5000)
      }, 50)
    }

    window.addEventListener('mousemove', mouseHoverCallback)
    return () => {
      window.removeEventListener('mousemove', mouseHoverCallback)
      clearTimeout(mouseHoverDebounce)
      clearTimeout(hideMouseTimeout)
    }
  }, [currentChannel, currentChannelVideoIndex])

  // const timeoutDelay = 3000
  // let timeoutID: NodeJS.Timer

  // useEffect(() => {
  //   clearTimeout(timeoutID)
  //   console.log('mouseover effect')
  //   actions.setDetailsHidden(false)
  //   timeoutID = setTimeout(() => {
  //     actions.setDetailsHidden(true)
  //   }, timeoutDelay)
  //   return () => clearTimeout(timeoutID)
  // }, [mouseDown])

  // useLayoutEffect(() => {
  //   actions.setCurrentVideo(videos[9].links[0]);
  //   return () => console.log("useLayoutEffect returned");
  // }, [currentVideo]);

  // async function nextVideo() {
  //   const currChannel = (await get("kindalikemtv-" + channel)) as {
  //     currVideo: number;
  //     totalVids: number;
  //   };
  //   if (!currChannel) {
  //     const newChannelData = { currVideo: 0, totalVids: 240 };
  //     actions.setCurrentVideo(videos[0].links[0]);
  //     await set("kindalikemtv-" + channel, newChannelData);
  //   }
  //   if (currChannel.currVideo + 1 <= currChannel.totalVids) {
  //     const currChannelData = (await get(
  //       "kindalikemtv-" + channel + "-data"
  //     )) as MvData;
  //     actions.setCurrentVideo(
  //       currChannelData.videos[currChannel.currVideo].links[0]
  //     );
  //     const newChannelData = {
  //       ...currChannel,
  //       currVideo: currChannel.currVideo + 1,
  //     };
  //     await set("kindalikemtv-" + channel, newChannelData);
  //   }
  // }
  // console.log('rerendered tvplayer')
  // console.log(currentVideo)

  return (
    // <div className={TVplayerStyles({ intent })}>
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black font-pixel ">
      {/* Choices at start are overlaid on top of fully rendered player */}
      {!showPlayer ? (
        // <div className="right-1/2 top-1/2 h-full w-full  ">
        //   <div className="flex h-full w-full justify-between font-pixel text-sm font-bold md:text-4xl">
        //     <Col>
        //       <Row>
        //         <button onClick={() => actions.setChannel(80)} className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-red-400 hover:text-black active:saturate-150">
        //           80s
        //         </button>
        //         <button
        //           onClick={() => actions.setChannel(90)}
        //           className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-green-400 hover:text-black active:saturate-150"
        //         >
        //           90s
        //         </button>
        //       </Row>
        //       <Row>
        //         <button onClick={() => actions.setChannel(0)} className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-blue-400 hover:text-black active:saturate-150">
        //           00s
        //         </button>

        //         <button
        //           onClick={() => actions.setChannel(10)}
        //           className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-slate-200 hover:text-black active:saturate-150"
        //         >
        //           10s
        //         </button>
        //       </Row>
        //       <form className="mt-2 flex  w-1/2 justify-around bg-white text-center font-pixel">
        //         <input onClick={() => null} placeholder="year" className="w-1/3 px-2 text-center" />
        //         <input onClick={() => null} placeholder="month" className="w-1/3 px-2 text-center" />
        //         <button>Enter</button>
        //       </form>
        //       {/* <button
        //         onClick={() => actions.setChannel(32005)}
        //         className=" rounded-md p-2 text-base text-white transition-all duration-75 hover:scale-110 hover:bg-blue-400 hover:text-black active:saturate-150"
        //       >
        //         03-2005
        //       </button>

        //       <button
        //         onClick={() => actions.setChannel(112010)}
        //         className=" rounded-md p-2 text-base text-white transition-all duration-75 hover:scale-110 hover:bg-slate-200 hover:text-black active:saturate-150"
        //       >
        //         11-2010
        //       </button>
        //       <button
        //         onClick={() => actions.setChannel(21980)}
        //         className=" rounded-md p-2 text-base text-white transition-all duration-75 hover:scale-110 hover:bg-blue-400 hover:text-black active:saturate-150"
        //       >
        //         02-1980
        //       </button>

        //       <button
        //         onClick={() => actions.setChannel(112019)}
        //         className=" rounded-md p-2 text-base text-white transition-all duration-75 hover:scale-110 hover:bg-slate-200 hover:text-black active:saturate-150"
        //       >
        //         11-2019
        //       </button> */}
        //     </Col>
        //   </div>
        // </div>
        <QuickSettings />
      ) : (
        <>
          {/* Outside vignette for when video player goes off screen */}
          <div className="vignette absolute right-0 top-0 h-screen w-screen" />
          {/* Absolutely positioned text showing current breakpoint for debugging */}
          {/* <SizeShower /> */}
          {/* Internal container */}
          <div id="ratio2" className="kabel-shadow text-md font-kabel sm:text-lg md:text-4xl">
            {/* Inside vignette */}
            <div className="absolute bottom-0 left-0 right-0 top-0 z-50  before:block" id="vignette"></div>
            <div className="absolute bottom-12 left-12 z-50 flex flex-col gap-1 font-black text-white">
              {showPlayer && !detailsHidden && (
                <>
                  {/* <div>Channel: {currentChannel}</div> */}
                  {/* {JSON.stringify(currentVideo)} */}
                  {/* {currentChannelVideoIndex} */}
                  {isDecade && <div>Year: {currentVideo.year}</div>}
                  {/* <div>isDecade: {String(isDecade)}</div>
                  <div>isMonth: {String(isMonth)}</div> */}
                  {isMonth && <div>Rank: {currentVideo.rank}</div>}
                  <div>{currentVideo.title}</div>
                  <div>{currentVideo.artist}</div>
                </>
              )}
            </div>
            {/* <div className="kabel-shadow absolute bottom-12 right-12 z-50 flex flex-col gap-1 text-end font-kabel font-black text-white">
              {showPlayer && !detailsHidden && (
                <>
                  {isMonth && <div>{currentVideo.rank}</div>}
                  <div>{currentVideo.title}</div>
                  <div>{currentVideo.artist}</div>
                </>
              )}
            </div> */}
            <ReactPlayer
              style={{
                transition: 'ease-in-out',
                transitionDuration: '500ms',
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 0,
                top: 0,
                // left: 0,
                right: 0,
                // bottom: 0,
              }}
              config={{
                playerVars: {
                  showInfo: 1,
                },
              }}
              url={`https://www.youtube.com/watch?v=${currentVideo.links[0].id}`}
              width={'100%'}
              height={'100%'}
              volume={muted || !showPlayer ? 0 : volume / 100}
              playing={true}
              loop={false}
              controls={false}
              stopOnUnmount={false}
              pip={true}
              playbackRate={1}
              onEnded={actions.nextVideo}
            />
          </div>
        </>
      )}
    </div>
  )
}
export default TVPlayer
