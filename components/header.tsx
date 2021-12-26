import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Header = ({
  image,
}: {
  image?: string
}) => {
  const router = useRouter()

  return (
    <header className="flex justify-between items-center border-b border-gray-600 py-4 px-6 sm:px-12 h-20">
      <Link href='/'>
        <a className="text-3xl font-bold">oclist</a>
      </Link>
      {image && 
      <button className="rounded-full overflow-hidden w-12 h-12" aria-label="profile button" onClick={() => router.push('/profile')}>
        <Image src={image} alt='profile image' width={48} height={48} />
      </button>
      }
    </header>
  )
}

export default Header