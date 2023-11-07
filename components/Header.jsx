'use client'

import { LoggedContext } from '@/context/logged'
import { useFetchProfileData } from '@/hooks/useFetchProfileData'
import { ArrowDropDown, Favorite, Logout, Search } from '@mui/icons-material'
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'

export default function Header () {
  const { loggedIn } = useContext(LoggedContext)

  return (
    <nav className='flex items-center justify-center border-b border-gray-700 shadow-md bg-primary shadow-gray-700'>
      <div className='flex items-center justify-between w-full max-w-5xl p-4'>
        <Link href='/' className='text-2xl font-black tracking-wider'>Games Free</Link>

        <section className='flex items-center gap-4'>

          <CategoryMenu />

          <Link href='/games/pc' className='p-1 transition-all border-b border-transparent hover:border-b-blue-500 hover:text-blue-500'>PC</Link>

          <Link href='/games/browser' className='p-1 transition-all border-b border-transparent hover:border-b-blue-500 hover:text-blue-500'>Web Browser</Link>

        </section>

        <section className='flex items-center gap-4'>
          <Search />

          {loggedIn
            ? <>
              <PopoverProfile />
              {/* eslint-disable react/jsx-closing-tag-location */}
            </>

            : <>
              <Link href='/login' className='p-2 text-gray-300 rounded-md hover:text-white'>
                Log In
              </Link>
              <Link href='/register' className='p-2 text-gray-300 rounded-md hover:text-white'>
                Register
              </Link>
            </>}

        </section>
      </div>
    </nav>
  )
}

function PopoverProfile () {
  const [anchorEl, setAnchorEl] = useState(false)

  const { handleLogout } = useContext(LoggedContext)
  const { userData } = useFetchProfileData()

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const id = open ? 'simple-popover' : undefined
  return (
    <>
      <button
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        aria-describedby={id}
        className='p-2 text-xl text-gray-300 transition-colors hover:text-blue-500'
      >
        {userData.username}
      </button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {/* <MenuItem>
          <Link href='/profile'>
            <ListItemIcon>
              <Person fontSize='small' />
            </ListItemIcon>
            Profile
          </Link>
        </MenuItem> */}
        <MenuItem>
          <Link href={`/profile/${userData.username}`}>
            <ListItemIcon>
              <Favorite fontSize='small' />
            </ListItemIcon>
            Favorites
          </Link>
        </MenuItem>

        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' color='error' />
          </ListItemIcon>
          <span className='text-red-500'>Logout</span>
        </MenuItem>
      </Menu>

    </>
  )
}

function CategoryMenu () {
  const [anchorEl, setAnchorEl] = useState(false)
  const buttonRef = useRef(null)

  const handlePopoverOpen = (event) => {
    setAnchorEl(!anchorEl)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    // Agrega un controlador de eventos para cerrar el menú al hacer clic en cualquier parte fuera de él
    function handleClickOutside (event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        handlePopoverClose()
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      // Limpia el controlador de eventos al desmontar el componente
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative'>
      <button className={`p-1 transition-all flex border-b border-transparent gap-1 hover:border-b-blue-500 hover:text-blue-500 ${anchorEl ? 'border-b-blue-500 text-blue-400' : ''}`} ref={buttonRef} onClick={handlePopoverOpen}>
        <span>Category</span> <ArrowDropDown />
      </button>
      {anchorEl &&
        <ul className='absolute my-4 z-50 justify-center py-2 bg-tertiary rounded-md flex flex-col w-40 list-none gap-1'>
          {listOfCategoryFilter.map(category => (
            <Link key={category.label} href={category.href} className='hover:bg-primary px-4 py-2 hover:text-blue-400'>
              <p>{category.label}</p>
            </Link>
          ))}
        </ul>}

    </div>
  )
}

const listOfCategoryFilter = [
  {
    label: 'Shooter',
    href: '/games/category/shooter'
  },
  {
    label: 'Fighting',
    href: '/games/category/fighting'
  },
  {
    label: 'Battle Royale',
    href: '/games/category/battle_royale'
  },
  {
    label: 'MMORPG',
    href: '/games/category/mmorpg'
  },
  {
    label: 'MOBA',
    href: '/games/category/moba'
  },
  {
    label: 'Anime',
    href: '/games/category/anime'
  },
  {
    label: 'Strategy',
    href: '/games/category/strategy'
  },
  {
    label: 'Fantasy',
    href: '/games/category/fantasy'
  },
  {
    label: 'Sci-Fi',
    href: '/games/category/sci-fi'
  },
  {
    label: 'Card Games',
    href: '/games/category/card'
  },
  {
    label: 'Racing',
    href: '/games/category/racing'
  },
  {
    label: 'Social',
    href: '/games/category/social'
  },
  {
    label: 'Sports',
    href: '/games/category/sports'
  }
]
