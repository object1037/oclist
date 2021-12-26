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
      insert ignore into account (account_id, account_email)
      values ('${account.id}', '${account.email}')
      `, '')
    },
  },
  pages: {
    signIn: '/',
  },
})