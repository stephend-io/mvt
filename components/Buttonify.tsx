"use client";

import useStore, { useActions } from "@/zustand/store";
import { VideoCardParams } from "@/app/page";
import { useEffect, useState } from "react";

const Buttonify = (video: VideoCardParams) => {
  const actions = useActions();
  return (
    <button
      className='absolute top-0 left-0 w-full h-full bg-lime-400 opacity-20'
      onClick={async () => {
        await fetch("http://localhost:3001/channel230").then(async (res) => {
          const data = (await res.json()) as any;
          console.log(data.content[0].videoId);
          actions.setCurrentVideo(data.content[0].videoId);
        });
      }}
    ></button>
  );
};
export const ButtonifyTest = ({
  num,
  totalItems,
}: {
  num: number;
  totalItems: number;
}) => {
  const actions = useActions();
  const { buttonSelected } = useStore();
  const [selected, setSelected] = useState(false);
  return (
    <button
      onClick={() => actions.setSelectedGrid(num)}
      className={`absolute top-0 left-0 w-full h-full duration-100  transition-all  
  ${buttonSelected === num && "border-lime-300 border-8"}
      `}
    ></button>
  );
};

export const WindowEventAdder = ({ totalItems }: { totalItems: number }) => {
  const actions = useActions();
  const { buttonSelected } = useStore();
  console.log("WindowEvventAdder called: " + buttonSelected);

  function keyCallback({ code }: { code: string }) {
    switch (code) {
      case "ArrowRight":
      case "KeyD":
      case "KeyL":
        console.log(
          `Right Clicked || CurrentGrid - ${buttonSelected} || TotalItems - ${totalItems} || `
        );
        if (buttonSelected + 3 <= totalItems) {
          console.log(`inside of thing ${buttonSelected}`);
          actions.setSelectedGrid(buttonSelected + 3);
        }
        break;
      case "KeyA":
      case "KeyH":
      case "ArrowLeft":
        console.log(
          `Left Clicked || CurrentGrid - ${buttonSelected} || TotalItems - ${totalItems} || `
        );
        if (buttonSelected - 3 >= 0)
          actions.setSelectedGrid(buttonSelected - 3);
        break;
      case "KeyW":
      case "KeyK":
      case "ArrowUp":
        console.log(
          `Up Clicked || CurrentGrid - ${buttonSelected} || TotalItems - ${totalItems} || `
        );
        if (buttonSelected - 1 >= 0) {
          console.log("Down clicked");
          actions.setSelectedGrid(buttonSelected - 1);
        }

        break;
      case "KeyS":
      case "KeyJ":
      case "ArrowDown":
        console.log(
          `Down Clicked || CurrentGrid - ${buttonSelected} || TotalItems - ${totalItems} || `
        );
        if (buttonSelected + 1 <= totalItems) {
          console.log("Down clicked");
          actions.setSelectedGrid(buttonSelected + 1);
        }

        break;
    }
  }

  let test: void;

  useEffect(() => {
    console.log("effect called");
    test = window.addEventListener("keydown", keyCallback);
    return () => window.removeEventListener("keydown", keyCallback);
  }, [buttonSelected]);
  return <></>;
};
export default Buttonify;
