import React from 'react'
import './header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className='imagen'>
        <img src="/public/img/logo2.png" alt="Logo" width={150} height={29} /> <p>Captura tus recuerdos</p>
        </div>
        <div className='boton'>
        <button>Iniciar Sesion</button>
        <button className='bt2'>Crear Cuenta</button>
        </div>
    </div>
  )
}

export default Header