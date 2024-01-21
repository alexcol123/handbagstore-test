'use client'

import Link from 'next/link'
import Heading from '../../components/Heading'
import Input from '../../components/inputs/Input'
import MyButton from '../../components/MyButton'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AiFillFacebook, AiOutlineGoogle } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { FaGooglePlus } from 'react-icons/fa'
import MyLogo from '@/app/components/MyLogo'

const LoginForm = () => {
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

  const [isLoading, setisLoading] = useState(false)

  const onSubmit = (data) => {
    setisLoading(true)
    console.log(data)
  }

  return (
    <>
      <div className=' mt-4   '>
        <div className='flex flex-col items-center justify-center gap-0'>
          <Heading title={'Register to'} />
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
        onClick={() => {}}
      />

      <MyButton
        btnBGColor='bg-blue-600 '
        label={'Continue with Facebook'}
        icon={FaFacebook}
        onClick={() => {}}
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
