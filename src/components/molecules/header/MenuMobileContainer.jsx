import { useState } from 'react'
import NavCategoriasContainer from './NavCategoriasContainer';
import BtnLoginRegister from '../../atoms/header/BtnLoginRegister';

const MenuMobileContainer = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <div className='bg-quaternary flex flex-col items-end menuMobile'>
      <button className='btnmenu' onClick={toggleMenu}>
        <i className={`txt-primary ${isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}`}></i>
      </button>
      {isOpen && (
        <div className='w-full flex items-center itemsmenu g-15'>
          <NavCategoriasContainer />
          <BtnLoginRegister/>
        </div>
      )}
    </div>
  )
}

export default MenuMobileContainer