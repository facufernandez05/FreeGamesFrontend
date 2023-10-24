'use client'

import { LoggedContext } from '@/context/logged'
import { FavoriteBorderOutlined, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useContext, useState } from 'react'

export default function Header () {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false)
  const { loggedIn, handleLogout } = useContext(LoggedContext)

  return (
    <>
    <nav className='flex items-center justify-between p-2 border-b border-gray-700 shadow-md shadow-gray-700'>
      <Link href='/' className='text-2xl font-black tracking-wider'>Games Free</Link>

        <section className='flex items-center gap-4'>

          <div className='group [&_summary::-webkit-details-marker]:hidden flex flex-col'>
            <button onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>
              Category
            </button>
          </div>

          <button onClick={() => setPlatformMenuOpen(!platformMenuOpen)}>Platform</button>

        </section>

        <section className='flex items-center gap-4'>
        <Search />
        <Link href='/favoritos'>
          <FavoriteBorderOutlined />
        </Link>

        {loggedIn
          ? <>
          <Link href='/perfil' className='p-2 text-gray-300 rounded-md hover:text-white'>Perfil</Link>
          <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
          </>

          : <>
          <Link href='/login' className='p-2 text-gray-300 rounded-md hover:text-white'>
            Log In
          </Link>
          <Link href='/register' className='p-2 text-gray-300 rounded-md hover:text-white'>
            Register
          </Link>
          </>
        }

        </section>
    </nav>
    </>
  )
}

/* const listOfCategoryFilter = [
  {
    label: 'Shooter',
    href: '/games/shooter'
  },
  {
    label: 'Fighting',
    href: '/games/fighting'
  },
  {
    label: 'Battle Royale',
    href: '/games/battle_royale'
  }
]

const listOfPlatformFilter = [
  {
    label: 'PC',
    href: '/games/pc'
  },
  {
    label: 'PS',
    href: '/games/ps4'
  },
  {
    label: 'Xbox',
    href: '/games/xbox'
  }
] */
