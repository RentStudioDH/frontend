import Cards from '../../atoms/Cards'
import { useContextGlobal } from '../../../contexts/global.context'

const ListProductsCategory = ({ category }) => {
  const { state } = useContextGlobal()
  const { data } = state
  // console.log(data)
  const filteredProducts = data ? data.filter(product => product.categoryName.toLowerCase() === category.toLowerCase()) : []

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