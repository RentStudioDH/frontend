import { Link, useNavigate } from 'react-router-dom'
import { useContextGlobal } from '../../../contexts/global.context'
import Swal from 'sweetalert2'
import ShareButton from '../share/ShareButton'

const ProductHeader = ({ data }) => {
  const navigate = useNavigate()
  const { state, toggleFav } = useContextGlobal()
  const { favs } = state
  const isFav = favs.includes(data.id)

  const handleToggleFav = () => {
    toggleFav(data.id)
    Swal.fire({
      icon: 'success',
      title: isFav ? 'Eliminado de favoritos' : 'Añadido a favoritos',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <>
      <div className='flex items-center g-5'>
        <Link onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left txt-primary title"></i>
        </Link>
        <h1 className='txt-primary title bb-primary'><strong>{data.name}</strong></h1>
      </div>
      <div className='flex items-center g-15'>
        <ShareButton product={data} />
        <i onClick={() => handleToggleFav()} className={`fa-${isFav ? 'solid' : 'regular'} fa-heart cursor-pointer txt-primary hover:txt-accent title`}></i>
      </div>
    </>
  )
}

export default ProductHeader