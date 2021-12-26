import { signOut } from "next-auth/react"
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b border-gray-600 py-4 px-6 sm:px-12">
      <h1 className="text-3xl font-bold">oclist</h1>
      <button onClick={() => signOut()} className="hover:bg-gray-800 p-4 rounded-full text-lg" aria-label="Sign out button">
        <FiLogOut />
      </button>
    </header>
  )
}

export default Header