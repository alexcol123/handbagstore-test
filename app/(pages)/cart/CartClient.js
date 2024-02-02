'use client'
import Heading from '../../components/Heading'

import { useCart } from '../../../hooks/useCart'
import Link from 'next/link'
import { MdArrowBack, MdArroowForward } from 'react-icons/md'
import Image from 'next/image'
import ItemContent from './ItemContent'
import MyButton from '../../components/MyButton'

import { useRouter } from 'next/navigation'

import React from 'react'
import { CartProductType } from '../product/[productId]/ProductDetails'
import { formatPrice } from '../../../utils/formatPrice'

import { truncateText } from '../../../utils/truncateText'

// import SetQuantity from '../components/products/SetQuantity'

// import { formatPrice } from '../../../utils/formatPrice'
import SetQuantity from '../../components/products/SetQuantity'

const CartClient = ({ currentUser }) => {
  // console.log(currentUser)

  const router = useRouter()

  const {
    cartProducts,
    handleClearCart,
    cartTotalAmount,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
  } = useCart()

  // console.log(cartProducts)


  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className=' flex flex-col items-center '>
        <div className='text-2xl'> Your Cart Is Empty</div>
        <Link
          href='/'
          className='flex items-center gap-1  animate-pulse  border px-3 py-1 mt-4 rounded-md border-primary bg-accent text-accent-content '
        >
          <MdArrowBack />
          <span>Back to Shop</span>
        </Link>
      </div>
    )
  }


  return (
    <section className=' py-12  '>
      <div className='mx-auto px-4 sm:px-6 lg:px-8  '>
        <div className='flex items-center justify-center  '>
          <h1 className='text-2xl font-semibold '>Your Cart</h1>
        </div>

        <div className='mx-auto my-8 max-w-2xl md:mt-12  '>
          <div className=' border-2  border-primary/30  bg-base-200/30 rounded-box   shadow'>
            <div className='px-4 py-6 sm:px-8 sm:py-10  '>
              <div className='flow-root'>
                <ul className='-my-8'>
                  <div>
                    {cartProducts &&
                      cartProducts.map((item) => {
                        return (
                          <div key={item}>
                            <li className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 border-b'>
                              {/* <img
                        className='h-24 w-24 max-w-full rounded-lg object-cover'
                        src='data:image/jpeg;base64,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'
                        alt=''
                      /> */}

                              <Link href={`/product/${item.id}`}>
                                <div className='relative  h-20   aspect-square duration-300  hover:scale-105'>
                                  <Image
                                    src={item.selectedImg}
                                    alt={item.name}
                                    fill
                                    className=' object-contain'
                                  />
                                </div>
                              </Link>

                              <div className='relative flex flex-1 flex-col justify-between'>
                                <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
                                  <div className='pr-8 sm:pr-5'>
                                    <p className='text-base font-semibold '>
                                      {truncateText(item.name)}
                                    </p>
                                    <p className='mx-0 mt-1 mb-0 text-sm '>
                                      Size: {item.size}
                                    </p>
                                  </div>

                                  <div className='mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
                                    <p className='shrink-0 w-20 text-base font-semibold  sm:order-2 sm:ml-8 sm:text-right'>
                                      {formatPrice(item.quantity * item.price)}
                                    </p>

                                    {/* <div className='sm:order-1'>
                                      <div className='mx-auto flex h-8 items-stretch text-gray-600'>
                                        <button className='flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white'>
                                          -
                                        </button>
                                        <div className='flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition'>
                                          1
                                        </div>
                                        <button className='flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white'>
                                          +
                                        </button>
                                      </div>
                                    </div> */}

                                    <div className='justify-self-center'>
                                      <SetQuantity
                                        cartCounter={true}
                                        cartProduct={item}
                                        handleQtyIncrease={() => {
                                          handleCartQtyIncrease(item)
                                        }}
                                        handleQtyDecrease={() => {
                                          handleCartQtyDecrease(item)
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className='absolute top-0 right-0 flex sm:bottom-0 sm:top-auto'>
                                  <button
                                    onClick={() =>
                                      handleRemoveProductFromCart(item)
                                    }
                                    className='text-slate-500 underline hover:text-error'
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          </div>
                        )
                      })}
                  </div>
                </ul>
              </div>

              <div className='my-10 border-b py-2'>
         
                <div className='flex items-center justify-between'>
                  <p className='text-sm '>Shipping</p>
                  {/* <p className='text-lg font-semibold '>$8.00</p> */}
                      <p className='text-md '>free shipping</p>
                </div>
              </div>
              <div className='mt-6 flex items-center justify-between'>
                <p className='text-sm font-medium '>Subtotal</p>
                <p className='text-lg font-semibold '>
                 {formatPrice(cartTotalAmount)}
                </p>
              </div>
              <p className='mt-12 text-center opacity-60 '>
            Taxes and Shipping calculated at checkout
          </p>

              <div className='my-12 text-center'>
                <MyButton
                  label={currentUser ? 'Checkout' : 'Login to Checkout'}
                  outline={false}
                  onClick={() => {
                    currentUser
                      ? router.push('/checkout')
                      : router.push('/login')
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartClient
