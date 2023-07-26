import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { get as getIdb, set as setIdb, del } from 'idb-keyval'
import { redirect } from 'next/navigation'
import { findNumberRange, getIdbChannelString, numberInNumberRanges } from '@/lib/utils'
import { number } from 'zod'
import { MusicVideo } from '@/components/TVPlayer'

type channelDataType = {
  videos: MusicVideo[]
  videoIndex: number
  maxRank: number
}

type playerTypes = 'fullScreen' | 'semiFullScreen' | 'mini' | 'leftQuarter' | 'rightQuarter' | 'middleQuarter' | 'boxMiddle'

type State = {
  idbPrefix: string
  mouseOver: boolean
  currentChannel: number
  currentChannelVideoIndex: number
  currentChannelTotalVideos: number
  // minChannel: number;
  // maxChannel: number;
  channelRange: number[][]
  isRemoteOpen: boolean
  inputChannel: string
  volume: number
  muted: boolean
  settingsOpen: boolean
  mouseDown: boolean
  currentVideo: {
    title: string
    artist: string
    links: {
      id: string
      width: number
      height: number
    }[]
  }
  currentVideoWidth: number
  currentVideoHeight: number
  miniVideo: boolean
  playerType: 'fullScreen' | 'semiFullScreen' | 'mini' | 'leftQuarter' | 'rightQuarter' | 'middleQuarter' | 'boxMiddle' | undefined
  playerSizeX: number
  playerSizeY: number
  buttonSelected: number
}

type Actions = {
  actions: {
    curriedIncrement: (by?: number) => () => void
    setChannel: (to: number) => void
    incrementChannel: () => void
    decrementChannel: () => void
    toggleRemote: () => void
    addNoToStack: (no: number) => void
    resetInputStack: () => void
    incrementVolume: () => void
    decrementVolume: () => void
    toggleMuteVolume: () => void
    upDpad: () => void
    downDpad: () => void
    leftDpad: () => void
    rightDpad: () => void
    TOBEIMPLEMENTED: () => void
    toggleSettings: () => void
    testIncrementVolume: (timer: number) => void
    toggleMouseDown: () => void
    reportVideo: (songName: string) => void
    loadChannel: (channel: number) => void
    setCurrentVideo: (video: {
      artist: string
      title: string
      links: {
        id: string
        height: number
        width: number
      }[]
    }) => void
    nextVideo: () => void
    setMiniVideo: (bool: boolean) => void
    changeplayerType: (to: playerTypes) => void
    setSelectedGrid: (to: number) => void
    newChannel: (channel: number) => void
  }
}

const initState: State = {
  currentChannel: 2019,
  currentChannelTotalVideos: 0,
  currentChannelVideoIndex: 0,
  isRemoteOpen: false,
  inputChannel: '',
  volume: 40,
  channelRange: [
    [80, 80],
    [90, 90],
    [0, 0],
    [10, 10],
    [1980, 2019],
  ],
  muted: false,
  settingsOpen: false,
  mouseDown: false,
  mouseOver: false,
  idbPrefix: 'kindaliketv-',
  currentVideo: {
    artist: 'ERROR',
    title: 'No Artist',
    links: [{ id: 'H2E7LteVmXg', width: 100, height: 56 }],
  },
  currentVideoHeight: 100,
  currentVideoWidth: 56,
  miniVideo: false,
  playerType: undefined,
  playerSizeX: 100,
  playerSizeY: 100,
  buttonSelected: 0,
}

