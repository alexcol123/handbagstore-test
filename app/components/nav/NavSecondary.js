import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

const NavSecondary = ({ categoriesLinks }) => {
  // console.log(categoriesLinks)
  return (
    <div>
      <div className='flex md:hidden items-center justify-center p-1'>
        {' '}
        <ThemeToggle />
      </div>
      <ul className='hidden md:flex items-center justify-center gap-2 md:gap-5 p-1 text-sm  uppercase '>
        {categoriesLinks.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`py-1 pl-3 hover:text-primary hover:bg-base-100  ${
                item?.color && 'text-error font-semibold'
              }`}
            >
              {item.name}
            </Link>
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
