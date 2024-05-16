import productosRecomendadosData from '../../../utils/json/productosRecomendadosData.json'
import Card from '../../atoms/Card';

const ListCategory = ({ category }) => {
  console.log(category);
  const filteredProducts = productosRecomendadosData.filter(product => product.category.toLowerCase() === category.toLowerCase());
  return (
    <div className="d-grid cont-products g-15">
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <Card key={product.id} type="product" data={product} />
        ))
      ) : (
        <div>No hay productos disponibles en esta categoría.</div>
      )}
    </div>
  )
}

export default ListCategory