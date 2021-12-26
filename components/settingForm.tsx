import { useState } from "react"
import clsx from 'clsx'
import { FiCheck } from "react-icons/fi"
import axios from "axios"

const inputStyle = [
  'bg-gray-800',
  'rounded-full',
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

const SettingForm = ({
  data
}: {
  data: account[]
}) => {
  const [range0, setRange0] = useState(data[0].range_0.substring(0, 5))
  const [range1, setRange1] = useState(data[0].range_1.substring(0, 5))
  const [range2, setRange2] = useState(data[0].range_2.substring(0, 5))
  const [range3, setRange3] = useState(data[0].range_3.substring(0, 5))
  const [range4, setRange4] = useState(data[0].range_4.substring(0, 5))
  const [range5, setRange5] = useState(data[0].range_5.substring(0, 5))
  const [range02, setRange02] = useState(data[0].range_0.substring(6))
  const [range12, setRange12] = useState(data[0].range_1.substring(6))
  const [range22, setRange22] = useState(data[0].range_2.substring(6))
  const [range32, setRange32] = useState(data[0].range_3.substring(6))
  const [range42, setRange42] = useState(data[0].range_4.substring(6))
  const [range52, setRange52] = useState(data[0].range_5.substring(6))

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const range_0 = `${range0}-${range02}`
    const range_1 = `${range1}-${range12}`
    const range_2 = `${range2}-${range22}`
    const range_3 = `${range3}-${range32}`
    const range_4 = `${range4}-${range42}`
    const range_5 = `${range5}-${range52}`

    try {
      axios.post('/api/update_settings', {
        account_email: data[0].account_email,
        range_0: range_0,
        range_1: range_1,
        range_2: range_2,
        range_3: range_3,
        range_4: range_4,
        range_5: range_5
      })
    } catch (e) {
      throw Error(String(e))
    }
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col items-center max-w-max mx-auto">
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range0" className={clsx(labelStyle)}>1</label>
        <input id="range0" type='time' name="range0" value={range0} onChange={(e) => setRange0(e.target.value)} className={clsx(inputStyle)} />
        <p className="text-2xl">~</p>
        <input id="range02" type='time' name="range02" value={range02} onChange={(e) => setRange02(e.target.value)} className={clsx(inputStyle)} />
      </div>

      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range1" className={clsx(labelStyle)}>2</label>
        <input id="range1" type='time' name="range1" value={range1} onChange={(e) => setRange1(e.target.value)} className={clsx(inputStyle)} />
        <p className="text-2xl">~</p>
        <input id="range12" type='time' name="range12" value={range12} onChange={(e) => setRange12(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range2" className={clsx(labelStyle)}>3</label>
        <input id="range2" type='time' name="range2" value={range2} onChange={(e) => setRange2(e.target.value)} className={clsx(inputStyle)} />
        <p className="text-2xl">~</p>
        <input id="range22" type='time' name="range22" value={range22} onChange={(e) => setRange22(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range3" className={clsx(labelStyle)}>4</label>
        <input id="range3" type='time' name="range3" value={range3} onChange={(e) => setRange3(e.target.value)} className={clsx(inputStyle)} />
        <p className="text-2xl">~</p>
        <input id="range32" type='time' name="range32" value={range32} onChange={(e) => setRange32(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range4" className={clsx(labelStyle)}>5</label>
        <input id="range4" type='time' name="range4" value={range4} onChange={(e) => setRange4(e.target.value)} className={clsx(inputStyle)} />
        <p className="text-2xl">~</p>
        <input id="range42" type='time' name="range42" value={range42} onChange={(e) => setRange42(e.target.value)} className={clsx(inputStyle)} />
      </div>
      
      <div className={clsx(inputWrapperStyle)}>
        <label htmlFor="range5" className={clsx(labelStyle)}>6</label>
        <input id="range5" type='time' name="range5" value={range5} onChange={(e) => setRange5(e.target.value)} className={clsx(inputStyle)} />
        <p className="text-2xl">~</p>
        <input id="range52" type='time' name="range52" value={range52} onChange={(e) => setRange52(e.target.value)} className={clsx(inputStyle)} />
      </div>

      <button type='submit' className="mt-4 border border-ppink-200 hover:bg-ppink-200 p-4 text-lg rounded-full transition" aria-label="done button">
        <FiCheck />
      </button>
    </form>
  )
}

export default SettingForm