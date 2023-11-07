'use client'

import { favReducer, favsInitialState } from '@/reducers/favs'
import { createContext, useReducer } from 'react'

export const FavContext = createContext()

function useFavReducer () {
  const [state, dispatch] = useReducer(favReducer, favsInitialState)

  const addToFavs = product => dispatch({
    type: 'ADD_TO_FAVS',
    payload: product
  })

  const removeFromFavs = product => dispatch({
    type: 'REMOVE_FROM_FAVS',
    payload: product
  })

  const clearFavs = () => dispatch({ type: 'CLEAR_FAVS' })

  return { state, addToFavs, removeFromFavs, clearFavs }
}

export function FavProvider ({ children }) {
  const { state, addToFavs, removeFromFavs, clearFavs } = useFavReducer()

  return (
    <FavContext.Provider value={{
      favs: state,
      addToFavs,
      removeFromFavs,
      clearFavs
    }}
    >
      {children}
    </FavContext.Provider>
  )
}
