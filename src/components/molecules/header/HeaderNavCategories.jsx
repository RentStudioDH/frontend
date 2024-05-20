import { Link, useLocation } from 'react-router-dom'
import categoriasData from '../../../utils/json/categoriasData.json'
import { routes } from '../../../utils/routes'

const HeaderNavCategories = () => {
  const location = useLocation()
  // console.log(location.pathname)
  const categories = Object.values(routes.categories)
  return (
    <div className='bg-quaternary w-full flex justify-center'>
      <nav className='w-full max-w-screen-xl flex justify-center navCategorias g-15'>
        {categoriasData.map((category) => (
          <Link key={category.path} to={category.path} className={`txt-tertiary paragraph p-15 ${location.pathname === category.path ? 'active' : ''}`}>{category.label}</Link>
        ))}
      </nav>
    </div>
  )
}

export default HeaderNavCategories