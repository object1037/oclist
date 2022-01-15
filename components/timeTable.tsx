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
const dayLabelStyle = [
  'w-24',
  'h-24',
  'flex',
  'justify-center',
  'items-center',
]

const TimeTable = ({
  data,
  account
}: {
  data: classData[] | undefined
  account: account[] | undefined
}) => {
  const [day, setDay] = useState(-1)
  useEffect(() => {
    const now = new Date()
    const day = now.getDay() - 1
    setDay(day)
  }, [])

  if (!data || !account) {
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
      {Array.from({length: 36}, (x, i) => i).map((_, index) => {
        if (index % 6 === 0) {
          return (
            <div className="contents" key={`loadingWeekDayandClass${index}`}>
              <div className={clsx(labelStyle, dayLabelStyle, (index / 6) === day && 'border border-ppink-200')}>{weekDays[index / 6]}</div>
              <div className="animate-pulse bg-gray-800 rounded-lg h-32"></div>
            </div>
          )
        }
        return (
          <div className="animate-pulse bg-gray-800 rounded-lg h-32" key={`loadingClass${index}`}></div>
        )
      })}
    </div>
    )
  }
  const autoclose = account[0].autoclose
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
              <div className={clsx(labelStyle, dayLabelStyle, (index / 6) === day && 'border border-ppink-200')}>{weekDays[index / 6]}</div>
              <ClassCard id={String(index)} small classData={classData} class_time={index} autoclose={autoclose} />
            </div>
          )
        }
        return (
          <ClassCard id={String(index)} small classData={classData} class_time={index} key={`class${index}`} autoclose={autoclose} />
        )
      })}
    </div>
  )
}

export default TimeTable