import ClassCard from "./classCard"
import axios from "axios"
import useSWR from "swr"
import { useEffect, useState, useMemo } from "react"

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Next = ({
  data
}: {
  data: classData[] | undefined
}) => {
  const [time, setTime] = useState(100000)
  const [nextTime, setNextTime] = useState(-1)

  useEffect(() => {
    const now = new Date()
    const day = now.getDay() - 1
    const hour = now.getHours()
    const minute = now.getMinutes()
    setTime(day * 24 * 60 + hour * 60 + minute)
  }, [])

  const { data: account, error } = useSWR('/api/get-settings', fetcher)

  const times = useMemo(() => {
    if (!account || !data) {
      return
    }

    const settings = [
      account[0].range_0,
      account[0].range_1,
      account[0].range_2,
      account[0].range_3,
      account[0].range_4,
      account[0].range_5,
    ]

    let timesSub = new Array()

    for (let i = 0; i < 6; i++) {
      timesSub.push(new Array())
    }  

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const startHour = +settings[j].substring(0, 2)
        const startMinute = +settings[j].substring(3, 5)
        const endHour = +settings[j].substring(6, 8)
        const endMinute = +settings[j].substring(9)

        timesSub[i].push({
          start: 24 * 60 * i + 60 * startHour + startMinute,
          end: 24 * 60 * i + 60 * endHour + endMinute,
        })
      }
    }

    return timesSub
  }, [account, data])

  useEffect(() => {
    if (!times || !data || time === 100000) {
      return
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (time < times[i][j].start && (data[i * 6 + j]?.class_title || data[i * 6 + j]?.class_url)) {
          setNextTime(i * 6 + j)
          return
        }
      }
    }

    for (let i = 0; i < 36; i++) {
      if (data[i]?.class_title || data[i]?.class_url) {
        setNextTime(i)
        return
      }
    }

    setNextTime(-2)
  }, [times, data, time])

  if (!data || !account || nextTime === -1) {
    return (
      <div className="flex flex-col max-w-xl mx-auto mb-12">
        <h2 className="font-bold text-3xl mb-6">Next</h2>
        <div className="animate-pulse bg-gray-800 rounded-lg h-32"></div>
      </div>
    )
  }

  return (
    <>
    <div className="flex flex-col max-w-xl mx-auto mb-12">
      <h2 className="font-bold text-3xl mb-6">Next</h2>
      {nextTime === -2 ? 
      <div className="border border-gray-700 rounded-lg h-32 p-4 flex items-center justify-center">
        <p className="text-lg text-center text-gray-400">Click the timetable below to add class information.</p>
      </div> : 
      <ClassCard classData={data[nextTime]} class_time={nextTime}/>
      }
    </div>
    </>
  )
}

export default Next