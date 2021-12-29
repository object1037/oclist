import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PSDB } from 'planetscale-node'
import SQL from 'sql-template-strings'

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
      const query = SQL`
      insert ignore into account (account_id, account_email, range_0, range_1, range_2, range_3, range_4, range_5)
      values (${account.id}, ${account.email}, '08:30', '10:25', '13:15', '15:10', '17:05', '19:00')
      `
      const [rows, fields] = await conn.query(query.sql, query.values)
    },
  },
  pages: {
    signIn: '/',
  },
})