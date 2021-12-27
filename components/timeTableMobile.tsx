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
  data
}: {
  data: classData[] | undefined
}) => {
  const [day, setDay] = useState(-1)

  useEffect(() => {
    const now = new Date()
    const day = now.getDay() - 1
    setDay(day)
  }, [])

  if (!data) {
    return (
      <div className="flex justify-center mt-12">Loading...</div>
    )
  }
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
              <ClassCard id={String(index)} classData={classData} class_time={index} />
            </div>
          )
        }
        return (
          <ClassCard id={String(index)} classData={classData} class_time={index} key={classData?.class_url ? classData.class_url : `class${index}`} />
        )
      })}
    </div>
    </>
  )
}

export default TimeTableMobile