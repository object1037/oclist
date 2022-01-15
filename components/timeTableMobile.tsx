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
  'w-24',
  'h-24',
  'flex',
  'justify-center',
  'items-center',
  'rounded-full',
  'self-start',
  'mt-10',
  'mb-8'
]

const TimeTableMobile = ({
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
      <div className="flex flex-col space-y-6 max-w-xl mx-auto">
      {Array.from({length: 36}, (x, i) => i).map((_, index) => {
        if (index % 6 === 0) {
          return (
            <div className="contents" key={`loadingWeekDayandClass${index}`}>
              <div className={clsx(labelStyle, (index / 6) === day && 'border border-ppink-200')}>
                {weekDays[index / 6]}
              </div>
              <div className="animate-pulse bg-gray-800 rounded-xl h-32"></div>
            </div>
          )
        }
        return (
          <div className="animate-pulse bg-gray-800 rounded-xl h-32" key={`loadingClass${index}`}></div>
        )
      })}
    </div>
    )
  }
  const autoclose = account[0].autoclose
  return (
    <>
    <div className="flex flex-col space-y-6 max-w-xl mx-auto">
      {data.map((classData, index) => {
        if (index % 6 === 0) {
          return (
            <div className="contents" key={`weekDayandClass${index}`}>
              <div className={clsx(labelStyle, (index / 6) === day && 'border border-ppink-200')}>
                {weekDays[index / 6]}
              </div>
              <ClassCard id={String(index)} classData={classData} class_time={index} autoclose={autoclose} />
            </div>
          )
        }
        return (
          <ClassCard id={String(index)} classData={classData} class_time={index} key={`class${index}`} autoclose={autoclose} />
        )
      })}
    </div>
    </>
  )
}

export default TimeTableMobile