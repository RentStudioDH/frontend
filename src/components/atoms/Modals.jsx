import { useEffect, useState } from 'react'
import FormProduct from './admin/FormProduct'
import LoginForm from './header/LoginForm'
import RegistrarForm from './header/RegistrarForm'
import ModalDelete from './admin/ModalDelete'
import FormCategory from './admin/FormCategory'
import ModalDeleteCategory from './admin/ModalDeleteCategory'
import SearchCategory from './search/SearchCategory'
import SearchDate from './search/SearchDate'
import SearchText from './search/SearchText'

const Modals = ({ id, type, visible, onClose, searchProps }) => {
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  const closeModal = () => {
    setIsVisible(false)
    onClose()
  }

  const renderModal = () => {
    if (!type) {
      return <div>¿Qué tipo de modal necesitas?</div>
    }

    if ((type === 'editarProduct' || type === 'editarCategoria') && !id) {
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
      case 'eliminarProduct':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>Eliminar producto</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <ModalDelete type={type} id={id} closeModal={closeModal} />
          </div>
        )
      case 'crearCategoria':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>Nueva categoría</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <FormCategory type={type} />
          </div>
        )
      case 'editarCategoria':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>Editar categoría</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <FormCategory type={type} id={id} />
          </div>
        )
      case 'eliminarCategoria':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>Eliminar categoría</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <ModalDeleteCategory type={type} id={id} closeModal={closeModal} />
          </div>
        )
      case 'loginUser':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-center modalHeader top-0 p-15 g-5 relative'>
              <img src='/logo/logo.png' alt="logo" title="logo" width={150} height={30} loading='lazy' />
              <button className="absolute close hover:brightness-50 right-[15px]" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <LoginForm type={type} closeModal={closeModal} />
          </div>
        )
      case 'registrarUser':
        return (
          <div className="bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-center modalHeader top-0 p-15 g-5 relative'>
              <img src='/logo/logo.png' alt="logo" title="logo" width={150} height={30} loading='lazy'/>
              <button className="absolute close hover:brightness-50 right-[15px]" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <RegistrarForm type={type}/>
          </div>
        )
      case 'search':
        return (
          <div className="relative bg-back shadow-lg modal br-15">
            <div className='sticky w-full bg-back flex flex-wrap justify-between modalHeader top-0 p-15 g-5'>
              <h3 className="txt-accent bb-primary title"><strong>{searchProps.title}</strong></h3>
              <button className="close hover:brightness-50" onClick={closeModal}><i className="txt-primary fa-solid fa-xmark title"></i></button>
            </div>
            <form onSubmit={searchProps.handleSearch} className="grid search p-search g-15">
              <SearchText onSearchTextChange={searchProps.setSearchText} />
              <SearchDate onDatesChange={searchProps.setDates} />
              <SearchCategory onSelectCategory={searchProps.setSelectedCategory} categories={searchProps.categories} />
              <button type="submit" className="p-2 w-fit m-auto bg-primary text-white rounded-full"><i className="fa-solid fa-magnifying-glass"></i> {searchProps.buttonText}</button>
            </form>
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