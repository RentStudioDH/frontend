import { useState } from "react"
import { useContextGlobal } from "../../../contexts/global.context"
import Buttons from "../Buttons"
import Modals from "../Modals"

const NavUser = () => {
  const { state, loginUser, logoutUser } = useContextGlobal()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (type) => {
    setModalType(type)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setModalType('')
  }

  return (
    <>
      <Buttons text='Iniciar sesión' onClick={() => openModal('loginUser')} bColor='#A62639' color='#A62639' bgColor='#fff' />
      <Buttons text='Crear cuenta' onClick={() => openModal('crearCuenta')} bColor='#A62639' color='#fff' bgColor='#A62639' />
      {isModalVisible && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
      )}
    </>
  )
}

export default NavUser