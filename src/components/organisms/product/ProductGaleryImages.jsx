import { useState } from 'react'

const Gallery = ({ data }) => {
  const [showMore, setShowMore] = useState(false)
  const toggleShowMore = () => {
    setShowMore(!showMore)
  }
  const initialImagesCount = 5;
  const totalImages = data.images.length;
  const shouldShowMoreButton = totalImages > initialImagesCount;

  return (
    <section className="grid place-items-center productGalery">
      <div className="bg-white w-full max-w-screen-xl grid galery g-5 p-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 principal g-5">
          <picture className='image'>
            <img src={data.images[0]} alt={data.title} loading='lazy'/>
          </picture>
          <div className="grid grid-cols-2 gap-2 mini">
            {data.images.slice(1, initialImagesCount).map((src, index) => (
              <picture key={index} className='image'>
                <img src={src} alt={`Imagen producto`} loading='lazy' />
              </picture>
            ))}
          </div>
        </div>
        {showMore && (
          <div className="grid grid-cols-2 sm:grid-cols-4 g-5 others">
            {data.images.slice(5).map((src, index) => (
              <picture key={index + 5} className='image'>
                <img src={src} alt={`Imagen producto`} loading='lazy'/>
              </picture>
            ))}
          </div>
        )}
        {shouldShowMoreButton && (
          <button onClick={toggleShowMore} className="txt-accent transition paragraph flex items-center btnmore hover:font-bold"><strong className="flex items-center">{showMore ? "Ver menos" : "Ver más"} <i className={`fa-solid ${showMore ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></strong></button>
        )}
      </div>
    </section>
  )
}

export default Gallery