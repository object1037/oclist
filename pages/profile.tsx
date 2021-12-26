import Head from 'next/head'
import Header from '../components/header'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import Setting from '../components/setting'

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
      <div className='pb-20 pt-10 px-6 sm:px-12 max-w-5xl mx-auto'>
        <h2 className='text-2xl font-semibold'>Settings</h2>
        <Setting data={data} />
      </div>
    </main>
    </>
  )
}

export default Profile