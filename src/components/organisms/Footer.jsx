import { Link } from 'react-router-dom'
import { routes } from '../../utils/routes'

const Footer = () => {
  return (
    <footer className='grid place-items-center bg-accent'>
      <div className='w-full max-w-screen-xl flex flex-col md:flex-row justify-between items-center g-15 p-15'>
        <div className='flex flex-col md:flex-row items-center g-5'>
          <Link to={routes.home}><img src="/logo/logo-min.png" alt='RS' title='RS' width={25} height={25}/></Link>
          <p className='text-white text-center legal'>2024 - Todos los derechos reservados. Hecho por el <strong>Grupo7</strong></p>
        </div>
        <div className='flex social g-15'>
          <Link><i className="fa-brands fa-square-facebook"></i></Link>
          <Link><i className="fa-brands fa-instagram"></i></Link>
          <Link><i className="fa-brands fa-twitter"></i></Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer