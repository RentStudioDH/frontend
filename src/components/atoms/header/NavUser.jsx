import { useState } from "react"
import { useContextGlobal } from "../../../contexts/global.context"
import Buttons from "../Buttons"
import { Link } from "react-router-dom"
import FormProduct from "../admin/FormProduct"
import { routes } from "../../../utils/routes"
import LoginForm from "./LoginForm"
import { Button, Modal } from "@mui/material"
import Modals from "../Modals"

const NavUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  

  const openModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType('');
  
  }
 /* const { state, loginUser, logoutUser } = useContextGlobal()
  const handleSimulateLogin = () => {
    // Simular datos de usuario y rol
    const userData = { name: 'Admin User', email: 'admin@example.com' }
    const role = 'admin'
    loginUser(userData, role)
  }*/
  return (
    <>
   
     <Buttons text='Iniciar sesión' onClick={() => openModal('loginUser')} bColor='#A62639' color='#A62639' bgColor='#fff' /> 
      <Buttons text='Crear cuenta' bColor='#A62639' color='#fff' bgColor='#A62639' />
      {isModalVisible && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
      )}
    </>
  )
}

export default NavUser