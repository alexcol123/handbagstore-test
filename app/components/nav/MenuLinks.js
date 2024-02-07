import CategoryItem from './CatergoryItem'

const MenuLinks = ({name, href, color, icon: Icon}) => {
  return (
    <div>
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
    </div>
  )
}

export default MenuLinks
