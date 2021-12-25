import type { NextPage } from 'next'
import Head from 'next/head'
import ClassCard from '../components/classCard'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { signIn, signOut } from "next-auth/react"
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const Home: NextPage = () => {
  const {data: session, status} = useSession()
  const { data, error } = useSWR('/api/get-classes', fetcher)
  console.log(data)
  async function clickHandler() {
    await axios.get('/api/account', {
    })
  }
  if (session) {
    return (
      <>
      <Head>
        <title>oclist</title>
        <meta name="description" content="online class list" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <p>logged in</p>
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
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => clickHandler()}>aaa</button>
      <div>
      </div>
    </main>
    </>
  )
}

export default Home