import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currentChannel: number;
  maxChannels: number;
  isRemoteOpen: boolean;
  inputChannel: string;
  volume: number;
  muted: boolean;
  settingsOpen: boolean;
  mouseDown: boolean;
};

type Actions = {
  actions: {
    increaseChannelBy: (by: number) => void;
    incrementChannel: () => void;
    decrementChannel: () => void;
    toggleRemote: () => void;
    addNoToStack: (no: number) => void;
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
  };
};

const initState: State = {
  currentChannel: 0,
  maxChannels: 10,
  isRemoteOpen: true,
  inputChannel: "",
  volume: 24,
  muted: true,
  settingsOpen: false,
  mouseDown: false,
};

const useStore = create<State & Actions>((set, get) => ({
  ...initState,
  actions: {
    increaseChannelBy: (by) => {
      console.log("increase called");
      set((state) => ({ currentChannel: state.currentChannel + by }));
    },
    incrementChannel: () => {
      console.log("increment channel called");
      set((state) => ({ currentChannel: state.currentChannel + 1 }));
    },
    decrementChannel: () => {
      console.log("decrement channel called");
      set((state) => ({ currentChannel: state.currentChannel - 1 }));
    },
    toggleRemote: () => set((state) => ({ isRemoteOpen: !state.isRemoteOpen })),
    addNoToStack: (no) =>
      set((state) => ({ inputChannel: state.inputChannel + no })),
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
    TOBEIMPLEMENTED: () => console.log("func not implemented"),
  },
}));
// hooks for conbefore:venience, thanks tkdodo

// state
// export const use = () => useStore(state => state.)
export const useCurrentChannel = () =>
  useStore((state) => state.currentChannel);
export const useMaxChannels = () => useStore((state) => state.maxChannels);
export const useInputNoStack = () => useStore((state) => state.inputChannel);
export const useVolume = () => useStore((state) => state.volume);
export const useMuted = () => useStore((state) => state.muted);

// actions
// export const use = () => useStore(state => state.actions.)
export const useActions = () => useStore((state) => state.actions);
export const useIncrementChannel = () =>
  useStore((state) => state.actions.incrementChannel);
export const useDecrementChannel = () =>
  useStore((state) => state.actions.decrementChannel);
export const useIncreaseBy = () =>
  useStore((state) => state.actions.increaseChannelBy);
export const useIsRemoteOpen = () => useStore((state) => state.isRemoteOpen);
export const useToggleRemote = () =>
  useStore((state) => state.actions.toggleRemote);

export const useIncrementVolume = () =>
  useStore((state) => state.actions.incrementVolume);
export const useDecrementVolume = () =>
  useStore((state) => state.actions.decrementVolume);
export const useToggleMuteVolume = () =>
  useStore((state) => state.actions.toggleMuteVolume);

export const useAddNoToStack = () =>
  useStore((state) => state.actions.addNoToStack);

export default useStore;
