'use client'

import NavSearch from './NavSearch'
import { FaSearch } from 'react-icons/fa'

import Link from 'next/link'

import MyLogo from '../MyLogo'
import UserMenu from './UserMenu'
import NavCart from './NavCart'

import NavMenuLinks from './NavMenuLinks'

const NavMain = ({ currentUser }) => {
  return (
    <div className='navbar  '>
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
        <NavCart />

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
            className='menu menu-sm dropdown-content mt-3 z-[1] shadow bg-base-300 rounded-box w-52 space-y-4 p-6 '
          >
            <div >
              <NavMenuLinks />
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavMain
