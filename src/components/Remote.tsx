"use client";

import {
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
import { PropsWithChildren } from "react";

const Remote = () => {
  const currentChannel = useCurrentChannel();

  const actions = useActions();
  const incrementChannel = useIncrementChannel();
  const decrementChannel = useDecrementChannel();
  const increaseBy = useIncreaseBy();
  const isRemoteOpen = useIsRemoteOpen();
  const toggleRemote = useToggleRemote();
  const addNoToStack = useAddNoToStack();

  return (
    <div className='absolute bottom-2 right-2 text-[1.5rem]'>
      {isRemoteOpen ? (
        <div className='w-40 h-1/3 bg-slate-800 rounded-lg '>
          <Col>
            <div className='flex flex-row justify-between p-2'>
              <button onClick={actions.toggleRemote} className='my-2'>
                <Icon icon='Power' className='' />
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
              <button onClick={actions.TOBEIMPLEMENTED}>
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
                <button onClick={actions.incrementChannel} className=''>
                  <Icon icon='Plus2' />
                </button>
                <div className='text-[1rem] '>CH</div>
                <button
                  onClick={actions.decrementChannel}
                  className='-translate-y-[0.4rem]'
                >
                  <Icon icon='Minus3' />
                </button>
              </div>
            </Row>
            <div className='flex flex-row justify-around items-center '>
              <button className='-rotate-90' onClick={actions.decrementVolume}>
                <Icon icon='Up2' />
              </button>

              <div className='flex flex-col' onClick={actions.incrementChannel}>
                <button className='mb-4'>
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
                  onClick={actions.decrementChannel}
                >
                  <Icon icon='Up2' />
                </button>
              </div>
              <button className='rotate-90' onClick={actions.incrementVolume}>
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
