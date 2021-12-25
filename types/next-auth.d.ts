import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    account: {
      /** The user's postal address. */
      account_id: string
      account_email: string
    }
  }
}