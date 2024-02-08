'use client'
import { menuLinks } from '../../../utils/categories'

import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'
import CategoryItem from './CatergoryItem'
import { useSearchParams, usePathname } from 'next/navigation'
import NavMenuLinks from './NavMenuLinks'

const NavSecondary = ({ categoriesLinks }) => {
  const params = useSearchParams()
  const category = params?.get('category')

  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) return null

  return (
    <ul
      className=' 
   flex items-center justify-between md:gap-2 cursor-pointer h-fit w-fit mx-auto  '
    >
      <NavMenuLinks category={category} />

      <li className='mx-2'>
        <ThemeToggle />
      </li>
    </ul>
  )
}

export default NavSecondary
