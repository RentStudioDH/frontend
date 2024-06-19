import { useState } from "react"
import { useContextGlobal } from "../../../../contexts/global.context"
import Cards from "../../Cards"
import Modals from "../../Modals"

const ListProducts = () => {
  const { state } = useContextGlobal()
  const products = state.data || []
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [idProduct, setIdProduct] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(5) // Valor inicial del selector

  const totalProducts = products.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const openModal = (type, id) => {
    setModalType(type)
    setIdProduct(id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setIdProduct(null)
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const handleProductsPerPageChange = (event) => {
    const newProductsPerPage = Number(event.target.value)
    setProductsPerPage(newProductsPerPage)
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
            placeholder="Buscar por producto"
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
            <th scope="col" className="text-white p-15">ID</th>
            <th scope="col" className="text-white p-15">Nombre</th>
            <th scope="col" className="text-white p-15">Categoría</th>
            <th scope="col" className="text-white p-15">Stock</th>
            <th scope="col" className="text-white p-15">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <Cards key={product.id} type="adminListProduct" data={product} openModal={openModal} />
          ))}
        </tbody>
      </table>
      <nav className="flex items-center flex-wrap justify-between p-15 g-15" aria-label="Table navigation">
        <span className="txt-quaternary paragraph">Mostrando <span className="font-semibold txt-tertiary">{indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)}</span> de <span className="font-semibold txt-tertiary">{totalProducts}</span></span>
        <ul className="flex items-center paragraph g-5">
          <li>
            <i className={`txt-tertiary hover:brightness-50 cursor-pointer fa-solid fa-angle-left ${currentPage === 1 ? 'hidden' : ''}`} onClick={() => handlePageChange(currentPage - 1)}></i>
          </li>
          {[...Array(totalPages).keys()].map(number => (
            <li key={number + 1}>
              <span className={`hover:brightness-50 cursor-pointer p-2 ${currentPage === number + 1 ? 'font-semibold txt-tertiary' : 'txt-quaternary'}`} onClick={() => handlePageChange(number + 1)} >
                {number + 1}
              </span>
            </li>
          ))}
          <li>
            <i className={`txt-tertiary hover:brightness-50 cursor-pointer fa-solid fa-angle-right ${currentPage === totalPages ? 'hidden' : ''}`} onClick={() => handlePageChange(currentPage + 1)}></i>
          </li>
          <li>
            <select name="cantProducts" value={productsPerPage} onChange={handleProductsPerPageChange} className="w-full p-1 border rounded bg-white txt-tertiary">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </li>
        </ul>
      </nav>
      {isModalVisible && modalType !== null && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} id={idProduct} />
      )}
    </div>
  )
}

export default ListProducts