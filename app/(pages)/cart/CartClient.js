'use client'
import Heading from '@/app/components/Heading'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'
import ItemContent from './ItemContent'
import MyButton from '@/app/components/MyButton'

const CartClient = () => {
  const { cartProducts } = useCart()

  console.log(cartProducts)

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
    <div>
      <Heading title='Shopping Cart' center />

      {/* Cart Items */}
      <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 px-4'>
        <div className='col-span-2  justify-self-start  '>Product</div>
        <div className='justify-self-center'>Price</div>
        <div className='justify-self-center'>Quantity</div>
        <div className='justify-self-end'>Total</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />
          })}
      </div>

      {/*  Cart Menu */}
      <div className=' border-t  border-slate-200 py-4 flex justify-between gap-4'>
        <div className='hidden md:block w-32'>
          <MyButton
            label='Clear Cart'
            small
            outline
            onClick={() => {
              handleClearCart()
            }}
          />
        </div>

        <div className='text-sm w-full px-8  md:w-[400px]  lg:w-[500px]px-4 flex flex-col gap-4 items-center md:items-start'>
          <div className='flex justify-between w-full text-base font-semibold'>
            <span>Subtotal</span>
            $850
            {/* <span>{(cartTotalAmount)}</span> */}
          </div>
          <p className='text-slate-500/80'>
            Taxes and Shipping calculated at checkout
          </p>

          <MyButton
            label={'Checkout'}
            outline={false}
            onClick={() => {}}
            // onClick={() => { currentUser ? router.push('/checkout'): router.push('/login')}}
          />

          <Link
            href='/'
            className='flex items-center gap-1 border px-3 py-1  rounded-md border-primary/40 mt-12 transition duratin-300 hover:border-primary'
          >
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartClient
