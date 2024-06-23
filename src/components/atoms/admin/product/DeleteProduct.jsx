import React, { useState } from 'react'; // Asegúrate de importar useState
import { useContextGlobal } from '../../../../contexts/global.context';
import Swal from 'sweetalert2';
import { ColorRing } from 'react-loader-spinner';

const ModalDelete = ({ id, closeModal }) => {
  const { state, removeProduct } = useContextGlobal();
  const { data } = state;
  const product = data.find(product => product.id === id);
  const productName = product ? product.name : "este producto";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({}); // Añadir el estado de error

  const onConfirm = async () => {
    setLoading(true);
    try {
      await removeProduct(id);
      Swal.fire({
        title: '¡Éxito!',
        text: `Producto "${productName}" eliminado correctamente`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#A29C9B', 
      });
      closeModal();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Ha ocurrido un error al procesar la solicitud.';
  
      if (errorMessage.includes('Request failed with status code 403')) {
        Swal.fire({
          title: 'Error',
          text: 'El servidor ha rechazado su solicitud',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#A29C9B', 
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#A29C9B', 
        });
      }
  
      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

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
      {loading && (
        <div className="loading-spinner">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#A62639', '#DB324D', '#56494E', '#A29C9B', '#511C29']}
          />
        </div>
      )}
    </>
  );
};

export default ModalDelete;

