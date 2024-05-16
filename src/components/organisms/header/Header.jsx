import './header.css'
import CategoriasTabs from '../header/CategoriasTabs'

const Header = () => {
  return (
    <>
      <div className='header'>
        <div className='imagen'>
          <img src="/logo/logo.png" alt="Logo" width={150} height={29} /> <p>Captura tus recuerdos</p>
        </div>
        <div className='boton'>
          <button>Iniciar Sesion</button>
          <button className='bt2'>Crear Cuenta</button>
        </div>
      </div>
      <CategoriasTabs/>
    </>
  )
}

export default Header