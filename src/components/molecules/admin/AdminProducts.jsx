import { useState } from 'react'
import Modals from '../../atoms/Modals';

const AdminProducts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalType('');
  }
  return (
    <>
      <button onClick={() => openModal('crearProduct')} className="bg-blue-500 text-white px-4 py-2 rounded">
        Abrir Modal de Crear Producto
      </button>
      {isModalVisible && (
        <Modals type={modalType} visible={isModalVisible} onClose={closeModal} />
      )}
    </>
  )
}

export default AdminProducts