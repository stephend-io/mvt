import useStore from '@/zustand/store'
import { useActions } from '@/zustand/store'

const FirstVisit = () => {
  const { isSettingsOpen } = useStore()
  const actions = useActions()
  if (!isSettingsOpen) return null
  return (
    <div className="absolute right-0 top-0 h-screen w-screen ">
      <div className="absolute z-[51] h-full w-full " onClick={() => actions.toggleSettings()} />
      <div className="absolute left-1/2 top-1/2 z-[51] flex h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg bg-white opacity-70">
        The Music Time-machine......
        <>Music from 1980 - 2019 are supported</>
        <>With each month and year being represented by 1998 and 031998 respectively</>
        <></>
        Feel free to use the remote, or your arrow keys to navigate through
        <></>
        You can also hit the power button to go back to the home page where you can much more easily input the specific year or month that you want
        <></>
        Press -{'>'} if video is not the proper music video, or gave a frustrating *clean version of the song
        <></>
        Looking for a junior Frontend, Fullstack, or Typescript developer?
        <></>
        time machine is a portfolio piece by a Toronto based recently graduated student developer over at stephend.io
      </div>
    </div>
  )
}
export default FirstVisit
