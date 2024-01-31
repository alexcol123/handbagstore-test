'use client'
import { BsCart3 } from 'react-icons/bs'
import { useCart } from '../../../hooks/useCart'
import Link from 'next/link'
import { formatPrice } from '../../../utils/formatPrice'
const NavCart = () => {

  const { cartTotalAmount, cartTotalQty } = useCart ()
  return (
    <div className='dropdown dropdown-end mr-4'>
    <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
      <div className='indicator'>
        <BsCart3 size={22} />

        {cartTotalQty >= 1 && (
          <span className='badge badge-sm indicator-item border-primary  text-xs  '>
            {cartTotalQty}
          </span>
        )}
      </div>
    </div>

    <div
      tabIndex={0}
      className='mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-300 shadow'
    >
      <div className='card-body'>
        <span className='font-bold text-lg'>
          {cartTotalQty} {cartTotalQty === 1 ? 'Item' : 'Items'}
        </span>
        <span className=''>Subtotal: {formatPrice(cartTotalAmount)}</span>
        <div className='card-actions'>
          <Link href='/cart' className='btn btn-primary btn-block'>
            View cart
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default NavCart
