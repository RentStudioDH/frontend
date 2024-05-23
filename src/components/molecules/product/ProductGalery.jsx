import { useState } from 'react'
import Carousels from '../../atoms/Carousels'

const ProductGalery = ({ data }) => {
  const [showMore, setShowMore] = useState(false)
  const toggleShowMore = () => {
    setShowMore(!showMore)
  }
  const initialImagesCount = 5
  const totalImages = data.attachments.length
  const shouldShowMoreButton = totalImages > initialImagesCount

  console.log(data);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 principal g-5">
        <picture className='br-15 image shadow-lg'>
          <img src={data.attachments[0]} alt={data.title} loading='lazy'/>
        </picture>
        <div className="grid grid-cols-2 g-5 mini">
          {data.images.slice(1, initialImagesCount).map((src, index) => (
            <picture key={index} className='br-15 image shadow-lg'>
              <img src={src} alt={`Imagen producto`} loading='lazy' />
            </picture>
          ))}
        </div>
      </div>
      {/* Si hay más de 5 imágenes las cargará como un carrusel */}
      { showMore && <Carousels images={data.attachments.slice(initialImagesCount)} /> }
      {/* Si hay más de 5 imágenes mostrará el botón */}
      { shouldShowMoreButton && <button onClick={toggleShowMore} className="txt-accent transition paragraph flex items-center btnmore hover:font-bold"><strong className="flex items-center">{showMore ? "Ver menos" : "Ver más"} <i className={`fa-solid ${showMore ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></strong></button> }
    </>
  )
}

export default ProductGalery