import { PSDB } from 'planetscale-node'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"

const conn = new PSDB('main')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const {
    body: {
      account_email,
      range_0,
      range_1,
      range_2,
      range_3,
      range_4,
      range_5
    },
    method
  } = req
  if (!session) {
    return res.status(401).end()
  }
  switch (method) {
    case 'POST':
      try {
        const [rows, fields] = await conn.query(`
        update account
        set range_0 = '${range_0}',
            range_1 = '${range_1}',
            range_2 = '${range_2}',
            range_3 = '${range_3}',
            range_4 = '${range_4}',
            range_5 = '${range_5}'
        where account_email = '${account_email}';
        `, '')
        
        res.status(200).json({ message: 'Updated settings' })
      } catch (e) {
        res.status(500).json({ message: String(e) })
      }

      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler