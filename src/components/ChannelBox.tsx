"use client";
import useStore, { useActions, useCurrentChannel } from "@/zustand/store";
import "../../app/fonts/Pixel.css";
import { useEffect, useState } from "react";

const ChannelBox = () => {
  const { currentChannel, muted, volume, inputChannel } = useStore();
  const [hidden, setHidden] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [channelChange, setChannelChange] = useState(false);
  const actions = useActions();

  const timeoutDelay = 5000;
  let timeoutID: NodeJS.Timer;

  useEffect(() => {
    if (mounted) {
      setHidden(false);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        if (inputChannel) {
          // TLDR: go work on other stuff, but when you have time: convert to a custom hook eventually, as currently, this function call is what controls the state. Changing the channel to an invalid value is still protected in store.actions but all of the complexity being controlled by a hook is ideal
          actions.setChannel(Number(inputChannel));
          // animation only
          setChannelChange(true);
          setTimeout(() => {
            setChannelChange(false);
          }, 200);
        }
        setHidden(true);
      }, timeoutDelay);
    } else setMounted(true);
    return () => clearTimeout(timeoutID);
  }, [muted, volume, currentChannel, inputChannel]);

  const returnCH = <div>{inputChannel.padStart(3, "0")}</div>;

  return (
    <div className={`flex flex-col ${hidden && "hidden"}`}>
      <div
        id='boom'
        className={`text-primary transition-all text-8xl absolute top-4 right-4  blur-[4px] translate-x-[2px] ${
          channelChange && "scale-110 saturate-150"
        }`}
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {inputChannel ? returnCH : currentChannel}
      </div>
      <div
        id='boom'
        className={`text-primary transition-all text-8xl absolute top-4 right-4 text-["littlebit-dotty-variable", sans-serif] blur-[1px] ${
          channelChange && "scale-110 saturate-150"
        }
        `}
        style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }}
      >
        {inputChannel ? returnCH : currentChannel}
      </div>
    </div>
  );
};
export default ChannelBox;
