import { useState } from "react"
import Modals from "../../atoms/Modals"
import Buttons from "../../atoms/Buttons"

const SectionAdmin = ({ title, type, ContainerComponent }) => {
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
      <section className='w-full p-section'>
        <div className="flex g-15">
          <h1 className="txt-accent bigtitle"><strong>{title}</strong></h1>
          {type !== 'dashboard' && (<Buttons text={<i className="paragraph fa-solid fa-plus"></i>} onClick={() => openModal('crearProduct')} bColor='#A62639' color='#fff' bgColor='#A62639' />)}
          {isModalVisible && type !== null && (
            <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
          )}
        </div>
        <ContainerComponent title={title} />
      </section>
    </>
  )
}

export default SectionAdmin