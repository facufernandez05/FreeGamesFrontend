'use client'

import { FavContext } from '@/context/fav'
import { useContext } from 'react'

export const useFav = () => {
  const context = useContext(FavContext)

  return context
}
