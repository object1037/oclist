import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { signIn } from "next-auth/react"
import useSWR from 'swr'
import TimeTable from '../components/timeTable'
import Header from '../components/header'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Home: NextPage = () => {
  const {data: session, status} = useSession()
  const loggedIn = session ? true : false
  const { data, error } = useSWR<classData[]>(loggedIn ? '/api/get-classes' : null, fetcher)
  console.log(data)
  if (status === "loading") {
    return (
      <div>
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
      <main>
        <button onClick={() => signIn()}>Sign in</button>
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
      <div className='py-16 px-6 sm:px-12'>
        <TimeTable data={data} />
      </div>
    </main>
    </>
  )
}

export default Home