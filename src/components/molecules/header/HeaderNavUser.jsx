import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../utils/routes'
import { useContextGlobal } from '../../../contexts/global.context'
import NavUser from '../../atoms/header/NavUser'

const HeaderNavUser = () => {
  const { state, getCategories } = useContextGlobal()
  const { categories } = state
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
  useEffect(() => {
    getCategories()
  }, [])

  // useEffect para cerrar el menú cuando sea escritorio
  useEffect(() => {
    if (state.isDesktop) {
      setOpen(false)
    }
  }, [state.isDesktop])

  return (
    <nav className="w-full max-w-screen-xl flex flex-wrap justify-between items-center g-5">
      <div className='flex flex-col xl:flex-row justify-center items-start xl:items-center logo g-5 p-15'>
        <Link to={routes.home} onClick={closeMenu}>
          <img className='hidden sm:block' src='/logo/logo.png' alt="logo" title="logo" width={150} height={30} loading='lazy' />
          <img className='sm:hidden 450px:block' src='/rs.svg' type='svg' alt="logo" title="logo" width={30} height={30} loading='lazy' />
        </Link>
        <Link className='txt-accent legal' to={routes.home} onClick={closeMenu}>Captura tus recuerdos</Link>
      </div>
      <div className="flex items-center md:order-2 g-5 p-15">
        {state.isDesktop && <NavUser />}
        <button data-collapse-toggle="mobile-menu" onClick={toggleMenu} type="button" className="md:hidden inline-flex items-center">
          <span className="sr-only">Open main menu</span>
          <i className={`txt-primary subtitle ${isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}`}></i>
        </button>
      </div>
      <ul className={`${state.isDesktop ? '' : (isMenuOpen ? 'bg-quaternary' : 'hidden')} w-full md:w-auto flex flex-col md:flex-row justify-between items-end lg:order-1 g-15 p-15`}>
        {!state.isDesktop && 
          <>
            <li>
              <div className='flex justify-center g-15'>
                <NavUser />
              </div>
            </li>
          </>
        }
        <li>
          <Link to={routes.home} className="txt-tertiary paragraph" onClick={closeMenu}>Inicio</Link>
        </li>
        <li>
          <Link to={routes.products} className="txt-tertiary paragraph" onClick={closeMenu}>Productos</Link>
        </li>
        {state.isLoggedIn && 
          <>
            <li>
              <Link to={routes.admin.dashboard} className="txt-tertiary paragraph" onClick={closeMenu}>Admin</Link>
            </li>
          </>
        }
        {!state.isDesktop && 
          <>
            <li className='grid place-items-end'>
              <button onClick={toggleSubMenu} className="txt-tertiary paragraph" type='button'>Categorías <i className={`legal fa-solid fa-angle-${isSubMenuOpen ? 'up' : 'down'}`}></i></button>
              {isSubMenuOpen && (
                <ul className='grid place-items-end'>
                  {categories.map(category => (
                    <li key={category.id} className='p-2'>
                      <Link to={category.slug} className="txt-tertiary paragraph" onClick={closeMenu}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </>
        }
      </ul>
    </nav>
  )
}

export default HeaderNavUser