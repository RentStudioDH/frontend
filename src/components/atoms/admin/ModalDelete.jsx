import { useContextGlobal } from '../../../contexts/global.context'
import { fetchData } from '../../../utils/js/apiRequest'

const ModalDelete = ({ type, id, closeModal }) => {
  const { state, getProducts } = useContextGlobal()

  const product = state.data.find(product => product.id === id)
  const productName = product ? product.name : "este producto"

  const onConfirm = async () => {
    try {
      await fetchData({ method: 'delete', endpoint: `/products/${id}` })
      await getProducts()
      closeModal()
    } catch (error) {
      console.error('Error eliminando el producto:', error)
    }
  }

  return (
    <>
      <div className='grid modalInfo g--5'>
        <p className="txt-accent text-center paragraph">¿Estás seguro de que deseas eliminar este producto?</p>
        <p className="txt-tertiary text-center paragraph"><strong>{productName}</strong></p>
      </div>
      <div className="flex flex-wrap">
        <button className="w-6/12 bg-primary text-white hover:brightness-50 py-2 px-4" onClick={onConfirm}><strong>Eliminar</strong></button>
        <button className="w-6/12 bg-gray-300 txt-accent hover:brightness-50 py-2 px-4" onClick={closeModal}>Cancelar</button>
      </div>
    </>
  )
}

export default ModalDelete