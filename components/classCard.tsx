import { useState } from "react";
import { FiEdit, FiPlus } from 'react-icons/fi'
import Modal from 'react-modal'
import axios from 'axios'
import clsx from 'clsx'

Modal.setAppElement('#__next');

const ClassCard = ({
  classData,
  class_time
}: {
  classData: classData
  class_time: number
}) => {
  const [class_title, setClass_title] = useState(classData ? classData.class_title : '')
  const [class_url, setClass_url] = useState(classData ? classData.class_url : '')

  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let openedWindow: Window | null

  function openWindow() {
    openedWindow = window.open(class_url)
    sleep(10000).then(() => closeOpenedWindow())
  }

  function closeOpenedWindow() {
    openedWindow?.close();
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      axios.post('/api/update_class', {
        id: classData ? classData.id : null,
        class_time: class_time,
        class_title: class_title,
        class_url: class_url,
      })
      closeModal()
    } catch (e) {
      throw Error(String(e))
    }
  }

  const modalStyle = [
    'bg-white',
    'dark:bg-gray-900',
    'border',
    'border-transparent',
    'dark:border-gray-700',
    'rounded-md',
    'outline-none',
    'w-full',
    'mx-auto',
    'md:max-w-2xl',
    'p-4',
    'sm:p-8',
    'max-h-full',
    'overflow-auto'
  ]
  const overlayStyle = [
    'bg-black',
    'bg-opacity-20',
    'backdrop-blur-sm',
    'dark:bg-opacity-50',
    'fixed',
    'inset-0',
    'z-20',
    'px-5',
    'sm:px-12',
    'pt-12',
    'sm:pt-24',
    'pb-5',
    'sm:pb-12'
  ]

  const inputStyle = [
    'rounded',
    'p-3',
    'max-w-xl',
    'w-full'
  ]

  const modal = 
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Modal"
    className={clsx(modalStyle)}
    overlayClassName={clsx(overlayStyle)}
  >
    <form onSubmit={submitHandler} className="flex flex-col space-y-8 items-center">
      <input type='text' name="class_title" value={class_title} onChange={(e) => setClass_title(e.target.value)} className={clsx(inputStyle)} />
      <input type='text' name="class_url" value={class_url} onChange={(e) => setClass_url(e.target.value)} className={clsx(inputStyle)} />
      <button type='submit' className="bg-gray-100 hover:bg-gray-200 w-24 h-10 rounded">更新</button>
    </form>
  </Modal>

  if (!classData || (!classData.class_title && !classData.class_url)) {
    return (
      <>
      <button className="group px-12 bg-gray-100 rounded h-32" onClick={() => openModal()}>
        <div className="invisible group-hover:visible flex justify-center">
          <FiPlus />
        </div>
      </button>
      {modal}
      </>
    )
  }
  return (
    <>
    <div className="group bg-gray-100 rounded flex flex-row h-32">
      <button className="basis-5/6" onClick={() => openWindow()}>
        <p className="p-4 text-left text-lg font-semibold rounded-l block h-full break-all">{class_title}</p>
      </button>
      <button className="hover:bg-gray-200 px-2 basis-1/6 rounded-r" onClick={() => openModal()}>
        <FiEdit />
      </button>
      {modal}
    </div>
    </>
  )
}

export default ClassCard