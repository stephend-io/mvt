import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  currentChannel: number;
  maxChannels: number;
  isRemoteOpen: boolean;
  inputChannel: string;
  volume: number;
};

type Actions = {
  actions: {
    increase: (by: number) => void;
    increment: () => void;
    decrement: () => void;
    toggleRemote: () => void;
    addNoToStack: (no: number) => void;
  };
};

const initState: State = {
  currentChannel: 0,
  maxChannels: 1,
  isRemoteOpen: true,
  inputChannel: "",
  volume: 20,
};

const useStore = create<State & Actions>((set) => ({
  ...initState,
  actions: {
    // increase: (by) => {
    //   console.log("increase called");
    //   set((state) => ({ currentChannel: state.currentChannel + by }));
    // },
    increase: (by) => {
      console.log("increase called");
      set((state) => ({ currentChannel: state.currentChannel + by }));
    },
    increment: () =>
      set((state) => ({ currentChannel: state.currentChannel + 1 })),
    decrement: () =>
      set((state) => ({ currentChannel: state.currentChannel - 1 })),
    toggleRemote: () => set((state) => ({ isRemoteOpen: !state.isRemoteOpen })),
    addNoToStack: (no) =>
      set((state) => ({ inputChannel: state.inputChannel + no })),
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

// actions
// export const use = () => useStore(state => state.actions.)
export const useIncrement = () => useStore((state) => state.actions.increment);
export const useDecrement = () => useStore((state) => state.actions.decrement);
export const useIncreaseBy = () => useStore((state) => state.actions.increase);
export const useIsRemoteOpen = () => useStore((state) => state.isRemoteOpen);
export const useToggleRemote = () =>
  useStore((state) => state.actions.toggleRemote);

export const useAddNoToStack = () =>
  useStore((state) => state.actions.addNoToStack);
