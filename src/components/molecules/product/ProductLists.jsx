import Cards from '../../atoms/Cards'

const ProductLists = ({ data }) => {
  // console.log(data)
  return (
    <>
      <h1 className='txt-accent bb-primary bigtitle'><strong>Lista de productos</strong></h1>
      <div className='grid cont-products g-10'>
        {data.map(product => (
          <Cards key={product.id} type='product' data={product} />
        ))}
      </div>
    </>
  )
}

export default ProductLists