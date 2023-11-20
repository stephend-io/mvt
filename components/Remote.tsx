'use client'

import useStore, { useActions } from '@/zustand/store'
import Icon from '@/components/Icon'
import { useEffect, useLayoutEffect, useState } from 'react'
import Absolute from './Absolute'
import Col from './Col'
import Row from './Row'

let intervalID: NodeJS.Timer

// simple wrapper to make function call repeatedly whe held
// func() calls the function immediately
function onHold(func: () => void, delay: number = 200) {
  return {
    onTouchStart: () => {
      func()
      repeatCaller(func, delay)
    },
    onMouseDown: () => {
      func()
      repeatCaller(func, delay)
    },
    draggable: false,
  }
}
const repeatCaller = (func: () => void, delay: number) => {
  clearInterval(intervalID)
  intervalID = setInterval(func, delay)
}

const Remote = () => {
  const [hidden, setHidden] = useState(true)
  const [sleepTimer, setSleepTimer] = useState(-1)
  const { detailsHidden } = useStore()
  const timeoutDelay = 5000
  let timeoutID: NodeJS.Timer
  let sleepTimeoutId: NodeJS.Timer

  useEffect(() => {
    if (sleepTimer === -1) return
    clearTimeout(sleepTimeoutId)
    sleepTimeoutId = setTimeout(() => {
      window.close()
      // location.href = ''
    }, sleepTimer)

    return () => clearTimeout(sleepTimeoutId)
  }, [sleepTimer])

  useLayoutEffect(() => {
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
    window.addEventListener('mouseup', () => {
      clearInterval(intervalID)
      clearTimeout(timeoutID)
      setHidden(false)
      timeoutID = setTimeout(() => setHidden(true), timeoutDelay)
    })
    window.addEventListener('touchend', (e) => {
      clearInterval(intervalID)
      // thanks! -> https://github.com/facebook/react/issues/9809
      e.preventDefault()
      clearTimeout(timeoutID)
      timeoutID = setTimeout(() => {
        if (!isRemoteOpen) setHidden(true)
      }, timeoutDelay)
    })
    window.addEventListener('mousemove', () => {
      clearTimeout(timeoutID)
      setHidden(false)
      timeoutID = setTimeout(() => {
        if (!isRemoteOpen) setHidden(true)
      }, timeoutDelay)
    })
    window.addEventListener('keydown', () => {})
  }, [])

  const { isRemoteOpen, isSettingsOpen: settingsOpen, currentVideo } = useStore()
  const actions = useActions()

  useEffect(() => {
    function keyCallback(e: KeyboardEvent) {
      // console.log('keyCallback: ' + e.key)

      if (Number(e.key) || e.key === '0') {
        actions.addNoToStack(Number(e.key))
        // console.log('valid number: ' + e.key)
        return
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'l':
        case 'd':
          actions.nextVideo()
          break
        case 'h':
        case 'a':
        case 'ArrowLeft':
          actions.previousVideo()
          break
        case 'k':
        case 'w':
        case 'ArrowUp':
          actions.incrementChannel()
          break
        case 's':
        case 'j':
        case 'ArrowDown':
          actions.decrementChannel()
          break
        case 'L':
        case 'D':
        case 'W':
        case 'K':
          actions.incrementVolume()
          break
        case 'S':
        case 'A':
        case 'J':
        case 'H':
          actions.decrementVolume()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', keyCallback)
    return () => window.removeEventListener('keydown', keyCallback)
  }, [])

  return (
    <div>
      {/* invisible div that enables clicking on screen to toggle remote instead of an event listener that is tricky not to trigger when clicking on the buttons of the remote*/}
      {isRemoteOpen && <div className="absolute right-0 top-0 h-screen w-screen" onClick={() => actions.toggleRemote()} />}

      <Absolute className={`z-50 overflow-clip text-[1.5rem] text-accent3 transition-all duration-500 ${hidden && 'hidden'}`} x={'rightXl'} y={'bottomXl'} onClick={(e) => e.stopPropagation()}>
        {isRemoteOpen ? (
          <div className=" inherit w-40 rounded-lg bg-slate-800">
            <Col>
              {/* <Row className="flex flex-row justify-between "> */}
              <div className="flex w-full justify-between px-1">
                <Icon
                  icon="Power"
                  onClick={() => {
                    settingsOpen && actions.toggleSettings()
                    actions.toggleRemote()
                    actions.resetState()
                  }}
                  className="m-2"
                />

                {/* <button onClick={() => actions.setMiniVideo(false)}>
                  <div className="mr-3 h-9 w-9 rounded-full bg-lime-300 transition-all hover:scale-125 hover:saturate-200" />
                </button> */}
                <button onClick={() => actions.reportVideo()}>
                  <div className="mr-2 h-9 w-9 rounded-full transition-all hover:scale-125 hover:saturate-200">🚩</div>
                </button>
              </div>
              {/* </Row> */}
              <Row>
                <button onClick={() => actions.addNoToStack(1)}>1</button>
                <button onClick={() => actions.addNoToStack(2)}>2</button>
                <button onClick={() => actions.addNoToStack(3)}>3</button>
              </Row>
              <Row>
                <button onClick={() => actions.addNoToStack(4)}>4</button>
                <button onClick={() => actions.addNoToStack(5)}>5</button>
                <button onClick={() => actions.addNoToStack(6)}>6</button>
              </Row>
              <Row>
                <button onClick={() => actions.addNoToStack(7)}>7</button>
                <button onClick={() => actions.addNoToStack(8)}>8</button>
                <button onClick={() => actions.addNoToStack(9)}>9</button>
              </Row>

              <Row>
                <Icon icon="Record" onClick={() => actions.reportVideo()} size={'s'} />
                <button onClick={() => actions.addNoToStack(0)}>0</button>
                <Icon icon="Settings" onClick={actions.toggleSettings} size={'s'} className="invert-[0.85]" />
              </Row>
              <Col>
                <Row className="mb-4">
                  <button onClick={() => actions.setChannel(80)} className=" rounded-md bg-red-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                    80s
                  </button>
                  <button onClick={() => actions.setChannel(90)} className=" rounded-md bg-green-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                    90s
                  </button>
                </Row>
                <Row>
                  <button onClick={() => actions.setChannel(0)} className=" rounded-md bg-blue-400 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                    00s
                  </button>

                  <button onClick={() => actions.setChannel(10)} className=" rounded-md bg-slate-200 p-2 text-base transition-all duration-75 hover:scale-110 hover:saturate-[0.2] active:saturate-150">
                    10s
                  </button>
                </Row>
              </Col>

              <Row className="mt-4">
                <Col className="flex flex-col items-center justify-center ">
                  <Icon icon="Plus2" {...onHold(actions.incrementVolume, 200)} className="invert-[0.85]" />

                  <div className="my-2 text-[1rem]">VOL</div>
                  <Icon icon="Minus3" {...onHold(actions.decrementVolume, 200)} className="-translate-y-1 invert-[0.85]" />
                </Col>
                <Col x={'content'} y={'full'}>
                  <Icon icon="Mute" size="m" onClick={actions.toggleMuteVolume} className="invert-[0.85]" />

                  {/* <div className='w-9 h-9 rounded-full bg-slate-300 mr-3 hover:scale-125 hover:saturate-200 transition-all' /> */}
                </Col>
                <Col className="flex flex-col items-center " intent={'fit'}>
                  <Icon icon="Plus2" {...onHold(actions.incrementChannel, 500)} className="invert-[0.85]" />
                  <div className="my-2 text-[1rem]">CH</div>

                  <Icon icon="Minus3" {...onHold(actions.decrementChannel, 500)} className="-translate-y-1 invert-[0.85]" />
                </Col>
              </Row>
              <Row className="p-4">
                <Icon icon="Up2" className="-rotate-90 invert-[0.85]" onClick={actions.previousVideo} size={'s'} />

                <Col intent={'center'}>
                  <Icon icon="Up2" size={'s'} className="invert-[0.85]" onClick={actions.previousVideo} />
                  {/* <Icon icon="Enter" className="my-3  -translate-x-[0.2rem] invert-[0.85]" size={'s'} onClick={() => null} /> */}
                  <div className="h-14 w-8"></div>
                  <Icon icon="Up2" className="rotate-180 invert-[0.85]" size={'s'} onClick={actions.nextVideo} />
                </Col>

                <Icon icon="Up2" className="rotate-90 invert-[0.85]" size={'s'} onClick={actions.nextVideo} />
              </Row>
              {/* <Row className='text-xs '>
              <button
                className='h-8 w-20 bg-red-800 hover:scale-150'
                onClick={() => actions.changeplayerType("fullScreen")}
              >
                fullScreen
              </button>
              <button
                className='h-8 w-20 bg-blue-800 hover:scale-150'
                onClick={() => actions.changeplayerType("semiFullScreen")}
              >
                semiFull
              </button>
              <button
                className='h-8 w-8 bg-yellow-800 hover:scale-150'
                onClick={() => actions.changeplayerType("mini")}
              >
                mini
              </button>
            </Row>
            <Row>
              <button
                className='h-8 w-20 bg-red-800 hover:scale-150'
                onClick={() => actions.changeplayerType("boxMiddle")}
              >
                boxMiddle
              </button>
              <button
                className='h-8 w-8 bg-yellow-800 hover:scale-150'
                onClick={() => actions.changeplayerType("middleQuarter")}
              >
                middleQuarter
              </button>
            </Row>
            <Row>
              <button
                className='h-8 w-8 bg-yellow-800 hover:scale-150'
                onClick={() => actions.changeplayerType("leftQuarter")}
              >
                leftQuarter
              </button>
              <button
                className='h-8 w-8 bg-yellow-800 hover:scale-150'
                onClick={() => actions.changeplayerType("rightQuarter")}
              >
                rightQuarter
              </button>
            </Row> */}
            </Col>
          </div>
        ) : (
          <button onClick={actions.toggleRemote}>
            <Icon icon="Remote" size="l" className="transform-all p-2 invert duration-200 hover:scale-125" defaultHovers={false} />
          </button>
        )}
      </Absolute>
    </div>
  )
}

export default Remote
