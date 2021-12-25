import { PSDB } from 'planetscale-node'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"

const conn = new PSDB('main')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const {
    body: {
      class_time,
      class_title,
      class_url,
    },
    method
  } = req
  switch (method) {
    case 'POST':
      const [rows, fields] = await conn.query(`
      insert into accounts (class_time, class_title, class_url, account_id)
      values ('${class_time}', '${class_title}', '${class_url}', '${session?.account.account_id}')
      `, '')
      res.status(201).json({})
      break
    case 'GET':
      try {
        const [getRows, _] = await conn.query('select * from account', '')
        console.log(getRows)
        res.status(200).json(getRows)
      } catch (e) {
        res.status(500).json({ message: 'An error occurred while connecting to the database' })
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler