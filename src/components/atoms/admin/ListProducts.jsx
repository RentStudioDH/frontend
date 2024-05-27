import { useState } from "react"
import { useContextGlobal } from "../../../contexts/global.context"
import Cards from "../Cards"
import Modals from "../Modals"

const ListProducts = () => {
  const { state } = useContextGlobal()
  const products = state.data || []
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [idProduct, setIdProduct] = useState(null)

  const openModal = (type, id) => {
    setModalType(type)
    setIdProduct(id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setIdProduct(null)
  }

  return (
    <div className="bg-white relative overflow-x-auto shadow-md br-15">
      <div className="p-15">
        <label htmlFor="table-search" className="sr-only">Buscar</label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <i className="fa-solid fa-magnifying-glass txt-primary"></i>
          </div>
          <input type="text" id="table-search" className="block ps-10 pt-1 pb-1 paragraph txt-tertiary border border-gray-300 br-15 w-80 bg-base focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar por producto" />
        </div>
      </div>
      <table className="w-full paragraph text-left">
        <thead className="bg-accent txt-white paragraph">
          <tr>
            <th scope="col" className="p-15">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 txt-primary bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="p-15">id</th>
            <th scope="col" className="p-15">Nombre</th>
            <th scope="col" className="p-15">Categoría</th>
            <th scope="col" className="p-15">Stock</th>
            <th scope="col" className="p-15">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <Cards key={product.id} type="adminListProduct" data={product} openModal={openModal} />
          ))}
        </tbody>
      </table>
      <nav className="flex items-center flex-wrap justify-between p-15 g-15" aria-label="Table navigation">
        <span className="txt-quaternary paragraph">Showing <span className="font-semibold txt-tertiary">1-10</span> of <span className="font-semibold txt-tertiary">1000</span></span>
        <ul className="flex items-center paragraph g-5">
          <li>
            <i className="txt-tertiary hover:brightness-50 fa-solid fa-angle-left"></i>
          </li>
          <li>
            <span className="txt-tertiary hover:brightness-50 font-semibold p-2">1</span>
          </li>
          <li>
            <span className="txt-quaternary hover:brightness-50 p-2">2</span>
          </li>
          <li>
            <span className="txt-quaternary hover:brightness-50 p-2">3</span>
          </li>
          <li>
            <i className="txt-tertiary hover:brightness-50 fa-solid fa-angle-right"></i>
          </li>
          <li>
            {/* <select name="cantProducts" value={''} onChange={''} className="w-full p-1 border rounded bg-white txt-tertiary">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select> */}
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
