import { PSDB } from 'planetscale-node'
import type { NextApiRequest, NextApiResponse } from 'next'

const conn = new PSDB('main')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: {
      account
    },
    method
  } = req
  switch (method) {
    case 'POST':
      const [rows, fields] = await conn.query(`
      insert ignore into account (account_id, account_email)
      values ('${account.id}', '${account.email}');
      `, '')
      res.status(201).json({ message: 'successfully created an account' })
      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler