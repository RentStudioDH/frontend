import { Box } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../../utils/routes'

const Navbar = () => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <Box sx={{ background: '#A29C9B' }}>
      <nav className='d-flex g-15'>
        <Link to={routes.categories.cameras} className={location.pathname === routes.categories.cameras ? 'active' : ''}>Cámaras</Link>
        <Link to={routes.categories.lents} className={location.pathname === routes.categories.lents ? 'active' : ''}>Lentes</Link>
        <Link to={routes.categories.lights} className={location.pathname === routes.categories.lights ? 'active' : ''}>Luces</Link>
        <Link to={routes.categories.audio} className={location.pathname === routes.categories.audio ? 'active' : ''}>Audio</Link>
        <Link to={routes.categories.professionals} className={location.pathname === routes.categories.professionals ? 'active' : ''}>Profesionales</Link>
      </nav>
    </Box>
  )
}

export default Navbar