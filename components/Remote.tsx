"use client";

import useStore, { useActions } from "@/zustand/store";
import Icon from "@/components/Icon";
import { useEffect, useLayoutEffect, useState } from "react";
import Absolute from "./Absolute";
import Col from "./Col";
import Row from "./Row";

let intervalID: NodeJS.Timer;
function onHold(func: () => void, delay: number = 200) {
  return {
    onTouchStart: () => {
      func();
      repeatCaller(func, delay);
    },
    onMouseDown: () => {
      func();
      repeatCaller(func, delay);
    },
    draggable: false,
  };
}
const repeatCaller = (func: () => void, delay: number) => {
  clearInterval(intervalID);
  intervalID = setInterval(func, delay);
};

const Remote = () => {
  const [hidden, setHidden] = useState(true);
  const timeoutDelay = 5000;
  let timeoutID: NodeJS.Timer;

  useLayoutEffect(() => {
    window.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    window.addEventListener("mouseup", () => {
      clearInterval(intervalID);
      clearTimeout(timeoutID);
      setHidden(false);
      timeoutID = setTimeout(() => setHidden(true), timeoutDelay);
    });
    window.addEventListener("touchend", (e) => {
      clearInterval(intervalID);
      // thanks! -> https://github.com/facebook/react/issues/9809
      e.preventDefault();
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        if (!isRemoteOpen) setHidden(true);
      }, timeoutDelay);
    });
    window.addEventListener("mousemove", () => {
      clearTimeout(timeoutID);
      setHidden(false);
      timeoutID = setTimeout(() => {
        if (!isRemoteOpen) setHidden(true);
      }, timeoutDelay);
    });
    window.addEventListener("keydown", () => {});
  }, []);

  const { isRemoteOpen, settingsOpen } = useStore();
  const actions = useActions();

  return (
    <Absolute
      className={`transition-all duration-500 text-[1.5rem] text-accent3 overflow-clip z-50 ${
        hidden && "hidden"
      }`}
      x={"rightXl"}
      y={"bottomXl"}
    >
      {isRemoteOpen ? (
        <div className=' bg-slate-800 rounded-lg w-40 '>
          <Col>
            <Row className='flex flex-row justify-between '>
              <Icon
                icon='Power'
                onClick={() => {
                  settingsOpen && actions.toggleSettings();
                  actions.toggleRemote();
                }}
                className='m-2'
              />

              <button onClick={() => actions.setMiniVideo(false)}>
                <div className='w-9 h-9 rounded-full bg-lime-300 mr-3 hover:scale-125 hover:saturate-200 transition-all' />
              </button>
              <button onClick={() => actions.setMiniVideo(true)}>
                <div className='w-9 h-9 rounded-full bg-yellow-300 mr-3 hover:scale-125 hover:saturate-200 transition-all' />
              </button>
            </Row>
            <Row className='mb-4'>
              <button
                onClick={actions.TOBEIMPLEMENTED}
                className='w-6 h-2 bg-red-400'
              />
              <button
                onClick={actions.TOBEIMPLEMENTED}
                className='w-6 h-2 bg-green-400'
              />
              <button
                onClick={actions.TOBEIMPLEMENTED}
                className='w-6 h-2 bg-blue-400'
              />
              <button
                onClick={actions.TOBEIMPLEMENTED}
                className='w-6 h-2 bg-slate-200'
              />
            </Row>
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
              <Icon
                icon='Record'
                onClick={actions.TOBEIMPLEMENTED}
                size={"s"}
              />
              <button onClick={() => actions.addNoToStack(0)}>0</button>
              <Icon
                icon='Settings'
                onClick={actions.toggleSettings}
                size={"s"}
                className='invert-[0.85]'
              />
            </Row>
            <Row className='mt-4'>
              <Col className='flex flex-col justify-center items-center '>
                <Icon
                  icon='Plus2'
                  onClick={actions.incrementVolume}
                  className='invert-[0.85]'
                />

                <div className='text-[1rem] my-2'>VOL</div>
                <Icon
                  icon='Minus3'
                  onClick={actions.decrementChannel}
                  className='invert-[0.85] -translate-y-1'
                />
              </Col>
              <Col x={"content"} y={"full"}>
                <Icon
                  icon='Mute'
                  size='m'
                  onClick={actions.toggleMuteVolume}
                  className='invert-[0.85]'
                />

                {/* <div className='w-9 h-9 rounded-full bg-slate-300 mr-3 hover:scale-125 hover:saturate-200 transition-all' /> */}
              </Col>
              <Col className='flex flex-col items-center ' intent={"fit"}>
                <Icon
                  icon='Plus2'
                  onClick={() => actions.incrementChannel()}
                  className='invert-[0.85]'
                />
                <div className='text-[1rem] my-2'>CH</div>

                <Icon
                  icon='Minus3'
                  onClick={() => actions.decrementChannel()}
                  className='invert-[0.85] -translate-y-1'
                />
              </Col>
            </Row>
            <Row className='p-4'>
              <Icon
                icon='Up2'
                className='-rotate-90 invert-[0.85]'
                {...onHold(actions.decrementVolume, 200)}
                size={"s"}
              />

              <Col intent={"center"}>
                <Icon icon='Up2' size={"s"} className='invert-[0.85]' />
                <Icon
                  icon='Enter'
                  className='-translate-x-[0.2rem]  my-3 invert-[0.85]'
                  size={"s"}
                />
                <Icon
                  icon='Up2'
                  className='rotate-180 invert-[0.85]'
                  size={"s"}
                />
              </Col>

              <Icon
                icon='Up2'
                className='rotate-90 invert-[0.85]'
                size={"s"}
                {...onHold(actions.incrementVolume, 200)}
              />
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
          <Icon
            icon='Remote'
            size='l'
            className='invert hover:scale-125 transform-all duration-200 p-2'
            defaultHovers={false}
          />
        </button>
      )}
    </Absolute>
  );
};

export default Remote;
