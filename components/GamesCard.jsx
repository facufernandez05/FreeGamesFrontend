'use client'

import { useRouter } from 'next/navigation'
import { LoggedContext } from '@/context/logged'
import { useFav } from '@/hooks/useFav'
import { DesktopWindows, Favorite, FavoriteBorder, Language } from '@mui/icons-material'
import { Button, Skeleton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'

export function GamesCard ({ game }) {
  const [viewFavorite, setViewFavorite] = useState(false)
  const { loading } = useContext(LoggedContext)
  return (
    <>
      {loading
        ? <Skeleton />
        : <li className='relative max-w-xs transition-transform transform cursor-pointer hover:scale-105 group' key={game.id} onMouseEnter={() => setViewFavorite(true)} onMouseLeave={() => setViewFavorite(false)}>
          <Link href={game.game_url} target='_blank' rel='noreferrer'>
            <Image src={game.thumbnail} alt={game.title} width={300} height={300} priority className='object-cover w-full rounded-t-lg group-hover:opacity-50' />
          </Link>
          {viewFavorite &&
            <div className='absolute text-lg font-bold bottom-2 right-2'>
              {game.platform === 'PC (Windows)' ? <DesktopWindows /> : <Language />}
            </div>}
          {/* eslint-disable react/jsx-closing-tag-location */}
        </li>}

    </>
  )
}

export function GamesCardInline ({ game }) {
  const { loading } = useContext(LoggedContext)
  return (
    <>
      {loading
        ? <Skeleton />
        : <li className='w-full transition-transform transform cursor-pointer hover:scale-105 bg-secondary' key={game.id}>
          <Link href={game.game_url} target='_blank' rel='noreferrer' className='flex'>
            <div className='flex items-center justify-center w-48 p-4'>
              <Image src={game.thumbnail} alt={game.title} width={180} height={180} priority className='w-full' />
            </div>
            <div className='flex flex-col justify-between flex-1 gap-2 p-4'>
              <h2 className='text-xl font-bold'>{game.title}</h2>
              <p className='text-gray-400 max-h-6'>{game.short_description}</p>
              <footer className='flex justify-between gap-2'>
                <small className='px-4 py-1 mr-auto text-black bg-gray-500 rounded-lg'>{game.genre}</small>
                <p className='flex gap-2'>{game.platform === 'PC (Windows)'
                  ? <><DesktopWindows /><p>PC (Windows)</p></>
                  : <><Language /><p>Web Browser</p></>}
                </p>
              </footer>
            </div>
          </Link>
        </li>}

    </>
  )
}

export function GamesCardDetail ({ game, isProductInFavs }) {
  const { addToFavs, removeFromFavs } = useFav()
  const { loggedIn } = useContext(LoggedContext)
  const router = useRouter()

  const handleButtonClick = (e) => {
    e.preventDefault() // Evita la navegación predeterminada del enlace
    if (loggedIn) {
      isProductInFavs ? removeFromFavs(game) : addToFavs(game)
    } else {
      router.push('/login') // Navega a la página de inicio de sesión
    }
  }
  return (
    <li className='max-w-xs transition-transform transform cursor-pointer hover:scale-105' key={game.id}>
      <Link href={game.game_url} target='_blank' rel='noreferrer'>
        <Image src={game.thumbnail} alt={game.title} width={200} height={200} priority className='object-cover w-full rounded-t-lg' />
        <section className='flex flex-col justify-between gap-2 p-4 rounded-b-lg bg-secondary'>
          <h2 className='text-xl font-bold'>{game.title}</h2>
          <p className='text-gray-400 truncate max-h-6'>{game.short_description}</p>
          <footer className='flex justify-between'>
            <small className='flex items-center p-1 text-black bg-gray-500 rounded-lg'>{game.genre}</small>
            <Button onClick={handleButtonClick}>
              {isProductInFavs ? <Favorite /> : <FavoriteBorder />}
            </Button>
          </footer>
        </section>
      </Link>

    </li>
  )
}
