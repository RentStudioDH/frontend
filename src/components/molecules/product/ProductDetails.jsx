const ProductDetails = ({ data }) => {
  // console.log(data)
  const firstImage = data.attachments && data.attachments.length > 0 ? data.attachments[0].url : 'https://digitalhouse-e7-pi.s3.amazonaws.com/-Rhd-l2yWTj6iEqg7EhN9Q%3D%3D.png';
  return (
    <>
      <div className='grid info g-15'>
        <div className='bg-white shadow-lg grid br-15 p-15 g-15'>
          <h2 className='txt-accent bb-primary subtitle'><strong>Detalles</strong></h2>
          <p className='txt-tertiary paragraph'>{data.description}</p>
          <div className='grid g-5'>
            <p className='txt-accent paragraph'><strong>Precio:</strong> ${data.price} / {data.rentType}</p>
            <p className='txt-accent paragraph'><strong>Stock:</strong> {data.stock}</p>
          </div>
        </div>
      </div>
      <div className='br-15 image shadow-lg'>
        <img src={firstImage} alt={data.title} width={450} height={450} loading='lazy' />
      </div>
    </>
  )
}

export default ProductDetails