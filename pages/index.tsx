import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { signIn } from "next-auth/react"
import useSWR from 'swr'
import TimeTable from '../components/timeTable'
import TimeTableMobile from '../components/timeTableMobile'
import Header from '../components/header'
import { FiLogIn } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Home: NextPage = () => {
  const {data: session, status} = useSession()
  const loggedIn = session ? true : false
  const { data, error } = useSWR<classData[]>(loggedIn ? '/api/get-classes' : null, fetcher)
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' })

  if (status === "loading") {
    return (
      <div className='flex justify-center py-24'>
        Loading...
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <>
      <Head>
        <title>oclist</title>
        <meta name="description" content="online class list" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className='py-16 px-6 sm:px-12 flex flex-col justify-center'>
        <h1 className='text-5xl font-bold text-center mb-16'>oclist</h1>
        <p className='text-center text-lg text-gray-300 mb-6'>Manage all online class URLs in one place.</p>
        <p className='text-center text-gray-300 mb-10'>Please sign in with your GitHub account.</p>
        <button onClick={() => signIn('github')} className='border border-ppink-200 hover:bg-ppink-200 text-xl mx-auto p-4 rounded-full transition'>
          <FiLogIn />
        </button>
      </main>
      </>
    )
  }
  return (
    <>
    <Head>
      <title>oclist</title>
      <meta name="description" content="online class list" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>
      <Header />
      <div className='py-0 lg:py-10 px-6 sm:px-12'>
        {isLg ? <TimeTable data={data} /> : <TimeTableMobile data={data} />}
      </div>
    </main>
    </>
  )
}

export default Home