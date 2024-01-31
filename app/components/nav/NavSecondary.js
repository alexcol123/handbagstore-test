import Link from 'next/link'
import ThemeToggle from '../ThemeToggle'

const NavSecondary = ({ categoriesLinks }) => {
  return (
    <div>

      <ul className='flex items-center justify-between gap-2 md:gap-5 p-1 text-sm  uppercase '>
        {categoriesLinks.map(({ name, href, color, icon: Icon }) => {
          return (
            <Link
              key={name}
              href={href}
              className={`py-1 pl-3 hover:text-primary hover:bg-base-100  ${
                color && 'text-error font-semibold'
              }`}
            >
              <div className='flex items-center justify-center gap-1'>
          <span className='hidden md:flex'>      {name}</span>
                {Icon && (
                  <span className='text-primary text-xl md:text-sm'>
                    <Icon  />
                  </span>
                )}
              </div>
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
