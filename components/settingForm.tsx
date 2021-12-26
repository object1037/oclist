import { useState } from "react"
import clsx from 'clsx'

const inputStyle = [
  'bg-gray-800'
]

const SettingForm = ({
  data
}: {
  data: account[]
}) => {
  const [range0, setRange0] = useState(data[0].range_0)
  const [range1, setRange1] = useState(data[0].range_1)
  const [range2, setRange2] = useState(data[0].range_2)
  const [range3, setRange3] = useState(data[0].range_3)
  const [range4, setRange4] = useState(data[0].range_4)
  const [range5, setRange5] = useState(data[0].range_5)

  return (
    <form>
      <input id="range0" type='text' name="range0" value={range0} onChange={(e) => setRange0(e.target.value)} className={clsx(inputStyle)} />
    </form>
  )
}

export default SettingForm