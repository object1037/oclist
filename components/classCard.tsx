import { useState } from "react";
import { FiEdit, FiPlus, FiCheck } from 'react-icons/fi'
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
    'bg-gray-900',
    'border',
    'border-gray-700',
    'rounded-xl',
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
    'bg-opacity-50',
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
    'rounded-full',
    'p-3',
    'px-6',
    'max-w-xl',
    'w-full',
    'bg-gray-800',
    'border-0',
    'focus:ring-0',
    'mb-8',
    'text-lg'
  ]
  const labelStyle = [
    'self-start',
    'font-semibold',
    'text-lg',
    'my-2',
    'mx-5'
  ]

  const modal = 
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Modal"
    className={clsx(modalStyle)}
    overlayClassName={clsx(overlayStyle)}
  >
    <form onSubmit={submitHandler} className="flex flex-col items-center">
      <label htmlFor="class_title" className={clsx(labelStyle)}>Name</label>
      <input id="class_title" type='text' name="class_title" value={class_title} onChange={(e) => setClass_title(e.target.value)} className={clsx(inputStyle)} />
      <label htmlFor="class_url" className={clsx(labelStyle)}>URL</label>
      <input id="class_url" type='text' name="class_url" value={class_url} onChange={(e) => setClass_url(e.target.value)} className={clsx(inputStyle)} />
      <button type='submit' className="border border-ppink-200 hover:bg-ppink-200 p-4 text-lg rounded-full transition" aria-label="done button">
        <FiCheck />
      </button>
    </form>
  </Modal>

  if (!classData || (!classData.class_title && !classData.class_url)) {
    return (
      <>
      <button className="group bg-gray-800 rounded-lg h-32 outline-none" onClick={() => openModal()} aria-label={`add class data at index of ${class_time}`}>
        <div className="invisible group-hover:visible flex justify-center text-2xl transition">
          <FiPlus />
        </div>
      </button>
      {modal}
      </>
    )
  }
  return (
    <>
    <div className="bg-gray-800 rounded-lg flex flex-row h-32">
      <button className="basis-5/6 hover:bg-gray-700 rounded-l-lg transition" onClick={() => openWindow()} aria-label='open class url'>
        <p className="p-4 text-left text-lg font-semibold block h-full break-all overflow-hidden">{class_title}</p>
      </button>
      <button onClick={() => openModal()} className="flex justify-center items-center hover:bg-gray-700 basis-1/6 rounded-r-lg outline-none transition text-lg" aria-label='edit class data'>
        <FiEdit />
      </button>
      {modal}
    </div>
    </>
  )
}

export default ClassCard