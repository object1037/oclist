import type { NextPage } from 'next'
import Head from 'next/head'
import ClassCard from '../components/classCard'
import { classes } from '../test'

const Home: NextPage = () => {
  return (
    <>
    <Head>
      <title>oclist</title>
      <meta name="description" content="online class list" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <main>
      <div>
        {classes.map((classData) => {
          return (
            <ClassCard key={classData.url} classData={classData} />
          )
        })}
      </div>
    </main>
    </>
  )
}

export default Home