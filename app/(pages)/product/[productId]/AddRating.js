'use client'
import { Order, Product, Review } from '@prisma/client'

import MyInput from '../../../components/inputs/MyInput'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useForm,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'
import Heading from '@/app/components/Heading'
import { Rating } from '@mui/material'
import { Input } from 'postcss'
import MyButton from '@/app/components/MyButton'
import toast from "react-hot-toast";


const AddRating = ({ product, user }) => {
  const router = useRouter()
  const [isLoading, setisLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: '',
      rating: '5',
    },
  })

  const setCustomValue = (id, value) => {
    console.log('ddd')
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onSubmit = async (data) => {
    setisLoading(true)
    if (data.rating === 0) {
      setisLoading(false)
      return toast.error('NO rating selected')
    }

    const ratingData = { ...data, userId: user?.id, product }
    axios
      .post('/api/rating', ratingData)
      .then(() => {
        toast.success('Rating Submited')
        router.refresh()
        reset()
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  if(!user || ! product) return null

  const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) && order.deliveryStatus === 'delivered')

  const userReview = product?.reviews.find(((review ) => {
    return review.userId === user.id
  }))

  if(userReview || !deliveredOrder){
    return null
  }



  return (
    <div className='flex flex-col tems-center justify-center gap-6  max-w-[500px] border px-4 py-10 rounded-box bg-base-200  shadow-lg '>
      <Heading center title='Rate this product' />

      <div className='bg-gradient-to-r from-gray-200/90 to-primary/50  border-2   px-4 py-1 flex items-center justify-center h-14 rounded-box '>
        <Rating
          name='size-large'
          defaultValue={4}
          size='large'
          onChange={(event, newValue) => {
            setCustomValue('rating', newValue)
          }}
        />
      </div>

      <MyInput
        id='comment'
        label='Comment'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <MyButton
        small
        label={isLoading ? 'Loading' : 'Submit Rating'}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}

export default AddRating
