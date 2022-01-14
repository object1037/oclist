import { useState, useEffect } from "react";
import { FiEdit, FiPlus, FiCheck, FiLoader } from 'react-icons/fi'
import Modal from 'react-modal'
import axios from 'axios'
import clsx from 'clsx'
import { mutate } from "swr";

Modal.setAppElement('#__next');

const ClassCard = ({
  classData,
  class_time,
  small,
  id
}: {
  classData: classData
  class_time: number
  small?: boolean
  id?: string
}) => {
  let c_time_var = class_time

  const [submitting, setSubmitting] = useState(false)

  const [c_time_state, setC_time_state] = useState(class_time)
  const [class_title, setClass_title] = useState(classData ? classData.class_title : '')
  const [class_url, setClass_url] = useState(classData ? classData.class_url : '')
  const [isEmpty, setIsEmpty] = useState(!classData?.class_title && !classData?.class_url)

  useEffect(() => {
    setClass_title(classData ? classData.class_title : '')
    setClass_url(classData ? classData.class_url : '')
    setIsEmpty(!classData?.class_title && !classData?.class_url)
  }, [classData])

  useEffect(() => {
    if (c_time_var != c_time_state) {
      setC_time_state(c_time_var)
      setClass_title(classData?.class_title)
      setClass_url(classData?.class_url)
    }
  }, [c_time_state, c_time_var, classData])

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
    setSubmitting(true)

    try {
      axios.post('/api/update_class', {
        id: classData ? classData.id : null,
        class_time: class_time,
        class_title: class_title,
        class_url: class_url,
      }).then(() => mutate('/api/get-classes')
        .then(() => {
          setSubmitting(false)
          closeModal()
        }))
    } catch (e) {
      throw Error(String(e))
    }
  }

  const weekDays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ]

  const modalStyle = [
    'bg-gray-900',
    'border',
    'border-gray-700',
    'rounded-xl',
    'outline-none',
    'w-full',
    'mx-auto',
    'md:max-w-2xl',
    'px-6',
    'py-8',
    'sm:px-8',
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
    'mb-6',
    'text-lg'
  ]
  const labelStyle = [
    'self-start',
    'font-semibold',
    'text-lg',
    'my-2',
    'mx-5'
  ]

  const cardLeft = [
    'hover:bg-gray-700',
    'rounded-l-xl',
    'transition',
    small ? 'basis-3/4' : 'basis-5/6',
  ]
  const cardRight = [
    'flex',
    'justify-center',
    'items-center',
    'hover:bg-gray-700',
    'rounded-r-xl',
    'outline-none',
    'transition',
    'text-lg',
    small ? 'basis-1/4' : 'basis-1/6',
  ]

  const FormModal = 
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Modal"
    className={clsx(modalStyle)}
    overlayClassName={clsx(overlayStyle)}
  >
    <p className="font-bold text-2xl mb-6">{`${weekDays[Math.floor(class_time / 6)]} ${class_time % 6 + 1}`}</p>
    <form onSubmit={submitHandler} className="flex flex-col items-center">
      <label htmlFor="class_title" className={clsx(labelStyle)}>Name</label>
      <input autoFocus id="class_title" type='text' name="class_title" value={class_title} onChange={(e) => setClass_title(e.target.value)} className={clsx(inputStyle)} />
      <label htmlFor="class_url" className={clsx(labelStyle)}>URL</label>
      <input id="class_url" type='url' name="class_url" value={class_url} onChange={(e) => setClass_url(e.target.value)} className={clsx(inputStyle)} />
      <button type='submit' className="border border-ppink-200 hover:bg-ppink-200 mt-2 p-4 text-xl rounded-full transition" aria-label="done button">
        {submitting ? <FiLoader className="animate-spin-slow" /> : <FiCheck />}
      </button>
    </form>
  </Modal>

  if (isEmpty) {
    return (
      <>
      <button id={id} className="group bg-gray-800 rounded-xl h-32 outline-none" onClick={() => openModal()} aria-label={`add class data at index of ${class_time}`}>
        <div className="invisible group-hover:visible flex justify-center text-2xl transition">
          <FiPlus />
        </div>
      </button>
      {FormModal}
      </>
    )
  }

  return (
    <>
    <div id={id} className="bg-gray-800 rounded-xl flex flex-row h-32">
      <button className={clsx(cardLeft)} onClick={() => openWindow()} aria-label='open class url'>
        <p className="p-4 text-left text-lg font-semibold block h-full break-all overflow-hidden">{class_title}</p>
      </button>
      <button onClick={() => openModal()} className={clsx(cardRight)} aria-label='edit class data'>
        <FiEdit />
      </button>
      {FormModal}
    </div>
    </>
  )
}

export default ClassCard