"use client";
import useStore from "@/zustand/store";
import { VariantProps, cva } from "class-variance-authority";
import dynamic from "next/dynamic";
import Loader from "./Loader";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
  loading: () => <Loader />,
});

const TVplayerStyles = cva(
  "w-full h-full absolute transition-all duration-1000 ease-in-out  rounded-2xl overflow-clip",
  {
    variants: {
      intent: {
        fullScreen: "top-0 right-0",
        semiFullScreen:
          "w-[97vw] h-[98vh] top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 ",
        mini: "top-2 right-2 h-64 w-96",
        leftQuarter: "top-0 right-1/4 w-9/12",
        rightQuarter: "top-0 right-2 w-9/12",
        middleQuarter:
          "top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-9/12",
        boxMiddle:
          "top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4",
        // boxMiddle: "",
        // boxMiddle: "",
      },
      shape: {
        default: "",
        roundedSm: "rounded-sm",
        roundedMd: "rounded-md",
        roundedLg: "rounded-lg",
        roundedXl: "rounded-xl",
      },
    },
    defaultVariants: {
      intent: "semiFullScreen",
      // shape: "roundedXl",
    },
  }
);

type Props = VariantProps<typeof TVplayerStyles> & {};

const TVPlayer = ({ shape }: Props) => {
  const {
    currentVideo,
    volume,
    muted,
    settingsOpen,
    miniVideo,
    playerType: intent,
  } = useStore();
  return (
    <div className={TVplayerStyles({ shape, intent })}>
      <ReactPlayer
        url='https://www.youtube.com/watch?v=0rhpNsg7CUY'
        width='100%'
        height='100%'
        volume={muted ? 0 : volume / 100}
        playing={true}
        loop={true}
        controls={false}
        stopOnUnmount={false}
        pip={true}
      />
    </div>
  );
};
export default TVPlayer;
