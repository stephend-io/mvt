'use client'
import useStore, { useActions } from '@/zustand/store'
import { VariantProps, cva } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import Loader from './Loader'
import { useEffect, useLayoutEffect, useState } from 'react'
import { get, set } from 'idb-keyval'

import '@/app/styles.scss'
import { SizeShower } from './SizeShower'
import Row from './Row'
import Col from './Col'
// import useTV from "@/app/hooks/useTV";

const ReactPlayer = dynamic(() => import('react-player/youtube'), {
  ssr: false,
  loading: () => <Loader />,
})

const TVplayerStyles = cva('absolute transition-all duration-1000 ease-in-out  overflow-clip', {
  variants: {
    intent: {
      // fullScreen: "top-0 right-0 w-full h-full",
      fullScreen: 'h-full w-full bg-black flex flex-col justify-center items-center ',
      semiFullScreen: 'max-w-[95vw] max-h-[98vh] top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 ',
      mini: 'top-2 right-2 h-1/3 w-1/3',
      leftQuarter: 'top-0 left-2 w-2/3 h-full',
      rightQuarter: 'top-0 right-2 w-2/3 h-full',
      middleQuarter: 'top-1/2  -translate-y-1/2 translate-x-1/2 right-1/2  w-2/3 h-full',
      boxMiddle: 'top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-2/3 h-2/3',
      initial: 'top-[5vh] right-1/2 translate-y-1/2 translate-x-1/2 w-full h-full bg-red-500',
    },
    shape: {
      default: '',
      roundedSm: 'rounded-sm',
      roundedMd: 'rounded-md',
      roundedLg: 'rounded-lg',
      roundedXl: 'rounded-xl',
    },
  },
  defaultVariants: {
    intent: 'fullScreen',
    // shape: "roundedXl",
  },
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

// type Props = VariantProps<typeof TVplayerStyles> & {
//   videos: { embedId: string; width: number; height: number }[];
// };

const TVPlayer = () => {
  const { currentVideo, muted, volume, detailsHidden, isDecade, isMonth, currentChannel } = useStore()
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
  console.log('rerendered tvplayer')
  console.log(currentVideo)

  return (
    // <div className={TVplayerStyles({ intent })}>
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black " onMouseOver={() => actions.toggleMouseDown()}>
      {/* Choices at start are overlaid on top of fully rendered player */}
      {!showPlayer ? (
        <div className="right-1/2 top-1/2 h-full w-full  ">
          <div className="flex h-full w-full justify-between">
            <Col>
              <Row className="mb-4">
                <button onClick={() => actions.setChannel(80)} className=" rounded-md bg-red-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                  80s
                </button>
                <button onClick={() => actions.setChannel(90)} className=" rounded-md bg-green-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                  90s
                </button>
              </Row>
              <Row>
                <button onClick={() => actions.setChannel(0)} className=" rounded-md bg-blue-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                  00s
                </button>

                <button onClick={() => actions.setChannel(10)} className=" rounded-md bg-slate-200 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                  10s
                </button>
              </Row>
              <Row className="mt-4">
                <button onClick={() => actions.setChannel(32005)} className=" rounded-md bg-blue-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                  03-2005
                </button>

                <button
                  onClick={() => actions.setChannel(112010)}
                  className=" rounded-md bg-slate-200 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150"
                >
                  11-2010
                </button>
              </Row>
            </Col>
          </div>
        </div>
      ) : (
        <>
          {/* Outside vignette for when video player goes off screen */}
          <div className="vignette absolute right-0 top-0 h-screen w-screen" />
          {/* Absolutely positioned text showing current breakpoint for debugging */}
          <SizeShower />
          {/* Internal container */}
          <div id="ratio2">
            {/* Inside vignette */}
            <div className="absolute bottom-0 left-0 right-0 top-0 z-50  before:block" id="vignette"></div>
            <div className="absolute bottom-12 left-12 z-50 flex flex-col gap-1 font-black text-white">
              {showPlayer && (
                <>
                  <div>Channel: {currentChannel}</div>

                  <div>isDecade: {String(isDecade)}</div>
                  <div>isMonth: {String(isMonth)}</div>
                </>
              )}
            </div>

            <div className="absolute bottom-12 right-12 z-50 flex flex-col gap-1 text-end font-black text-white">
              {showPlayer && (
                <>
                  {isMonth && <div>{currentVideo.rank}</div>}
                  <div>{currentVideo.title}</div>
                  <div>{currentVideo.artist}</div>
                </>
              )}
            </div>
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
              url={`https://www.youtube.com/watch?v=${currentVideo.links[0].id}`}
              width={'100%'}
              height={'100%'}
              volume={muted || !showPlayer ? 0 : volume / 100}
              playing={showPlayer}
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
