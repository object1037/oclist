import ClassCard from "./classCard"
import { useEffect, useState, useRef } from "react"
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
]

const TimeTableMobile = ({
  data
}: {
  data: classData[] | undefined
}) => {
  const [day, setDay] = useState(0)
  const ref0 = useRef<HTMLDivElement>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)
  const ref4 = useRef<HTMLDivElement>(null)
  const ref5 = useRef<HTMLDivElement>(null)

  const refs = [ref0, ref1, ref2, ref3, ref4, ref5]

  useEffect(() => {
    const now = new Date()
    const day = now.getDay() + 3
    setDay(day)
    refs[day]?.current?.scrollIntoView()
  }, [refs])

  if (!data) {
    return (
      <div className="flex justify-center">Loading...</div>
    )
  }
  return (
    <>
    <div className="flex flex-col space-y-6 max-w-xl mx-auto">
      {data.map((classData, index) => {
        if (index % 6 === 0) {
          return (
            <div className="contents" key={`weekDayandClass${index}`}>
              <div ref={refs[index / 6]} className="pt-6 my-8 self-start">
                <div className={clsx(labelStyle, (index / 6) === day && 'border border-ppink-200')}>
                  {weekDays[index / 6]}
                </div>
              </div>
              <ClassCard classData={classData} class_time={index} />
            </div>
          )
        }
        return (
          <ClassCard classData={classData} class_time={index} key={classData?.class_url ? classData.class_url : `class${index}`} />
        )
      })}
    </div>
    </>
  )
}

export default TimeTableMobile