import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../../utils/routes'

const NavCategoriasContainer = () => {
  const location = useLocation()
  console.log(location.pathname);
  const categories = Object.values(routes.categories)

  return (
    <div className='w-full bg-quaternary flex justify-center'>
      <nav className='w-full max-w-screen-xl flex justify-center g-15'>
        {categories.map((category) => (
          <Link key={category.path} to={category.path} className={`txt-tertiary ${location.pathname === category.path ? 'active' : ''}`}>{category.label}</Link>
        ))}
      </nav>
    </div>
  )
}

export default NavCategoriasContainer