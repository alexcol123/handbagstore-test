import Avatar from '@/app/components/Avatar'
import MyButton from '@/app/components/MyButton'

import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const UserClient = ({ currentUser }) => {
  console.log(currentUser)
  return (
    <div>
      <div className='m-10 max-w-sm mx-auto  bg-base-200'>
        <div className='rounded-lg border px-4 pt-8 pb-10 shadow-lg'>
          {/* <div className='relative mx-auto w-36 rounded-full'>
            <span className='absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2'></span>
            <img
              className='mx-auto h-auto w-full rounded-full'
              src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
              alt=''
            />
            <Avatar src={currentUser.image} user={currentUser} />

          </div> */}

          <div className='w-fit mx-auto'>
            <Avatar src={currentUser.image} user={currentUser.name} widthSize={20} />
          </div>
          <h1 className='my-1 text-center text-xl font-bold leading-8 '>
            {currentUser.name}
          </h1>

          <ul className='mt-3 divide-y rounded bg-base-100 py-2 px-3  shadow-sm '>
            <li className='flex items-center py-3 text-sm text-base-content'>
              <span>Email</span>
              <span className='ml-auto'>
                <span className='rounded-full bg-success/10 py-1 px-2 text-xs font-medium text-success'>
                  {currentUser.email}
                </span>
              </span>
            </li>
            <li className='flex items-center py-3 text-sm'>
              <span>Joined On</span>
              <span className='ml-auto'>
                {' '}
                {moment(currentUser.createdAt).fromNow()}
              </span>
            </li>
          </ul>

          {currentUser.orders.length > 0  ? (
            <div className='w-fit mx-auto mt-8'>
              <Link
                className='btn btn-primary btn-sm btn-wide'
                href={'/orders'}
              >
                View Orders
              </Link>
            </div>
          ): null}
        </div>
      </div>
    </div>
  )
}

export default UserClient
