// "use client";

// import dynamic from "next/dynamic";
// import useStore from "@/zustand/store";
// import Loader from "./Loader";
// import { useEffect, useState } from "react";
// const ReactPlayer = dynamic(() => import("react-player/youtube"), {
//   ssr: false,
//   loading: () => <Loader />,
// });

// const Player = () => {
//   const { currentVideo, volume, muted, settingsOpen, miniVideo } = useStore();

//   return (
//     <>
//       <div
//         className={`w-screen h-screen ${
//           settingsOpen && "blur-md"
//         } bg-slate-500`}
//       >
//         <div
//           className={`${"top-2 right-2"} absolute transition-all duration-1000 ease-in-out h-64 w-96`}
//         >
//           <ReactPlayer
//             url='https://www.youtube.com/watch?v=0rhpNsg7CUY'
//             width='100%'
//             height='100%'
//             volume={muted ? 0 : volume / 100}
//             playing={true}
//             loop={true}
//             controls={false}
//             stopOnUnmount={false}
//             pip={true}
//           />
//         </div>
//       </div>
//     </>
//   );
// };
// export default Player;
