import { useState } from 'react'
import FormProduct from "./admin/FormProduct"
import LoginForm from './header/LoginForm'
import RegistrarForm from './header/RegistrarForm'

const Modals = ({ type, data }) => {
  const [isVisible, setIsVisible] = useState(true)

  const closeModal = () => {
    setIsVisible(false)
  }

  console.log(type)


  const renderModal = () => {
    if (!type) {
      return <div>Que tipo de modal necesitas?.</div>
    }

    if ((type === 'category' || type === 'product') && !data) {
      return <div>No hay información para mostrar.</div>
    }

    switch (type) {
      case 'crearProduct':
        return (
          <div className="bg-back shadow-lg modal br-15 p-15 g-5 relative">
            <button className="absolute top-2 right-2 hover:brightness-50 p-2" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            <FormProduct type={type} />
          </div>
        )
        case 'loginUser':
          return(
            <div className="bg-back shadow-lg modal br-15 p-15 g-5 relative">
            <button className="absolute top-2 right-2 hover:brightness-50 p-2" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            <LoginForm type={type} />
          </div>
          )
          case 'RegistrarUser':
            return(
              <div className="bg-back shadow-lg modal br-15 p-15 g-5 relative">
              <button className="absolute top-2 right-2 hover:brightness-50 p-2" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
              <RegistrarForm type={type} />
            </div>
            )
      default:
        return <div>Tipo no soportado.</div>
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <section className="fixed left-0 top-0 w-screen h-screen grid place-items-center cont-modal bg-black bg-opacity-50">
      {renderModal()}
    </section>
  )
}

export default Modals