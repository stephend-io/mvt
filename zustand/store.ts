import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { get as getIdb, set as setIdb, del } from 'idb-keyval'
import { redirect } from 'next/navigation'
import { findNumberRange, getIdbChannelString, numberInAppYearRange, numberInNumberRanges } from '@/lib/utils'
import { number } from 'zod'
import { MusicVideo } from '@/components/TVPlayer'

type channelDataType = {
  videos: MusicVideoType[]
  videoIndex: number
  maxRank: number
}

type playerTypes = 'fullScreen' | 'semiFullScreen' | 'mini' | 'leftQuarter' | 'rightQuarter' | 'middleQuarter' | 'boxMiddle'

export type MusicVideoType = {
  artist: string
  title: string
  rank: number
  year: number
  links: {
    id: string
    height: number
    width: number
  }[]
}

type State = {
  idbPrefix: string
  mouseOver: boolean
  mounted: boolean
  currentChannel: number
  currentChannelVideoIndex: number
  currentChannelTotalVideos: number
  isDecade: boolean
  isMonth: boolean
  channelLoaded: boolean
  // minChannel: number;
  // maxChannel: number;
  channelRange: number[][]
  isRemoteOpen: boolean
  inputChannel: string
  volume: number
  isVignette: boolean
  hitsRank: number
  yearRank: number
  songDetails: string
  defaultChannel: number
  color: string
  muted: boolean
  isSettingsOpen: boolean
  mouseDown: boolean
  detailsHidden: boolean
  currentVideo: MusicVideoType

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
    reportVideo: () => void
    loadChannel: (channel: number) => void
    setDetailsHidden: (to: boolean) => void
    resetState: () => void
    setCurrentVideo: (video: MusicVideoType) => void
    nextVideo: () => void
    previousVideo: () => void
    setMiniVideo: (bool: boolean) => void
    changeplayerType: (to: playerTypes) => void
    setSelectedGrid: (to: number) => void
    newChannel: (channel: number) => void
    newMonthChannel: (channelString: string) => void
    getMonthChannel: (channelString: string) => void
  }
}

