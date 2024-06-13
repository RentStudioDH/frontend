import { useContextGlobal } from '../../../contexts/global.context'
import { fetchData } from '../../../utils/js/apiRequest'

const ModalDeleteCategory = ({ id, type, closeModal }) => {
  const { state, getCategories } = useContextGlobal()
  const { token } = state

  const deleteCategory = async () => {
    try {
      await fetchData({
        method: 'delete',
        endpoint: `/categories/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      })
      await getCategories()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-5">
      <p className="txt-primary text-center mb-5">¿Estás seguro de que quieres eliminar esta categoría?</p>
      <div className="flex justify-center gap-5">
        <button className="btn btn-danger" onClick={deleteCategory}>Eliminar</button>
        <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  )
}

export default ModalDeleteCategory