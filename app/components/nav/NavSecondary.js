'use client'
import { menuLinks } from '../../../utils/categories'

import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'
import CategoryItem from './CatergoryItem'
import { useSearchParams, usePathname } from 'next/navigation'

const NavSecondary = ({ categoriesLinks }) => {
  const params = useSearchParams()
  const category = params?.get('category')

  const pathname = usePathname()

  const isMainPage = pathname === '/'

   if (!isMainPage) return null

  return (
    <div>
      <ul className='flex items-center justify-between gap-2 md:gap-5 p-1 text-sm  uppercase cursor-pointer '>
        {menuLinks.map(({ name, href, color, icon: Icon }) => {
   
          return (
            <CategoryItem
              key={name}
              name={name}
              href={href}
              color={color}
              icon={Icon}
              selected={
                category?.toLowerCase() === name?.toLowerCase() ||
                (category === null && name === 'All')
              }
            />
          )
        })}

        <li className='ml-4'>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  )
}

export default NavSecondary
