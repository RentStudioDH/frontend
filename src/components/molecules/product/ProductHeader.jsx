import { Link, useNavigate } from 'react-router-dom';
import { useContextGlobal } from '../../../contexts/global.context';
import Swal from 'sweetalert2';

const ProductHeader = ({ data }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useContextGlobal();

  const isFavorite = state.favs.some(fav => fav.id === data.id);

  const handleToggleFav = (item) => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAV', payload: item.id });
      Swal.fire({
        icon: 'success',
        title: 'Eliminado de favoritos',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      dispatch({ type: 'ADD_FAV', payload: item });
      Swal.fire({
        icon: 'success',
        title: 'Añadido a favoritos',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <>
      <div className='flex items-center g-5'>
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-primary title"></i>
        </Link>
        <h1 className='txt-primary title bb-primary'><strong>{data.name}</strong></h1>
      </div>
      <button onClick={() => handleToggleFav(data)} className="flex items-center">
        <i
          className={`fa-solid fa-heart title ${isFavorite ? 'text-red-800 border-none ' : 'text-white  bg-slate-600'}`}
          style={{
            borderWidth: '2px',
            padding: '0.35rem',
            borderRadius: '50%',
          }}
        ></i>      
      </button>
    </>
  );
};

export default ProductHeader;
