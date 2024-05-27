import { useEffect, useState } from 'react'
import FormProduct from "./admin/FormProduct"
import LoginForm from './header/LoginForm'

const Modals = ({ id, type, visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(visible)
  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  const closeModal = () => {
    setIsVisible(false)
    onClose()
  }
  // console.log(type, id)

  const renderModal = () => {
    if (!type) {
      return <div>Que tipo de modal necesitas?.</div>
    }

    if ((type === 'editarProduct') && !id) {
      return <div>No hay información para mostrar.</div>
    }

    switch (type) {
      case 'crearProduct':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>Nuevo producto</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <FormProduct type={type} />
          </div>
        )
      case 'editarProduct':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>Editar producto</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <FormProduct type={type} id={id} />
          </div>
        )
      case 'loginUser':
        return(
          <div className="bg-back shadow-lg modal br-15 p-15 g-5 relative">
          <button className="absolute top-2 right-2 hover:brightness-50 p-2" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
          <LoginForm type={type} />
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