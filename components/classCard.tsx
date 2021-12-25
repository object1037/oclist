import { useState } from "react";

const ClassCard = ({
  classData
}: {
  classData: classData
}) => {
  const [class_title, setClass_title] = useState(classData ? classData.class_title : '')
  const [class_url, setClass_url] = useState(classData ? classData.class_url : '')

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let openedWindow: Window | null

  function openWindow() {
    openedWindow = window.open(classData.class_url)
    sleep(10000).then(() => closeOpenedWindow())
  }

  function closeOpenedWindow() {
    openedWindow?.close();
  }

  if (!classData) {
    return (
      <>
      <div className="p-4 border">
      </div>
      </>
    )
  }
  return (
    <>
    <button className="p-4 border" onClick={() => openWindow()}>
      <p>{classData.class_title}</p>
      <p>{classData.class_url}</p>
    </button>
    </>
  )
}

export default ClassCard