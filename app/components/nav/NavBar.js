import getCurrentUser from '../../../actions/getCurrentUser'
import NavMain from './NavMain'
import NavSecondary from './NavSecondary'



// const categoriesLinks = [
//   { href: '#', name: 'All' },
//   { href: '#', name: 'Sale' },
//   { href: '#', name: 'Handbags' },
//   { href: '#', name: 'Watches' },
//   { href: '#', name: 'Sunglasses' },
//   { href: '#', name: 'Accesories' },
//   { href: '#', name: 'Clearance 70% OFF', color: true },
// ]

const NavBar = async () => {
  const currentUser = await getCurrentUser()
  //  console.log('user', currentUser)

  return (
    <div className='z-20 w-full mx-auto fixed top-0 right-0 left-0   '>
      <div className='bg-base-200  text-base-content '>
        <div className='container mx-auto '>
        <NavMain  currentUser={currentUser} /> 
        </div>
      </div>

      <div className='border-b border-primary/50  bg-base-100/80 backdrop-blur-xl '>
        <div className='container mx-auto max-w-4xl  '>
          <NavSecondary  />
        </div>
      </div>
    </div>
  )
}

export default NavBar
