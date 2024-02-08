'use client'

import Link from 'next/link'
import Heading from '../../components/Heading'
import Input from '../../components/inputs/MyInput'
import MyButton from '../../components/MyButton'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'

import MyLogo from '../../components/MyLogo'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const RegisterForm = ({ currentUser }) => {
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

  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      router.push('/cart')
      router.refresh()
    }
  }, [currentUser, router])

  const onSubmit = (data) => {
    setisLoading(true)
    console.log(data)

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Account Created')

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push('/cart')
            router.refresh()
            toast.success('Logged In')
          }

          if (callback?.error) {
            toast.error(callback.error)
          }
        })
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setisLoading(false))
  }

  if (currentUser) {
    return <p className='text-center '>Logged In. Redirecting...</p>
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
        btnBGColor='bg-orange-500 '
        btnTextColor={'text-gray-50'}
        label={'Continue with Google'}
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google')
        }}
      />

      <div className='divider'>OR</div>

      <h2>Email</h2>

      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

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
        Already have an account
        <Link
          className='underline ml-2 font-sans text-primary font-semibold'
          href={'/login'}
        >
          Login
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
