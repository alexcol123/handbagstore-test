'use client'
import NavSearch from './NavSearch'
import { FaSearch } from 'react-icons/fa'
import { Redressed,  } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/utils/formatPrice'
import MyLogo from '../MyLogo'

const NavMain = ({ categoriesLinks }) => {
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
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='badge badge-sm indicator-item border-primary '>
                {cartTotalQty}
              </span>
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
        <div className='dropdown dropdown-end mr-4'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <Image
                src={
                  'https://images.pexels.com/photos/2816544/pexels-photo-2816544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                }
                width={200}
                height={200}
                alt='avatar'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>

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
                  className=' py-1 pl-3 hover:text-primary hover:bg-base-100'
                >
                  {item.name}
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
