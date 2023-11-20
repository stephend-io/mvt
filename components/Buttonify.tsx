'use client'

import useStore, { useActions } from '@/zustand/store'
// import { VideoCardParams } from "@/app/page";
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const Buttonify = () => {
  const actions = useActions()
  return (
    <button
      className="absolute left-0 top-0 h-full w-full bg-lime-400 opacity-20"
      onClick={async () => {
        await fetch('http://localhost:3001/channel230').then(async (res) => {
          const data = (await res.json()) as any
          console.log(data.content[0].videoId)
          actions.setCurrentVideo(data.content[0].videoId)
        })
      }}
    ></button>
  )
}

export const ButtonifyTest = ({ num, totalItems, imgSrc }: { num: number; totalItems: number; imgSrc?: string }) => {
  const actions = useActions()
  const { buttonSelected } = useStore()
  const [selected, setSelected] = useState(false)
  // const width = useRef("100%");
  // const height = useRef("100%");

  return (
    <button
      id={num.toString()}
      onClick={() => {
        // actions.setSelectedGrid(num);
        // document.getElementById("test")?.scrollIntoView();
        // width.current = "100vw";
        // height.current = "100vh";
      }}
      onMouseOver={
        // selected?.scrollIntoView({ inline: "end" });
        () => actions.setSelectedGrid(num)
      }
      className={`absolute left-0 top-0 z-10 h-full w-full overflow-visible  font-black  text-white  transition-all duration-100
  ${buttonSelected === num && 'border-8 border-lime-300 '}
      `}
      // style={{ width: width.current, height: height.current }}
      // style={{ width: "100vw", height: "100vh" }}
    >
      {/* {String(buttonSelected === num)} */}
      {/* {String(num)} */}
    </button>
  )
}

export const WindowEventAdder = ({ totalItems }: { totalItems: number }) => {
  const actions = useActions()
  const { buttonSelected } = useStore()

  function threeGridControl(keyboardEvent: KeyboardEvent) {
    switch (keyboardEvent.code) {
      case 'ArrowRight':
        keyboardEvent.preventDefault()
      case 'KeyD':
      case 'KeyL':
        console.log('ArrowRight called with buttonSelected: ' + buttonSelected)
        if (buttonSelected + 3 <= totalItems) {
          actions.setSelectedGrid(buttonSelected + 3)
          document.getElementById((buttonSelected + 6).toString())?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest',
          })
        }
        break
      case 'ArrowLeft':
        keyboardEvent.preventDefault()
      case 'KeyH':
      case 'KeyA':
        console.log('ArrowLeft called with buttonSelected: ' + buttonSelected)
        if (buttonSelected - 3 >= 0) actions.setSelectedGrid(buttonSelected - 3)
        document.getElementById((buttonSelected - 6).toString())?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
        break
      case 'KeyW':
      case 'KeyK':
      case 'ArrowUp':
        console.log('ArrowUp called with buttonSelected: ' + buttonSelected)
        if (buttonSelected - 1 >= 0) {
          if (buttonSelected % 3 === 0) {
            if (totalItems - buttonSelected >= 2) actions.setSelectedGrid(buttonSelected + 2)
            else if (totalItems - buttonSelected == 1) actions.setSelectedGrid(buttonSelected + 1)
          } else {
            actions.setSelectedGrid(buttonSelected - 1)
          }
        } else {
          if (totalItems - buttonSelected >= 2) actions.setSelectedGrid(buttonSelected + 2)
          else if (totalItems - buttonSelected == 1) actions.setSelectedGrid(buttonSelected + 1)
        }
        break
      case 'KeyS':
      case 'KeyJ':
      case 'ArrowDown':
        console.log('ArrowDown called with buttonSelected: ' + buttonSelected)
        if (buttonSelected + 1 <= totalItems) {
          if ((buttonSelected + 1) % 3 === 0) {
            actions.setSelectedGrid(buttonSelected - 2)
          } else actions.setSelectedGrid(buttonSelected + 1)
        } else {
          if (buttonSelected === totalItems) actions.setSelectedGrid(buttonSelected - 2)
        }
        break
    }
  }

  useLayoutEffect(() => {
    window.removeEventListener('keydown', threeGridControl)
    window.addEventListener('keydown', threeGridControl)
    return () => window.removeEventListener('keydown', threeGridControl)
  }, [buttonSelected])
  return <></>
}
export default Buttonify
