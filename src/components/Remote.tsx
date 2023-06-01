"use client";

import useStore, {
  useActions,
  useAddNoToStack,
  useCurrentChannel,
  useDecrementChannel,
  useIncreaseBy,
  useIncrementChannel,
  useIsRemoteOpen,
  useToggleRemote,
} from "@/zustand/store";
import Icon from "@/components/Icon";
import {
  MutableRefObject,
  PropsWithChildren,
  Ref,
  RefObject,
  useEffect,
  useRef,
} from "react";

let intervalID: NodeJS.Timer;

const repeatCaller = (func: () => void, delay: number) => {
  clearInterval(intervalID);
  intervalID = setInterval(func, delay);
};

function addListenerWithCallback(
  ref: RefObject<HTMLButtonElement>,
  callback: () => void,
  delay: number = 100
) {
  ref.current?.removeEventListener("mousedown", () =>
    clearInterval(intervalID)
  );
  if (ref.current) {
    ref.current.addEventListener("mousedown", (e) => {
      callback();
      repeatCaller(callback, delay);
    });
    ref.current.addEventListener("mouseup", (e) => clearInterval(intervalID));
  }
}

// !TODO
// JUST HANDLE ON MOUSE DOWN AND ON MOUSE UP EVENTS AND A SINGLE TIMER, NO NEED FO REVENT LISTENERS DU DOY

// have to decouple addEventListener's function in order to be able to unmount it
function test() {}

const Remote = () => {
  const { currentChannel, isRemoteOpen, settingsOpen } = useStore();

  const increaseVolumeRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const decreaseVolumeRef = useRef<HTMLButtonElement>(null);
  const incrementChannelRef = useRef<HTMLButtonElement>(null);
  const decrementChannelRef = useRef<HTMLButtonElement>(null);

  const actions = useActions();
  const toggleRemote = useToggleRemote();
  const addNoToStack = useAddNoToStack();

  useEffect(() => {
    // adding option to hold and continue calling to volume and channel buttons
    if (!settingsOpen) {
      addListenerWithCallback(increaseVolumeRef, actions.incrementVolume);
      addListenerWithCallback(decreaseVolumeRef, actions.decrementVolume);
      addListenerWithCallback(
        incrementChannelRef,
        actions.incrementChannel,
        1000
      );
      addListenerWithCallback(
        decrementChannelRef,
        actions.decrementChannel,
        1000
      );
      // } else {
      // add Listeners to Up and Down arrows when settings is open
      // addListenerWithCallback();
      // addListenerWithCallback();
      // addListenerWithCallback();
      // addListenerWithCallback();
    } else {
      increaseVolumeRef.current?.removeEventListener("mousedown", () =>
        clearInterval(intervalID)
      );
      decreaseVolumeRef.current?.removeEventListener("mousedown", () =>
        clearInterval(intervalID)
      );
      incrementChannelRef.current?.removeEventListener("mousedown", () =>
        clearInterval(intervalID)
      );
      decrementChannelRef.current?.removeEventListener("mousedown", () =>
        clearInterval(intervalID)
      );
    }
    return () => {
      console.log("Remote unmounted");
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div className='z-10 absolute bottom-2 right-2 text-[1.5rem] text-accent3'>
      {isRemoteOpen ? (
        <div className='w-40 h-1/3 bg-slate-800 rounded-lg '>
          <Col>
            <div className='flex flex-row justify-between p-2'>
              <button
                onClick={() => {
                  settingsOpen && actions.toggleSettings();
                  actions.toggleRemote();
                }}
                className='my-2'
              >
                <Icon icon='Power' />
              </button>
              {/* <button onClick={decrementChannel}>-</button> */}
              <button onClick={actions.TOBEIMPLEMENTED}>
                <div className='w-9 h-9 rounded-full bg-yellow-300' />
              </button>
            </div>
            <Row>
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
              <button onClick={() => addNoToStack(1)}>1</button>
              <button onClick={() => addNoToStack(2)}>2</button>
              <button onClick={() => addNoToStack(3)}>3</button>
            </Row>
            <Row>
              <button onClick={() => addNoToStack(4)}>4</button>
              <button onClick={() => addNoToStack(5)}>5</button>
              <button onClick={() => addNoToStack(6)}>6</button>
            </Row>
            <Row>
              <button onClick={() => addNoToStack(7)}>7</button>
              <button onClick={() => addNoToStack(8)}>8</button>
              <button onClick={() => addNoToStack(9)}>9</button>
            </Row>

            <Row>
              <button onClick={actions.TOBEIMPLEMENTED}>
                <Icon icon='Record' />
              </button>
              <button onClick={() => addNoToStack(0)}>0</button>
              <button onClick={actions.toggleSettings}>
                <Icon icon='Settings' />
              </button>
            </Row>
            <Row>
              <div className='flex flex-col justify-center items-center'>
                <button onClick={actions.incrementVolume}>
                  <Icon icon='Plus2' />
                </button>

                <div className='text-[1rem]'>VOL</div>
                <button
                  onClick={actions.decrementVolume}
                  className='-translate-y-[0.4rem]'
                >
                  <Icon icon='Minus3' />
                </button>
              </div>
              <button onClick={actions.toggleMuteVolume}>
                <Icon icon='Mute' size='xs' />
              </button>
              <div className='flex flex-col items-center '>
                <button onClick={() => actions.incrementChannel()} className=''>
                  <Icon icon='Plus2' />
                </button>
                <div className='text-[1rem] '>CH</div>
                <button
                  onClick={() => actions.decrementChannel()}
                  className='-translate-y-[0.4rem]'
                >
                  <Icon icon='Minus3' />
                </button>
              </div>
            </Row>
            <div className='flex flex-row justify-around items-center '>
              <button
                className='-rotate-90'
                // onMouseDown={actions.decrementVolume}
                ref={decreaseVolumeRef}
              >
                <Icon icon='Up2' />
              </button>

              <div className='flex flex-col'>
                <button
                  className='mb-4'
                  // onMouseDown={actions.incrementChannel}
                  ref={incrementChannelRef}
                >
                  <Icon icon='Up2' />
                </button>

                <button
                  className='mb-4 -translate-x-1'
                  onClick={actions.TOBEIMPLEMENTED}
                >
                  <Icon icon='Enter' />
                </button>
                <button
                  className='rotate-180'
                  // onMouseDown={actions.decrementChannel}
                  ref={decrementChannelRef}
                >
                  <Icon icon='Up2' />
                </button>
              </div>
              <button
                className='rotate-90'
                // onMouseDown={actions.incrementVolume}
                ref={increaseVolumeRef}
              >
                <Icon icon='Up2' />
              </button>
            </div>
          </Col>
        </div>
      ) : (
        <button onClick={toggleRemote}>
          <Icon icon='Remote' size='lg' />
        </button>
      )}
    </div>
  );
};

const Row = ({ children }: PropsWithChildren) => {
  // return <div className='flex justify-around flex-row'>{children}</div>;
  return <div className={`flex flex-row justify-around`}>{children}</div>;
};
const Col = ({
  additionalClasses = "justify-around",
  children,
}: PropsWithChildren & { additionalClasses?: string }) => {
  return <div className={`flex flex-col justify-around`}>{children}</div>;
};
export default Remote;
