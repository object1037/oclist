const ClassCard = ({
  classData
}: {
  classData: classData
}) => {
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let openedWindow: Window | null

  function openWindow() {
    openedWindow = window.open(classData.url)
    sleep(10000).then(() => closeOpenedWindow())
  }

  function closeOpenedWindow() {
    openedWindow?.close();
  }

  return (
    <>
    <div className="p-4 bg-gray-100" onClick={() => openWindow()}>
      <p>{classData.title}</p>
      <p>{classData.time}</p>
      <p>{classData.url}</p>
    </div>
    </>
  )
}

export default ClassCard