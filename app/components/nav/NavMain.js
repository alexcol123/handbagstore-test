'use client'
import NavSearch from './NavSearch'
import { FaSearch } from 'react-icons/fa'
import { Redressed } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../../hooks/useCart'
import { formatPrice } from '../../../utils/formatPrice'
import MyLogo from '../MyLogo'
import UserMenu from './UserMenu'

import { BsCart3 } from 'react-icons/bs'

const NavMain = ({ categoriesLinks, currentUser }) => {
  const { cartTotalAmount, cartTotalQty } = useCart()
  return (
    <div className='navbar bg-base-300 '>
      {/* Nav Start  */}
      <div className='navbar-start '>
        <div className=' text-primary text:sm md:text-2xl '>
          <Link href={'/'}>
            <MyLogo />
          </Link>
        </div>
      </div>

      {/* Nav Center */}
      {/* <div className="navbar-center">

      </div> */}

      {/* Nav End  */}
      <div className='navbar-end'>
        {/* Search */}
        <div className='dropdown dropdown-end mr-4'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <div className='indicator'>
              <FaSearch />
            </div>
          </div>
          <div
            tabIndex={0}
            className='mt-3 z-[1] card  card-compact dropdown-content w- bg-base-300 shadow w-52 '
          >
            <div className='card-body px-1'>
              <NavSearch />
            </div>
          </div>
        </div>

        {/* Cart */}

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

        {/* Avatar */}
        <UserMenu currentUser={currentUser} />

        <div className='dropdown  dropdown-end sm:hidden'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-300 rounded-box w-52 space-y-4 p-6'
          >
            {categoriesLinks.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={` py-1 pl-3 hover:text-primary  ${
                    item.color && 'text-error font-semibold'
                  }`}
                >
                  <div>{item.name}</div>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavMain
