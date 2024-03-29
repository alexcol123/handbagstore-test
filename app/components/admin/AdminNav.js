'use client'

import Link from 'next/link'
import AdminNavItem from './AdminNavItem'
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from 'react-icons/md'

import { TbMessage2Plus } from 'react-icons/tb'

import { usePathname } from 'next/navigation'

const AdminNav = () => {
  const pathname = usePathname()

  // console.log(pathname)

  return (
    <div className='w-full shadow-sm top-20 border-b pt-4 '>
      <div className='container'>
        <div className='flex flex-row items-center justify-between  md:justify-center gap-8 md:gap-12  overflow-x-auto  flex-nowrap '>
          <Link href='/admin'>
            <AdminNavItem
              label='Summary'
              icon={MdDashboard}
              selected={pathname === '/admin'}
            />
          </Link>

          <Link href='/admin/add-products'>
            <AdminNavItem
              label='Add Products'
              icon={MdLibraryAdd}
              selected={pathname === '/admin/add-products'}
            />
          </Link>

          <Link href='/admin/manage-products'>
            <AdminNavItem
              label='Manage Products'
              icon={MdDns}
              selected={pathname === '/admin/manage-products'}
            />
          </Link>

          <Link href='/admin/manage-orders'>
            <AdminNavItem
              label='Manage Orders'
              icon={MdFormatListBulleted}
              selected={pathname === '/admin/manage-orders'}
            />
          </Link>

          <Link href='/admin/update-banner'>
            <AdminNavItem
              label='Update Banner'
              icon={TbMessage2Plus}
              selected={pathname === '/admin/update-banner'}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminNav
