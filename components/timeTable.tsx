import ClassCard from "./classCard"
import { useEffect, useState } from "react"
import clsx from "clsx"

const weekDays = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const labelStyle = [
  'font-bold',
  'text-3xl',
  'place-self-center',
  'py-3',
  'px-5',
  'rounded-full'
]

const TimeTable = ({
  data
}: {
  data: classData[] | undefined
}) => {
  const [day, setDay] = useState(0)
  useEffect(() => {
    const now = new Date()
    const day = now.getDay() - 1
    setDay(day)
    console.log(day)
  }, [])

  if (!data) {
    return (
      <div className="flex justify-center">Loading...</div>
    )
  }
  return (
    <div className="grid grid-rows-ttable grid-cols-ttable grid-flow-col auto-cols-fr gap-4">
      <div className="contents">
      {Array.from({length: 7}, (x, i) => i).map((_, index) => {
        if (index === 0) {
          return (
            <div key={`classHour${index}`} />
          )
        }
        return (
          <div key={`classHour${index}`} className={clsx(labelStyle)}>{index}</div>
        )
      })}
      </div>
      {data.map((classData, index) => {
        if (index % 6 === 0) {
          return (
            <div className="contents" key={`weekDayandClass${index}`}>
              <div className={clsx(labelStyle, (index / 6) === day && 'border border-ppink-200')}>{weekDays[index / 6]}</div>
              <ClassCard classData={classData} class_time={index} />
            </div>
          )
        }
        return (
          <ClassCard classData={classData} class_time={index} key={classData?.class_url ? classData.class_url : `class${index}`} />
        )
      })}
    </div>
  )
}

export default TimeTable