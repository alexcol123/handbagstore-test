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
    <ul className=' 
   flex
     items-center justify-around gap-1 md:gap-3 p-1 text-sm  uppercase cursor-pointer h-fit '>
      <NavMenuLinks category={category} />

      <li className='ml-4 mr-2'>
        <ThemeToggle />
      </li>
    </ul>
  )
}

export default NavSecondary
