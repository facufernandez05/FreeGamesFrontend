'use client'

import { LoggedContext } from '@/context/logged'
import { FavoriteBorderOutlined, Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useContext, useState } from 'react'

export default function Header () {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
  const { loggedIn, handleLogout } = useContext(LoggedContext)

  return (
    <>
    <nav className='flex items-center justify-between p-2 border-b border-gray-700 shadow-md bg-primary shadow-gray-700'>
      <Link href='/' className='text-2xl font-black tracking-wider'>Games Free</Link>

        <section className='flex items-center gap-4'>

          <div className='group [&_summary::-webkit-details-marker]:hidden flex flex-col'>
            <button onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>
              Category
            </button>

          </div>

          <Link href='/pc-games'>PC</Link>

          <Link href='/web-games'>Web Browser</Link>

        </section>

        <section className='flex items-center gap-4'>
        <Search />

        <Link href='/favoritos'>
          <FavoriteBorderOutlined />
        </Link>

        {loggedIn
          ? <>
          <Link href='/profile' className='p-2 text-gray-300 rounded-md hover:text-white'>Perfil</Link>
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
    {categoryMenuOpen && <CategoryMenu />}
    </>
  )
}

function CategoryMenu () {
  return (
    <div className='absolute flex justify-center w-full p-2 bg-secondary'>
      <ul className='flex items-center justify-center max-w-xs gap-4 p-2 list-none'>
        {listOfCategoryFilter.map(category => (
          <li key={category.label}>
            <Link href={category.href}>{category.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const listOfCategoryFilter = [
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
