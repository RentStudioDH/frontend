import { useState } from 'react'
import Navbar from '../../molecules/header/Navbar';
import BtnLoginRegister from '../../atoms/header/BtnLoginRegister';

const MenuMobile = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  return (
    <div className='d-flex menuMobile'>
      <button className='btnmenu' onClick={toggleMenu}>
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>
      {isOpen && (
        <div className='d-flex itemsmenu g-15'>
          <Navbar />
          <BtnLoginRegister/>
        </div>
      )}
    </div>
  )
}

export default MenuMobile