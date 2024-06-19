import { useContextGlobal } from '../../../../contexts/global.context'

const DeleteCategory = ({ id, closeModal }) => {
  const { state, removeCategory } = useContextGlobal()
  const { categories } = state
  const category = categories.find(category => category.id === id)
  const categoryName = category ? category.name : "esta categoría"

  const onConfirm = async () => {
    try {
      // console.log('Token:', state.token)
      await removeCategory(id)
      closeModal()
    } catch (error) {
      console.error('Error eliminando la categoría:', error)
      alert(`Error eliminando la categoría: ${error.response?.data?.message || error.message}`)
    }
  }

  return (
    <>
      <div className='grid place-items-center modalInfo g-15'>
        <i className="fa-solid fa-trash txt-primary bigtitle"></i>
        <div className='grid g-5'>
          <p className="txt-accent text-center paragraph">¿Estás seguro de que deseas eliminar esta categoría?</p>
          <p className="txt-tertiary text-center paragraph"><strong>{categoryName}</strong></p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button className="w-6/12 bg-primary text-white hover:brightness-50 py-2 px-4" onClick={onConfirm}><strong>Eliminar</strong></button>
        <button className="w-6/12 bg-gray-300 txt-accent hover:brightness-50 py-2 px-4" onClick={closeModal}>Cancelar</button>
      </div>
    </>
  )
}

export default DeleteCategory