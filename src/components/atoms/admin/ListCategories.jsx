import { useState } from "react"
import { useContextGlobal } from "../../../contexts/global.context"
import Modals from "../Modals"

const ListCategories = () => {
  const { state } = useContextGlobal()
  const categories = state.categories || []
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [idCategory, setIdCategory] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [categoriesPerPage, setCategoriesPerPage] = useState(5) // Valor inicial del selector10
  const totalCategories = categories.length
  const totalPages = Math.ceil(totalCategories / categoriesPerPage)
  const indexOfLastCategory = currentPage * categoriesPerPage
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory)

  const openModal = (type, id) => {
    setModalType(type)
    setIdCategory(id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setIdCategory(null)
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const handleCategoriesPerPageChange = (event) => {
    const newCategoriesPerPage = Number(event.target.value)
    setCategoriesPerPage(newCategoriesPerPage)
    setCurrentPage(1) // Reset to first page
  }

  return (
    <div className="bg-white relative overflow-x-auto shadow-lg br-15">
      <div className="p-15">
        <label htmlFor="table-search" className="sr-only">Buscar</label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <i className="fa-solid fa-magnifying-glass txt-primary"></i>
          </div>
          <input
            type="text"
            id="table-search"
            className="block ps-10 pt-1 pb-1 paragraph txt-tertiary border border-gray-300 br-15 w-80 bg-base focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar categoría"
          />
        </div>
      </div>
      <table className="w-full paragraph text-left">
        <thead className="bg-accent txt-white paragraph">
          <tr>
            <th scope="col" className="p-15">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="p-15" style={{ color: 'white' }}>ID</th>
            <th scope="col" className="p-15" style={{ color: 'white' }}>Categoría</th>
            <th scope="col" className="p-15" style={{ color: 'white' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((category) => (
            <tr key={category.id} className="border-b border-gray-400">
              <td className="p-15">
                <div className="flex items-center">
                  <input
                    id={`checkbox-${category.id}`}
                    type="checkbox"
                    className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor={`checkbox-${category.id}`} className="sr-only">checkbox</label>
                </div>
              </td>
              <td className="p-15 txt-quaternary">#{category.id}</td>
              <td className="p-15 txt-quaternary">{category.name}</td>
              <td className="p-15 flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal('editarCategoria', category.id)}>
                  <i className="fa fa-edit text-lg txt-primary"></i>
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => openModal('eliminarCategoria', category.id)}>
                  <i className="fa fa-trash text-lg txt-primary"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="flex items-center flex-wrap justify-between p-15 g-15" aria-label="Table navigation">
        <span className="txt-quaternary paragraph">Mostrando <span className="font-semibold txt-tertiary">{indexOfFirstCategory + 1}-{Math.min(indexOfLastCategory, totalCategories)}</span> de <span className="font-semibold txt-tertiary">{totalCategories}</span></span>
        <ul className="flex items-center paragraph g-5">
          <li>
            <i className={`txt-tertiary hover:brightness-50 cursor-pointer fa-solid fa-angle-left ${currentPage === 1 ? 'hidden' : ''}`} onClick={() => handlePageChange(currentPage - 1)}></i>
          </li>
          {[...Array(totalPages).keys()].map(number => (
            <li key={number + 1}>
              <span className={`hover:brightness-50 cursor-pointer p-2 ${currentPage === number + 1 ? 'font-semibold txt-tertiary' : 'txt-quaternary'}`} onClick={() => handlePageChange(number +   1)} >
                {number + 1}
              </span>
            </li>
          ))}
          <li>
            <i className={`txt-tertiary hover:brightness-50 cursor-pointer fa-solid fa-angle-right ${currentPage === totalPages ? 'hidden' : ''}`} onClick={() => handlePageChange(currentPage + 1)}></i>
          </li>
          <li>
            <select name="cantCategories" value={categoriesPerPage} onChange={handleCategoriesPerPageChange} className="w-full p-1 border rounded bg-white txt-tertiary">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </li>
        </ul>
      </nav>
      {isModalVisible && modalType !== null && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} id={idCategory} />
      )}
    </div>
  )
}

export default ListCategories