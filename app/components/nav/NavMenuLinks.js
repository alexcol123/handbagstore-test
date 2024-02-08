import { menuLinks } from '../../../utils/categories'
import CatergoryItem from './CatergoryItem'

const NavMenuLinks = ({ category }) => {
  return (
    <>
      {menuLinks?.map(({ name, href, color, icon: Icon }) => {
        return (
          <CatergoryItem
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
    </>
  )
}

export default NavMenuLinks
