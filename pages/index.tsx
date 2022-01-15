import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { signIn } from "next-auth/react"
import useSWR from 'swr'
import TimeTable from '../components/timeTable'
import TimeTableMobile from '../components/timeTableMobile'
import Next from '../components/next'
import Header from '../components/header'
import { FiLogIn, FiLoader } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'

const Home: NextPage = () => {
  const {data: session, status} = useSession()
  const loggedIn = session ? true : false
  const { data, error } = useSWR<classData[]>(loggedIn ? '/api/get-classes' : null)
  const { data: account, error: accountError } = useSWR<account[]>(loggedIn ? '/api/get-settings' : null)
  const isLg = useMediaQuery({ query: '(min-width: 1024px)' })
  const [submitting, setSubmitting] = useState(false)

  const mySignIn = () => {
    setSubmitting(true)
    signIn('github')
  }

  if (status === "loading") {
    return (
      <>
      <Head>
        <title>oclist</title>
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
        <p className='text-center text-gray-300 mb-10'>Please sign in or create an account with your GitHub account.</p>
        <button onClick={() => mySignIn()} disabled={submitting} className='border border-ppink-200 hover:bg-ppink-200 text-xl mx-auto p-4 rounded-full transition' aria-label='Sign in button'>
          {submitting ? <FiLoader className="animate-spin-slow" /> : <FiLogIn />}
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
      <Header image={session!.user!.image!} />
      <div className='pt-10 pb-20 px-6 sm:px-12'>
        <Next data={data} account={account} />
        {isLg ? <TimeTable data={data} account={account} /> : <TimeTableMobile data={data} account={account} />}
      </div>
    </main>
    </>
  )
}

export default Home