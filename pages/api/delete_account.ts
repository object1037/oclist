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
    return res.status(401).end()
  }
  switch (method) {
    case 'GET':
      try {
        const query = SQL`DELETE FROM account WHERE account_email = ${session.user?.email};`
        const query2 = SQL`DELETE FROM class WHERE account_email = ${session.user?.email};`
        const [rows, cols] = await conn.query(query.sql, query.values)
        const [rows2, cols2] = await conn.query(query2.sql, query2.values)
        res.status(200).json({ message: 'successfuly deleted account' })
      } catch (e) {
        res.status(500).json({ message: String(e) })
      }

      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler