import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../utils/routes'
import { useContextGlobal } from '../../../contexts/global.context'
import categoriasData from '../../../utils/json/categoriasData.json'
import NavUser from '../../atoms/header/NavUser'

const HeaderNavUser = () => {
  const { state } = useContextGlobal()
  const [isMenuOpen, setOpen] = useState(false)
  const [isSubMenuOpen, setSubMenuOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!isMenuOpen)
  }
  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen)
  }
  const closeMenu = () => {
    setOpen(false)
    setSubMenuOpen(false)
  }
  return (
    <nav className="w-full max-w-screen-xl flex flex-wrap justify-between items-center g-5">
      <div className='flex flex-col xl:flex-row justify-center items-start xl:items-center logo g-5 p-15'>
        <Link to={routes.home} onClick={closeMenu}>
          <img className='hidden sm:block' src='/logo/logo.png' alt="logo" title="logo" width={150} height={30} loading='lazy' />
          <img className='sm:hidden 450px:block' src='/rs.svg' type='svg' alt="logo" title="logo" width={25} height={25} loading='lazy' />
        </Link>
        <Link className='txt-accent legal' to={routes.home} onClick={closeMenu}>Captura tus recuerdos</Link>
      </div>
      <div className="flex items-center md:order-2 g-5 p-15">
        <NavUser />
        <button data-collapse-toggle="mobile-menu" onClick={toggleMenu} type="button" className="md:hidden inline-flex items-center">
          <span className="sr-only">Open main menu</span>
          <i className={`txt-primary subtitle ${isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}`}></i>
        </button>
      </div>
      <ul className={`${isMenuOpen ? '' : 'hidden'} ${state.isDesktop ? '' : 'bg-quaternary'} w-full md:w-auto grid md:flex justify-between items-center lg:order-1 g-15 p-15`}>
        <li>
          <Link to={routes.home} className="txt-tertiary paragraph" onClick={closeMenu}>Inicio</Link>
        </li>
        <li>
          <Link to={routes.products} className="txt-tertiary paragraph" onClick={closeMenu}>Productos</Link>
        </li>
        <li>
          <Link to={routes.admin.dashboard} className="txt-tertiary paragraph" onClick={closeMenu}>Admin</Link>
        </li>
        {!state.isDesktop && 
          <>
            <li className='grid place-items-start g-15'>
              <button onClick={toggleSubMenu} className="txt-tertiary paragraph" type='button'>Categorías <i className={`legal fa-solid fa-angle-${isSubMenuOpen ? 'up' : 'down'}`}></i></button>
              {isSubMenuOpen && (
                <ul>
                  {categoriasData.map(category => (
                    <li key={category.id} className='p-2'>
                      <Link to={category.path} className="txt-tertiary paragraph" onClick={closeMenu}>{category.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <div className='flex justify-center g-15'>
              <NavUser />
            </div>
          </>
        }
      </ul>
    </nav>
  )
}

export default HeaderNavUser