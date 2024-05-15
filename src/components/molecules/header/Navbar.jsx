import { Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../../utils/routes'

const Navbar = () => {
  const location = useLocation()
  console.log(location.pathname);
  const categories = Object.values(routes.categories)

  return (
    <Box sx={{ width: '100%' }}>
      <nav className='d-flex g-15'>
        {categories.map((category) => (
          <Link key={category.path} to={category.path} className={location.pathname === category.path ? 'active' : ''}>{category.label}</Link>
        ))}
      </nav>
    </Box>
  )
}

export default Navbar