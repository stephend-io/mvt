import { useForm } from 'react-hook-form'
import { useActions } from '@/zustand/store'
import Col from './Col'
import Row from './Row'
import { useEffect } from 'react'

type FormData = {
  month: number
  year: number
}

const QuickSettings = () => {
  const actions = useActions()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = handleSubmit((data) => {
    if (!isNaN(data.month)) {
      actions.setChannel(data.month * 10000 + data.year)
    } else {
      actions.setChannel(data.year)
    }
    // actions.setChannel()
  })
  // const formData = watch()
  // useEffect(() => {
  //   console.log(`FormData:  ${JSON.stringify(formData)}`)
  // }, [formData])

  return (
    <div className="right-1/2 top-1/2 h-full w-full  ">
      <div className="flex h-full w-full justify-between font-pixel text-sm font-bold md:text-4xl">
        <Col>
          <Row>
            <button onClick={() => actions.setChannel(80)} className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-red-400 hover:text-black active:saturate-150">
              80s
            </button>
            <button onClick={() => actions.setChannel(90)} className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-green-400 hover:text-black active:saturate-150">
              90s
            </button>
          </Row>
          <Row>
            <button onClick={() => actions.setChannel(0)} className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-blue-400 hover:text-black active:saturate-150">
              00s
            </button>

            <button onClick={() => actions.setChannel(10)} className=" rounded-md p-2 text-white transition-all duration-75 hover:scale-110 hover:bg-slate-200 hover:text-black active:saturate-150">
              10s
            </button>
          </Row>
          <form onSubmit={onSubmit} className="mt-2 flex  w-2/3 justify-around bg-white p-2 text-center font-pixel">
            <input
              {...register('year', { required: true, minLength: 4, min: 1980, max: 2019, valueAsNumber: true })}
              placeholder="year"
              defaultValue={2000}
              className={`w-1/3 border-2 border-transparent p-2 text-center ${errors.year && ' border-red-400 text-red-400'}`}
            />
            <input
              {...register('month', { maxLength: 2, min: 1, max: 12, valueAsNumber: true })}
              placeholder="month"
              // defaultValue={1}
              className={`w-1/3 border-2 border-transparent p-2 text-center ${errors.month && 'border-2 border-red-900 '}`}
            />
            <button type="submit">Enter</button>
          </form>
          {errors?.year && <div className="text-red-400">Only 1980 to 2019 are supported</div>}
          {errors?.month && <div className="text-red-400">Please enter a valid month between 1 and 12</div>}

          {/* <div className="text-red-400">{JSON.stringify(errors?.year?.types ?? 'year')}</div>
          <div className="text-red-400">{JSON.stringify(errors?.month?.types ?? 'month')}</div> */}
        </Col>
      </div>
    </div>
  )
}
export default QuickSettings
