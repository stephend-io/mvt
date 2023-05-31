"use client";

import {
  useAddNoToStack,
  useCurrentChannel,
  useDecrement,
  useIncreaseBy,
  useIncrement,
  useIsRemoteOpen,
  useToggleRemote,
} from "@/zustand/store";
import Icon from "@/components/Icon";
import { PropsWithChildren } from "react";

const Remote = () => {
  const currentChannel = useCurrentChannel();
  const increment = useIncrement();
  const decrement = useDecrement();
  const increaseBy = useIncreaseBy();
  const isRemoteOpen = useIsRemoteOpen();
  const toggleRemote = useToggleRemote();
  const addNoToStack = useAddNoToStack();

  return (
    <div className='absolute bottom-2 right-2 text-md'>
      {isRemoteOpen ? (
        <div className='w-40 h-1/3 bg-slate-800 rounded-lg '>
          <Col>
            <Row>
              <button onClick={increment}>
                <Icon icon='Power' className='text-red-300' />
              </button>
              <button onClick={decrement}>-</button>
              <button onClick={() => increaseBy(20)}>+20</button>
            </Row>
            <Row>
              <button onClick={increment}>+</button>
              <button onClick={decrement}>-</button>
              <button onClick={() => increaseBy(20)}>+20</button>
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
              <button onClick={() => console.log("test")}>
                <Icon icon='Record' />
              </button>
              <button onClick={() => addNoToStack(0)}>0</button>
              <button onClick={() => console.log("test")}>
                <Icon icon='Settings' />
              </button>
            </Row>
            <Row>
              <div className='flex flex-col justify-center items-center'>
                <button onClick={() => addNoToStack(7)}>
                  <Icon icon='Plus2' />
                </button>

                <div className='text-[1rem]'>VOL</div>
                <button onClick={() => addNoToStack(9)}>
                  <Icon icon='Minus2' />
                </button>
              </div>
              <div className='flex flex-col justify-center  items-center'>
                <button onClick={() => addNoToStack(7)}>
                  <Icon icon='Plus2' />
                </button>
                <div className='text-[1rem]'>CH</div>
                <button onClick={() => addNoToStack(9)}>
                  <Icon icon='Minus2' />
                </button>
              </div>
            </Row>
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
