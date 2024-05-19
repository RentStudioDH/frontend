const ProductIdeas = ({ data }) => {
  return (
    <div className="bg-white shadow-lg grid br-15 p-15 g-15">
      <h2 className='txt-accent bb-primary subtitle'><i className="fa-regular fa-lightbulb"></i><strong> Ideal para:</strong></h2>
      <p className='txt-tertiary paragraph'>{data.description}</p>
      <div className='grid g-5'>
        <p className='txt-accent paragraph'><strong>Precio:</strong> ${data.price} / {data.rentType}</p>
        <p className='txt-accent paragraph'><strong>Stock:</strong> {data.stock}</p>
      </div>
    </div>
  )
}

export default ProductIdeas