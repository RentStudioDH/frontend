import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Box component="footer" className='d-grid' sx={{ placeItems: 'center' }}>
      <Box className='d-flex g-15' sx={{ width: 'min(1280px, 100%)', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', padding: '15px' }}>
        <Box className='d-flex' sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: '10px'}}>
          <img src="/img/logo-min.png" alt={'RS'} title={'RS'} width={25} height={25}/>
          <Typography variant='body1' className='txt-center' sx={{ color: '#fff', fontSize: '10px', lineHeight: '1' }}>2024 - Todos los derechos reservados. Hecho por el <strong>Grupo7</strong></Typography>
        </Box>
        <Box className='d-flex social g-15'>
          <Link><i className="fa-brands fa-square-facebook"></i></Link>
          <Link><i className="fa-brands fa-instagram"></i></Link>
          <Link><i className="fa-brands fa-twitter"></i></Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer