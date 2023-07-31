'use client'

const SettingsOptions = [{ title: 'Channels', options: [{}] }]

import useStore from '@/zustand/store'
const Settings = () => {
  const { isSettingsOpen } = useStore()
  if (!isSettingsOpen) return null
  return (
    <div style={{ fontVariationSettings: `"BLOC" 500, "OPEN" 100` }} id="boom" className="absolute right-0 top-0 h-screen w-screen ">
      <div className="absolute left-1/2 top-1/2 z-[51] flex h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg bg-white opacity-70">
        <div>
          <div className="text-2xl font-bold">Channels:</div>
          <div className="flex-row text-xl font-medium">
            <div>Default channel: last channel, specific - specify</div>
            <div>Decade hits max rank:</div>
            <div>Yearly hits max rank:</div>
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold">UI:</div>
          <div className="flex-row text-xl font-medium">
            <div>Song Details: Always, slow fade, never</div>
            <div>Color: Blue - default</div>
            <div>Vignette: On, off</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Settings
