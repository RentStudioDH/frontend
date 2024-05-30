import { useContextGlobal } from '../../../contexts/global.context'
import Cards from '../../atoms/Cards'

const ListProductsCategory = ({ category }) => {
  const { state } = useContextGlobal()
  const { data } = state
  const filteredProducts = data && Array.isArray(data)
    ? data.filter(product => {
      // console.log(product)
        return product.category.name && product.category.name.toLowerCase() === category.toLowerCase()
      })
    : []
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