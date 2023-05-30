"use client";

import {
  useCurrentChannel,
  useDecrement,
  useIncreaseBy,
  useIncrement,
} from "@/zustand/store";

const Remote = () => {
  const currentChannel = useCurrentChannel();
  const Increment = useIncrement();
  const Decrement = useDecrement();
  const IncreaseBy = useIncreaseBy();

  return (
    <>
      <button onClick={Increment}>+</button>
      <button onClick={Decrement}>-</button>
      <button onClick={() => IncreaseBy(20)}>+20</button>
    </>
  );
};
export default Remote;
