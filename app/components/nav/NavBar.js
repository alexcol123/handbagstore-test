import NavMain from './NavMain'
import NavSecondary from './NavSecondary'

const categoriesLinks = [
  { href: '#', name: 'All' },
  { href: '#', name: 'Sale' },
  { href: '#', name: 'Handbags' },
  { href: '#', name: 'Watches' },
  { href: '#', name: 'Sunglasses' },
  { href: '#', name: 'Accesories' },
]

const NavBar = () => {
  return (
    <div className='z-20 w-full mx-auto fixed top-0 right-0 left-0  '>
      <div className='bg-base-300'>
        <div className='container mx-auto '>
           <NavMain categoriesLinks={categoriesLinks} /> 
        </div>
      </div>

      <div className='border-b border-primary/70 bg-base-100'>
        <div className='container mx-auto  '>
          <NavSecondary categoriesLinks={categoriesLinks} />
        </div>
      </div>
    </div>
  )
}

export default NavBar
