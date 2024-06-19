import { useState } from "react"
import Buttons from "../../atoms/Buttons"
import Modals from "../../atoms/Modals"
import ListCategories from "../../atoms/admin/category/ListCategories"

const AdminCategories = ({ title, type }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState('')

  const openModal = (type) => {
    setModalType(type)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setModalType('')
  }
  return (
    <>
      <>
        <div className="flex g-15">
          <h1 className="txt-accent bigtitle"><strong>{title}</strong></h1>
          <Buttons text={<i className="paragraph fa-solid fa-plus"></i>} onClick={() => openModal('crearCategoria')} bColor='#A62639' color='#fff' bgColor='#A62639' />
          {isModalVisible && type !== null && (
            <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
          )}
        </div>
        <ListCategories/>
      </>
    </>
  )
}

export default AdminCategories