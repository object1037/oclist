import { useState } from "react"
import clsx from 'clsx'
import { FiCheck, FiLoader } from "react-icons/fi"
import axios from "axios"

const SettingForm = ({
  data
}: {
  data: account[]
}) => {
  const [submitting, setSubmitting] = useState(false)

  const [range0, setRange0] = useState(data[0].range_0.substring(0, 5))
  const [range1, setRange1] = useState(data[0].range_1.substring(0, 5))
  const [range2, setRange2] = useState(data[0].range_2.substring(0, 5))
  const [range3, setRange3] = useState(data[0].range_3.substring(0, 5))
  const [range4, setRange4] = useState(data[0].range_4.substring(0, 5))
  const [range5, setRange5] = useState(data[0].range_5.substring(0, 5))
  const [autoclose, setAutoclose] = useState(data[0].autoclose)

  const inputStyle = [
    'rounded-full',
    'px-4',
    'py-2',
    'bg-gray-800',
    'border-0',
    'focus:ring-0',
    'text-lg'
  ]
  const labelStyle = [
    'font-semibold'
  ]
  const inputWrapperStyle = [
    'flex',
    'space-x-4',
    'items-center',
    'mb-6'
  ]
  const toggleStyle = [
    'rounded-full',
    'form-checkbox',
    'w-14',
    'h-8',
    autoclose ? 'bg-ppink-200' : 'bg-gray-800',
    'relative',
    'transition'
  ]
  const sliderStyle = [
    'rounded-full',
    'w-6',
    'h-6',
    'absolute',
    'bg-gray-100',
    'top-1',
    'transition-all',
    autoclose ? 'left-7' : 'left-1'
  ]

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const range_0 = range0
    const range_1 = range1
    const range_2 = range2
    const range_3 = range3
    const range_4 = range4
    const range_5 = range5

    try {
      axios.post('/api/update_settings', {
        account_email: data[0].account_email,
        range_0: range_0,
        range_1: range_1,
        range_2: range_2,
        range_3: range_3,
        range_4: range_4,
        range_5: range_5,
        autoclose: autoclose
      }).then(() => setSubmitting(false))
    } catch (e) {
      throw Error(String(e))
    }
  }

  return (
    <>
    <h3 className='text-2xl font-semibold mb-6'>Class start times</h3>
    <form onSubmit={submitHandler} className="flex flex-col items-center max-w-max px-6" id='settingForm'>
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range0" className={clsx(labelStyle)}>1</label>
        <input id="range0" type='time' name="range0" value={range0} onChange={(e) => setRange0(e.target.value)} className={clsx(inputStyle)} />
      </div>

      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range1" className={clsx(labelStyle)}>2</label>
        <input id="range1" type='time' name="range1" value={range1} onChange={(e) => setRange1(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range2" className={clsx(labelStyle)}>3</label>
        <input id="range2" type='time' name="range2" value={range2} onChange={(e) => setRange2(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range3" className={clsx(labelStyle)}>4</label>
        <input id="range3" type='time' name="range3" value={range3} onChange={(e) => setRange3(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range4" className={clsx(labelStyle)}>5</label>
        <input id="range4" type='time' name="range4" value={range4} onChange={(e) => setRange4(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range5" className={clsx(labelStyle)}>6</label>
        <input id="range5" type='time' name="range5" value={range5} onChange={(e) => setRange5(e.target.value)} className={clsx(inputStyle)} />
      </div>
    </form>
    <h3 className='text-2xl font-semibold mb-6'>Tab autoclose</h3>
    <div className="px-6">
      <button onClick={() => setAutoclose(autoclose === 0 ? 1 : 0)} className={clsx(toggleStyle)}>
        <div className={clsx(sliderStyle)}/>
      </button>
    </div>
    <button disabled={submitting} type='submit' form='settingForm' className="mt-12 border border-ppink-200 hover:bg-ppink-200 p-4 text-xl rounded-full transition" aria-label="done button">
      {submitting ? <FiLoader className="animate-spin-slow" /> : <FiCheck />}
    </button>
    </>
  )
}

export default SettingForm