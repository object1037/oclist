import Head from 'next/head'
import Header from '../components/header'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import Setting from '../components/setting'
import { signOut } from "next-auth/react"
import { FiLogOut } from 'react-icons/fi'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Profile = () => {
  const {data: session, status} = useSession()
  const loggedIn = session ? true : false
  const { data, error } = useSWR(loggedIn ? '/api/get-settings' : null, fetcher)
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className='flex justify-center py-24'>
        Loading...
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/')
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
      <div className='py-20 px-6 sm:px-12 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-semibold mb-8'>Settings</h2>
        <Setting data={data} />
        <div className='flex flex-col mt-20'>
          <h2 className='text-3xl font-semibold mb-8'>Log out</h2>
          <button onClick={() => signOut()} className='self-center border border-ppink-200 hover:bg-ppink-200 text-xl p-4 rounded-full transition' aria-label='Sign out button'>
            <FiLogOut />
          </button>
        </div>
      </div>
    </main>
    </>
  )
}

export default Profile