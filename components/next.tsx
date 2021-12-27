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
  const [time, setTime] = useState(0)

  useEffect(() => {
    const now = new Date()
    const day = now.getDay() - 1
    const hour = now.getHours()
    const minute = now.getMinutes()
    setTime(day * 24 * 60 + hour * 60 + minute)
  }, [])

  const { data: account, error } = useSWR('/api/get-settings', fetcher)

  let nextTime = useMemo(() => {
    if (!account || !data) {
      return -1
    }

    const settings = [
      account[0].range_0,
      account[0].range_1,
      account[0].range_2,
      account[0].range_3,
      account[0].range_4,
      account[0].range_5,
    ]
  
    let times = new Array()

    for (let i = 0; i < 6; i++) {
      times.push(new Array())
    }  

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        times[i].push({
          start: settings[j].substring(0, 5),
          end: settings[j].substring(6),
        })
        const startTime = 24 * 60 * i + +settings[j].substring(0, 2) * 60 + +settings[j].substring(3, 5)
        if (time < startTime && (data[i * 6 + j]?.class_url || data[i * 6 + j]?.class_title)) {
          return (i * 6 + j)
        }
      }
    }

    return 0
  }, [account, time, data])

  if (!data || !account) {
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
      <ClassCard classData={data[nextTime]} class_time={nextTime}/>
    </div>
    </>
  )
}

export default Next