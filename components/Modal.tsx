'use client'

import useStore from '@/zustand/store'

const Modal = () => {
  const { isSettingsOpen: settingsOpen } = useStore()
  const actions = useStore((state) => state.actions)
  return (
    <div className={`${!settingsOpen && 'hidden'} background-blur-sm absolute left-0 top-0 h-screen w-screen bg-[rgb(0,0,0,0.2)]`}>
      <div className="absolute bottom-1/2 left-[50vw] z-0 h-4/5 w-4/5 -translate-x-1/2 translate-y-1/2 rounded-lg bg-slate-300">
        Modal
        <button onClick={actions.toggleSettings}>Close</button>
      </div>
    </div>
  )
}

export default Modal