const useStore = create<State & Actions>((set, get) => ({
  ...initState,
  actions: {
    curriedIncrement: (by) => {
      if (!by) return () => set((state) => ({ currentChannel: state.currentChannel + 1 }))
      else return () => set((state) => ({ currentChannel: state.currentChannel + by }))
    },
    // when channel is not in the channel ranges, defaults to the minimum value of the highest channel range
    setChannel: (to) => {
      console.log(`Calling channel: ${to}`)
      const numberInRange = numberInNumberRanges(to, get().channelRange)
      if (numberInRange) {
        console.log('valid channel ' + to)
        // set((state) => ({
        //   currentChannel: to,
        // }));
        get().actions.loadChannel(to)
      } else {
        // set((state) => ({
        //   currentChannel: get().channelRange[get().channelRange.length-1][0]
        // }))
        console.log(`Channel: ${to} not in range`)
        get().actions.loadChannel(get().channelRange[get().channelRange.length - 1][0])
      }
    },
    incrementChannel: () => {
      const nextNumberInRange = numberInNumberRanges(get().currentChannel + 1, get().channelRange)
      console.log('increment called: ')
      console.log(`Next number is: ${get().currentChannel + 1}`)
      if (nextNumberInRange) {
        // console.log("actually incrementing");
        // set((state) => ({ currentChannel: state.currentChannel+1}));
        get().actions.loadChannel(get().currentChannel + 1)
        // getIdb(
        //   (get().idbPrefix +
        //     String(get().currentChannel + 1).padStart(2, "0")) as any
        // ).then((nextChannelData) => {
        //   set((state) => {
        //     state.actions.setCurrentVideo(
        //       nextChannelData.videos[nextChannelData.videoIndex]
        //     );
        //     return {};
        //   });
        //   // set((state) => ({
        //   state.actions.setCurrentVideo(
        //     nextChannelData.videos[nextChannelData.videoIndex]
        //   )
        // }));
      } else {
        // set((state) => ({
        //   currentChannel: state.channelRange[state.channelRange.length-1][0]
        // }))
        console.log('called')
        console.log(`${get().currentChannel} === ${get().channelRange[get().channelRange.length - 1][1]}`)
        if (get().currentChannel === get().channelRange[get().channelRange.length - 1][1]) {
          get().actions.loadChannel(get().channelRange[0][0])
          return
        }
        const currentChannelIndex = findNumberRange(get().currentChannel, get().channelRange)
        console.log(currentChannelIndex)
        if (currentChannelIndex !== -1) {
          console.log('TEST: ')
          console.log(`Current Channel: ${get().currentChannel}, ChannelIndex: ${currentChannelIndex}, Value of channelIndex: ${get().channelRange[currentChannelIndex]}`)
          console.log(`Current Channel: ${get().currentChannel}, NextChannelIndex: ${currentChannelIndex + 1}, Value of nextchannelIndex: ${get().channelRange[currentChannelIndex + 1]}`)

          if (currentChannelIndex + 1 <= get().channelRange.length) {
            get().actions.loadChannel(get().channelRange[currentChannelIndex + 1][0])
            return
          } else {
            console.log('is it supposed to be here')
            get().actions.loadChannel(get().channelRange[0][0])
            return
          }
        } else {
          console.log('else called')
          const currChannelIndex = findNumberRange(get().currentChannel, get().channelRange)
          if (currChannelIndex + 1 <= get().channelRange.length) {
            console.log('this one')
            get().actions.loadChannel(get().channelRange[currChannelIndex + 1][0])
          } else {
            console.log('this one instead')
            get().actions.loadChannel(get().channelRange[get().channelRange.length - 1][0])
          }
        }
        // getIdb(
        //   (get().idbPrefix +
        //     String(get().currentChannel + 1).padStart(2, "0")) as any
        // ).then((nextChannelData) => {
        //   set((state) => {
        //     state.actions.setCurrentVideo(
        //       nextChannelData.videos[nextChannelData.videoIndex]
        //     );
        //     return {};
        //   });
        // });
        // }

        // set((state) => ({ currentChannel: state.currentChannel + 1 }));
      }
    },
    decrementChannel: () => {
      console.log('decrementChannel called...')
      let prevNumberInRange = numberInNumberRanges(get().currentChannel - 1, get().channelRange)
      if (prevNumberInRange) {
        // set((state) => ({ currentChannel: state.currentChannel-1}));
        get().actions.loadChannel(get().currentChannel - 1)
        // } else set((state) => ({ currentChannel: state.channelRange[0][state.channelRange[0].length-1] }));
      } else {
        console.log('prevNumberNotInRange')
        // checks if current channel is the smallest valid channelNo and sets it to the maximum valid channelNo
        if (get().currentChannel === get().channelRange[0][0]) {
          get().actions.loadChannel(get().channelRange[get().channelRange.length - 1][1])
          return
        }
        // finds the current channel index and sets the channel to the prev channelIndex
        const currentChannelIndex = findNumberRange(get().currentChannel, get().channelRange)
        if (currentChannelIndex) {
          get().actions.loadChannel(get().channelRange[currentChannelIndex - 1][1])
        } else {
          // unforeseen errors happening
          console.log('Unexpected error!')
          get().actions.loadChannel(get().channelRange[0][1])
        }
      }
    },
    toggleRemote: () => set((state) => ({ isRemoteOpen: !state.isRemoteOpen })),
    addNoToStack: (no) => {
      let stack = get().inputChannel
      if (stack.length >= 4) {
        stack = stack.substring(stack.length - 3)
      }
      stack += no
      if (stack === '0000') stack = '0'
      set(() => ({ inputChannel: stack }))
    },
    resetInputStack: () => set({ inputChannel: '' }),
    decrementVolume: () => get().volume >= 2 && set((state) => ({ volume: state.volume - 2 })),
    incrementVolume: () => get().volume <= 98 && set((state) => ({ volume: state.volume + 2 })),
    newChannel: async (channel) => {
      const res = await fetch(`http://localhost:2221/api/channels/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          minYear: String(channel),
        },
      })
      console.log(res)
      const data = await res.json()
      // get().actions.setCurrentVideo(data[0]);
      const idbName = getIdbChannelString(channel)
      await setIdb(idbName, {
        videos: [...data],
        videoIndex: 0,
        total: data.length,
      })
      get().actions.loadChannel(channel)
    },
    testIncrementVolume: (timer) => {
      console.log('testIncrementVolume called')
      if (get().mouseDown) {
        // get().volume <= 98 &&
        set((state) => ({ volume: state.volume + 2, muted: false }))
      } else {
        clearInterval(timer)
      }
    },
    toggleMouseDown: () => {
      console.log('toggleMousedown called')
      get().mouseDown ? set(() => ({ mouseDown: false })) : set(() => ({ mouseDown: true }))
    },
    // set((state) => ({ mouseDown: bool ? bool : !state.mouseDown })),
    toggleMuteVolume: () => set((state) => ({ muted: !state.muted })),
    upDpad: () => get().actions.incrementChannel(),
    downDpad: () => get().actions.decrementChannel(),
    rightDpad: () => get().actions.incrementVolume(),
    leftDpad: () => get().actions.decrementVolume(),

    toggleSettings: () => set((state) => ({ settingsOpen: !state.settingsOpen })),
    setCurrentVideo: (video) => {
      console.log('Playing: ')
      console.log(video)
      const aspectRatio = `${Number(((video.links[0].width / video.links[0].height) * 100).toFixed(2))}vh`
      console.log('setCurrentVideo')

      document.documentElement.style.setProperty('--playerWidth', `${video.links[0].width}%`)
      document.documentElement.style.setProperty('--playerHeight', `${video.links[0].height}%`)
      document.documentElement.style.setProperty('--aspectRatio', aspectRatio)
      set({ currentVideo: video })
    },
    reportVideo: (songName) => {
      // ! TODO - Report channel and remove from circulation?
      console.log('reported: ' + songName)
      get().actions.nextVideo()
    },
    loadChannel: async (channel: number) => {
      let idbName = getIdbChannelString(channel)
      console.log(idbName)

      const data = (await getIdb(idbName)) as { videos: MusicVideo[]; videoIndex: number }
      console.log(data)
      if (data) {
        if (data.videos.length > data.videoIndex) {
          // console.log(data.videos)
          // console.log(data.videos.length)
          // console.log(data.videoIndex)
          // set({
          //   currentVideo: data.videos[data.videoIndex],
          // });

          // set ahead of time to prevent UI from dleaying its channel update
          set({ currentChannel: channel })
          get().actions.setCurrentVideo(data.videos[data.videoIndex])
          await setIdb(idbName, { ...data, videoIndex: data.videoIndex + 1 })
          set((state) => ({
            currentChannelTotalVideos: data.videos.length,
            currentChannelVideoIndex: data.videoIndex,
          }))
        } else {
        }
      } else {
        // !!!!! FIX
        // console.log('attempting to make new channel: ' + channel)
        get().actions.newChannel(channel)
      }
    },

    // changeplayerType: (to) => {
    //   switch (to) {
    //     case "fullScreen":
    //       set({ playerSizeX: 100, playerSizeY: 100, playerType: to });
    //       break;
    //     case "semiFullScreen":
    //       set({ playerSizeX: 98, playerSizeY: 98, playerType: to });
    //       break;
    //     case "mini":
    //       set({ playerSizeX: 30, playerSizeY: 20, playerType: to });
    //       break;
    //     case "leftQuarter":
    //       set({ playerSizeX: 70, playerSizeY: 100, playerType: to });
    //       break;
    //     case "rightQuarter":
    //       set({ playerSizeX: 70, playerSizeY: 100, playerType: to });
    //       break;
    //     case "middleQuarter":
    //       set({ playerSizeX: 70, playerSizeY: 100, playerType: to });
    //       break;
    //     case "boxMiddle":
    //       set({ playerSizeX: 50, playerSizeY: 100, playerType: to });
    //       break;
    //     default:
    //       break;
    //   }
    // },
    setMiniVideo: (bool) => {
      set({ miniVideo: bool })
    },
    nextVideo: () => {
      ;(async () => {
        if (get().currentChannelTotalVideos > get().currentChannelVideoIndex) {
          const channel = get().currentChannel
          const idbName = getIdbChannelString(get().currentChannel)
          const data = (await getIdb(idbName)) as channelDataType
          if (data) {
            if (data.videos.length + 2 > data.videoIndex) {
              if (data.maxRank) {
                const res = await fetch(`http://localhost:2221/api/channels/`, {
                  // method: "GET",
                  headers: {
                    'Content-Type': 'application/json',
                    minYear: String(channel),
                    minRank: String(data.maxRank),
                    maxRank: String(data.maxRank + 20),
                  },
                })
                const parsedData = await res.json()
              }

              set(() => ({
                currentChannel: channel,
                currentChannelTotalVideos: data.videos.length,
                currentChannelVideoIndex: data.videoIndex + 1,
              }))
              get().actions.setCurrentVideo(data.videos[data.videoIndex])

              // console.log(name + "-" + channel);
              // console.log(data.videoIndex + "/" + data.videos.length);
              // set({
              //   currentVideo: data[data.videoIndex],
              // });
              // get().actions.loadChannel(get().currentChannel)
              // if (data.videoIndex >= data.videos.length) {
              // }
              setIdb(getIdbChannelString(get().currentChannel), {
                ...data,
                videoIndex: data.videoIndex + 1,
              })
            } else {
              console.log('no data found somehow')
            }
          } else {
            // ! TODO - fetch 20 to 40 or 1 to 40 idk
            const res = await fetch(`http://localhost:2221/api/channels/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                minYear: String(get().currentChannel),
                minRank: '21',
                maxRank: '40',
              },
            })
            const data = await res.json()
            // get().actions.setCurrentVideo(data[0]);
            await setIdb(getIdbChannelString(get().currentChannel), {
              videos: [...data],
              videoIndex: 0,
              total: data.length,
            })
            get().actions.loadChannel(get().currentChannel)
          }
        }
      })()
      console.log('play next video')
      return
    },
    changeplayerType: (to) => {
      set({ playerType: to })
    },
    setSelectedGrid: (to) => {
      set({ buttonSelected: to })
    },
    TOBEIMPLEMENTED: () => console.log('func not implemented'),
  },
}))

export const useCurrentChannel = () => useStore((state) => state.currentChannel)
export const useActions = () => useStore((state) => state.actions)

export default useStore
