'use client'

import Link from 'next/link'
import Heading from '../../components/Heading'
import Input from '../../components/inputs/Input'
import MyButton from '../../components/MyButton'
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import {  AiOutlineGoogle } from 'react-icons/ai'


import MyLogo from '../../components/MyLogo'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoginForm = ({ currentUser }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (currentUser) {
      router.push('/cart')
      router.refresh()
    }
  }, [currentUser, router])

  const [isLoading, setisLoading] = useState(false)

  const onSubmit = (data) => {
    setisLoading(true)

    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setisLoading(false)

      if (callback?.ok) {
        router.push('/cart')
        router.refresh()
        toast.success('Logged In')
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  if (currentUser) {
    return <p className='text-center '>Logged In. Redirecting...</p>
  }

  return (
    <>
      <div className=' mt-4   '>
        <div className='flex flex-col items-center justify-center gap-0'>
          <Heading title={'Login to'} />
          <div className='text-3xl'>
            <MyLogo />
          </div>
          <div className='divider' />
        </div>
      </div>

      <MyButton
        btnBGColor='bg-orange-400 '
        label={'Continue with Google'}
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google')
        }}
      />



      <div className='divider'>OR</div>

      <h2>Email</h2>

      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='text'
      />

      <MyButton
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
      />

      <p className='text-sm mt-3 mb-8'>
        Do not have an account
        <Link
          className='underline ml-2 font-sans text-primary font-semibold'
          href={'/register'}
        >
          Register
        </Link>
      </p>
    </>
  )
}

export default LoginForm
