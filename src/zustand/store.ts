import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currentChannel: number;
  maxChannels: number;
  isRemoteOpen: boolean;
  inputChannel: string;
  volume: number;
  muted: boolean;
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
  };
};

const initState: State = {
  currentChannel: 0,
  maxChannels: 1,
  isRemoteOpen: true,
  inputChannel: "",
  volume: 24,
  muted: true,
};

const useStore = create<State & Actions>((set, get) => ({
  ...initState,
  actions: {
    increaseChannelBy: (by) => {
      console.log("increase called");
      set((state) => ({ currentChannel: state.currentChannel + by }));
    },
    incrementChannel: () =>
      set((state) => ({ currentChannel: state.currentChannel + 1 })),
    decrementChannel: () =>
      set((state) => ({ currentChannel: state.currentChannel - 1 })),
    toggleRemote: () => set((state) => ({ isRemoteOpen: !state.isRemoteOpen })),
    addNoToStack: (no) =>
      set((state) => ({ inputChannel: state.inputChannel + no })),
    decrementVolume: () =>
      get().volume >= 2 && set((state) => ({ volume: state.volume - 2 })),
    incrementVolume: () =>
      get().volume <= 98 &&
      set((state) => ({ volume: state.volume + 2, muted: false })),
    toggleMuteVolume: () => set((state) => ({ muted: !state.muted })),
    upDpad: () =>
      set((state) => ({ currentChannel: state.currentChannel + 1 })),
    downDpad: () =>
      set((state) => ({ currentChannel: state.currentChannel - 1 })),
    rightDpad: () =>
      get().volume <= 98 && set((state) => ({ volume: state.volume + 2 })),
    leftDpad: () =>
      get().volume >= 2 && set((state) => ({ volume: state.volume - 2 })),
    TOBEIMPLEMENTED: () => console.log("func not implemented"),
  },
}));
// hooks for convenience, thanks tkdodo

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
