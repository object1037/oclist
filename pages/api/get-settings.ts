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
        const [getRows, _] = await conn.query(SQL`SELECT * FROM account WHERE account_email = ${session?.user?.email}`)
        res.status(200).json(getRows)
      } catch (e) {
        res.status(500).json({ message: String(e) })
      }

      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler