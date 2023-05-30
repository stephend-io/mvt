import { create } from "zustand";

type State = {
  currentChannel: number;
  maxChannels: number;
};

type Actions = {
  actions: {
    increase: (by: number) => void;
    increment: () => void;
    decrement: () => void;
  };
};

const initState: State = {
  currentChannel: 0,
  maxChannels: 1,
};

const useBearStore = create<State & Actions>()((set) => ({
  ...initState,
  actions: {
    increase: (by) => {
      console.log("increase called");
      set((state) => ({ currentChannel: state.currentChannel + by }));
    },
    increment: () =>
      set((state) => ({ currentChannel: state.currentChannel + 1 })),
    // decrement: () =>
    //   set((state) => ({ currentChannel: state.currentChannel + 1 })),
    decrement: () => set(test),
  },
}));

export const useCurrentChannel = () =>
  useBearStore((state) => state.currentChannel);
export const useMaxChannels = () => useBearStore((state) => state.maxChannels);
export const useIncrement = () =>
  useBearStore((state) => state.actions.increment);
export const useDecrement = () =>
  useBearStore((state) => state.actions.decrement);
export const useIncreaseBy = () =>
  useBearStore((state) => state.actions.increase);

function test(state: State) {
  return {
    currentChannel: state.currentChannel - 1,
  };
}
