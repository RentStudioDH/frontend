import { useContextGlobal } from '../../../contexts/global.context'

const ModalDelete = ({ id, closeModal }) => {
  const { state, removeProduct } = useContextGlobal()
  const { data } = state
  const product = data.find(product => product.id === id)
  const productName = product ? product.name : "este producto"

  const onConfirm = async () => {
    try {
      // console.log('Token:', state.token)
      await removeProduct(id)
      closeModal()
    } catch (error) {
      console.error('Error eliminando el producto:', error)
      alert(`Error eliminando el producto: ${error.response?.data?.message || error.message}`)
    }
  }

  return (
    <>
      <div className='grid place-items-center modalInfo g-15'>
        <i className="fa-solid fa-trash txt-primary bigtitle"></i>
        <div className='grid g-5'>
          <p className="txt-accent text-center paragraph">¿Estás seguro de que deseas eliminar este producto?</p>
          <p className="txt-tertiary text-center paragraph"><strong>{productName}</strong></p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button className="w-6/12 bg-primary text-white hover:brightness-50 py-2 px-4" onClick={onConfirm}><strong>Eliminar</strong></button>
        <button className="w-6/12 bg-gray-300 txt-accent hover:brightness-50 py-2 px-4" onClick={closeModal}>Cancelar</button>
      </div>
    </>
  )
}

export default ModalDelete