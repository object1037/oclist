import type { NextPage } from 'next'
import Head from 'next/head'
import ClassCard from '../components/classCard'
import { classes } from '../test'
import axios from 'axios'
import { signIn } from "next-auth/react"

const Home: NextPage = () => {
  async function clickHandler() {
    await axios.get('/api/account', {
    })
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
      <button onClick={() => clickHandler()}>aaa</button>
      <div>
      </div>
    </main>
    </>
  )
}

export default Home