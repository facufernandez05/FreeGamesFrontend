'use client'

import Link from 'next/link'
import { useState } from 'react'

const url = 'http://localhost:1337/api/auth/local/'

export default function Login () {
  const [userData, setUserData] = useState()
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }

  const handleLogin = async () => {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: input.username,
          password: input.password
        })
      })
        .then(res => res.json())
        .then(data => setUserData(data))
      if (userData?.jwt) {
        window.localStorage.setItem('token', userData?.jwt)
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  return (
    <main className='flex justify-center mt-4'>
    <div className='flex flex-col gap-8'>
      <input className="p-2 bg-gray-700 rounded-md"
        placeholder="Email or Username"
        type="text"
        value={input.username}
        name='username'
        onChange={handleChange} />
      <input className="p-2 bg-gray-700 rounded-md"
        placeholder="Password"
        type="password"
        value={input.password}
        name='password'
        onChange={handleChange}/>

      <button type='button' onClick={handleLogin}>Log In</button>

      <p>
        Not a member yet?
        <Link className='ml-2 text-blue-500 hover:text-gray-200'
        href='/register'>Register</Link>
      </p>
    </div>
    </main>
  )
}
