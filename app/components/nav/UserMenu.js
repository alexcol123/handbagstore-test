'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import toast from 'react-hot-toast'

const UserMenu = ({ currentUser }) => {
  console.log(currentUser)

  return (
    <div className='dropdown dropdown-end mr-4'>
      <div
        tabIndex={0}
        role='button'
        className='btn btn-ghost btn-circle avatar'
      >
        <div className='w-10 rounded-full '>
          <Image
            src={
              currentUser?.image
                ? currentUser?.image
                : 'https://images.pexels.com/photos/2816544/pexels-photo-2816544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
            width={200}
            height={200}
            alt='avatar'
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-40 lg:w-52'
      >
        {currentUser ? (
          <>
            {' '}
            {/* Logged In */}
            <div>
              <li>
                <Link href={'/admin'} className='justify-between font-semibold'>
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href={'/orders'}
                  className='justify-between font-semibold'
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link href={'/admin'} className='justify-between font-semibold'>
                  Orders
                </Link>
              </li>

              <li>
                <div
                  onClick={() => {
                    signOut()
                  }}
                  className='justify-between  font-semibold  mt-4 bg-primary/80 text-primary-content hover:bg-primary/100  '
                >
                  Logout
                </div>
              </li>
            </div>{' '}
          </>
        ) : (
          <>
            {/* Not logged In */}
            <div>
              <li>
                <Link href={'/login'} className='justify-between font-semibold'>
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href={'/register'}
                  className='justify-between font-semibold'
                >
                  Register
                </Link>
              </li>
            </div>
          </>
        )}
      </ul>
    </div>
  )
}

export default UserMenu
