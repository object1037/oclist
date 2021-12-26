import { signOut } from "next-auth/react"
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b py-3 px-6 sm:px-12">
      <h1 className="text-3xl font-bold">oclist</h1>
      <button onClick={() => signOut()} className="hover:bg-gray-100 p-4 rounded-full text-lg">
        <FiLogOut />
      </button>
    </header>
  )
}

export default Header