import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import axios from 'axios'

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
      console.log(message)
      if (message.isNewUser) {
        await axios.post('/api/create-account', {
          account: message.account
        })
      }
    },
  }
})