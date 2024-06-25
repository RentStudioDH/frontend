import { useState } from "react"
import { useContextGlobal } from "../../../contexts/global.context"
import Buttons from "../Buttons"
import Modals from "../Modals"
import { Link } from "react-router-dom"
import { routes, userMenuItems } from "../../../utils/routes"
import AvatarUser from "../user/AvatarUser"

const NavUser = () => {
  const { state, logoutUser } = useContextGlobal()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const openModal = (type) => {
    setModalType(type)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setModalType('')
  }

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <>
      {state.isLoggedIn ? (
        <div className={`relative ${state.isDesktop ? '' : 'grid place-items-end'}`}>
          <div className="flex items-center g-5" onClick={toggleDropdown}>
            <span className="txt-tertiary paragraph">{state.user.firstName}</span>
            <AvatarUser size={40} />
          </div>
          {isDropdownVisible && (
            <div className={`relative md:absolute w-auto grid place-items-end right-0 mt-2 br-15 z-20 ${state.isDesktop ? 'bg-back shadow-lg' : 'bg-transparent'}`}>
              <Link className="txt-tertiary paragraph md:px-4 py-2 hover:brightness-75" to={routes.user.profile} onClick={toggleDropdown}>{userMenuItems[0].label}</Link>
              {state.user.role === "ROLE_ADMIN" && (
                <Link className="txt-tertiary paragraph md:px-4 py-2 hover:brightness-75" to={routes.admin.dashboard} onClick={toggleDropdown}>Administrador</Link>
              )}
              <Link className="txt-tertiary paragraph md:px-4 py-2 hover:brightness-75" to={routes.user.favs} onClick={toggleDropdown}>{userMenuItems[3].label}</Link>
              <Link className="txt-tertiary paragraph md:px-4 py-2 hover:brightness-75" to={routes.products} onClick={toggleDropdown}>Productos</Link>
              {state.isDesktop && (
                <Buttons text={<strong>Logout</strong>} onClick={logoutUser} bColor='transparent' color='#A62639' bgColor='transparent' />
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          <Buttons text='Iniciar sesión' onClick={() => openModal('loginUser')} bColor='#A62639' color='#A62639' bgColor='#fff' />
          <Buttons text='Crear cuenta' onClick={() => openModal('registrarUser')} bColor='#A62639' color='#fff' bgColor='#A62639' />
        </>
      )}
      {isModalVisible && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
      )}
    </>
  )
}

export default NavUser