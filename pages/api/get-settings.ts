import { PSDB } from 'planetscale-node'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"

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
        const [getRows, _] = await conn.query(`select * from account where account_email='${session?.user?.email}';`, '')
        res.status(200).json(getRows)
      } catch (e) {
        res.status(500).json({ message: 'An error occurred while connecting to the database' })
      }

      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler