"use client";

import useStore from "@/zustand/store";

const Modal = () => {
  const { settingsOpen } = useStore();
  const actions = useStore((state) => state.actions);
  return (
    <div
      className={`${
        !settingsOpen && "hidden"
      } bg-[rgb(0,0,0,0.2)] background-blur-sm h-screen w-screen absolute top-0 left-0`}
    >
      <div className='z-0 w-4/5 h-4/5 rounded-lg bg-slate-300 absolute left-[50vw] -translate-x-1/2 bottom-1/2 translate-y-1/2'>
        Modal
        <button onClick={actions.toggleSettings}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