const initState: State = {
  color: 'blue',
  mounted: false,
  defaultChannel: 1,
  channelLoaded: false,
  hitsRank: 20,
  yearRank: 40,
  isVignette: true,
  isDecade: false,
  isMonth: false,
  songDetails: 'fade',
  currentChannel: 1,
  detailsHidden: false,
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
  isSettingsOpen: false,
  mouseDown: false,
  mouseOver: false,
  idbPrefix: 'kindaliketv-',
  currentVideo: {
    artist: 'ERROR',
    title: 'NO-SONG',
    rank: 0,
    year: 0,
    links: [{ id: 'n5Q4Y5nLvrg', width: 100, height: 56 }],
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
    resetState: () => {
      get().actions.setCurrentVideo({
        artist: 'ERROR',
        title: 'NO-SONG',
        rank: 0,
        year: 0,
        links: [{ id: 'Vrr3lRLjZ1Y', width: 100, height: 56 }],
      })
      set({ currentChannel: 1, channelLoaded: false })
    },
    // when channel is not in the channel ranges, defaults to the minimum value of the highest channel range
    setChannel: (to) => {
      set({ inputChannel: '' })
      if (to === get().currentChannel) {
        return
      }
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
      if (get().isMonth) {
        const currMonth = Number(String(get().currentChannel).padStart(6, '0').slice(0, 2))
        if (currMonth >= 1 && currMonth <= 11) get().actions.loadChannel(get().currentChannel + 10000)
        else {
          const nextNumberInRange = numberInAppYearRange(get().currentChannel + 1)
          if (nextNumberInRange) {
            get().actions.loadChannel(get().currentChannel + 10000)

            get().actions.loadChannel(Number('1' + String(get().currentChannel + 1).slice(2, 6)))
          } else {
            // channel when max month and year ar ehit
            get().actions.loadChannel(11980)
          }
        }

        //   if (Math.floor(get().currentChannel / 10000) <= 11) {
        //     get().actions.loadChannel(get().currentChannel + 10000)
        //   } else {
        //     console.log(`get().actions.loadChannel(${Number('1' + String(get().currentChannel).slice(2, 6))})`)

        //     get().actions.loadChannel(Number('1' + String(get().currentChannel).slice(2, 6)))
        //   }
        // }
        return
      }
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
      if (get().isMonth) {
        const currMonth = Number(String(get().currentChannel).padStart(6, '0').slice(0, 2))
        if (currMonth > 1 && currMonth <= 12) get().actions.loadChannel(get().currentChannel - 10000)
        else {
          const nextNumberInRange = numberInAppYearRange(get().currentChannel - 1)
          if (nextNumberInRange) {
            get().actions.loadChannel(get().currentChannel - 10000)

            get().actions.loadChannel(Number('1' + String(get().currentChannel - 1).slice(2, 6)))
          } else {
            // channel when max month and year ar ehit
            get().actions.loadChannel(122019)
          }
        }
      }

      if (get().isMonth) {
        const nextNumberInRange = numberInAppYearRange(get().currentChannel - 1)
        console.log(`nextNumberInRange: ${nextNumberInRange}`)
        if (nextNumberInRange) {
          if (Math.floor(get().currentChannel / 10000) >= 2) {
            get().actions.loadChannel(get().currentChannel - 10000)
          } else {
            console.log(`get().actions.loadChannel(${Number('12' + String(get().currentChannel).slice(2, 6))})`)
            get().actions.loadChannel(Number('12' + Number(String(get().currentChannel).slice(1, 6))) - 1)
          }
        }
        return
      }

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
      // let stack = get().inputChannel
      // if (stack.length >= 4) {
      //   stack = stack.substring(stack.length - 3)
      // }
      // stack += no
      // if (stack === '0000') stack = '0'
      // set(() => ({ inputChannel: stack }))
      let stack = get().inputChannel
      if (stack.length >= 5) {
        stack = stack.substring(stack.length - 5)
      }
      stack += no
      if (stack === '0000') {
        stack = '0'
      }
      set(() => ({ inputChannel: stack }))
    },
    resetInputStack: () => set({ inputChannel: '' }),
    decrementVolume: () => get().volume >= 2 && set((state) => ({ volume: state.volume - 2 })),
    incrementVolume: () => get().volume <= 98 && set((state) => ({ volume: state.volume + 2 })),
    newMonthChannel: async (channel) => {
      const res = await fetch(`${process.env.ROOT}/api/channels/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          monthYear: channel.padStart(6, '0'),
        },
      })
      if (!res) {
        throw 'error fetching'
      }
      // returns array of top100 items of month
      const data = (await res.json()) as MusicVideoType[]
      const monthChannelString = getIdbChannelString(Number(channel))
      await setIdb(monthChannelString, { videos: [...data], videoIndex: 0, total: data.length })
      get().actions.loadChannel(Number(channel))
    },
    getMonthChannel: async (channel) => {
      const monthChannelString = getIdbChannelString(Number(channel))
      const currData = await getIdb(monthChannelString)
      if (currData) {
        get().actions.loadChannel(Number(channel))
      } else {
        get().actions.newMonthChannel(channel)
      }
    },

    newChannel: async (channel) => {
      if (String(channel).length >= 5) {
        get().actions.newMonthChannel(String(channel))
        return
      }
      const res = await fetch(`${process.env.ROOT}/api/channels/`, {
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
      console.log('setIdb')
      console.log(data)
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

    toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
    setCurrentVideo: (video) => {
      console.log('Playing: ')

      console.log(video)
      console.log(video.links[0])
      console.log(video.links[0].width)
      console.log(video.links[0].height)

      const aspectRatio = `${Number(((video.links[0].width / video.links[0].height) * 100).toFixed(2))}vh`

      document.documentElement.style.setProperty('--playerWidth', `${video.links[0].width}%`)
      document.documentElement.style.setProperty('--playerHeight', `${video.links[0].height}%`)
      document.documentElement.style.setProperty('--aspectRatio', aspectRatio)
      set({ currentVideo: video })
    },
    reportVideo: () => {
      fetch('/api/reports', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: get().currentVideo.title, artist: get().currentVideo.artist }),
      })
      console.log('reported: ' + get().currentVideo.title)
      get().actions.nextVideo()
    },
    setDetailsHidden: (to) => {
      set({ detailsHidden: to })
    },
    loadChannel: async (channel: number) => {
      let idbName = getIdbChannelString(channel)
      console.log(idbName)

      const data = (await getIdb(idbName)) as { videos: MusicVideoType[]; videoIndex: number }
      console.log(data)
      if (data) {
        if (data.videos.length - 1 > data.videoIndex) {
          // console.log(data.videos)
          // console.log(data.videos.length)
          // console.log(data.videoIndex)
          // set({
          //   currentVideo: data.videos[data.videoIndex],
          // });
          const channelStrLength = String(channel).length

          // ! Temporary, make this not ugly
          if (channelStrLength <= 2) {
            set({ isDecade: true })
            set({ isMonth: false })
          } else if (String(channel).length >= 5) {
            set({ isDecade: false })
            set({ isMonth: true })
          } else {
            set({ isDecade: false })
            set({ isMonth: false })
          }

          // set ahead of time to prevent UI from dleaying its channel update
          set({ currentChannel: channel })
          get().actions.setCurrentVideo(data.videos[data.videoIndex])
          // await setIdb(idbName, { ...data, videoIndex: data.videoIndex + 1 })
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
      set({ channelLoaded: true })
    },

    setMiniVideo: (bool) => {
      set({ miniVideo: bool })
    },
    nextVideo: () => {
      if (!get().channelLoaded) {
        return
      }
      ;(async () => {
        if (get().currentChannelTotalVideos - 1 === get().currentChannelVideoIndex) {
          const idbName = getIdbChannelString(get().currentChannel)
          const data = (await getIdb(idbName)) as channelDataType
          const channel = get().currentChannel

          // goes to the lowest rank
          await setIdb(idbName, { ...data, videoIndex: 0 })
          set(() => ({
            currentChannel: channel,
            currentChannelTotalVideos: data.videos.length,
            currentChannelVideoIndex: 0,
          }))
          get().actions.setCurrentVideo(data.videos[0])
          return
        }
        if (get().currentChannelTotalVideos - 1 > get().currentChannelVideoIndex) {
          const channel = get().currentChannel
          const idbName = getIdbChannelString(get().currentChannel)
          const data = (await getIdb(idbName)) as channelDataType
          if (data) {
            set(() => ({
              currentChannel: channel,
              currentChannelTotalVideos: data.videos.length,
              currentChannelVideoIndex: data.videoIndex + 1,
            }))

            get().actions.setCurrentVideo(data.videos[data.videoIndex + 1])
            setIdb(getIdbChannelString(get().currentChannel), {
              ...data,
              videoIndex: data.videoIndex + 1,
            })
          } else {
            const idbName = getIdbChannelString(get().currentChannel)
            const data = (await getIdb(idbName)) as channelDataType
            const channel = get().currentChannel

            // goes to the lowest rank
            await setIdb(idbName, { ...data, videoIndex: 0 })
            set(() => ({
              currentChannel: channel,
              currentChannelTotalVideos: data.videos.length,
              currentChannelVideoIndex: 0,
            }))
            get().actions.setCurrentVideo(data.videos[0])
          }
        }
      })()
      return
    },
    previousVideo: () => {
      if (!get().channelLoaded) {
        return
      }
      ;(async () => {
        if (get().currentChannelVideoIndex === 0) {
          const idbName = getIdbChannelString(get().currentChannel)
          const data = (await getIdb(idbName)) as channelDataType
          const channel = get().currentChannel

          console.log('settings current index to:')
          console.log(data.videos.length - 1)
          // goes to the lowest rank
          await setIdb(idbName, { ...data, videoIndex: data.videos.length - 1 })
          set(() => ({
            currentChannel: channel,
            currentChannelTotalVideos: data.videos.length,
            currentChannelVideoIndex: data.videos.length - 1,
          }))
          get().actions.setCurrentVideo(data.videos[data.videos.length - 1])
          return
        }
        if (get().currentChannelVideoIndex >= 1) {
          console.log('yo222')
          const channel = get().currentChannel
          const idbName = getIdbChannelString(get().currentChannel)
          const data = (await getIdb(idbName)) as channelDataType
          console.log(data)
          if (data) {
            console.log('its actually working here u know')
            console.log('current paying:')
            console.log(get().currentVideo)
            console.log(get().currentChannelVideoIndex)
            set(() => ({
              currentChannel: channel,
              currentChannelTotalVideos: data.videos.length,
              currentChannelVideoIndex: data.videoIndex - 1,
            }))
            setIdb(getIdbChannelString(get().currentChannel), {
              ...data,
              videoIndex: data.videoIndex - 1,
            })
            get().actions.setCurrentVideo(data.videos[get().currentChannelVideoIndex])
          }

          // else {
          //   const idbName = getIdbChannelString(get().currentChannel)
          //   const res = (await getIdb(idbName)) as channelDataType

          //   // goes to the lowest rank
          //   await setIdb(idbName, { ...res, videoIndex: res.videos.length - 1 })
          //   get().actions.loadChannel(get().currentChannel)
          // }
        } else {
          // console.log('yo333')
          // const idbName = getIdbChannelString(get().currentChannel)
          // const data = (await getIdb(idbName)) as channelDataType
          // const channel = get().currentChannel
          // console.log('settings current index to:')
          // console.log(data.videos.length - 1)
          // // goes to the lowest rank
          // await setIdb(idbName, { ...data, videoIndex: data.videos.length - 1 })
          // set(() => ({
          //   currentChannel: channel,
          //   currentChannelTotalVideos: data.videos.length,
          //   currentChannelVideoIndex: data.videos.length - 1,
          // }))
          // get().actions.setCurrentVideo(data.videos[data.videos.length - 1])
          // setIdb(getIdbChannelString(get().currentChannel), {
          //   ...data,
          //   videoIndex: data.videos.length - 1,
          // })
          // get().actions.loadChannel(get().currentChannel)
        }
      })()
      console.log('play next video')
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
