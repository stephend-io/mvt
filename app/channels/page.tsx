"use client";

import {
  useCurrentChannel,
  useDecrement,
  useIncreaseBy,
  useIncrement,
} from "@/zustand/store";

const index = () => {
  const currentChannel = useCurrentChannel();
  const Increment = useIncrement();
  const Decrement = useDecrement();
  const IncreaseBy = useIncreaseBy();
  return (
    <div className='w-screen h-screen bg-lime-300 text-4xl text-pink-300'>
      CHANNELZ
      <div className='text-pink-800 text-8xl'>{currentChannel}</div>
      <button onClick={Increment}>+</button>
      <button onClick={Decrement}>-</button>
      <button onClick={() => IncreaseBy(20)}>+20</button>
    </div>
  );
};
export default index;
