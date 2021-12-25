import { PSDB } from 'planetscale-node'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"

const conn = new PSDB('main')

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })
  const {
    body: {
      id,
      class_time,
      class_title,
      class_url,
    },
    method
  } = req
  if (!session) {
    return res.status(200)
  }
  switch (method) {
    case 'POST':
      try {
        if (id) {
          const [rows, fields] = await conn.query(`
          update class 
          set class_time = ${class_time},
              class_title = '${class_title}',
              class_url = '${class_url}'
          where id = ${id};
          `, '')
        } else {
          const [rows, fields] = await conn.query(`
          insert into class (class_time, class_title, class_url, account_id)
          values (${class_time}, '${class_title}', '${class_url}', '${session.user?.email}');
          `, '')
        }
        
        res.status(200).json({ message: 'Updated class data' })
      } catch (e) {
        res.status(500).json({ message: String(e) })
      }

      break
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default handler