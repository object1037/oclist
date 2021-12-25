import { useState } from "react";
import { FiEdit } from 'react-icons/fi'
import Modal from 'react-modal'
import axios from 'axios'

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
    openedWindow = window.open(classData.class_url)
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  if (!classData) {
    return (
      <>
      <button className="p-4 border" onClick={() => openModal()}>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <form onSubmit={submitHandler}>
          <input type='text' name="class_title" value={class_title} onChange={(e) => setClass_title(e.target.value)} />
          <input type='text' name="class_url" value={class_url} onChange={(e) => setClass_url(e.target.value)} />
          <button type='submit'>更新</button>
        </form>
      </Modal>
      </>
    )
  }
  return (
    <>
    <button className="" onClick={() => openModal()}>
      <FiEdit />
    </button>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <form onSubmit={submitHandler}>
        <input type='text' name="class_title" value={class_title} onChange={(e) => setClass_title(e.target.value)} />
        <input type='text' name="class_url" value={class_url} onChange={(e) => setClass_url(e.target.value)} />
        <button type='submit'>更新</button>
      </form>
    </Modal>
    <button className="p-4 border" onClick={() => openWindow()}>
      <p>{classData.class_title}</p>
      <p>{classData.class_url}</p>
    </button>
    </>
  )
}

export default ClassCard