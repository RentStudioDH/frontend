import { useState } from 'react'
import Carousels from '../../atoms/Carousels'

const ProductGallery = ({ data }) => {
  const { attachments } = data
  const [showMore, setShowMore] = useState(false)
  const toggleShowMore = () => {
    setShowMore(!showMore)
  }
  const initialImagesCount = 5
  const totalImages = attachments.length
  const shouldShowMoreButton = totalImages > initialImagesCount
  // console.log(attachments)

  const firstImage = attachments && attachments.length > 0 ? attachments[0].url : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png'
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 principal g-5">
        <picture className='br-15 image shadow-lg'>
          <img src={firstImage} alt={data.title} loading='lazy'/>
        </picture>
        <div className="grid grid-cols-2 g-5 mini">
          {attachments.slice(1, initialImagesCount).map((attachment, index) => (
            <picture key={index} className='br-15 image shadow-lg'>
              <img src={attachment.url} alt={`Imagen producto`} loading='lazy' />
            </picture>
          ))}
        </div>
      </div>
      {showMore && <Carousels images={attachments.slice(initialImagesCount).map(attachment => attachment.url)} />}
      {shouldShowMoreButton && (
        <button onClick={toggleShowMore} className="txt-accent transition paragraph flex items-center btnmore hover:font-bold">
          <strong className="flex items-center">{showMore ? "Ver menos" : "Ver más"} <i className={`fa-solid ${showMore ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></strong>
        </button>
      )}
    </>
  )
}

export default ProductGallery