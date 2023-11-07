'use client'

import { ArrowDropDown } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'

export function SelectSort ({ sort, setSort }) {
  const [anchorEl, setAnchorEl] = useState(false)
  const buttonRef = useRef(null)

  const handlePopoverOpen = () => {
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

  const selectedSort = listOfSortBy.find(item => item.value === sort)

  return (
    <div className='relative'>
      <button className='p-1 transition-all flex gap-1 hover:text-gray-300 text' ref={buttonRef} onClick={handlePopoverOpen}>
        <span>{selectedSort ? selectedSort.label : 'Relevance'}</span> <ArrowDropDown color='primary' />
      </button>
      {anchorEl &&
        <ul className='absolute z-50 justify-center py-2 bg-tertiary rounded-md flex flex-col w-40 list-none gap-1'>
          {listOfSortBy.map(item => (
            <li key={item.label} onClick={() => setSort(item.value)} className='hover:bg-primary px-4 py-2 hover:text-blue-400 cursor-pointer'>
              <option value={item.value}>{item.label}</option>
            </li>
          ))}
        </ul>}

    </div>
  )
}

const listOfSortBy = [
  {
    label: 'Relevance',
    value: 'relevance'
  },
  {
    label: 'Popularity',
    value: 'popularity'
  },
  {
    label: 'Release Date',
    value: 'release-date'
  },
  {
    label: 'Alphabetical',
    value: 'alphabetical'
  }
]
