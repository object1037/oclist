import ClassCard from "./classCard"

const TimeTable = ({
  data
}: {
  data: classData[] | undefined
}) => {
  if (!data) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className="grid grid-rows-6 grid-flow-col gap-4">
      {data.map((classData, index) => {
          return (
            <ClassCard classData={classData} class_time={index} key={classData?.class_url ? classData.class_url : index} />
          )
        })}
    </div>
  )
}

export default TimeTable