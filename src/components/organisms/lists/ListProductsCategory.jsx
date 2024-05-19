import Cards from '../../atoms/Cards'
import productosRecomendadosData from '../../../utils/json/productosRecomendadosData.json'

const ListProductsCategory = ({ category }) => {
  const filteredProducts = productosRecomendadosData.filter(product => product.category.toLowerCase() === category.toLowerCase())
  return (
    <div className="grid cont-products g-15">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <Cards key={product.id} type="product" data={product} />
        ))
      ) : (
        <div>No hay productos disponibles en esta categoría.</div>
      )}
    </div>
  )
}

export default ListProductsCategory