'use client'

import React from 'react'
import { CartProductType } from '../product/[productId]/ProductDetails'
// import { formatPrice } from '@/utils/formatPrice'
import Link from 'next/link'
import { truncateText } from '@/utils/truncateText'
import Image from 'next/image'
// import SetQuantity from '../components/products/SetQuantity'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'
import SetQuantity from '@/app/components/products/SetQuantity'

const ItemContent = ({ item }) => {
  const { handleRemoveProductFromCart, handleQtyIncrease, handleQtyDecrease } =
    useCart()

  console.log(item)

  return (
    <div className='grid grid-cols-5 text-xs  md-text-sm gap-2 border border-primary/60 py-4 mb-4 items-center px-2'>
      <div className='col-span-2 justify-star flex  gap-2 md:gap-4 '>
        {/*  1 column ===>   */}

        <Link href={`/product/${item.id}`}>
          <div className='relative w-20 aspect-square hover:scale-105'>
            <Image
              src={item.selectedImage}
              alt={item.name}
              fill
              className=' object-contain'
            />
          </div>
        </Link>
        <div className='flex flex-col justify-around   '>
          <Link
            className='font-semibold underline  hover:text-accent'
            href={`/product/${item.id}`}
          >
            {truncateText(item.name)}
          </Link>

          <div>{/* {item.selectedImg.color} */}</div>
          <div className='w-20  mt-6'>
            <button
              onClick={() => handleRemoveProductFromCart(item)}
              className='text-slate-500 underline hover:text-error'
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/*  2 column ===>   */}
      <div className='justify-self-center'> {formatPrice(item.price)}</div>

      {/*  3 column ===>   */}
      <div className='justify-self-center'>
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleQtyIncrease(item)
          }}
          handleQtyDecrease={() => {
            handleQtyDecrease(item)
          }}
        />
      </div>

      {/*  4 column ===>   */}
      <div className='justify-self-end font-semibold'>
        {formatPrice(item.quantity * item.price)}
      </div>
    </div>
  )
}

export default ItemContent
