import Head from 'next/head'
import Header from '../components/header'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import Setting from '../components/setting'
import { signOut } from "next-auth/react"
import { FiLogOut, FiTrash, FiLoader } from 'react-icons/fi'
import Modal from 'react-modal'
import { useState } from 'react'
import clsx from 'clsx'
 
Modal.setAppElement('#__next');

const Profile = () => {
  const {data: session, status} = useSession()
  const loggedIn = session ? true : false
  const { data, error } = useSWR<account[]>(loggedIn ? '/api/get-settings' : null)
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(false)

  const [logouting, setLogouting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const mySignOut = () => {
    setLogouting(true)
    signOut()
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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

  const labelStyle = [
    'font-bold',
    'text-2xl',
    'mb-10',
    'mx-5'
  ]

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setDeleting(true)
    try {
      axios.get('/api/delete_account').then(() => {
        closeModal()
        signOut()
      })
    } catch (e) {
      throw Error(String(e))
    }
  }

  if (status === "loading") {
    return (
      <>
      <Head>
        <title>profile | oclist</title>
        <meta name="description" content="online class list" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex justify-center py-24'>
        Loading...
      </div>
      </>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/')
    return (
      <>
      <Head>
        <title>profile | oclist</title>
        <meta name="description" content="online class list" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex justify-center py-24'>
        Redirecting...
      </div>
      </>
    )
  }

  return (
    <>
    <Head>
      <title>profile | oclist</title>
      <meta name="description" content="online class list" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>
      <Header image={session!.user!.image!} />
      <div className='pt-10 pb-20 px-6 sm:px-12 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8'>Settings</h2>
        <Setting data={data} />
        <div className='mt-20'>
          <h2 className='text-3xl font-bold mb-8'>Log out</h2>
          <button onClick={() => mySignOut()} className='mx-6 border border-ppink-200 hover:bg-ppink-200 text-xl p-4 rounded-full transition' aria-label='Sign out button'>
            {logouting ? <FiLoader className="animate-spin-slow" /> : <FiLogOut />}
          </button>
        </div>
        <div className='mt-20'>
          <h2 className='text-3xl font-bold mb-8'>Delete account</h2>
          <button onClick={() => openModal()} className='mx-6 border border-ppink-200 hover:bg-ppink-200 text-xl p-4 rounded-full transition' aria-label='Delete account button'>
            <FiTrash />
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            className={clsx(modalStyle)}
            overlayClassName={clsx(overlayStyle)}
          >
            <form onSubmit={submitHandler} className="flex flex-col items-center">
              <p className={clsx(labelStyle)}>Are you sure?</p>
              <p className='mb-2'>This action will delete your oclist account and its data.</p>
              <p className='mb-10'>This will not affect your GitHub account.</p>
              <button type='submit' className="border border-ppink-200 hover:bg-ppink-200 p-4 px-8 text-lg rounded-full transition" aria-label="done button">
                <p>{deleting ? "Deleting..." : "Yes, delete my account"}</p>
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </main>
    </>
  )
}

export default Profile