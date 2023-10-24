'use client'

import Link from 'next/link'
import { useState } from 'react'

const url = 'http://localhost:1337/api/auth/local/register'

export default function Register () {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value
    })
  }

  const handleRegister = async () => {
    if (userData.password === userData.confirmPassword) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password
          })
        })

        if (response.ok) {
          console.log('Registro exitoso')
          window.location.href = '/login'
        }
      } catch (error) {
        console.error('Error en la solicitud:', error)
      }
    } else {
      console.error('Las contraseñas no existen')
    }
  }

  return (
    <main className='flex justify-center mt-4'>
    <div className='flex flex-col gap-8'>
      <h2>Create your account</h2>
      {inputsRegister.map((input) => (
        <input
        className="p-2 bg-gray-700 rounded-md"
        key={input.name}
        placeholder={input.placeholder}
        type={input.type}
        value={userData[input.value]}
        name={input.name}
        onChange={handleChange} />
      ))}

      <button type='button' onClick={handleRegister}>Register</button>

      <p>
        Already a member?
        <Link className='ml-2 text-blue-500 hover:text-gray-200'
        href='/login'>Log In</Link>
      </p>
    </div>
    </main>
  )
}

const inputsRegister = [
  {
    placeholder: 'Username',
    type: 'text',
    value: 'username',
    name: 'username'
  },
  {
    placeholder: 'Email',
    type: 'email',
    value: 'email',
    name: 'email'
  },
  {
    placeholder: 'Password',
    type: 'password',
    value: 'password',
    name: 'password'
  },
  {
    placeholder: 'Confirm Password',
    type: 'password',
    value: 'confirmPassword',
    name: 'confirmPassword'
  }
]
