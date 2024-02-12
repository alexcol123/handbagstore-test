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

const CartClient = ({ currentUser, products }) => {
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

  const isProductStillAvailable = (item) => {
    console.log('inside item')

    const currentProduct = products.filter((p) => p.id === item.id)

    if (currentProduct[0].inStock < 1) {
      handleRemoveProductFromCart(item)
      console.log('In stock === ', currentProduct[0].inStock)
    }
  }

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className='flex flex-col items-center '>
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
                        // Check If still Available   , it might have been sold  while you were looking at other products, if its not available remove from cart

                        {
                          isProductStillAvailable(item)
                        }

                        return (
                          <div key={item}>
                            <li className='flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 border-b'>
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
