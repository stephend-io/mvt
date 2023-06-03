"use client";

import useStore, { useActions } from "@/zustand/store";
import Icon from "@/components/Icon";
import {
  MutableRefObject,
  PropsWithChildren,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  // func();
  intervalID = setInterval(func, delay);
};

const Remote = () => {
  useLayoutEffect(() => {
    window.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
    window.addEventListener("mouseup", () => {
      clearInterval(intervalID);
    });
    window.addEventListener("touchend", (e) => {
      clearInterval(intervalID);
      // thanks! -> https://github.com/facebook/react/issues/9809
      e.preventDefault();
    });
  }, []);

  const { isRemoteOpen, settingsOpen } = useStore();
  const actions = useActions();

  return (
    <Absolute
      className='text-[1.5rem] text-accent3'
      x={"rightLg"}
      y={"bottomLg"}
    >
      {isRemoteOpen ? (
        <div className='  bg-slate-800 rounded-lg w-40'>
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

              <button onClick={actions.curriedIncrement()}>
                <div className='w-9 h-9 rounded-full bg-yellow-300 mr-3' />
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
          </Col>
        </div>
      ) : (
        <button onClick={actions.toggleRemote}>
          <Icon icon='Remote' size='l' />
        </button>
      )}
    </Absolute>
  );
};

export default Remote;
