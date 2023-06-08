import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { VideoCardParams } from "@/app/page";

type playerTypes =
  | "fullScreen"
  | "semiFullScreen"
  | "mini"
  | "leftQuarter"
  | "rightQuarter"
  | "middleQuarter"
  | "boxMiddle";

type State = {
  currentChannel: number;
  minChannel: number;
  maxChannel: number;
  isRemoteOpen: boolean;
  inputChannel: string;
  volume: number;
  muted: boolean;
  settingsOpen: boolean;
  mouseDown: boolean;
  currentVideo: string | null;
  currentVideoWidth: number;
  currentVideoHeight: number;
  miniVideo: boolean;
  playerType:
    | "fullScreen"
    | "semiFullScreen"
    | "mini"
    | "leftQuarter"
    | "rightQuarter"
    | "middleQuarter"
    | "boxMiddle"
    | undefined;
  playerSizeX: number;
  playerSizeY: number;
  buttonSelected: number;
};

type Actions = {
  actions: {
    curriedIncrement: (by?: number) => () => void;
    setChannel: (to: number) => void;
    incrementChannel: () => void;
    decrementChannel: () => void;
    toggleRemote: () => void;
    addNoToStack: (no: number) => void;
    resetInputStack: () => void;
    incrementVolume: () => void;
    decrementVolume: () => void;
    toggleMuteVolume: () => void;
    upDpad: () => void;
    downDpad: () => void;
    leftDpad: () => void;
    rightDpad: () => void;
    TOBEIMPLEMENTED: () => void;
    toggleSettings: () => void;
    testIncrementVolume: (timer: number) => void;
    toggleMouseDown: (bool?: boolean) => void;
    setCurrentVideo: (video: {
      embedId: string;
      height: number;
      width: number;
    }) => void;
    setMiniVideo: (bool: boolean) => void;
    changeplayerType: (to: playerTypes) => void;
    setSelectedGrid: (to: number) => void;
  };
};

const initState: State = {
  minChannel: 1,
  currentChannel: 1,
  maxChannel: 998,
  isRemoteOpen: false,
  inputChannel: "",
  volume: 24,
  muted: true,
  settingsOpen: false,
  mouseDown: false,
  currentVideo: null,
  currentVideoHeight: 100,
  currentVideoWidth: 56,
  miniVideo: false,
  playerType: undefined,
  playerSizeX: 100,
  playerSizeY: 100,
  buttonSelected: 0,
};

const useStore = create<State & Actions>((set, get) => ({
  ...initState,
  actions: {
    curriedIncrement: (by) => {
      if (!by)
        return () =>
          set((state) => ({ currentChannel: state.currentChannel + 1 }));
      else
        return () =>
          set((state) => ({ currentChannel: state.currentChannel + by }));
    },
    setChannel: (to) => {
      if (to > get().maxChannel) {
        set((state) => ({
          currentChannel: state.minChannel,
        }));
      } else if (to < get().minChannel) {
        set((state) => ({
          currentChannel: state.maxChannel,
        }));
      } else set({ currentChannel: to });
    },
    incrementChannel: () => {
      if (get().currentChannel + 1 > get().maxChannel) {
        set((state) => ({ currentChannel: state.minChannel }));
      } else set((state) => ({ currentChannel: state.currentChannel + 1 }));
    },
    decrementChannel: () => {
      if (get().currentChannel + 1 < get().minChannel) {
        set((state) => ({ currentChannel: state.maxChannel }));
      } else set((state) => ({ currentChannel: state.currentChannel - 1 }));
    },
    toggleRemote: () => set((state) => ({ isRemoteOpen: !state.isRemoteOpen })),
    addNoToStack: (no) => {
      let stack = get().inputChannel;
      if (stack.length > 2) {
        stack = stack.substring(stack.length - 2);
      }
      stack += no;
      if (stack === "000") stack = "0";
      set(() => ({ inputChannel: stack }));
    },
    resetInputStack: () => set({ inputChannel: "" }),
    decrementVolume: () =>
      get().volume >= 2 && set((state) => ({ volume: state.volume - 2 })),
    incrementVolume: () => {
      console.log("incrementVolume called");
      // get().volume <= 98 &&
      set((state) => ({ volume: state.volume + 2, muted: false }));
    },
    testIncrementVolume: (timer) => {
      console.log("testIncrementVolume called");
      if (get().mouseDown) {
        // get().volume <= 98 &&
        set((state) => ({ volume: state.volume + 2, muted: false }));
      } else {
        clearInterval(timer);
      }
    },
    toggleMouseDown: (bool) => {
      bool
        ? set((state) => ({ mouseDown: bool }))
        : set((state) => ({ mouseDown: false }));
    },
    // set((state) => ({ mouseDown: bool ? bool : !state.mouseDown })),

    toggleMuteVolume: () => set((state) => ({ muted: !state.muted })),

    upDpad: () =>
      set((state) => ({ currentChannel: state.currentChannel + 1 })),
    downDpad: () =>
      set((state) => ({ currentChannel: state.currentChannel - 1 })),
    rightDpad: () =>
      get().volume <= 98 && set((state) => ({ volume: state.volume + 2 })),
    leftDpad: () =>
      get().volume >= 2 && set((state) => ({ volume: state.volume - 2 })),
    toggleSettings: () =>
      set((state) => ({ settingsOpen: !state.settingsOpen })),
    setCurrentVideo: (video) => {
      const aspectRatio = `${Number(
        ((video.width / video.height) * 100).toFixed(2)
      )}vh`;
      console.log(video.height / video.width);
      console.log(video.height / video.width <= 1.25);

      document.documentElement.style.setProperty(
        "--playerWidth",
        `${video.width}%`
      );
      document.documentElement.style.setProperty(
        "--playerHeight",
        `${video.height}%`
      );
      document.documentElement.style.setProperty("--aspectRatio", aspectRatio);
      set({ currentVideo: video.embedId });
    },
    setMiniVideo: (bool) => {
      set({ miniVideo: bool });
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

    changeplayerType: (to) => {
      set({ playerType: to });
    },
    setSelectedGrid: (to) => {
      set({ buttonSelected: to });
    },
    TOBEIMPLEMENTED: () => console.log("func not implemented"),
  },
}));
// hooks for conbefore:venience, thanks tkdodo

// state
// export const use = () => useStore(state => state.)
export const useCurrentChannel = () =>
  useStore((state) => state.currentChannel);
export const useMaxChannels = () => useStore((state) => state.maxChannel);
export const useInputNoStack = () => useStore((state) => state.inputChannel);
export const useVolume = () => useStore((state) => state.volume);
export const useMuted = () => useStore((state) => state.muted);

export const useActions = () => useStore((state) => state.actions);

export default useStore;
