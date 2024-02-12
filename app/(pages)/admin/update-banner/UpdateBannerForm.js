'use client'

import { useState, useEffect } from 'react'
import Heading from '../../../components/Heading'
import Input from '../../../components/inputs/MyInput'

import MyButton from '../../../components/MyButton'

import { useForm } from 'react-hook-form'

import toast from 'react-hot-toast'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import Hero from '@/app/components/Hero'
import Link from 'next/link'

// update banner
const UpdateBannerForm = ({ banner }) => {
  const {
    register,
    handleSubmit,

    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heading: banner?.heading ? banner?.heading : '',
      text: banner?.text ? banner?.text : '',
      url: banner?.url ? banner?.url : '',
    },
  })

  let heading = watch('heading')
  let text = watch('text')
  let url = watch('url')

  const router = useRouter()

  const [isProductCreated, setIsProductCreated] = useState(true)
  const [isLoading, setisLoading] = useState(false)

  useEffect(() => {
    if (isProductCreated) {
      reset()

      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const onSubmit = async (data) => {
    //  console.log('Product data', data)
    // console.log('images', data.images.length)
    setisLoading(true)

    let image

    if (data.url) {
      if (data.url.includes('?')) {
        console.log('YESSSSSSS')
        image = data.url.split('?')[0]
      } else {
        image = data.url
      }
    }

    // After uploads
    const productData = { ...data, url: image }
    // console.log(productData)

    // Save Product to Database
    // Save to mongodb
    axios
      .put('/api/banner', productData)
      .then(() => {
        toast.success('Banner Created ')
        setIsProductCreated(true)
        router.push('/')
        router.refresh()
      })
      .catch((error) => {
        console.log(error)
        toast.error('Something went wrong in catch')
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  return (
    <>
      <Hero
        opacity='50'
        title={heading}
        body={text}
        showButton={false}
        url={url}
      />

      <Heading title='Add New Product' center />

      <Input
        id='heading'
        label='Heading'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id='text'
        label='Text'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <h1>{url}</h1>

      <div className='flex items-center justify-center py-4 gap-2'>
        <Link
          href={
            'https://www.pexels.com/photo/defocused-image-of-lights-255379/'
          }
          rel='noopener noreferrer'
          target='_blank'
          className='p-1 px-6  rounded-box bg-primary/30 duration-300 hover:bg-accent/30'
        >
          Pexels.com Link
        </Link>
        <p className='text-xs'>
          Then left click and select: Copy Image Address
        </p>
      </div>

      <Input
        id='url'
        label='URL from pexels.com'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {/* Image */}

      <div>
        <MyButton
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          isLoading={isLoading}
          label={isLoading ? 'Loading...' : 'Update Banner '}
        />
      </div>
    </>
  )
}

export default UpdateBannerForm
