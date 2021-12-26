import { PSDB } from 'planetscale-node'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import SQL from 'sql-template-strings'

const conn = new PSDB('main')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const {
    method
  } = req
  if (!session) {
    return res.status(200).end()
  }
  switch (method) {
    case 'GET':
      try {
        const [getRows, _] = await conn.query(SQL`select * from class where account_id=${session?.user?.email};`)
        const classes = new Array(36)
        getRows.forEach((element: classData) => {
          classes[element.class_time] = element
        });
        res.status(200).json(classes)
      } catch (e) {
        res.status(500).json({ message: 'An error occurred while connecting to the database' })
      }

      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler