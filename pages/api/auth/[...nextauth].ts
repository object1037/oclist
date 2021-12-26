import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PSDB } from 'planetscale-node'

const conn = new PSDB('main')

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn(message) {
      const account = message.user
      const [rows, fields] = await conn.query(`
      insert ignore into account (account_id, account_email, range_0, range_1, range_2, range_3, range_4, range_5)
      values ('${account.id}', '${account.email}', '0830-1000', '1025-1155', '1315-1445', '1510-1640', '1705-1835', '1900-2030')
      `, '')
    },
  },
  pages: {
    signIn: '/',
  },
})