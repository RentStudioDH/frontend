import { useState } from "react"
import { useContextGlobal } from "../../../contexts/global.context"
import Buttons from "../Buttons"

const NavUser = () => {
  const { state, loginUser, logoutUser } = useContextGlobal()
  const handleSimulateLogin = () => {
    // Simular datos de usuario y rol
    const userData = { name: 'Admin User', email: 'admin@example.com' }
    const role = 'admin'
    loginUser(userData, role)
  }
  return (
    <>
      <Buttons text='Iniciar sesión' onClick={handleSimulateLogin} bColor='#A62639' color='#A62639' bgColor='#fff' />
      <Buttons text='Crear cuenta' bColor='#A62639' color='#fff' bgColor='#A62639' />
    </>
  )
}

export default NavUser