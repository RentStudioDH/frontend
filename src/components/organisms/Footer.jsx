import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='d-grid pi-center'>
      <Box className='d-flex cont-wrap g-15 p-15' sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Box className='d-flex' sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: '5px'}}>
          <img src="/logo/logo-min.png" alt='RS' title='RS' width={25} height={25}/>
          <Typography variant='body1' className='txt-center' sx={{ color: '#fff', fontSize: '10px', lineHeight: '1' }}>2024 - Todos los derechos reservados. Hecho por el <strong>Grupo7</strong></Typography>
        </Box>
        <div className='d-flex social g-15'>
          <Link><i className="fa-brands fa-square-facebook"></i></Link>
          <Link><i className="fa-brands fa-instagram"></i></Link>
          <Link><i className="fa-brands fa-twitter"></i></Link>
        </div>
      </Box>
    </footer>
  )
}

export default Footer