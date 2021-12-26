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
import { useState, useEffect } from 'react';

const useMediaQuery = () => {
  const [mq, setMq] = useState({
    isLg: window.matchMedia('(min-width: 1024px)').matches,
  });

  useEffect(() => {
    const onResize = () => {
      setMq({
        isLg: window.matchMedia('(min-width: 1024px)').matches,
      });
    }

    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
    }
  });

  return mq
}

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Home: NextPage = () => {
  const {data: session, status} = useSession()
  const loggedIn = session ? true : false
  const { data, error } = useSWR<classData[]>(loggedIn ? '/api/get-classes' : null, fetcher)
  const mq = useMediaQuery()

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
        <h1 className='text-4xl font-bold text-center mb-24'>oclist</h1>
        <button onClick={() => signIn()} className='border border-ppink-200 hover:bg-ppink-200 text-xl mx-auto p-4 rounded-full transition'>
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
        {mq.isLg ? <TimeTable data={data} /> : <TimeTableMobile data={data} />}
      </div>
    </main>
    </>
  )
}

export default Home